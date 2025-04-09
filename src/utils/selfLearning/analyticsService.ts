
/**
 * Analytics Service
 * Analyzes user behavior and updates the user model
 */

import { supabase } from '@/integrations/supabase/client';
import { UserPreferences } from './types';
import { getUserPreferences, updateUserPreferences } from './preferencesService';

// Process feedback loop to learn from user actions
export const processFeedbackLoop = async (userId: string) => {
  try {
    // 1. Get recent user actions (last 30 days)
    // Use stored procedure to avoid TypeScript issues
    const { data: recentActions, error: actionsError } = await supabase.rpc('get_recent_user_actions', {
      p_user_id: userId,
      p_days: 30
    });
    
    if (actionsError) {
      console.error('Error fetching recent actions:', actionsError);
      return;
    }

    // 2. Get user's current preferences
    const userPreferencesData = await getUserPreferences(userId);
    
    // 3. Analyze actions and update user model
    const updatedPreferences = analyzeUserBehavior(recentActions || [], userPreferencesData);
    
    // 4. Save updated user preferences if there are any changes
    if (updatedPreferences) {
      await updateUserPreferences(userId, updatedPreferences);
    }
  } catch (error) {
    console.error('Error in processFeedbackLoop:', error);
  }
};

// Analyze user behavior to determine preferences
export const analyzeUserBehavior = (
  actions: any[], 
  currentPreferences?: UserPreferences
): Partial<UserPreferences> | null => {
  if (!actions.length) return null;
  
  // Initialize preferences with current values or defaults
  const preferences: Partial<UserPreferences> = {
    risk_appetite: currentPreferences?.risk_appetite || 'medium',
    preferred_executives: currentPreferences?.preferred_executives || [],
    favorite_topics: currentPreferences?.favorite_topics || [],
    communication_style: currentPreferences?.communication_style || 'balanced',
    activity_peak_times: currentPreferences?.activity_peak_times || [],
    dashboard_preferences: currentPreferences?.dashboard_preferences || {},
    last_updated: new Date()
  };
  
  // Count strategy risk levels chosen
  const riskLevelCounts: Record<string, number> = { low: 0, medium: 0, high: 0 };
  
  // Count executive consultations
  const executiveCounts: Record<string, number> = {};
  
  // Count topic interactions
  const topicCounts: Record<string, number> = {};
  
  // Track activity times
  const activityHours: number[] = new Array(24).fill(0);
  
  // Analyze each action
  actions.forEach(action => {
    const hour = new Date(action.timestamp).getHours();
    activityHours[hour]++;
    
    switch (action.category) {
      case 'strategy_create':
      case 'strategy_update':
        if (action.metadata?.risk_level) {
          const risk = action.metadata.risk_level.toLowerCase();
          if (riskLevelCounts[risk] !== undefined) {
            riskLevelCounts[risk]++;
          }
        }
        break;
      
      case 'bot_consultation':
        if (action.metadata?.executive_id) {
          executiveCounts[action.metadata.executive_id] = 
            (executiveCounts[action.metadata.executive_id] || 0) + 1;
        }
        break;
      
      case 'debate_participation':
      case 'strategy_view':
        if (action.metadata?.topic) {
          topicCounts[action.metadata.topic] = 
            (topicCounts[action.metadata.topic] || 0) + 1;
        }
        break;
    }
  });
  
  // Determine preferred risk appetite
  const totalRiskActions = riskLevelCounts.low + riskLevelCounts.medium + riskLevelCounts.high;
  if (totalRiskActions > 0) {
    if (riskLevelCounts.high > riskLevelCounts.medium && riskLevelCounts.high > riskLevelCounts.low) {
      preferences.risk_appetite = 'high';
    } else if (riskLevelCounts.low > riskLevelCounts.medium && riskLevelCounts.low > riskLevelCounts.high) {
      preferences.risk_appetite = 'low';
    } else {
      preferences.risk_appetite = 'medium';
    }
  }
  
  // Determine preferred executives
  const preferredExecutives = Object.entries(executiveCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(entry => entry[0]);
  
  preferences.preferred_executives = preferredExecutives;
  
  // Determine favorite topics
  const favoriteTopics = Object.entries(topicCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(entry => entry[0]);
  
  preferences.favorite_topics = favoriteTopics;
  
  // Determine peak activity times
  const activityPeaks = activityHours
    .map((count, hour) => ({ hour, count }))
    .filter(item => item.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 3)
    .map(item => item.hour);
  
  preferences.activity_peak_times = activityPeaks;
  
  return preferences;
};

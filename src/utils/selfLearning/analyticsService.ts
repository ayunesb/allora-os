
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
    console.log('Processing feedback loop for user:', userId);
    
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

    if (!recentActions || recentActions.length === 0) {
      console.log('No recent actions found for user', userId);
      return;
    }

    console.log(`Found ${recentActions.length} recent actions for analysis`);
    
    // 2. Get user's current preferences
    const userPreferencesData = await getUserPreferences(userId);
    
    // 3. Analyze actions and update user model
    const updatedPreferences = analyzeUserBehavior(recentActions, userPreferencesData);
    
    // 4. Save updated user preferences if there are any changes
    if (updatedPreferences) {
      console.log('Updating user preferences based on behavior analysis');
      await updateUserPreferences(userId, updatedPreferences);
    } else {
      console.log('No preference updates needed based on analysis');
    }
  } catch (error) {
    console.error('Error in processFeedbackLoop:', error);
  }
};

// Analyze user behavior to determine preferences
export const analyzeUserBehavior = (
  actions: any[], 
  currentPreferences?: any
): Partial<UserPreferences> | null => {
  if (!actions.length) return null;
  
  // Initialize preferences with current values or defaults
  const preferences: Partial<UserPreferences> = {
    risk_appetite: currentPreferences?.riskAppetite || 'medium',
    preferred_executives: currentPreferences?.favoriteExecutives || [],
    favorite_topics: currentPreferences?.topCategories || [],
    communication_style: 'balanced',
    activity_peak_times: [],
    dashboard_preferences: {},
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
  
  // Track view vs. create/edit behavior to determine communication style
  let viewCount = 0;
  let editCount = 0;
  
  // Analyze each action
  actions.forEach(action => {
    // Track activity time
    const timestamp = new Date(action.timestamp);
    const hour = timestamp.getHours();
    activityHours[hour]++;
    
    // Track actions by type
    switch (action.category) {
      case 'strategy_create':
      case 'strategy_update':
        editCount++;
        if (action.metadata?.risk_level) {
          const risk = String(action.metadata.risk_level).toLowerCase();
          if (riskLevelCounts[risk] !== undefined) {
            riskLevelCounts[risk]++;
          }
        }
        break;
      
      case 'strategy_view':
        viewCount++;
        if (action.metadata?.topic) {
          const topic = String(action.metadata.topic);
          topicCounts[topic] = (topicCounts[topic] || 0) + 1;
        }
        break;
        
      case 'bot_consultation':
        if (action.metadata?.executive_id) {
          const executiveId = String(action.metadata.executive_id);
          executiveCounts[executiveId] = (executiveCounts[executiveId] || 0) + 1;
        }
        break;
      
      case 'debate_participation':
        if (action.metadata?.topic) {
          const topic = String(action.metadata.topic);
          topicCounts[topic] = (topicCounts[topic] || 0) + 2; // Weight debates higher
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
  
  if (preferredExecutives.length > 0) {
    preferences.preferred_executives = preferredExecutives;
  }
  
  // Determine favorite topics
  const favoriteTopics = Object.entries(topicCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(entry => entry[0]);
  
  if (favoriteTopics.length > 0) {
    preferences.favorite_topics = favoriteTopics;
  }
  
  // Determine peak activity times
  const activityPeaks = activityHours
    .map((count, hour) => ({ hour, count }))
    .filter(item => item.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 3)
    .map(item => item.hour);
  
  if (activityPeaks.length > 0) {
    preferences.activity_peak_times = activityPeaks;
  }
  
  // Determine communication style preference
  if (viewCount + editCount > 10) { // Ensure sufficient data
    const viewRatio = viewCount / (viewCount + editCount);
    
    if (viewRatio > 0.7) {
      preferences.communication_style = 'concise'; // Mostly viewing, less interaction
    } else if (viewRatio < 0.3) {
      preferences.communication_style = 'detailed'; // Mostly editing, more hands-on
    } else {
      preferences.communication_style = 'balanced';
    }
  }
  
  return preferences;
};

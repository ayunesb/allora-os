
/**
 * Self-Learning Engine
 * Tracks user actions, analyzes patterns, and improves recommendations automatically
 */

import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Types for tracking user actions
export type UserAction = {
  action: string;
  category: ActionCategory;
  entityId?: string;
  entityType?: string;
  metadata?: Record<string, any>;
  timestamp: Date;
};

export type ActionCategory = 
  | 'strategy_view' 
  | 'strategy_create' 
  | 'strategy_update'
  | 'call_initiate'
  | 'message_send'
  | 'bot_consultation'
  | 'debate_participation'
  | 'campaign_interaction'
  | 'lead_conversion'
  | 'video_generation'
  | 'page_view';

// Track user actions
export const trackUserAction = async (
  userId: string,
  action: string,
  category: ActionCategory,
  entityId?: string,
  entityType?: string,
  metadata?: Record<string, any>
) => {
  try {
    const userAction: UserAction = {
      action,
      category,
      entityId,
      entityType,
      metadata,
      timestamp: new Date()
    };

    // Log action to console for development
    console.log('Tracking user action:', userAction);

    // Store action in Supabase
    const { error } = await supabase
      .from('user_actions')
      .insert({
        user_id: userId,
        action: userAction.action,
        category: userAction.category,
        entity_id: userAction.entityId,
        entity_type: userAction.entityType,
        metadata: userAction.metadata,
        timestamp: userAction.timestamp
      });

    if (error) {
      console.error('Error tracking user action:', error);
      return false;
    }

    // Trigger learning algorithm after tracking action
    await processFeedbackLoop(userId);
    
    return true;
  } catch (error) {
    console.error('Error in trackUserAction:', error);
    return false;
  }
};

// Process feedback loop to learn from user actions
const processFeedbackLoop = async (userId: string) => {
  try {
    // 1. Get recent user actions (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const { data: recentActions, error: actionsError } = await supabase
      .from('user_actions')
      .select('*')
      .eq('user_id', userId)
      .gte('timestamp', thirtyDaysAgo.toISOString())
      .order('timestamp', { ascending: false });
    
    if (actionsError) {
      console.error('Error fetching recent actions:', actionsError);
      return;
    }

    // 2. Get user's current preferences
    const { data: userPreferences, error: preferencesError } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (preferencesError && preferencesError.code !== 'PGRST116') { // PGRST116 = not found
      console.error('Error fetching user preferences:', preferencesError);
      return;
    }

    // 3. Analyze actions and update user model
    const updatedPreferences = analyzeUserBehavior(recentActions || [], userPreferences);
    
    // 4. Save updated user preferences
    if (updatedPreferences) {
      if (userPreferences) {
        // Update existing preferences
        const { error: updateError } = await supabase
          .from('user_preferences')
          .update(updatedPreferences)
          .eq('user_id', userId);
        
        if (updateError) {
          console.error('Error updating user preferences:', updateError);
        }
      } else {
        // Create new preferences
        const { error: insertError } = await supabase
          .from('user_preferences')
          .insert({
            user_id: userId,
            ...updatedPreferences
          });
        
        if (insertError) {
          console.error('Error creating user preferences:', insertError);
        }
      }
    }
  } catch (error) {
    console.error('Error in processFeedbackLoop:', error);
  }
};

// Analyze user behavior to determine preferences
const analyzeUserBehavior = (
  actions: any[], 
  currentPreferences: any
): Record<string, any> | null => {
  if (!actions.length) return null;
  
  // Initialize preferences with current values or defaults
  const preferences: Record<string, any> = {
    risk_appetite: currentPreferences?.risk_appetite || 'medium',
    preferred_executives: currentPreferences?.preferred_executives || [],
    favorite_topics: currentPreferences?.favorite_topics || [],
    communication_style: currentPreferences?.communication_style || 'balanced',
    activity_peak_times: currentPreferences?.activity_peak_times || [],
    dashboard_preferences: currentPreferences?.dashboard_preferences || {},
    last_updated: new Date().toISOString()
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
  preferences.preferred_executives = Object.entries(executiveCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(entry => entry[0]);
  
  // Determine favorite topics
  preferences.favorite_topics = Object.entries(topicCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(entry => entry[0]);
  
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

// Get personalized recommendations based on user behavior
export const getPersonalizedRecommendations = async (userId: string) => {
  try {
    // Get user's learned preferences
    const { data: preferences, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching user preferences:', error);
      return {
        strategies: [],
        executives: [],
        topics: []
      };
    }
    
    // Return recommendations based on preferences
    return {
      strategies: generateStrategyRecommendations(preferences),
      executives: preferences.preferred_executives || [],
      topics: preferences.favorite_topics || []
    };
  } catch (error) {
    console.error('Error in getPersonalizedRecommendations:', error);
    return {
      strategies: [],
      executives: [],
      topics: []
    };
  }
};

// Generate strategy recommendations based on user preferences
const generateStrategyRecommendations = (preferences: any) => {
  const riskAppetite = preferences?.risk_appetite || 'medium';
  const strategies = [];
  
  switch (riskAppetite) {
    case 'high':
      strategies.push(
        { title: 'Rapid Market Expansion', description: 'Aggressively enter new markets with innovative products' },
        { title: 'Disruptive Innovation', description: 'Invest heavily in R&D to create industry-changing solutions' }
      );
      break;
    case 'medium':
      strategies.push(
        { title: 'Balanced Growth', description: 'Mix of established markets and careful expansion to new ones' },
        { title: 'Strategic Partnerships', description: 'Form alliances with complementary businesses' }
      );
      break;
    case 'low':
      strategies.push(
        { title: 'Focused Optimization', description: 'Refine existing products and services for better margins' },
        { title: 'Customer Retention', description: 'Invest in deepening relationships with existing customers' }
      );
      break;
  }
  
  return strategies;
};

// Get user learning insights
export const getLearningInsights = async (userId: string) => {
  try {
    // Get user's action counts by category
    const { data, error } = await supabase
      .from('user_actions')
      .select('category, count(*)')
      .eq('user_id', userId)
      .group('category');
    
    if (error) {
      console.error('Error fetching learning insights:', error);
      return [];
    }
    
    // Get user preferences
    const { data: preferences, error: prefError } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (prefError && prefError.code !== 'PGRST116') {
      console.error('Error fetching user preferences:', prefError);
    }
    
    // Format insights
    return [
      {
        title: 'Behavioral Pattern',
        value: getMostFrequentCategory(data),
        description: 'Your most common interaction with the platform'
      },
      {
        title: 'Risk Appetite',
        value: preferences?.risk_appetite || 'medium',
        description: 'Based on your strategy selections and decisions'
      },
      {
        title: 'Learning Progress',
        value: `${Math.min(data?.length || 0, 10)}/10`,
        description: 'How well we understand your preferences'
      },
      {
        title: 'Usage Pattern',
        value: getUsagePattern(preferences?.activity_peak_times || []),
        description: 'When you tend to use the platform most'
      }
    ];
  } catch (error) {
    console.error('Error in getLearningInsights:', error);
    return [];
  }
};

// Determine most frequent action category
const getMostFrequentCategory = (categoryCounts: any[]) => {
  if (!categoryCounts || !categoryCounts.length) return 'No data';
  
  const category = categoryCounts.sort((a, b) => b.count - a.count)[0].category;
  
  // Format category for display
  return category
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Determine usage pattern based on activity hours
const getUsagePattern = (peakHours: number[]) => {
  if (!peakHours || !peakHours.length) return 'No pattern';
  
  // Check if hours are mostly morning (5-11), afternoon (12-17), or evening (18-23)
  const morningHours = peakHours.filter(h => h >= 5 && h <= 11).length;
  const afternoonHours = peakHours.filter(h => h >= 12 && h <= 17).length;
  const eveningHours = peakHours.filter(h => h >= 18 && h <= 23 || h < 5).length;
  
  if (morningHours > afternoonHours && morningHours > eveningHours) {
    return 'Morning Person';
  } else if (afternoonHours > morningHours && afternoonHours > eveningHours) {
    return 'Afternoon Worker';
  } else if (eveningHours > morningHours && eveningHours > afternoonHours) {
    return 'Night Owl';
  } else {
    return 'Balanced Schedule';
  }
};

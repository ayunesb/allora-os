
/**
 * Recommendation Service
 * Generates personalized recommendations based on user preferences
 */

import { supabase } from '@/integrations/supabase/client';
import { RecommendationResult, InsightResult } from './types';
import { getUserPreferences } from './preferencesService';

// Get personalized recommendations based on user behavior
export const getPersonalizedRecommendations = async (userId: string): Promise<RecommendationResult> => {
  try {
    // Get user's learned preferences
    const preferences = await getUserPreferences(userId);
    
    if (!preferences) {
      return {
        strategies: [],
        executives: [],
        topics: []
      };
    }
    
    // Return recommendations based on preferences
    return {
      strategies: generateStrategyRecommendations(preferences.risk_appetite),
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
const generateStrategyRecommendations = (riskAppetite: string) => {
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
    default:
      strategies.push(
        { title: 'Balanced Growth', description: 'Mix of established markets and careful expansion to new ones' },
        { title: 'Strategic Partnerships', description: 'Form alliances with complementary businesses' }
      );
  }
  
  return strategies;
};

// Get user learning insights
export const getLearningInsights = async (userId: string): Promise<InsightResult> => {
  try {
    // Use stored procedure to avoid TypeScript issues
    const { data: actionData, error: actionError } = await supabase.rpc('get_user_action_categories', {
      p_user_id: userId
    });
    
    if (actionError) {
      console.error('Error fetching learning insights:', actionError);
      return getDefaultInsights();
    }
    
    // Get user preferences
    const preferences = await getUserPreferences(userId);
    
    if (!preferences) {
      return getDefaultInsights();
    }
    
    // Determine most frequent category
    let mostFrequentCategory = 'No data';
    let maxCount = 0;
    
    if (actionData && actionData.length > 0) {
      actionData.forEach((item: any) => {
        if (item.count > maxCount) {
          maxCount = item.count;
          mostFrequentCategory = item.category;
        }
      });
      
      // Format category for display
      if (mostFrequentCategory !== 'No data') {
        mostFrequentCategory = mostFrequentCategory
          .split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }
    }

    // Format insights
    return [
      {
        title: 'Behavioral Pattern',
        value: mostFrequentCategory,
        description: 'Your most common interaction with the platform'
      },
      {
        title: 'Risk Appetite',
        value: preferences.risk_appetite || 'medium',
        description: 'Based on your strategy selections and decisions'
      },
      {
        title: 'Learning Progress',
        value: `${Math.min(actionData?.length || 0, 10)}/10`,
        description: 'How well we understand your preferences'
      },
      {
        title: 'Usage Pattern',
        value: getUsagePattern(preferences.activity_peak_times || []),
        description: 'When you tend to use the platform most'
      }
    ];
  } catch (error) {
    console.error('Error in getLearningInsights:', error);
    return getDefaultInsights();
  }
};

// Get default insights when data is unavailable
const getDefaultInsights = (): InsightResult => {
  return [
    { title: 'Behavioral Pattern', value: 'No data', description: 'Your most common interaction with the platform' },
    { title: 'Risk Appetite', value: 'medium', description: 'Based on your strategy selections and decisions' },
    { title: 'Learning Progress', value: '0/10', description: 'How well we understand your preferences' },
    { title: 'Usage Pattern', value: 'No pattern', description: 'When you tend to use the platform most' }
  ];
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

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
    
    // Get recently viewed strategies to avoid recommending duplicates
    const { data: recentActions, error: actionsError } = await supabase.rpc('get_recent_user_actions', {
      p_user_id: userId,
      p_days: 7
    });
    
    const viewedStrategyIds = new Set<string>();
    if (recentActions) {
      recentActions
        .filter(action => action.category === 'strategy_view')
        .forEach(action => {
          if (action.entity_id) viewedStrategyIds.add(action.entity_id);
        });
    }
    
    // Return recommendations based on preferences
    return {
      strategies: generateStrategyRecommendations(preferences.risk_appetite, viewedStrategyIds),
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
const generateStrategyRecommendations = (riskAppetite: string, viewedStrategyIds: Set<string>) => {
  // Define a larger pool of strategies
  const strategyPool = {
    high: [
      { id: 'high-1', title: 'Rapid Market Expansion', description: 'Aggressively enter new markets with innovative products' },
      { id: 'high-2', title: 'Disruptive Innovation', description: 'Invest heavily in R&D to create industry-changing solutions' },
      { id: 'high-3', title: 'Acquisition Strategy', description: 'Grow through strategic acquisitions of competitors or complementary businesses' },
      { id: 'high-4', title: 'First-Mover Advantage', description: 'Be first to market with new technologies to capture market share' },
      { id: 'high-5', title: 'Venture Investment', description: 'Allocate resources to high-risk, high-reward ventures with significant upside' }
    ],
    medium: [
      { id: 'med-1', title: 'Balanced Growth', description: 'Mix of established markets and careful expansion to new ones' },
      { id: 'med-2', title: 'Strategic Partnerships', description: 'Form alliances with complementary businesses' },
      { id: 'med-3', title: 'Product Line Extension', description: 'Expand existing product lines to reach adjacent markets' },
      { id: 'med-4', title: 'Selective Innovation', description: 'Focus R&D on proven areas with moderate risk and good returns' },
      { id: 'med-5', title: 'Market Penetration', description: 'Increase market share in existing markets through improved offering' }
    ],
    low: [
      { id: 'low-1', title: 'Focused Optimization', description: 'Refine existing products and services for better margins' },
      { id: 'low-2', title: 'Customer Retention', description: 'Invest in deepening relationships with existing customers' },
      { id: 'low-3', title: 'Cost Leadership', description: 'Optimize operations to achieve lowest cost position in the market' },
      { id: 'low-4', title: 'Incremental Improvement', description: 'Make small, continuous improvements to existing offerings' },
      { id: 'low-5', title: 'Defensive Position', description: 'Protect current market share and focus on stable, low-risk growth' }
    ]
  };
  
  // Select the appropriate strategy pool based on risk appetite
  let selectedPool = strategyPool.medium; // Default
  if (riskAppetite === 'high') {
    selectedPool = strategyPool.high;
  } else if (riskAppetite === 'low') {
    selectedPool = strategyPool.low;
  }
  
  // Filter out strategies the user has already viewed
  const filteredPool = selectedPool.filter(strategy => !viewedStrategyIds.has(strategy.id));
  
  // If all strategies have been viewed, return a mix of strategies
  if (filteredPool.length === 0) {
    // Mix strategies from all risk levels
    const mixedRecommendations = [
      ...strategyPool.high.slice(0, 1),
      ...strategyPool.medium.slice(0, 1),
      ...strategyPool.low.slice(0, 1)
    ];
    
    return mixedRecommendations.map(({ title, description }) => ({ title, description }));
  }
  
  // Return a subset of filtered strategies (up to 3)
  return filteredPool
    .slice(0, 3)
    .map(({ title, description }) => ({ title, description }));
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
        value: `${Math.min((actionData?.length || 0), 10)}/10`,
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

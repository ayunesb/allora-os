
import { supabase } from "@/backend/supabase";
import { UserPreferences } from './types';

/**
 * Get user preferences based on their interaction history
 */
export async function getUserPreferences(userId: string) {
  try {
    // Get user actions from Supabase
    const { data: userActions, error } = await supabase
      .from('user_actions')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false });
      
    if (error) throw error;
    
    // Count actions by category and executives
    const categoryCount: Record<string, number> = {};
    const executiveCount: Record<string, number> = {};
    
    (userActions || []).forEach(action => {
      // Count by category
      categoryCount[action.category] = (categoryCount[action.category] || 0) + 1;
      
      // Count by executive if available in metadata
      if (action.metadata?.executiveName) {
        const execName = action.metadata.executiveName;
        executiveCount[execName] = (executiveCount[execName] || 0) + 1;
      }
    });
    
    // Calculate preferred risk level based on strategy approvals
    let riskAppetite = 'medium';
    const riskActions = (userActions || []).filter(a => 
      a.category === 'strategy_feedback' && 
      a.metadata?.riskLevel
    );
    
    if (riskActions.length > 0) {
      const riskLevels = {
        low: 0,
        medium: 0,
        high: 0
      };
      
      riskActions.forEach(action => {
        const level = action.metadata.riskLevel.toLowerCase();
        if (level in riskLevels) {
          riskLevels[level as keyof typeof riskLevels] += 
            action.action === 'strategy_approve' ? 1 : -0.5;
        }
      });
      
      // Determine dominant risk preference
      const maxRisk = Object.entries(riskLevels).reduce((max, [level, count]) => 
        count > max.count ? { level, count } : max, 
        { level: 'medium', count: 0 }
      );
      
      riskAppetite = maxRisk.level;
    }
    
    // Determine favorite executives
    const favoriteExecutives = Object.entries(executiveCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name]) => name);
    
    // Determine most engaged categories
    const topCategories = Object.entries(categoryCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([category]) => category);
    
    return {
      riskAppetite,
      favoriteExecutives,
      topCategories,
      // Full counts for more detailed analysis
      categories: categoryCount,
      executives: executiveCount
    };
  } catch (error) {
    console.error('Error getting user preferences:', error);
    return {
      riskAppetite: 'medium',
      favoriteExecutives: [],
      topCategories: [],
      categories: {},
      executives: {}
    };
  }
}

/**
 * Update user preferences in the database
 */
export async function updateUserPreferences(userId: string, preferences: Partial<UserPreferences>) {
  try {
    // Format the preferences to match the database schema
    const formattedPreferences = {
      risk_appetite: preferences.risk_appetite || 'medium',
      preferred_executives: preferences.preferred_executives || [],
      favorite_topics: preferences.favorite_topics || [],
      communication_style: preferences.communication_style || 'balanced',
      activity_peak_times: preferences.activity_peak_times || [],
      dashboard_preferences: preferences.dashboard_preferences || {},
      last_updated: new Date()
    };
    
    // Update the user preferences in Supabase
    const { error } = await supabase
      .from('user_preferences')
      .upsert({
        user_id: userId,
        ...formattedPreferences
      }, {
        onConflict: 'user_id'
      });
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error updating user preferences:', error);
    return false;
  }
}

/**
 * Get user learning insights based on their interaction history
 */
export async function getLearningInsights(userId: string) {
  try {
    const preferences = await getUserPreferences(userId);
    
    // Prepare insights based on learned preferences
    const insights = [
      {
        title: 'Risk Appetite',
        value: preferences.riskAppetite.charAt(0).toUpperCase() + preferences.riskAppetite.slice(1),
        description: 'Based on your strategy selections and decisions'
      },
      {
        title: 'Favorite Executives',
        value: preferences.favoriteExecutives.length > 0 
          ? preferences.favoriteExecutives[0]
          : 'No data yet',
        description: 'The executive whose advice you value most'
      },
      {
        title: 'Learning Progress',
        value: calculateLearningProgress(preferences) + '/10',
        description: 'How well we understand your preferences'
      },
      {
        title: 'Focus Area',
        value: getFocusArea(preferences),
        description: 'Your most common interaction with the platform'
      }
    ];
    
    return insights;
  } catch (error) {
    console.error('Error generating learning insights:', error);
    return [
      { 
        title: 'Risk Appetite', 
        value: 'Medium', 
        description: 'Based on your strategy selections and decisions' 
      },
      { 
        title: 'Learning Progress', 
        value: '0/10', 
        description: 'How well we understand your preferences' 
      },
      { 
        title: 'Usage Pattern', 
        value: 'No pattern', 
        description: 'When you tend to use the platform most' 
      },
      { 
        title: 'Behavioral Pattern', 
        value: 'No data', 
        description: 'Your most common interaction with the platform' 
      }
    ];
  }
}

// Helper functions

function calculateLearningProgress(preferences: any): number {
  // Count non-empty preference data points
  let dataPoints = 0;
  
  if (preferences.favoriteExecutives.length > 0) dataPoints += 2;
  if (preferences.topCategories.length > 0) dataPoints += 2;
  if (Object.keys(preferences.categories).length > 3) dataPoints += 3;
  if (Object.keys(preferences.executives).length > 3) dataPoints += 3;
  
  // Cap at 10
  return Math.min(10, dataPoints);
}

function getFocusArea(preferences: any): string {
  const topCategory = preferences.topCategories[0];
  
  if (!topCategory) return 'No data yet';
  
  // Map category to user-friendly focus area
  const focusMap: Record<string, string> = {
    'strategy_feedback': 'Strategic Planning',
    'campaign_feedback': 'Marketing',
    'script_feedback': 'Sales Outreach',
    'message_send': 'Communications',
    'call_initiate': 'Direct Calling',
    'page_view': 'Research & Analysis'
  };
  
  return focusMap[topCategory] || 'General Business';
}

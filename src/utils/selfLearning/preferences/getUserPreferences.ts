
import { supabase } from "@/backend/supabase";

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

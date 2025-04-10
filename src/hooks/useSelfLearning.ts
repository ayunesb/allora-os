
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/backend/supabase";
import { getLearningInsights, getPersonalizedRecommendations } from "@/utils/selfLearning";

export function useSelfLearning() {
  const { user } = useAuth();
  
  /**
   * Track a user action for self-learning
   */
  const trackAction = async (
    action: string,
    category: string,
    entityId: string,
    entityType: string,
    metadata: Record<string, any> = {}
  ) => {
    if (!user?.id) return;
    
    try {
      const timestamp = new Date().toISOString();
      
      // In a real app, this would be sent to the backend
      console.log('Tracking user action:', {
        userId: user.id,
        action,
        category,
        entityId,
        entityType,
        metadata,
        timestamp
      });
      
      // Store in Supabase if available
      try {
        await supabase.rpc('insert_user_action', {
          p_user_id: user.id,
          p_action: action,
          p_category: category,
          p_entity_id: entityId,
          p_entity_type: entityType,
          p_metadata: metadata,
          p_timestamp: timestamp
        });
      } catch (error) {
        // Fallback to local storage if Supabase is not connected
        const storedActions = JSON.parse(localStorage.getItem('user_actions') || '[]');
        storedActions.push({
          userId: user.id,
          action,
          category,
          entityId,
          entityType,
          metadata,
          timestamp
        });
        localStorage.setItem('user_actions', JSON.stringify(storedActions));
      }
    } catch (error) {
      console.error('Error tracking user action:', error);
    }
  };
  
  /**
   * Get learning insights based on user behavior
   */
  const getInsights = async () => {
    if (!user?.id) {
      return getDefaultInsights();
    }
    
    try {
      // In a real app, this would call the backend service
      return await getLearningInsights(user.id);
    } catch (error) {
      console.error('Error getting insights:', error);
      return getDefaultInsights();
    }
  };
  
  /**
   * Get personalized recommendations based on user behavior
   */
  const getRecommendations = async () => {
    if (!user?.id) {
      return {
        strategies: [],
        executives: [],
        topics: []
      };
    }
    
    try {
      // In a real app, this would call the backend service
      return await getPersonalizedRecommendations(user.id);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      return {
        strategies: [],
        executives: [],
        topics: []
      };
    }
  };
  
  // Default insights for when data is unavailable
  const getDefaultInsights = () => {
    return [
      { title: 'Behavioral Pattern', value: 'No data', description: 'Your most common interaction with the platform' },
      { title: 'Risk Appetite', value: 'medium', description: 'Based on your strategy selections and decisions' },
      { title: 'Learning Progress', value: '0/10', description: 'How well we understand your preferences' },
      { title: 'Usage Pattern', value: 'No pattern', description: 'When you tend to use the platform most' }
    ];
  };
  
  return {
    trackAction,
    getInsights,
    getRecommendations,
    isLoggedIn: !!user?.id
  };
}

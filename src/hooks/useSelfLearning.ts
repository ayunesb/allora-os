
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/backend/supabase";

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
  
  return {
    trackAction,
    isLoggedIn: !!user?.id
  };
}

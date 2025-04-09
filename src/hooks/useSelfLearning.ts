
import { useCallback } from 'react';
import { useAuthState } from '@/hooks/useAuthState';
import { 
  trackUserAction, 
  getPersonalizedRecommendations, 
  getLearningInsights,
  ActionCategory
} from '@/utils/selfLearning';

export const useSelfLearning = () => {
  const { user } = useAuthState();
  
  const trackAction = useCallback((
    action: string,
    category: ActionCategory,
    entityId?: string,
    entityType?: string,
    metadata?: Record<string, any>
  ) => {
    if (!user?.id) return false;
    
    return trackUserAction(
      user.id,
      action,
      category,
      entityId,
      entityType,
      metadata
    );
  }, [user?.id]);
  
  const getRecommendations = useCallback(async () => {
    if (!user?.id) return {
      strategies: [],
      executives: [],
      topics: []
    };
    
    return await getPersonalizedRecommendations(user.id);
  }, [user?.id]);
  
  const getInsights = useCallback(async () => {
    if (!user?.id) return [];
    
    return await getLearningInsights(user.id);
  }, [user?.id]);
  
  return {
    trackAction,
    getRecommendations,
    getInsights
  };
};


import { useCallback } from 'react';
import { useSelfLearning } from './useSelfLearning';
import { useAuthState } from './useAuthState';

export function useStrategyTracking() {
  const { trackAction } = useSelfLearning();
  const { user } = useAuthState();

  const trackStrategyView = useCallback((strategyId: string, title: string) => {
    trackAction(
      'strategy_viewed',
      'strategy_view',
      strategyId,
      'strategy',
      { title }
    );
  }, [trackAction]);

  const trackStrategyCreate = useCallback((strategyId: string, title: string, riskLevel: string) => {
    trackAction(
      'strategy_created',
      'strategy_create',
      strategyId,
      'strategy',
      { title, risk_level: riskLevel }
    );
  }, [trackAction]);
  
  const trackStrategyUpdate = useCallback((strategyId: string, title: string, riskLevel?: string) => {
    trackAction(
      'strategy_updated',
      'strategy_update',
      strategyId,
      'strategy',
      { title, risk_level: riskLevel }
    );
  }, [trackAction]);
  
  const trackStrategyDelete = useCallback((strategyId: string) => {
    trackAction(
      'strategy_deleted',
      'strategy_update',
      strategyId,
      'strategy'
    );
  }, [trackAction]);
  
  const trackStrategyFilter = useCallback((filterType: string, value: string) => {
    trackAction(
      'strategy_filtered',
      'strategy_view',
      undefined,
      'filter',
      { filter_type: filterType, value }
    );
  }, [trackAction]);

  const isLoggedIn = !!user?.id;
  
  return {
    trackStrategyView,
    trackStrategyCreate,
    trackStrategyUpdate,
    trackStrategyDelete,
    trackStrategyFilter,
    isLoggedIn
  };
}

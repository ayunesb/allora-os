
import { useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useSelfLearning } from '@/hooks/useSelfLearning';
import { toast } from 'sonner';

export function useStrategyTracking() {
  const { user } = useAuth();
  const { trackAction } = useSelfLearning();
  
  /**
   * Track when a user views a strategy detail
   */
  const trackStrategyView = useCallback((strategyId: string, title: string) => {
    if (!user?.id) return;
    
    trackAction(
      'view_strategy',
      'strategy_view',
      strategyId,
      'strategy',
      { title }
    );
  }, [user, trackAction]);
  
  /**
   * Track when a user approves a strategy
   */
  const trackStrategyApprove = useCallback((strategyId: string, title: string, executiveBot?: string) => {
    if (!user?.id) return;
    
    trackAction(
      'strategy_approve',
      'strategy_feedback',
      strategyId,
      'strategy',
      { 
        title,
        executiveBot,
        action: 'approve'
      }
    );
    
    toast.success('Strategy approved! Our AI will learn from your preference.');
  }, [user, trackAction]);
  
  /**
   * Track when a user rejects a strategy
   */
  const trackStrategyReject = useCallback((strategyId: string, title: string, executiveBot?: string, reason?: string) => {
    if (!user?.id) return;
    
    trackAction(
      'strategy_reject',
      'strategy_feedback',
      strategyId,
      'strategy',
      { 
        title,
        executiveBot,
        reason,
        action: 'reject' 
      }
    );
    
    toast.success('Feedback recorded. We\'ll improve our recommendations.');
  }, [user, trackAction]);
  
  /**
   * Track when a user deletes a strategy
   */
  const trackStrategyDelete = useCallback((strategyId: string) => {
    if (!user?.id) return;
    
    trackAction(
      'delete_strategy',
      'strategy_management',
      strategyId,
      'strategy',
      { action: 'delete' }
    );
  }, [user, trackAction]);

  /**
   * Track when a user updates a strategy
   */
  const trackStrategyUpdate = useCallback((strategyId: string, title: string, riskLevel?: string) => {
    if (!user?.id) return;
    
    trackAction(
      'update_strategy',
      'strategy_management',
      strategyId,
      'strategy',
      { 
        title,
        riskLevel,
        action: 'update' 
      }
    );
  }, [user, trackAction]);
  
  /**
   * Track when a user applies a filter
   */
  const trackStrategyFilter = useCallback((filterType: string, filterValue: string) => {
    if (!user?.id) return;
    
    trackAction(
      'filter_strategies',
      'strategy_interaction',
      filterType,
      'filter',
      { 
        filterType,
        filterValue 
      }
    );
  }, [user, trackAction]);
  
  return {
    trackStrategyView,
    trackStrategyApprove,
    trackStrategyReject,
    trackStrategyDelete,
    trackStrategyUpdate,
    trackStrategyFilter,
    isLoggedIn: !!user?.id
  };
}

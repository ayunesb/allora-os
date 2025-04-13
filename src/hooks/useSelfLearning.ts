
/**
 * Self-Learning Hook for Allora AI
 * 
 * This hook provides functionality to track user actions and system events
 * for continuous learning and improvement of the platform.
 */

import { useState, useCallback, useContext } from 'react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { logger } from '@/utils/loggingService';

// Define types for tracking actions
export interface ActionData {
  actionType: string;
  category: string;
  entityId?: string;
  entityType?: string;
  metadata?: Record<string, any>;
  timestamp?: string;
}

export function useSelfLearning() {
  const { user, profile } = useAuth();
  const [isTracking, setIsTracking] = useState<boolean>(true);
  
  /**
   * Tracks a user action for self-learning purposes
   */
  const trackAction = useCallback(
    (
      actionType: string,
      category: string,
      entityId?: string,
      entityType?: string,
      metadata?: Record<string, any>
    ) => {
      if (!isTracking) return;
      
      try {
        const actionData: ActionData = {
          actionType,
          category,
          entityId,
          entityType,
          metadata,
          timestamp: new Date().toISOString()
        };
        
        // Log the action to console in development
        logger.info(`[Self-Learning] Action tracked: ${actionType}`, {
          category,
          userId: user?.id || 'anonymous',
          companyId: profile?.company_id || 'unknown',
          entityId,
          entityType
        });
        
        // In a real implementation, we would store this in the database
        // For now, we'll just store it in localStorage for demonstration
        const storedActions = localStorage.getItem('allora_tracked_actions');
        const actions = storedActions ? JSON.parse(storedActions) : [];
        actions.push({
          ...actionData,
          userId: user?.id || 'anonymous',
          companyId: profile?.company_id || 'unknown'
        });
        localStorage.setItem('allora_tracked_actions', JSON.stringify(actions));
        
        return true;
      } catch (error) {
        logger.error('Error tracking action for self-learning', error);
        return false;
      }
    },
    [isTracking, user?.id, profile?.company_id]
  );
  
  /**
   * Enables or disables action tracking
   */
  const setTrackingEnabled = useCallback((enabled: boolean) => {
    setIsTracking(enabled);
    localStorage.setItem('allora_tracking_enabled', String(enabled));
    
    if (enabled) {
      toast.success('Self-learning tracking enabled');
    } else {
      toast.info('Self-learning tracking disabled');
    }
  }, []);
  
  /**
   * Clears all tracked actions
   */
  const clearTrackedActions = useCallback(() => {
    localStorage.removeItem('allora_tracked_actions');
    toast.success('Self-learning data cleared');
  }, []);
  
  return {
    trackAction,
    isTracking,
    setTrackingEnabled,
    clearTrackedActions
  };
}

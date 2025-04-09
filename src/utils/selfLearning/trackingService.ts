
/**
 * User Action Tracking Service
 * Records user actions for personalization and analytics
 */

import { supabase } from '@/integrations/supabase/client';
import { ActionCategory, UserAction } from './types';
import { processFeedbackLoop } from './analyticsService';

// Track user actions
export const trackUserAction = async (
  userId: string,
  action: string,
  category: ActionCategory,
  entityId?: string,
  entityType?: string,
  metadata?: Record<string, any>
) => {
  try {
    const userAction: UserAction = {
      action,
      category,
      entityId,
      entityType,
      metadata,
      timestamp: new Date()
    };

    // Log action to console for development
    console.log('Tracking user action:', userAction);

    // Instead of using database queries directly, use raw SQL
    // This is a workaround for TypeScript issues with the database schema
    const { error } = await supabase.rpc('insert_user_action', {
      p_user_id: userId,
      p_action: userAction.action,
      p_category: userAction.category,
      p_entity_id: userAction.entityId || null,
      p_entity_type: userAction.entityType || null,
      p_metadata: userAction.metadata || null,
      p_timestamp: userAction.timestamp
    });

    if (error) {
      console.error('Error tracking user action:', error);
      return false;
    }

    // Process feedback loop after successful tracking
    setTimeout(() => processFeedbackLoop(userId), 500);
    
    return true;
  } catch (error) {
    console.error('Error in trackUserAction:', error);
    return false;
  }
};

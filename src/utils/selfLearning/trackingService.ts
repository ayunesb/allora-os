
import { supabase } from "@/backend/supabase";

/**
 * Track a user action for the self-learning system
 */
export async function trackUserAction(
  userId: string,
  action: string,
  category: string,
  entityId: string,
  entityType: string,
  metadata: Record<string, any> = {}
) {
  try {
    const timestamp = new Date().toISOString();
    
    // Store in Supabase if available
    try {
      await supabase.rpc('insert_user_action', {
        p_user_id: userId,
        p_action: action,
        p_category: category,
        p_entity_id: entityId,
        p_entity_type: entityType,
        p_metadata: metadata,
        p_timestamp: timestamp
      });
    } catch (error) {
      console.error('Error storing user action in Supabase:', error);
      
      // Fallback to local storage
      const storedActions = JSON.parse(localStorage.getItem('user_actions') || '[]');
      storedActions.push({
        userId,
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
}

/**
 * Track strategy feedback to improve AI recommendations
 */
export async function trackStrategyFeedback(
  userId: string, 
  strategyId: string, 
  isPositive: boolean,
  metadata: Record<string, any> = {}
) {
  return trackUserAction(
    userId,
    isPositive ? 'strategy_approve' : 'strategy_reject',
    'strategy_feedback',
    strategyId,
    'strategy',
    {
      ...metadata,
      rating: isPositive ? 'positive' : 'negative'
    }
  );
}

/**
 * Track campaign feedback to improve marketing recommendations
 */
export async function trackCampaignFeedback(
  userId: string, 
  campaignId: string, 
  isPositive: boolean,
  metadata: Record<string, any> = {}
) {
  return trackUserAction(
    userId,
    isPositive ? 'campaign_approve' : 'campaign_reject',
    'campaign_feedback',
    campaignId,
    'campaign',
    {
      ...metadata,
      rating: isPositive ? 'positive' : 'negative'
    }
  );
}

/**
 * Track script usage and feedback to improve call/message templates
 */
export async function trackScriptFeedback(
  userId: string, 
  scriptId: string,
  scriptType: 'call' | 'message',
  action: 'use' | 'approve' | 'reject',
  metadata: Record<string, any> = {}
) {
  return trackUserAction(
    userId,
    `script_${action}`,
    'script_feedback',
    scriptId,
    `${scriptType}_script`,
    metadata
  );
}

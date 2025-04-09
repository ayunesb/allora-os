
/**
 * User Preferences Service
 * Manages user preference data
 */

import { supabase } from '@/integrations/supabase/client';
import { UserPreferences } from './types';

// Get user preferences
export const getUserPreferences = async (userId: string): Promise<UserPreferences | undefined> => {
  try {
    // Use stored procedure to avoid TypeScript issues
    const { data, error } = await supabase.rpc('get_user_preferences', {
      p_user_id: userId
    });

    if (error) {
      console.error('Error fetching user preferences:', error);
      return undefined;
    }

    if (!data) return undefined;

    return {
      risk_appetite: data.risk_appetite || 'medium',
      preferred_executives: Array.isArray(data.preferred_executives) 
        ? data.preferred_executives.map(item => String(item)) 
        : [],
      favorite_topics: Array.isArray(data.favorite_topics) 
        ? data.favorite_topics.map(item => String(item)) 
        : [],
      communication_style: data.communication_style || 'balanced',
      activity_peak_times: Array.isArray(data.activity_peak_times) 
        ? data.activity_peak_times.map(time => Number(time)) 
        : [],
      dashboard_preferences: typeof data.dashboard_preferences === 'object' 
        ? data.dashboard_preferences as Record<string, any> 
        : {},
      last_updated: new Date(data.last_updated || new Date())
    };
  } catch (error) {
    console.error('Error in getUserPreferences:', error);
    return undefined;
  }
};

// Update user preferences
export const updateUserPreferences = async (
  userId: string, 
  preferences: Partial<UserPreferences>
): Promise<boolean> => {
  try {
    // Use stored procedure to avoid TypeScript issues
    const { error } = await supabase.rpc('update_user_preferences', {
      p_user_id: userId,
      p_risk_appetite: preferences.risk_appetite,
      p_preferred_executives: preferences.preferred_executives || [],
      p_favorite_topics: preferences.favorite_topics || [],
      p_communication_style: preferences.communication_style,
      p_activity_peak_times: preferences.activity_peak_times || [],
      p_dashboard_preferences: preferences.dashboard_preferences || {},
      p_last_updated: preferences.last_updated?.toISOString()
    });

    if (error) {
      console.error('Error updating preferences:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in updateUserPreferences:', error);
    return false;
  }
};


import { supabase } from "@/backend/supabase";
import { UserPreferences } from '../types';

/**
 * Update user preferences in the database
 */
export async function updateUserPreferences(userId: string, preferences: Partial<UserPreferences>) {
  try {
    // Format the preferences to match the database schema
    const formattedPreferences = {
      risk_appetite: preferences.risk_appetite || 'medium',
      preferred_executives: preferences.preferred_executives || [],
      favorite_topics: preferences.favorite_topics || [],
      communication_style: preferences.communication_style || 'balanced',
      activity_peak_times: preferences.activity_peak_times || [],
      dashboard_preferences: preferences.dashboard_preferences || {},
      last_updated: new Date()
    };
    
    // Update the user preferences in Supabase
    const { error } = await supabase
      .from('user_preferences')
      .upsert({
        user_id: userId,
        ...formattedPreferences
      }, {
        onConflict: 'user_id'
      });
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error updating user preferences:', error);
    return false;
  }
}

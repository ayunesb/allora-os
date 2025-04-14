import { supabase } from "@/backend/supabase";
import { toast } from "sonner";
import { UserPreferences } from '@/hooks/useUserPreferences';

/**
 * Gets the preferences for a specific user
 * @param userId The ID of the user to fetch preferences for
 * @returns The user's preferences or default preferences if none found
 */
export async function getUserPreferences(userId: string): Promise<UserPreferences> {
  try {
    // Default preferences to return if no user preferences are found
    const defaultPreferences: UserPreferences = {
      responseStyle: 'balanced',
      technicalLevel: 'intermediate',
      showSources: false,
      focusArea: 'general',
      riskAppetite: 'medium',
      preferredExecutives: [],
      favoriteTopics: [],
      modelPreference: 'auto',
      enableDebate: false,
      maxDebateParticipants: 3,
      enableVectorSearch: false,
      enableLearning: false
    };

    // Query user preferences from the database
    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      // If no preferences are found, don't treat it as an error
      if (error.code === 'PGRST116') {
        console.log(`No preferences found for user ${userId}, using defaults`);
        return defaultPreferences;
      }
      
      // Otherwise log the error
      console.error('Error fetching user preferences:', error);
      throw error;
    }

    if (!data) {
      return defaultPreferences;
    }

    // Process the data from the database and map it to our UserPreferences type
    const preferredExecs = Array.isArray(data.preferred_executives) 
      ? data.preferred_executives
      : [];
      
    const favTopics = Array.isArray(data.favorite_topics)
      ? data.favorite_topics
      : [];

    // Extract dashboard preferences (may be stored as a JSONB object)
    const dashboardPrefs = data.dashboard_preferences || {};
    
    return {
      responseStyle: (data.communication_style as 'concise' | 'balanced' | 'detailed') || defaultPreferences.responseStyle,
      technicalLevel: defaultPreferences.technicalLevel,
      showSources: defaultPreferences.showSources,
      focusArea: defaultPreferences.focusArea,
      riskAppetite: (data.risk_appetite as 'low' | 'medium' | 'high') || defaultPreferences.riskAppetite,
      preferredExecutives: preferredExecs,
      favoriteTopics: favTopics,
      modelPreference: dashboardPrefs.modelPreference || defaultPreferences.modelPreference,
      enableDebate: dashboardPrefs.enableDebate || defaultPreferences.enableDebate,
      maxDebateParticipants: dashboardPrefs.maxDebateParticipants || defaultPreferences.maxDebateParticipants,
      enableVectorSearch: dashboardPrefs.enableVectorSearch || defaultPreferences.enableVectorSearch,
      enableLearning: dashboardPrefs.enableLearning || defaultPreferences.enableLearning
    };
  } catch (error) {
    console.error('Failed to get user preferences:', error);
    toast.error('Failed to load user preferences');
    
    // Return default preferences as a fallback
    return {
      responseStyle: 'balanced',
      technicalLevel: 'intermediate',
      showSources: false,
      focusArea: 'general',
      riskAppetite: 'medium',
      preferredExecutives: [],
      favoriteTopics: [],
      modelPreference: 'auto',
      enableDebate: false,
      maxDebateParticipants: 3,
      enableVectorSearch: false,
      enableLearning: false
    };
  }
}


import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/backend/supabase';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export type AiModelType = 'gpt-4o-mini' | 'gpt-4o' | 'claude-3-sonnet-20240229' | 'claude-3-opus-20240229' | 'gemini-1.5-pro';

export interface AiModelPreferences {
  defaultModel: AiModelType;
  alternativeModels: AiModelType[];
  enableDebate: boolean;
  maxDebateParticipants: number;
  enableVectorSearch: boolean;
  enableLearning: boolean;
}

const defaultPreferences: AiModelPreferences = {
  defaultModel: 'gpt-4o-mini',
  alternativeModels: ['gpt-4o', 'claude-3-sonnet-20240229', 'gemini-1.5-pro'],
  enableDebate: true,
  maxDebateParticipants: 3,
  enableVectorSearch: true,
  enableLearning: true
};

export function useAiModelPreferences() {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<AiModelPreferences>(defaultPreferences);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user's model preferences
  const fetchPreferences = useCallback(async () => {
    if (!user?.id) return;
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" which is expected for new users
        throw error;
      }
      
      if (data && data.ai_model_preferences) {
        setPreferences(data.ai_model_preferences as AiModelPreferences);
      }
    } catch (error) {
      console.error('Error fetching AI model preferences:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Update user's model preferences
  const updatePreferences = useCallback(async (newPreferences: Partial<AiModelPreferences>) => {
    if (!user?.id) {
      toast.error('You must be logged in to save preferences');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Get current preferences first
      const { data: existingData, error: fetchError } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }
      
      const updatedPreferences = {
        ...preferences,
        ...newPreferences
      };
      
      setPreferences(updatedPreferences);
      
      let error;
      
      if (existingData) {
        // Update existing record
        const result = await supabase
          .from('user_preferences')
          .update({
            ai_model_preferences: updatedPreferences,
            last_updated: new Date().toISOString()
          })
          .eq('user_id', user.id);
        
        error = result.error;
      } else {
        // Insert new record
        const result = await supabase
          .from('user_preferences')
          .insert({
            user_id: user.id,
            ai_model_preferences: updatedPreferences,
            last_updated: new Date().toISOString()
          });
        
        error = result.error;
      }
      
      if (error) throw error;
      
      toast.success('AI model preferences updated');
    } catch (error) {
      console.error('Error updating AI model preferences:', error);
      toast.error('Failed to update preferences');
    } finally {
      setIsLoading(false);
    }
  }, [user, preferences]);

  // Load preferences on mount
  useEffect(() => {
    if (user?.id) {
      fetchPreferences();
    }
  }, [user, fetchPreferences]);

  return {
    preferences,
    updatePreferences,
    isLoading,
    resetToDefaults: () => updatePreferences(defaultPreferences)
  };
}

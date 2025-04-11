
import { useState, useEffect, useCallback } from 'react';
import { useUserPreferences } from './useUserPreferences';
import { toast } from 'sonner';

export type AiModelType = 
  | 'auto' 
  | 'gpt-4o-mini' 
  | 'gpt-4o' 
  | 'claude-3-sonnet-20240229' 
  | 'gemini-1.5-pro';

export interface AiModelPreferences {
  modelPreference: AiModelType;
  enableDebate: boolean;
  maxDebateParticipants: number;
  enableVectorSearch: boolean;
  enableLearning: boolean;
}

const defaultPreferences: AiModelPreferences = {
  modelPreference: 'auto',
  enableDebate: false,
  maxDebateParticipants: 3,
  enableVectorSearch: false,
  enableLearning: false
};

export function useAiModelPreferences() {
  const { preferences, updatePreference: updateUserPreference } = useUserPreferences();
  const [modelPreferences, setModelPreferences] = useState<AiModelPreferences>(defaultPreferences);
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize from user preferences
  useEffect(() => {
    setModelPreferences({
      modelPreference: (preferences.modelPreference as AiModelType) || defaultPreferences.modelPreference,
      enableDebate: preferences.enableDebate === undefined ? defaultPreferences.enableDebate : Boolean(preferences.enableDebate),
      maxDebateParticipants: preferences.maxDebateParticipants === undefined ? defaultPreferences.maxDebateParticipants : Number(preferences.maxDebateParticipants),
      enableVectorSearch: preferences.enableVectorSearch === undefined ? defaultPreferences.enableVectorSearch : Boolean(preferences.enableVectorSearch),
      enableLearning: preferences.enableLearning === undefined ? defaultPreferences.enableLearning : Boolean(preferences.enableLearning)
    });
  }, [preferences]);
  
  // Update specific preference with error handling
  const updateModelPreference = useCallback(async (key: keyof AiModelPreferences, value: any) => {
    try {
      setIsLoading(true);
      
      // Optimistic update - happens immediately
      setModelPreferences(prev => ({
        ...prev,
        [key]: value
      }));
      
      // Actual update - may take time
      await updateUserPreference(key as any, value);
      
      // Success - handled in the component with toast
    } catch (error) {
      console.error(`Error updating preference ${key}:`, error);
      
      // Revert optimistic update
      setModelPreferences(prev => ({
        ...prev,
        [key]: modelPreferences[key]
      }));
      
      // Show error toast
      toast.error(`Failed to update ${key}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  }, [updateUserPreference, modelPreferences]);

  // Batch update multiple preferences
  const updatePreferences = useCallback(async (updates: Partial<AiModelPreferences>) => {
    try {
      setIsLoading(true);
      
      // Optimistic update
      setModelPreferences(prev => ({
        ...prev,
        ...updates
      }));
      
      // Process actual updates one by one to ensure we don't run into validation issues
      for (const [key, value] of Object.entries(updates)) {
        await updateUserPreference(key as any, value);
      }
      
      // Success
      toast.success('Preferences updated successfully');
    } catch (error) {
      console.error('Error updating preferences:', error);
      
      // Show error toast
      toast.error('Failed to update preferences. Please try again.');
      
      // We don't revert the optimistic update here as it would be complex
      // Instead we'll let the next useEffect sync with the server state
    } finally {
      setIsLoading(false);
    }
  }, [updateUserPreference]);
  
  return {
    preferences: modelPreferences,
    updatePreference: updateModelPreference,
    updatePreferences,
    isLoading
  };
}

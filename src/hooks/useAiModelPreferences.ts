
import { useState, useEffect, useCallback } from 'react';
import { useUserPreferences } from './useUserPreferences';

export type AiModelType = 
  | 'auto' 
  | 'gpt-4o-mini' 
  | 'gpt-4o' 
  | 'claude-3-sonnet-20240229' 
  | 'gemini-1.5-pro';

interface AiModelPreferences {
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
  const { preferences, updatePreference } = useUserPreferences();
  const [modelPreferences, setModelPreferences] = useState<AiModelPreferences>(defaultPreferences);
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize from user preferences
  useEffect(() => {
    setModelPreferences({
      modelPreference: (preferences.modelPreference as AiModelType) || defaultPreferences.modelPreference,
      enableDebate: Boolean(preferences.enableDebate) || defaultPreferences.enableDebate,
      maxDebateParticipants: Number(preferences.maxDebateParticipants) || defaultPreferences.maxDebateParticipants,
      enableVectorSearch: Boolean(preferences.enableVectorSearch) || defaultPreferences.enableVectorSearch,
      enableLearning: Boolean(preferences.enableLearning) || defaultPreferences.enableLearning
    });
  }, [preferences]);
  
  // Update specific preference
  const updateModelPreference = useCallback((key: keyof AiModelPreferences, value: any) => {
    setIsLoading(true);
    updatePreference(key as any, value);
    setIsLoading(false);
  }, [updatePreference]);

  // Backwards compatibility for components expecting updatePreferences
  const updatePreferences = useCallback((updates: Partial<AiModelPreferences>) => {
    setIsLoading(true);
    
    Object.entries(updates).forEach(([key, value]) => {
      updatePreference(key as any, value);
    });
    
    setIsLoading(false);
  }, [updatePreference]);
  
  return {
    preferences: modelPreferences,
    updatePreference: updateModelPreference,
    updatePreferences,
    isLoading
  };
}

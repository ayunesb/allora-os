
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
  
  // Initialize from user preferences
  useEffect(() => {
    setModelPreferences({
      modelPreference: preferences.modelPreference || defaultPreferences.modelPreference,
      enableDebate: preferences.enableDebate || defaultPreferences.enableDebate,
      maxDebateParticipants: preferences.maxDebateParticipants || defaultPreferences.maxDebateParticipants,
      enableVectorSearch: preferences.enableVectorSearch || defaultPreferences.enableVectorSearch,
      enableLearning: preferences.enableLearning || defaultPreferences.enableLearning
    });
  }, [preferences]);
  
  // Update specific preference
  const updateModelPreference = useCallback((key: keyof AiModelPreferences, value: any) => {
    updatePreference(key, value);
  }, [updatePreference]);
  
  return {
    preferences: modelPreferences,
    updatePreference: updateModelPreference
  };
}


import { useState, useCallback, useEffect } from 'react';

export type ResponseStyle = 'concise' | 'detailed' | 'balanced';
export type TechnicalLevel = 'basic' | 'intermediate' | 'advanced';

export interface UserPreferences {
  responseStyle: ResponseStyle;
  technicalLevel: TechnicalLevel;
  showSources: boolean;
  focusArea: string;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  responseStyle: 'balanced',
  technicalLevel: 'intermediate',
  showSources: false,
  focusArea: 'general',
};

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);

  // Load preferences from localStorage on component mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      try {
        setPreferences(JSON.parse(savedPreferences));
      } catch (error) {
        console.error('Failed to parse saved preferences:', error);
      }
    }
  }, []);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
  }, [preferences]);

  const updatePreferences = useCallback((newPreferences: Partial<UserPreferences>) => {
    setPreferences(prev => ({
      ...prev,
      ...newPreferences
    }));
  }, []);

  return {
    preferences,
    updatePreferences,
  };
}

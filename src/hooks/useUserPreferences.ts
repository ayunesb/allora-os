
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuthState } from './useAuthState';
import { AIModelType } from '@/utils/consultation/types';

export type UserPreferences = {
  responseStyle: 'concise' | 'balanced' | 'detailed';
  technicalLevel: 'basic' | 'intermediate' | 'advanced';
  showSources: boolean;
  focusArea: 'general' | 'strategy' | 'marketing' | 'operations' | 'technology' | 'finance';
  riskAppetite: 'low' | 'medium' | 'high';
  preferredExecutives: string[];
  favoriteTopics: string[];
  modelPreference: AIModelType;
};

const defaultPreferences: UserPreferences = {
  responseStyle: 'balanced',
  technicalLevel: 'intermediate',
  showSources: false,
  focusArea: 'general',
  riskAppetite: 'medium',
  preferredExecutives: [],
  favoriteTopics: [],
  modelPreference: 'auto'
};

export function useUserPreferences() {
  const { user } = useAuthState();
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [isLoading, setIsLoading] = useState(false);

  // Load user preferences from database or localStorage
  useEffect(() => {
    const loadPreferences = async () => {
      setIsLoading(true);
      
      try {
        if (user?.id) {
          // Try to load from Supabase if user is authenticated
          const { data, error } = await supabase
            .from('user_preferences')
            .select('*')
            .eq('user_id', user.id)
            .single();
          
          if (error) {
            throw error;
          }
          
          if (data) {
            // Convert database fields to our UserPreferences type
            setPreferences({
              responseStyle: (data.communication_style as 'concise' | 'balanced' | 'detailed') || defaultPreferences.responseStyle,
              technicalLevel: (data.technical_level as 'basic' | 'intermediate' | 'advanced') || defaultPreferences.technicalLevel,
              showSources: data.show_sources || defaultPreferences.showSources,
              focusArea: (data.focus_area as 'general' | 'strategy' | 'marketing' | 'operations' | 'technology' | 'finance') || defaultPreferences.focusArea,
              riskAppetite: (data.risk_appetite as 'low' | 'medium' | 'high') || defaultPreferences.riskAppetite,
              preferredExecutives: Array.isArray(data.preferred_executives) ? data.preferred_executives : defaultPreferences.preferredExecutives,
              favoriteTopics: Array.isArray(data.favorite_topics) ? data.favorite_topics : defaultPreferences.favoriteTopics,
              modelPreference: (data.model_preference as AIModelType) || defaultPreferences.modelPreference
            });
            return;
          }
        }
        
        // Fall back to localStorage if no Supabase data
        const savedPreferences = localStorage.getItem('userPreferences');
        if (savedPreferences) {
          setPreferences(JSON.parse(savedPreferences));
        }
      } catch (error) {
        console.error('Error loading preferences:', error);
        // Fall back to localStorage on error
        const savedPreferences = localStorage.getItem('userPreferences');
        if (savedPreferences) {
          setPreferences(JSON.parse(savedPreferences));
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPreferences();
  }, [user?.id]);

  // Save preferences to database or localStorage
  const savePreferences = async (newPreferences: UserPreferences) => {
    setIsLoading(true);
    
    try {
      setPreferences(newPreferences);
      
      // Always save to localStorage as backup
      localStorage.setItem('userPreferences', JSON.stringify(newPreferences));
      
      if (user?.id) {
        // Also save to Supabase if user is authenticated
        const { error } = await supabase
          .from('user_preferences')
          .upsert({
            user_id: user.id,
            communication_style: newPreferences.responseStyle,
            technical_level: newPreferences.technicalLevel,
            show_sources: newPreferences.showSources,
            focus_area: newPreferences.focusArea,
            risk_appetite: newPreferences.riskAppetite,
            preferred_executives: newPreferences.preferredExecutives,
            favorite_topics: newPreferences.favoriteTopics,
            model_preference: newPreferences.modelPreference,
            last_updated: new Date().toISOString()
          }, {
            onConflict: 'user_id'
          });
        
        if (error) {
          throw error;
        }
      }
      
      toast.success('Preferences saved successfully');
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast.error('Failed to save preferences');
    } finally {
      setIsLoading(false);
    }
  };

  // Update a single preference
  const updatePreference = (key: keyof UserPreferences, value: any) => {
    const newPreferences = { ...preferences, [key]: value };
    savePreferences(newPreferences);
  };

  // Reset preferences to defaults
  const resetPreferences = () => {
    savePreferences(defaultPreferences);
  };

  return {
    preferences,
    isLoading,
    savePreferences,
    updatePreference,
    resetPreferences
  };
}

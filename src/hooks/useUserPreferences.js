import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuthState } from './useAuthState';
const defaultPreferences = {
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
    enableLearning: false,
    // Add default values for new fields
    writingStyle: 'Formal',
    tone: 'Confident'
};
export function useUserPreferences() {
    const { user } = useAuthState();
    const [preferences, setPreferences] = useState(defaultPreferences);
    const [isLoading, setIsLoading] = useState(false);
    const [lastSyncTime, setLastSyncTime] = useState(null);
    useEffect(() => {
        const loadPreferences = async () => {
            setIsLoading(true);
            try {
                if (user?.id) {
                    const { data, error } = await supabase
                        .from('user_preferences')
                        .select('*')
                        .eq('user_id', user.id)
                        .single();
                    if (error) {
                        throw error;
                    }
                    if (data) {
                        const preferredExecs = Array.isArray(data.preferred_executives)
                            ? data.preferred_executives.map((item) => String(item))
                            : [];
                        const favTopics = Array.isArray(data.favorite_topics)
                            ? data.favorite_topics.map((item) => String(item))
                            : [];
                        setPreferences({
                            responseStyle: data.communication_style || defaultPreferences.responseStyle,
                            technicalLevel: defaultPreferences.technicalLevel,
                            showSources: defaultPreferences.showSources,
                            focusArea: defaultPreferences.focusArea,
                            riskAppetite: data.risk_appetite || defaultPreferences.riskAppetite,
                            preferredExecutives: preferredExecs,
                            favoriteTopics: favTopics,
                            modelPreference: defaultPreferences.modelPreference,
                            enableDebate: defaultPreferences.enableDebate,
                            maxDebateParticipants: defaultPreferences.maxDebateParticipants,
                            enableVectorSearch: defaultPreferences.enableVectorSearch,
                            enableLearning: defaultPreferences.enableLearning
                        });
                        setLastSyncTime(new Date());
                        return;
                    }
                }
                const savedPreferences = localStorage.getItem('userPreferences');
                if (savedPreferences) {
                    setPreferences(JSON.parse(savedPreferences));
                    setLastSyncTime(new Date());
                }
            }
            catch (error) {
                console.error('Error loading preferences:', error);
                const savedPreferences = localStorage.getItem('userPreferences');
                if (savedPreferences) {
                    setPreferences(JSON.parse(savedPreferences));
                }
            }
            finally {
                setIsLoading(false);
            }
        };
        loadPreferences();
    }, [user?.id]);
    const savePreferences = async (newPreferences) => {
        setIsLoading(true);
        try {
            setPreferences(newPreferences);
            localStorage.setItem('userPreferences', JSON.stringify(newPreferences));
            if (user?.id) {
                const { error } = await supabase
                    .from('user_preferences')
                    .upsert({
                    user_id: user.id,
                    communication_style: newPreferences.responseStyle,
                    risk_appetite: newPreferences.riskAppetite,
                    preferred_executives: newPreferences.preferredExecutives,
                    favorite_topics: newPreferences.favoriteTopics,
                    dashboard_preferences: {
                        modelPreference: newPreferences.modelPreference,
                        enableDebate: newPreferences.enableDebate,
                        maxDebateParticipants: newPreferences.maxDebateParticipants,
                        enableVectorSearch: newPreferences.enableVectorSearch,
                        enableLearning: newPreferences.enableLearning,
                        // Add new fields to dashboard preferences
                        writingStyle: newPreferences.writingStyle,
                        tone: newPreferences.tone
                    },
                    last_updated: new Date().toISOString()
                }, {
                    onConflict: 'user_id'
                });
                if (error) {
                    throw error;
                }
            }
            setLastSyncTime(new Date());
            toast.success('Preferences saved successfully');
        }
        catch (error) {
            console.error('Error saving preferences:', error);
            toast.error('Failed to save preferences');
        }
        finally {
            setIsLoading(false);
        }
    };
    const updatePreference = useCallback(async (key, value) => {
        try {
            const newPreferences = { ...preferences, [key]: value };
            await savePreferences(newPreferences);
        }
        catch (error) {
            console.error(`Error updating preference ${key}:`, error);
            toast.error(`Failed to update ${key}`);
        }
    }, [preferences, savePreferences]);
    const resetPreferences = useCallback(async () => {
        try {
            await savePreferences(defaultPreferences);
            toast.success('Preferences reset to defaults');
        }
        catch (error) {
            console.error('Error resetting preferences:', error);
            toast.error('Failed to reset preferences');
        }
    }, [savePreferences]);
    return {
        preferences,
        isLoading,
        savePreferences,
        updatePreference,
        resetPreferences,
        lastSyncTime
    };
}

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
const defaultPreferences = {
    modelPreference: 'gpt-4o-mini',
    enableMemory: true,
    enableLearning: true,
    enableVectorSearch: false,
    maxMemoryItems: 5,
    lastUpdated: new Date().toISOString(),
    // Add default values for new properties
    enableDebate: false,
    maxDebateParticipants: 3
};
export function useAiModelPreferences() {
    const { user } = useAuth();
    const [preferences, setPreferences] = useState(defaultPreferences);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    // Fetch user AI model preferences
    useEffect(() => {
        const fetchPreferences = async () => {
            if (!user?.id)
                return;
            setIsLoading(true);
            try {
                const { data, error } = await supabase
                    .from('user_ai_preferences')
                    .select('*')
                    .eq('user_id', user.id)
                    .single();
                if (error) {
                    if (error.code === 'PGRST116') { // Not found
                        // Create default preferences
                        await savePreferences(defaultPreferences);
                    }
                    else {
                        throw error;
                    }
                }
                else if (data) {
                    setPreferences(data.preferences);
                }
            }
            catch (error) {
                console.error('Error fetching AI model preferences:', error);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchPreferences();
    }, [user?.id]);
    // Save user AI model preferences
    const savePreferences = useCallback(async (newPreferences) => {
        if (!user?.id)
            return false;
        setIsSaving(true);
        try {
            const updatedPreferences = {
                ...newPreferences,
                lastUpdated: new Date().toISOString()
            };
            const { error } = await supabase
                .from('user_ai_preferences')
                .upsert({
                user_id: user.id,
                preferences: updatedPreferences
            }, {
                onConflict: 'user_id'
            });
            if (error)
                throw error;
            setPreferences(updatedPreferences);
            toast.success('AI preferences saved');
            return true;
        }
        catch (error) {
            console.error('Error saving AI model preferences:', error);
            toast.error('Failed to save AI preferences');
            return false;
        }
        finally {
            setIsSaving(false);
        }
    }, [user?.id]);
    // Update a specific preference
    const updatePreference = useCallback((key, value) => {
        const newPreferences = {
            ...preferences,
            [key]: value,
            lastUpdated: new Date().toISOString()
        };
        setPreferences(newPreferences);
        return savePreferences(newPreferences);
    }, [preferences, savePreferences]);
    // Update multiple preferences at once
    const updatePreferences = useCallback((updates) => {
        const newPreferences = {
            ...preferences,
            ...updates,
            lastUpdated: new Date().toISOString()
        };
        setPreferences(newPreferences);
        return savePreferences(newPreferences);
    }, [preferences, savePreferences]);
    return {
        preferences,
        setPreferences,
        savePreferences,
        updatePreference,
        updatePreferences,
        isLoading,
        isSaving
    };
}

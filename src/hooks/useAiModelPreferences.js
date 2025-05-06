var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
const defaultPreferences = {
    modelPreference: "gpt-4o-mini",
    enableMemory: true,
    enableLearning: true,
    enableVectorSearch: false,
    maxMemoryItems: 5,
    lastUpdated: new Date().toISOString(),
    // Add default values for new properties
    enableDebate: false,
    maxDebateParticipants: 3,
};
export function useAiModelPreferences() {
    const { user } = useAuth();
    const [preferences, setPreferences] = useState(defaultPreferences);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    // Fetch user AI model preferences
    useEffect(() => {
        const fetchPreferences = () => __awaiter(this, void 0, void 0, function* () {
            if (!(user === null || user === void 0 ? void 0 : user.id))
                return;
            setIsLoading(true);
            try {
                const { data, error } = yield supabase
                    .from("user_ai_preferences")
                    .select("*")
                    .eq("user_id", user.id)
                    .single();
                if (error) {
                    if (error.code === "PGRST116") {
                        // Not found
                        // Create default preferences
                        yield savePreferences(defaultPreferences);
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
                console.error("Error fetching AI model preferences:", error);
            }
            finally {
                setIsLoading(false);
            }
        });
        fetchPreferences();
    }, [user === null || user === void 0 ? void 0 : user.id]);
    // Save user AI model preferences
    const savePreferences = useCallback((newPreferences) => __awaiter(this, void 0, void 0, function* () {
        if (!(user === null || user === void 0 ? void 0 : user.id))
            return false;
        setIsSaving(true);
        try {
            const updatedPreferences = Object.assign(Object.assign({}, newPreferences), { lastUpdated: new Date().toISOString() });
            const { error } = yield supabase.from("user_ai_preferences").upsert({
                user_id: user.id,
                preferences: updatedPreferences,
            }, {
                onConflict: "user_id",
            });
            if (error)
                throw error;
            setPreferences(updatedPreferences);
            toast.success("AI preferences saved");
            return true;
        }
        catch (error) {
            console.error("Error saving AI model preferences:", error);
            toast.error("Failed to save AI preferences");
            return false;
        }
        finally {
            setIsSaving(false);
        }
    }), [user === null || user === void 0 ? void 0 : user.id]);
    // Update a specific preference
    const updatePreference = useCallback((key, value) => {
        const newPreferences = Object.assign(Object.assign({}, preferences), { [key]: value, lastUpdated: new Date().toISOString() });
        setPreferences(newPreferences);
        return savePreferences(newPreferences);
    }, [preferences, savePreferences]);
    // Update multiple preferences at once
    const updatePreferences = useCallback((updates) => {
        const newPreferences = Object.assign(Object.assign(Object.assign({}, preferences), updates), { lastUpdated: new Date().toISOString() });
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
        isSaving,
    };
}

import { supabase } from '@/backend/supabase';
export const saveSecuritySettings = async ({ settings }) => {
    try {
        const { data, error } = await supabase.rpc('update_security_settings', {
            p_settings: settings
        });
        if (error)
            throw error;
        return data;
    }
    catch (error) {
        console.error("Error saving security settings:", error.message);
        throw new Error(error.message || "Failed to save security settings");
    }
};
export const fetchSecuritySettings = async () => {
    try {
        const { data, error } = await supabase.rpc('get_security_settings');
        if (error)
            throw error;
        return data || {
            twoFactorEnabled: false,
            extendedSessionTimeout: false,
            strictContentSecurity: false,
            enhancedApiProtection: false
        };
    }
    catch (error) {
        console.error("Error fetching security settings:", error.message);
        throw new Error("Failed to load security settings");
    }
};

import { supabase } from '@/integrations/supabase/client';
/**
 * Custom hook for persisting webhook settings to Supabase
 */
export function useWebhookStorage() {
    /**
     * Save webhook settings to database
     */
    const saveWebhookSettings = async (settings) => {
        try {
            const { error } = await supabase
                .from('system_settings')
                .upsert({
                key: 'webhook_settings',
                value: settings,
                updated_at: new Date().toISOString()
            }, { onConflict: 'key' });
            if (error) {
                console.error('Error saving webhook settings:', error);
                return false;
            }
            return true;
        }
        catch (error) {
            console.error('Exception saving webhook settings:', error);
            return false;
        }
    };
    /**
     * Load webhook settings from database
     */
    const loadWebhookSettings = async () => {
        try {
            const { data, error } = await supabase
                .from('system_settings')
                .select('value')
                .eq('key', 'webhook_settings')
                .single();
            if (error) {
                if (error.code !== 'PGRST116') { // Not found error code
                    console.error('Error loading webhook settings:', error);
                }
                return null;
            }
            return data?.value || null;
        }
        catch (error) {
            console.error('Exception loading webhook settings:', error);
            return null;
        }
    };
    return {
        saveWebhookSettings,
        loadWebhookSettings
    };
}


import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface WebhookSettings {
  stripe: string;
  zapier: string;
  github: string;
  slack: string;
  custom: string;
}

/**
 * Custom hook for persisting webhook settings to Supabase
 */
export function useWebhookStorage() {
  /**
   * Save webhook settings to database
   */
  const saveWebhookSettings = async (settings: WebhookSettings): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('system_settings')
        .upsert(
          { 
            key: 'webhook_settings', 
            value: settings,
            updated_at: new Date().toISOString()
          },
          { onConflict: 'key' }
        );
      
      if (error) {
        console.error('Error saving webhook settings:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Exception saving webhook settings:', error);
      return false;
    }
  };
  
  /**
   * Load webhook settings from database
   */
  const loadWebhookSettings = async (): Promise<WebhookSettings | null> => {
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
      
      return data?.value as WebhookSettings || null;
    } catch (error) {
      console.error('Exception loading webhook settings:', error);
      return null;
    }
  };
  
  return {
    saveWebhookSettings,
    loadWebhookSettings
  };
}

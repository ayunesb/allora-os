
import { supabase } from '@/backend/supabase';
import { SaveSecuritySettingsParams, SecuritySettingsType } from './types';

export const saveSecuritySettings = async ({ settings }: SaveSecuritySettingsParams): Promise<boolean> => {
  try {
    const { data, error } = await supabase.rpc('update_security_settings', {
      p_settings: settings
    });
    
    if (error) throw error;
    
    return data;
  } catch (error: any) {
    console.error("Error saving security settings:", error.message);
    throw new Error(error.message || "Failed to save security settings");
  }
};

export const fetchSecuritySettings = async (): Promise<SecuritySettingsType> => {
  try {
    const { data, error } = await supabase.rpc('get_security_settings');
    
    if (error) throw error;
    
    return data || {
      twoFactorEnabled: false,
      extendedSessionTimeout: false,
      strictContentSecurity: false,
      enhancedApiProtection: false
    };
  } catch (error: any) {
    console.error("Error fetching security settings:", error.message);
    throw new Error("Failed to load security settings");
  }
};

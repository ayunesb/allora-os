
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface AdPlatformConnection {
  id: string;
  platform: 'meta' | 'tiktok';
  ad_account_id: string;
  access_token: string;
  token_expires_at: string;
  is_active: boolean;
  created_at: string;
}

/**
 * Initiate Meta auth flow
 */
export async function initiateMetaAuth() {
  try {
    const { data, error } = await supabase.functions.invoke('meta-auth', {
      body: { action: 'authorize' }
    });

    if (error) throw error;
    
    if (data.url) {
      window.location.href = data.url;
      return { success: true };
    } else {
      throw new Error('Failed to get authorization URL');
    }
  } catch (error: any) {
    toast.error(`Meta authorization failed: ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * Initiate TikTok auth flow
 */
export async function initiateTikTokAuth() {
  try {
    const { data, error } = await supabase.functions.invoke('tiktok-auth', {
      body: { action: 'authorize' }
    });

    if (error) throw error;
    
    if (data.url) {
      window.location.href = data.url;
      return { success: true };
    } else {
      throw new Error('Failed to get authorization URL');
    }
  } catch (error: any) {
    toast.error(`TikTok authorization failed: ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * Get all ad platform connections for the company
 */
export async function getAdPlatformConnections(): Promise<AdPlatformConnection[]> {
  try {
    const { data, error } = await supabase
      .from('ad_platform_connections')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return data || [];
  } catch (error: any) {
    console.error('Error fetching ad platform connections:', error);
    return [];
  }
}

/**
 * Disconnect an ad platform
 */
export async function disconnectAdPlatform(platform: 'meta' | 'tiktok') {
  try {
    const endpoint = platform === 'meta' ? 'meta-auth' : 'tiktok-auth';
    
    const { data, error } = await supabase.functions.invoke(endpoint, {
      body: { action: 'revoke' }
    });

    if (error) throw error;
    
    if (data.success) {
      toast.success(`${platform === 'meta' ? 'Meta' : 'TikTok'} account disconnected successfully`);
      return { success: true };
    } else {
      throw new Error(data.error || 'Failed to disconnect account');
    }
  } catch (error: any) {
    toast.error(`Failed to disconnect account: ${error.message}`);
    return { success: false, error: error.message };
  }
}

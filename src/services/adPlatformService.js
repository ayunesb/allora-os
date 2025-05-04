import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { handleApiError } from '@/utils/api/errorHandling';
/**
 * Initiate Meta auth flow
 */
export async function initiateMetaAuth() {
    try {
        const { data, error } = await supabase.functions.invoke('meta-auth', {
            body: { action: 'authorize' }
        });
        if (error)
            throw error;
        if (data.url) {
            window.location.href = data.url;
            return { success: true };
        }
        else {
            throw new Error('Failed to get authorization URL');
        }
    }
    catch (error) {
        handleApiError(error, {
            customMessage: 'Meta authorization failed',
            showToast: true
        });
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
        if (error) {
            throw error;
        }
        if (data?.url) {
            window.location.href = data.url;
            return { success: true };
        }
        else {
            console.error('TikTok auth response:', data);
            throw new Error('Failed to get TikTok authorization URL');
        }
    }
    catch (error) {
        console.error('TikTok auth error:', error);
        toast.error(`TikTok authorization failed: ${error.message || 'Unknown error'}`);
        return { success: false, error: error.message };
    }
}
/**
 * Get all ad platform connections for the company
 */
export async function getAdPlatformConnections() {
    try {
        const { data, error } = await supabase
            .from('ad_platform_connections')
            .select('*')
            .eq('is_active', true)
            .order('created_at', { ascending: false });
        if (error)
            throw error;
        return data || [];
    }
    catch (error) {
        console.error('Error fetching ad platform connections:', error);
        return [];
    }
}
/**
 * Disconnect an ad platform
 */
export async function disconnectAdPlatform(platform) {
    try {
        const endpoint = platform === 'meta' ? 'meta-auth' : 'tiktok-auth';
        const { data, error } = await supabase.functions.invoke(endpoint, {
            body: { action: 'revoke' }
        });
        if (error)
            throw error;
        if (data.success) {
            toast.success(`${platform === 'meta' ? 'Meta' : 'TikTok'} account disconnected successfully`);
            return { success: true };
        }
        else {
            throw new Error(data.error || 'Failed to disconnect account');
        }
    }
    catch (error) {
        handleApiError(error, {
            customMessage: `Failed to disconnect ${platform} account`,
            showToast: true
        });
        return { success: false, error: error.message };
    }
}

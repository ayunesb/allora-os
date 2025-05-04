import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
/**
 * Create a new ad campaign
 */
export async function createCampaign(campaignData) {
    try {
        // Insert campaign into database
        const { data, error } = await supabase
            .from('campaigns')
            .insert({
            name: campaignData.name,
            platform: campaignData.platform,
            budget: campaignData.budget,
            company_id: campaignData.company_id,
            ad_platform: campaignData.platform,
            targeting: campaignData.targeting,
            creatives: campaignData.creatives,
            payment_status: 'pending',
            deployment_status: 'pending'
        })
            .select('id')
            .single();
        if (error)
            throw error;
        if (data) {
            return { success: true, campaignId: data.id };
        }
        else {
            throw new Error('Failed to create campaign');
        }
    }
    catch (error) {
        toast.error(`Failed to create campaign: ${error.message}`);
        return { success: false, error: error.message };
    }
}
/**
 * Creates a checkout session for campaign payment
 */
export async function createCampaignCheckout(campaignId, cancelUrl) {
    try {
        const { data, error } = await supabase.functions.invoke('campaign-payment', {
            body: {
                action: 'create-checkout-session',
                campaignId,
                cancelUrl
            }
        });
        if (error)
            throw error;
        if (data.url) {
            return { success: true, url: data.url };
        }
        else {
            throw new Error('Failed to create checkout session');
        }
    }
    catch (error) {
        toast.error(`Payment creation failed: ${error.message}`);
        return { success: false, error: error.message };
    }
}
/**
 * Check the payment status of a campaign
 */
export async function checkCampaignPaymentStatus(campaignId) {
    try {
        const { data, error } = await supabase.functions.invoke('campaign-payment', {
            body: {
                action: 'check-payment-status',
                campaignId
            }
        });
        if (error)
            throw error;
        return { success: true, status: data.status };
    }
    catch (error) {
        console.error(`Payment status check failed: ${error.message}`);
        return { success: false, error: error.message };
    }
}
/**
 * Deploy campaign to ad platform
 */
export async function deployCampaign(campaignId) {
    try {
        const { data, error } = await supabase.functions.invoke('campaign-deployment', {
            body: {
                action: 'deploy',
                campaignId
            }
        });
        if (error)
            throw error;
        if (data.success) {
            toast.success('Campaign deployed successfully');
            return { success: true };
        }
        else {
            throw new Error(data.error || 'Failed to deploy campaign');
        }
    }
    catch (error) {
        toast.error(`Campaign deployment failed: ${error.message}`);
        return { success: false, error: error.message };
    }
}
/**
 * Sync campaign data from ad platform
 */
export async function syncCampaignData(campaignId) {
    try {
        const { data, error } = await supabase.functions.invoke('campaign-deployment', {
            body: {
                action: 'sync',
                campaignId
            }
        });
        if (error)
            throw error;
        if (data.success) {
            return { success: true, metrics: data.metrics };
        }
        else {
            throw new Error(data.error || 'Failed to sync campaign data');
        }
    }
    catch (error) {
        console.error(`Campaign sync failed: ${error.message}`);
        return { success: false, error: error.message };
    }
}
// Get campaign by ID
export async function getCampaign(campaignId) {
    try {
        const { data, error } = await supabase
            .from('campaigns')
            .select('*')
            .eq('id', campaignId)
            .single();
        if (error)
            throw error;
        return data;
    }
    catch (error) {
        console.error(`Error fetching campaign: ${error.message}`);
        return null;
    }
}

import { supabase } from '@/backend/supabase';
import { toast } from 'sonner';
export async function fetchCompanyCampaigns(companyId) {
    try {
        const { data, error } = await supabase
            .from('campaigns')
            .select('*')
            .eq('company_id', companyId)
            .order('created_at', { ascending: false });
        if (error) {
            throw error;
        }
        // Cast the data to ensure it matches the Campaign type
        return (data || []).map(campaign => ({
            ...campaign,
            platform: campaign.platform
        }));
    }
    catch (error) {
        console.error('Error fetching campaigns:', error.message);
        return [];
    }
}
export async function fetchCampaign(campaignId) {
    try {
        const { data, error } = await supabase
            .from('campaigns')
            .select('*')
            .eq('id', campaignId)
            .single();
        if (error) {
            throw error;
        }
        // Cast the data to ensure it matches the Campaign type
        return data ? {
            ...data,
            platform: data.platform
        } : null;
    }
    catch (error) {
        console.error('Error fetching campaign:', error.message);
        return null;
    }
}
export async function createCampaign(companyId, name, platform, budget) {
    try {
        const { data, error } = await supabase
            .from('campaigns')
            .insert([
            {
                company_id: companyId,
                name,
                platform,
                budget
            }
        ])
            .select()
            .single();
        if (error) {
            throw error;
        }
        toast.success('Campaign created successfully');
        // Cast the data to ensure it matches the Campaign type
        return data ? {
            ...data,
            platform: data.platform
        } : null;
    }
    catch (error) {
        toast.error(`Failed to create campaign: ${error.message}`);
        return null;
    }
}
export async function updateCampaign(campaignId, updates) {
    try {
        const { error } = await supabase
            .from('campaigns')
            .update(updates)
            .eq('id', campaignId);
        if (error) {
            throw error;
        }
        toast.success('Campaign updated successfully');
        return true;
    }
    catch (error) {
        toast.error(`Failed to update campaign: ${error.message}`);
        return false;
    }
}
export async function deleteCampaign(campaignId) {
    try {
        const { error } = await supabase
            .from('campaigns')
            .delete()
            .eq('id', campaignId);
        if (error) {
            throw error;
        }
        toast.success('Campaign deleted successfully');
        return true;
    }
    catch (error) {
        toast.error(`Failed to delete campaign: ${error.message}`);
        return false;
    }
}

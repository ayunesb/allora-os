
import { supabase } from '@/backend/supabase';
import { toast } from 'sonner';
import { Campaign } from '@/models/campaign';

export async function fetchCompanyCampaigns(companyId: string): Promise<Campaign[]> {
  try {
    const { data, error } = await (supabase
      .from('campaigns') as any)
      .select('*')
      .eq('company_id', companyId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error: any) {
    console.error('Error fetching campaigns:', error.message);
    return [];
  }
}

export async function fetchCampaign(campaignId: string): Promise<Campaign | null> {
  try {
    const { data, error } = await (supabase
      .from('campaigns') as any)
      .select('*')
      .eq('id', campaignId)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error: any) {
    console.error('Error fetching campaign:', error.message);
    return null;
  }
}

export async function createCampaign(
  companyId: string,
  name: string,
  platform: 'Google' | 'Facebook' | 'Instagram' | 'LinkedIn' | 'TikTok',
  budget: number
): Promise<Campaign | null> {
  try {
    const { data, error } = await (supabase
      .from('campaigns') as any)
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
    return data;
  } catch (error: any) {
    toast.error(`Failed to create campaign: ${error.message}`);
    return null;
  }
}

export async function updateCampaign(
  campaignId: string,
  updates: Partial<Omit<Campaign, 'id' | 'created_at' | 'companyId'>>
): Promise<boolean> {
  try {
    const { error } = await (supabase
      .from('campaigns') as any)
      .update(updates)
      .eq('id', campaignId);

    if (error) {
      throw error;
    }

    toast.success('Campaign updated successfully');
    return true;
  } catch (error: any) {
    toast.error(`Failed to update campaign: ${error.message}`);
    return false;
  }
}

export async function deleteCampaign(campaignId: string): Promise<boolean> {
  try {
    const { error } = await (supabase
      .from('campaigns') as any)
      .delete()
      .eq('id', campaignId);

    if (error) {
      throw error;
    }

    toast.success('Campaign deleted successfully');
    return true;
  } catch (error: any) {
    toast.error(`Failed to delete campaign: ${error.message}`);
    return false;
  }
}

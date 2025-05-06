import { supabase } from "@/backend/supabase";
import { toast } from "sonner";
import { Campaign } from "@/types/fixed/Campaign";
import { Platform, ExecutiveBot } from "@/models/campaign";

export async function fetchCompanyCampaigns(
  companyId: string,
): Promise<Campaign[]> {
  try {
    const { data, error } = await supabase
      .from("campaigns")
      .select("*")
      .eq("company_id", companyId)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    // Cast the data to ensure it matches the Campaign type
    return (data || []).map((campaign) => ({
      ...campaign,
      platform: campaign.platform as Platform,
    }));
  } catch (error: any) {
    console.error("Error fetching campaigns:", error.message);
    return [];
  }
}

export async function fetchCampaign(
  campaignId: string,
): Promise<Campaign | null> {
  try {
    const { data, error } = await supabase
      .from("campaigns")
      .select("*")
      .eq("id", campaignId)
      .single();

    if (error) {
      throw error;
    }

    // Cast the data to ensure it matches the Campaign type
    return data
      ? {
          ...data,
          platform: data.platform as Platform,
        }
      : null;
  } catch (error: any) {
    console.error("Error fetching campaign:", error.message);
    return null;
  }
}

export async function createCampaign(
  companyId: string,
  name: string,
  platform: Platform,
  budget: number,
): Promise<Campaign | null> {
  try {
    const { data, error } = await supabase
      .from("campaigns")
      .insert([
        {
          company_id: companyId,
          name,
          platform,
          budget,
        },
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    toast.success("Campaign created successfully");
    // Cast the data to ensure it matches the Campaign type
    return data
      ? {
          ...data,
          platform: data.platform as Platform,
        }
      : null;
  } catch (error: any) {
    toast.error(`Failed to create campaign: ${error.message}`);
    return null;
  }
}

export async function updateCampaign(
  campaignId: string,
  updates: Partial<Omit<Campaign, "id" | "created_at" | "company_id">>,
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("campaigns")
      .update(updates)
      .eq("id", campaignId);

    if (error) {
      throw error;
    }

    toast.success("Campaign updated successfully");
    return true;
  } catch (error: any) {
    toast.error(`Failed to update campaign: ${error.message}`);
    return false;
  }
}

export async function deleteCampaign(campaignId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("campaigns")
      .delete()
      .eq("id", campaignId);

    if (error) {
      throw error;
    }

    toast.success("Campaign deleted successfully");
    return true;
  } catch (error: any) {
    toast.error(`Failed to delete campaign: ${error.message}`);
    return false;
  }
}

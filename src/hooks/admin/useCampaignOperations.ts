
import { useState, useEffect } from 'react';
import { Campaign } from "@/models/campaign";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface CampaignFormData {
  name: string;
  platform: string;
  budget: number;
  company_id: string;
}

export const useCampaignOperations = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [companies, setCompanies] = useState<{id: string, name: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [newCampaign, setNewCampaign] = useState<CampaignFormData>({
    name: '',
    platform: 'Email',
    budget: 0,
    company_id: ''
  });

  // Load initial data
  useEffect(() => {
    loadCampaigns();
    loadCompanies();
  }, []);

  // Load campaigns
  const loadCampaigns = async () => {
    setIsLoading(true);
    try {
      // Get all campaigns with company information
      const { data, error } = await supabase
        .from('campaigns')
        .select(`
          *,
          companies(name)
        `)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      // Type-cast the data to our Campaign model
      const typedCampaigns: Campaign[] = (data || []).map(campaign => ({
        id: campaign.id,
        company_id: campaign.company_id,
        name: campaign.name,
        platform: campaign.platform || '',
        budget: campaign.budget || 0,
        created_at: campaign.created_at,
        companies: campaign.companies
      }));
      
      setCampaigns(typedCampaigns);
    } catch (error: any) {
      console.error('Error loading campaigns:', error);
      toast.error('Failed to load campaigns: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Load companies
  const loadCompanies = async () => {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('id, name')
        .order('name');
        
      if (error) throw error;
      
      setCompanies(data || []);
    } catch (error: any) {
      console.error('Error loading companies:', error);
    }
  };

  // Update form data
  const updateFormData = (data: Partial<CampaignFormData>) => {
    setNewCampaign(prev => ({ ...prev, ...data }));
  };

  // Create campaign
  const createCampaign = async () => {
    if (!newCampaign.name || !newCampaign.company_id) {
      toast.error('Name and company are required');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .insert([
          {
            name: newCampaign.name,
            platform: newCampaign.platform,
            budget: newCampaign.budget,
            company_id: newCampaign.company_id
          }
        ])
        .select()
        .single();
        
      if (error) throw error;
      
      // Get the company name for the new campaign
      const { data: companyData } = await supabase
        .from('companies')
        .select('name')
        .eq('id', newCampaign.company_id)
        .single();
      
      // Create a typed campaign object
      const newTypedCampaign: Campaign = {
        id: data.id,
        company_id: data.company_id,
        name: data.name,
        platform: data.platform || '',
        budget: data.budget || 0,
        created_at: data.created_at,
        companies: companyData
      };
      
      toast.success('Campaign created successfully');
      setCampaigns([newTypedCampaign, ...campaigns]);
      
      // Reset form
      setNewCampaign({
        name: '',
        platform: 'Email',
        budget: 0,
        company_id: ''
      });
      
      return true;
    } catch (error: any) {
      console.error('Error creating campaign:', error);
      toast.error('Failed to create campaign: ' + error.message);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    campaigns,
    companies,
    isLoading,
    isSubmitting,
    newCampaign,
    updateFormData,
    createCampaign,
    refreshCampaigns: loadCampaigns
  };
};

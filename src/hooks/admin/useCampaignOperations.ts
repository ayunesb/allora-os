
import { useState, useEffect } from 'react';
import { Campaign } from "@/models/campaign";
import { 
  fetchCompanyCampaigns, 
  createCampaign as createCampaignService,
  CampaignCreateInput
} from '@/services/campaignService';
import { supabase } from '@/integrations/supabase/client';

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
  const [error, setError] = useState<string | null>(null);
  
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
    setError(null);
    
    const { data, error } = await fetchCompanyCampaigns('');
    
    if (error) {
      setError(error.message);
    } else if (data) {
      setCampaigns(data);
    }
    
    setIsLoading(false);
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
      setError('Name and company are required');
      return false;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const { data, error } = await createCampaignService(newCampaign as CampaignCreateInput);
      
      if (error) {
        setError(error.message);
        return false;
      }
      
      if (data) {
        // Add the new campaign to the list
        setCampaigns([data, ...campaigns]);
        
        // Reset form
        setNewCampaign({
          name: '',
          platform: 'Email',
          budget: 0,
          company_id: ''
        });
      }
      
      return true;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    campaigns,
    companies,
    isLoading,
    isSubmitting,
    error,
    newCampaign,
    updateFormData,
    createCampaign,
    refreshCampaigns: loadCampaigns
  };
};

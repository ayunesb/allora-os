
import { useState, useEffect, useCallback } from 'react';
import { Campaign } from "@/models/campaign";
import { 
  fetchCompanyCampaigns, 
  createCampaign as createCampaignService,
  CampaignCreateInput
} from '@/services/campaignService';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/loggingService';

export interface CampaignFormData {
  name: string;
  platform: 'Google' | 'Facebook' | 'Instagram' | 'LinkedIn' | 'TikTok' | 'Email' | 'Other';
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

  // Load campaigns with proper error handling
  const loadCampaigns = async (companyId: string = '') => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error, status } = await fetchCompanyCampaigns(companyId);
      
      if (status === 'error' && error) {
        logger.error('Failed to load campaigns', { error, companyId });
        setError(error.message);
      } else if (data) {
        setCampaigns(data);
        logger.info('Campaigns loaded successfully', { count: data.length });
      }
    } catch (err: any) {
      logger.error('Unexpected error loading campaigns', { error: err });
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Load companies
  const loadCompanies = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('id, name')
        .order('name');
        
      if (error) {
        logger.error('Error loading companies', { error });
        throw error;
      }
      
      setCompanies(data || []);
      logger.info('Companies loaded successfully', { count: data?.length || 0 });
      
      // Set default company if available and none selected
      if (data && data.length > 0 && !newCampaign.company_id) {
        setNewCampaign(prev => ({ ...prev, company_id: data[0].id }));
      }
    } catch (error: any) {
      logger.error('Error loading companies', { error });
      console.error('Error loading companies:', error);
    }
  }, [newCampaign.company_id]);

  // Update form data
  const updateFormData = useCallback((data: Partial<CampaignFormData>) => {
    setNewCampaign(prev => ({ ...prev, ...data }));
  }, []);

  // Create campaign with validation
  const createCampaign = async () => {
    // Validate required fields
    if (!newCampaign.name) {
      setError('Campaign name is required');
      return false;
    }
    
    if (!newCampaign.company_id) {
      setError('Company is required');
      return false;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Parse budget as number
      const budget = typeof newCampaign.budget === 'string' 
        ? parseFloat(newCampaign.budget as unknown as string) 
        : newCampaign.budget;
        
      const campaignData: CampaignCreateInput = {
        name: newCampaign.name,
        platform: newCampaign.platform,
        budget: isNaN(budget) ? 0 : budget,
        company_id: newCampaign.company_id
      };
      
      const { data, error, status } = await createCampaignService(campaignData);
      
      if (status === 'error' && error) {
        setError(error.message);
        logger.error('Failed to create campaign', { error, campaignData });
        return false;
      }
      
      if (data) {
        // Add the new campaign to the list
        setCampaigns(prevCampaigns => [data, ...prevCampaigns]);
        
        // Reset form
        setNewCampaign({
          name: '',
          platform: 'Email',
          budget: 0,
          company_id: newCampaign.company_id // Keep the same company selected
        });
        
        logger.info('Campaign created successfully', { id: data.id });
      }
      
      return true;
    } catch (err: any) {
      logger.error('Unexpected error creating campaign', { error: err });
      setError(err.message || 'An unexpected error occurred');
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
    error,
    newCampaign,
    updateFormData,
    createCampaign,
    refreshCampaigns: loadCampaigns
  };
};

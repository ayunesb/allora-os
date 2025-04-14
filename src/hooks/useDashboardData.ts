
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useRiskAnalysis } from './useRiskAnalysis';
import { useCompanyId } from './useCompanyId';

export function useDashboardData() {
  const [isLoading, setIsLoading] = useState(true);
  const [pendingApprovals, setPendingApprovals] = useState<any[]>([]);
  const [aiRecommendations, setAiRecommendations] = useState<any[]>([]);
  const [riskAppetite, setRiskAppetite] = useState<'low' | 'medium' | 'high'>('medium');
  const { user, profile } = useAuth();
  const companyId = useCompanyId();
  const { calculateRiskScore } = useRiskAnalysis();
  const [error, setError] = useState<Error | null>(null);

  // Fetch dashboard data
  const fetchDashboardData = useCallback(async () => {
    if (!user || !companyId) {
      console.log("Missing user or company ID, can't fetch dashboard data");
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Fetching dashboard data for company ID:", companyId);
      
      // Get user's risk appetite from profile
      if (profile?.risk_appetite) {
        setRiskAppetite(profile.risk_appetite as 'low' | 'medium' | 'high');
      }
      
      // Fetch pending strategy approvals
      const { data: strategies, error: strategiesError } = await supabase
        .from('strategies')
        .select('*')
        .eq('company_id', companyId)
        .is('approved_at', null)
        .is('rejected_at', null)
        .order('created_at', { ascending: false })
        .limit(5);
        
      if (strategiesError) {
        console.error("Error fetching strategies:", strategiesError);
        throw strategiesError;
      }
      
      console.log("Fetched strategies:", strategies);
      
      // Format strategies for display
      const formattedStrategies = strategies ? strategies.map(strategy => ({
        id: strategy.id,
        title: strategy.title || "Untitled Strategy",
        description: strategy.description || "No description provided",
        type: 'strategy',
        risk_level: strategy.risk_level || riskAppetite,
        created_at: strategy.created_at,
        executive_bot: strategy.executive_bot || 'AI Executive Team',
        status: strategy.status || 'pending'
      })) : [];
      
      setPendingApprovals(formattedStrategies);
      
      // Fetch AI recommendations (campaigns, etc.)
      const { data: campaigns, error: campaignsError } = await supabase
        .from('campaigns')
        .select('*')
        .eq('company_id', companyId)
        .order('created_at', { ascending: false })
        .limit(3);
        
      if (campaignsError) {
        console.error("Error fetching campaigns:", campaignsError);
        throw campaignsError;
      }
      
      console.log("Fetched campaigns:", campaigns);
      
      // Format campaigns for display
      const formattedCampaigns = campaigns ? campaigns.map(campaign => ({
        id: campaign.id,
        title: campaign.name || "Untitled Campaign",
        description: campaign.description || 'AI-generated marketing campaign',
        type: 'campaign',
        platform: campaign.platform || 'General',
        created_at: campaign.created_at,
        executive_bot: campaign.executive_bot || 'Marketing AI',
        status: campaign.status || 'draft'
      })) : [];
      
      setAiRecommendations(formattedCampaigns);
      
      // Generate AI recommendations if none exist
      if (formattedStrategies.length === 0 && formattedCampaigns.length === 0) {
        await generateAIRecommendations();
      }
    } catch (error: any) {
      console.error('Error fetching dashboard data:', error);
      setError(error);
      toast.error('Error loading dashboard data');
    } finally {
      setIsLoading(false);
    }
  }, [user, companyId, riskAppetite, profile?.risk_appetite, calculateRiskScore]);
  
  // Generate AI recommendations if none exist
  const generateAIRecommendations = useCallback(async () => {
    if (!user?.id || !companyId) return;
    
    try {
      // If we have a Supabase Edge Function, call it
      if (typeof supabase.functions !== 'undefined') {
        console.log("Calling generate-ai-content edge function");
        
        const { data, error } = await supabase.functions.invoke('generate-ai-content', {
          body: {
            userId: user.id,
            companyId: companyId,
            industry: profile?.industry || 'Technology',
            riskAppetite: profile?.risk_appetite || 'medium',
            companyName: profile?.company || 'Your Company',
            companyDetails: {
              goals: profile?.goals || ['Growth', 'Efficiency'],
              size: profile?.company_size || 'Small',
              marketingBudget: profile?.marketing_budget || '$1k-$5k',
              targetMarkets: profile?.target_markets || ['North America']
            }
          }
        });
        
        if (error) {
          console.error('Error generating AI recommendations via edge function:', error);
        } else {
          console.log('AI content generated:', data);
          toast.success('AI recommendations generated');
          
          // Refresh data to show new recommendations
          fetchDashboardData();
        }
      } else {
        // Fallback: Create a basic strategy directly
        const { data, error } = await supabase
          .from('strategies')
          .insert([
            { 
              company_id: companyId,
              title: 'Business Growth Strategy',
              description: 'A customized strategy to increase your business revenue and market share.',
              risk_level: profile?.risk_appetite || 'medium'
            }
          ])
          .select();
          
        if (error) {
          console.error('Error generating fallback strategy:', error);
        } else {
          console.log('Basic strategy created:', data);
          toast.success('Strategy created');
          
          // Refresh data to show new strategy
          fetchDashboardData();
        }
      }
    } catch (error) {
      console.error('Error generating AI recommendations:', error);
    }
  }, [user?.id, companyId, profile, fetchDashboardData]);

  // Handle approving a recommendation
  const handleApproveRecommendation = useCallback(async (id: string, type: string) => {
    if (!user) {
      toast.error('You must be logged in to approve recommendations');
      return;
    }
    
    try {
      if (type === 'strategy') {
        const { error } = await supabase
          .from('strategies')
          .update({ 
            status: 'approved',
            approved_by: user.id,
            approved_at: new Date().toISOString()
          })
          .eq('id', id);
          
        if (error) throw error;
        
        toast.success('Strategy approved');
      } else if (type === 'campaign') {
        const { error } = await supabase
          .from('campaigns')
          .update({ 
            status: 'approved',
            approved_by: user.id,
            approved_at: new Date().toISOString()
          })
          .eq('id', id);
          
        if (error) throw error;
        
        toast.success('Campaign approved');
      }
      
      // Refresh dashboard data
      fetchDashboardData();
    } catch (error) {
      console.error('Error approving recommendation:', error);
      toast.error('Failed to approve recommendation');
    }
  }, [user, fetchDashboardData]);

  // Load dashboard data on component mount
  useEffect(() => {
    if (user && companyId) {
      fetchDashboardData();
    } else {
      setIsLoading(false);
    }
  }, [user, companyId, fetchDashboardData]);

  return {
    isLoading,
    pendingApprovals,
    aiRecommendations,
    riskAppetite,
    error,
    handleApproveRecommendation,
    refreshData: fetchDashboardData,
    generateAIRecommendations
  };
}

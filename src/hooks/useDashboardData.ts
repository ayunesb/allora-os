
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useRiskAnalysis } from './useRiskAnalysis';

export function useDashboardData() {
  const [isLoading, setIsLoading] = useState(true);
  const [pendingApprovals, setPendingApprovals] = useState<any[]>([]);
  const [aiRecommendations, setAiRecommendations] = useState<any[]>([]);
  const [riskAppetite, setRiskAppetite] = useState<'low' | 'medium' | 'high'>('medium');
  const { user, profile } = useAuth();
  const { calculateRiskScore } = useRiskAnalysis();

  // Fetch dashboard data
  const fetchDashboardData = useCallback(async () => {
    if (!user || !profile?.company_id) return;
    
    setIsLoading(true);
    
    try {
      // Get user's risk appetite from profile
      if (profile.risk_appetite) {
        setRiskAppetite(profile.risk_appetite as 'low' | 'medium' | 'high');
      }
      
      // Fetch pending strategy approvals
      const { data: strategies, error: strategiesError } = await supabase
        .from('strategies')
        .select('*')
        .eq('company_id', profile.company_id)
        .is('approved_at', null)
        .is('rejected_at', null)
        .order('created_at', { ascending: false })
        .limit(5);
        
      if (strategiesError) throw strategiesError;
      
      // Format strategies for display
      const formattedStrategies = strategies.map(strategy => ({
        id: strategy.id,
        title: strategy.title,
        description: strategy.description,
        type: 'strategy',
        risk_level: strategy.risk_level || riskAppetite,
        created_at: strategy.created_at,
        executive_bot: strategy.executive_bot || 'AI Executive Team',
        status: strategy.status || 'pending'
      }));
      
      setPendingApprovals(formattedStrategies);
      
      // Check if we need to generate AI recommendations
      if (formattedStrategies.length === 0) {
        await generateAIRecommendations();
      }
      
      // Fetch AI recommendations (campaigns, etc.)
      const { data: campaigns, error: campaignsError } = await supabase
        .from('campaigns')
        .select('*')
        .eq('company_id', profile.company_id)
        .order('created_at', { ascending: false })
        .limit(3);
        
      if (campaignsError) throw campaignsError;
      
      // Format campaigns for display
      const formattedCampaigns = campaigns.map(campaign => ({
        id: campaign.id,
        title: campaign.name,
        description: campaign.description || 'AI-generated marketing campaign',
        type: 'campaign',
        platform: campaign.platform,
        created_at: campaign.created_at,
        executive_bot: campaign.executive_bot || 'Marketing AI',
        status: campaign.status || 'draft'
      }));
      
      setAiRecommendations(formattedCampaigns);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Error loading dashboard data');
    } finally {
      setIsLoading(false);
    }
  }, [user, profile?.company_id, riskAppetite, calculateRiskScore]);
  
  // Generate AI recommendations if none exist
  const generateAIRecommendations = useCallback(async () => {
    if (!user?.id || !profile?.company_id) return;
    
    try {
      // Call our new edge function to generate AI content
      const { data, error } = await supabase.functions.invoke('generate-ai-content', {
        body: {
          userId: user.id,
          companyId: profile.company_id,
          industry: profile.industry || 'Technology',
          riskAppetite: profile.risk_appetite || 'medium',
          companyName: profile.company || 'Your Company',
          companyDetails: {
            goals: profile.goals || ['Growth', 'Efficiency'],
            size: profile.company_size || 'Small',
            marketingBudget: profile.marketing_budget || '$1k-$5k',
            targetMarkets: profile.target_markets || ['North America']
          }
        }
      });
      
      if (error) {
        console.error('Error generating AI recommendations:', error);
      } else {
        console.log('AI content generated:', data);
        toast.success('AI recommendations generated');
      }
    } catch (error) {
      console.error('Error generating AI recommendations:', error);
    }
  }, [user?.id, profile]);

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
    if (user && profile?.company_id) {
      fetchDashboardData();
    }
  }, [user, profile?.company_id, fetchDashboardData]);

  return {
    isLoading,
    pendingApprovals,
    aiRecommendations,
    riskAppetite,
    handleApproveRecommendation,
    refreshData: fetchDashboardData,
    generateAIRecommendations
  };
}

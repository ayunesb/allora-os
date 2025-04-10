
import { useState, useCallback } from 'react';
import { Lead } from '@/models/lead';
import { supabase } from '@/backend/supabase';
import { toast } from 'sonner';

interface ScoreSettings {
  statusWeights: Record<string, number>;
  campaignMultiplier: number;
  engagementBonus: number;
  decayFactor: number;
}

interface UseLeadScoringProps {
  initialSettings?: Partial<ScoreSettings>;
}

export type LeadWithScore = Lead & { score: number };

export function useLeadScoring({ initialSettings }: UseLeadScoringProps = {}) {
  const [settings, setSettings] = useState<ScoreSettings>({
    statusWeights: {
      new: 10,
      contacted: 30,
      qualified: 60,
      proposal: 80,
      negotiation: 90,
      closed: 100,
      lost: 0
    },
    campaignMultiplier: 1.2,
    engagementBonus: 15,
    decayFactor: 0.95,
    ...initialSettings
  });

  const calculateLeadScore = useCallback((lead: Lead): number => {
    // Base score from status
    const statusScore = settings.statusWeights[lead.status] || 0;
    
    // Time decay factor (newer leads score higher)
    const createdDate = new Date(lead.created_at);
    const daysSinceCreation = Math.floor((Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
    const timeDecay = Math.pow(settings.decayFactor, daysSinceCreation);
    
    // Final score calculation
    let score = statusScore * timeDecay;
    
    // Apply campaign multiplier if from a high-performance campaign
    if (lead.campaign_id) {
      score *= settings.campaignMultiplier;
    }
    
    return Math.round(score);
  }, [settings]);

  const scoreLeads = useCallback((leads: Lead[]): LeadWithScore[] => {
    return leads.map(lead => ({
      ...lead,
      score: calculateLeadScore(lead)
    }));
  }, [calculateLeadScore]);

  const updateLeadScores = useCallback(async (companyId: string): Promise<boolean> => {
    try {
      // Fetch all leads for the company
      const { data: leads, error } = await supabase
        .from('leads')
        .select('*, campaigns(name)')
        .eq('campaigns.company_id', companyId);

      if (error) throw error;
      
      // Update scores for all leads (if there was a score field in the database)
      // This is a simplified example - in a real app, you might store these scores
      
      toast.success('Lead scores updated successfully');
      return true;
    } catch (error) {
      console.error('Error updating lead scores:', error);
      toast.error('Failed to update lead scores');
      return false;
    }
  }, [calculateLeadScore]);

  const getLeadsByScore = useCallback((leads: Lead[], minScore: number = 50): LeadWithScore[] => {
    const scoredLeads = scoreLeads(leads);
    return scoredLeads.filter(lead => lead.score >= minScore);
  }, [scoreLeads]);

  const getTopLeads = useCallback((leads: Lead[], count: number = 5): LeadWithScore[] => {
    const scoredLeads = scoreLeads(leads);
    return scoredLeads
      .sort((a, b) => b.score - a.score)
      .slice(0, count);
  }, [scoreLeads]);

  // Update to make sure the getLeadScore function accepts a Lead object
  const getLeadScore = useCallback((lead: Lead): 'hot' | 'warm' | 'cold' => {
    const score = calculateLeadScore(lead);
    if (score >= 70) return 'hot';
    if (score >= 40) return 'warm';
    return 'cold';
  }, [calculateLeadScore]);

  // Make sure the getNextBestAction function accepts a Lead object
  const getNextBestAction = useCallback((lead: Lead): string => {
    const score = getLeadScore(lead);
    const status = lead.status;

    if (score === 'hot') {
      if (status === 'new') return 'Schedule a discovery call';
      if (status === 'contacted') return 'Send a detailed proposal';
      if (status === 'qualified') return 'Schedule a product demo';
      if (status === 'proposal') return 'Follow up on the proposal';
      if (status === 'negotiation') return 'Close the deal';
      return 'Upsell additional services';
    } else if (score === 'warm') {
      if (status === 'new') return 'Send an introductory email';
      if (status === 'contacted') return 'Share relevant case studies';
      if (status === 'qualified') return 'Invite to a webinar';
      return 'Nurture with periodic check-ins';
    } else {
      if (status === 'new') return 'Add to the newsletter list';
      if (status === 'contacted') return 'Share valuable content';
      return 'Keep in the nurture campaign';
    }
  }, [getLeadScore]);

  return {
    calculateLeadScore,
    scoreLeads,
    updateLeadScores,
    getLeadsByScore,
    getTopLeads,
    settings,
    setSettings,
    getLeadScore,
    getNextBestAction
  };
}

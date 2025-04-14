
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface CompanyProfile {
  companyName?: string;
  industry?: string;
  companySize?: string;
  website?: string;
  topGoals?: string[];
  targetMarkets?: string[];
  riskAppetite?: string;
  salesChannels?: string[];
  crmSystem?: string;
  leadVolume?: string;
  marketingChannels?: string[];
  marketingBudget?: string;
  aiVideoPreference?: string;
  communicationMethods?: string[];
  leadershipStyle?: string;
  messagingTone?: string;
}

export interface Strategy {
  id?: string;
  title: string;
  summary: string;
  expectedOutcome: string;
  proposedBy: string;
  why: string;
  riskLevel: string;
  createdAt?: string;
  companyId?: string;
}

export interface Campaign {
  id?: string;
  platform: string;
  objective: string;
  targetAudience: string;
  script: string;
  recommendedBy: string;
  createdAt?: string;
  companyId?: string;
}

export interface Script {
  id?: string;
  type: string;
  script: string;
  attributedTo: string;
  createdAt?: string;
  companyId?: string;
}

export interface DebateStatement {
  executive: string;
  statement: string;
  position: string;
}

export interface ExecutiveDebate {
  id?: string;
  debate: DebateStatement[];
  summary: string;
  createdAt?: string;
  companyId?: string;
}

export async function generateStrategies(companyProfile: CompanyProfile): Promise<Strategy[]> {
  try {
    const { data, error } = await supabase.functions.invoke('ai-executive-workflow', {
      body: {
        action: 'generate_strategies',
        companyProfile
      }
    });
    
    if (error) {
      throw error;
    }
    
    return data.strategies || [];
  } catch (error) {
    console.error('Error generating strategies:', error);
    toast.error('Failed to generate strategies');
    return [];
  }
}

export async function generateCampaigns(companyProfile: CompanyProfile): Promise<Campaign[]> {
  try {
    const { data, error } = await supabase.functions.invoke('ai-executive-workflow', {
      body: {
        action: 'generate_campaigns',
        companyProfile
      }
    });
    
    if (error) {
      throw error;
    }
    
    return data.campaigns || [];
  } catch (error) {
    console.error('Error generating campaigns:', error);
    toast.error('Failed to generate campaigns');
    return [];
  }
}

export async function generateScripts(companyProfile: CompanyProfile): Promise<Script[]> {
  try {
    const { data, error } = await supabase.functions.invoke('ai-executive-workflow', {
      body: {
        action: 'generate_scripts',
        companyProfile
      }
    });
    
    if (error) {
      throw error;
    }
    
    return data.scripts || [];
  } catch (error) {
    console.error('Error generating scripts:', error);
    toast.error('Failed to generate scripts');
    return [];
  }
}

export async function simulateExecutiveDebate(companyProfile: CompanyProfile, strategies: Strategy[]): Promise<ExecutiveDebate> {
  try {
    const { data, error } = await supabase.functions.invoke('ai-executive-workflow', {
      body: {
        action: 'simulate_debate',
        companyProfile,
        strategies
      }
    });
    
    if (error) {
      throw error;
    }
    
    return {
      debate: data.debate || [],
      summary: data.summary || ""
    };
  } catch (error) {
    console.error('Error simulating debate:', error);
    toast.error('Failed to simulate executive debate');
    return { debate: [], summary: "" };
  }
}

export async function generateAllContent(companyProfile: CompanyProfile): Promise<{
  strategies: Strategy[];
  campaigns: Campaign[];
  scripts: Script[];
  debate: DebateStatement[];
  debateSummary: string;
}> {
  try {
    const { data, error } = await supabase.functions.invoke('ai-executive-workflow', {
      body: {
        action: 'generate_all',
        companyProfile
      }
    });
    
    if (error) {
      throw error;
    }
    
    return {
      strategies: data.strategies || [],
      campaigns: data.campaigns || [],
      scripts: data.scripts || [],
      debate: data.debate || [],
      debateSummary: data.debateSummary || ""
    };
  } catch (error) {
    console.error('Error generating all content:', error);
    toast.error('Failed to generate AI executive workflow content');
    return {
      strategies: [],
      campaigns: [],
      scripts: [],
      debate: [],
      debateSummary: ""
    };
  }
}

export async function refreshStrategies(companyProfile: CompanyProfile): Promise<Strategy[]> {
  try {
    const { data, error } = await supabase.functions.invoke('ai-executive-workflow', {
      body: {
        action: 'refresh_strategies',
        companyProfile
      }
    });
    
    if (error) {
      throw error;
    }
    
    return data.strategies || [];
  } catch (error) {
    console.error('Error refreshing strategies:', error);
    toast.error('Failed to refresh strategies');
    return [];
  }
}

// Save the generated strategies to the database
export async function saveStrategies(strategies: Strategy[], companyId: string): Promise<void> {
  try {
    // Insert each strategy into the strategies table
    const batch = strategies.map(strategy => ({
      title: strategy.title,
      description: `${strategy.summary}\n\nExpected Outcome: ${strategy.expectedOutcome}\n\nWhy it matters: ${strategy.why}\n\nProposed by: ${strategy.proposedBy}`,
      risk_level: strategy.riskLevel.split(' ')[0].toLowerCase(), // Extract just "Low", "Medium", or "High"
      company_id: companyId
    }));
    
    const { error } = await supabase
      .from('strategies')
      .insert(batch);
    
    if (error) {
      throw error;
    }
    
    toast.success('Strategies saved successfully');
  } catch (error) {
    console.error('Error saving strategies:', error);
    toast.error('Failed to save strategies');
  }
}

// Save the generated campaigns to the database (using a custom campaigns table)
export async function saveCampaigns(campaigns: Campaign[], companyId: string): Promise<void> {
  try {
    // Transform campaign data to match the database structure
    const batch = campaigns.map(campaign => ({
      name: `${campaign.platform} Campaign: ${campaign.objective}`,
      platform: campaign.platform.toLowerCase(),
      targeting: JSON.stringify({ 
        audience: campaign.targetAudience,
        recommendedBy: campaign.recommendedBy
      }),
      creatives: JSON.stringify([{
        title: campaign.objective,
        description: campaign.script
      }]),
      company_id: companyId
    }));
    
    const { error } = await supabase
      .from('campaigns')
      .insert(batch);
    
    if (error) {
      throw error;
    }
    
    toast.success('Campaigns saved successfully');
  } catch (error) {
    console.error('Error saving campaigns:', error);
    toast.error('Failed to save campaigns');
  }
}

// Save the executive debate to the database
export async function saveExecutiveDebate(debate: DebateStatement[], summary: string, companyId: string): Promise<void> {
  try {
    // Get the unique executives involved in the debate
    const executives = [...new Set(debate.map(statement => statement.executive))];
    
    const { error } = await supabase
      .from('ai_boardroom_debates')
      .insert({
        company_id: companyId,
        topic: "Business Strategy Discussion",
        executives: executives,
        discussion: debate,
        summary: summary,
        status: 'active'
      });
    
    if (error) {
      throw error;
    }
    
    toast.success('Executive debate saved successfully');
  } catch (error) {
    console.error('Error saving executive debate:', error);
    toast.error('Failed to save executive debate');
  }
}

// Set up a periodic refresh for strategies
export function setupStrategyRefresh(
  companyProfile: CompanyProfile, 
  companyId: string, 
  onRefresh: (strategies: Strategy[]) => void,
  intervalDays = 10
): () => void {
  // Convert days to milliseconds
  const intervalMs = intervalDays * 24 * 60 * 60 * 1000;
  
  const intervalId = setInterval(async () => {
    console.log(`Auto-refreshing strategies after ${intervalDays} days`);
    const newStrategies = await refreshStrategies(companyProfile);
    
    if (newStrategies.length > 0) {
      // Save the new strategies
      await saveStrategies(newStrategies, companyId);
      
      // Call the callback
      onRefresh(newStrategies);
      
      toast.success(`Auto-generated ${newStrategies.length} new strategies`);
    }
  }, intervalMs);
  
  // Return a cleanup function
  return () => clearInterval(intervalId);
}

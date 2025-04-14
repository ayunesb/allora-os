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

export async function saveStrategies(strategies: Strategy[], companyId: string): Promise<void> {
  try {
    const batch = strategies.map(strategy => ({
      title: strategy.title,
      description: `${strategy.summary}\n\nExpected Outcome: ${strategy.expectedOutcome}\n\nWhy it matters: ${strategy.why}\n\nProposed by: ${strategy.proposedBy}`,
      risk_level: strategy.riskLevel.split(' ')[0].toLowerCase(),
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

export async function saveCampaigns(campaigns: Campaign[], companyId: string): Promise<void> {
  try {
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

export async function saveExecutiveDebate(debate: DebateStatement[], summary: string, companyId: string): Promise<void> {
  try {
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

export async function saveGeneratedStrategiesToDB(strategies: Strategy[], companyId: string): Promise<boolean> {
  try {
    const strategiesData = strategies.map(strategy => ({
      company_id: companyId,
      title: strategy.title,
      summary: strategy.summary,
      expected_outcome: strategy.expectedOutcome,
      risk_level: strategy.riskLevel.toLowerCase(),
      executive_bot: strategy.proposedBy,
      reasoning: strategy.why
    }));
    
    const { error } = await supabase
      .from('ai_strategies')
      .insert(strategiesData);
    
    if (error) {
      console.error("Error saving strategies to DB:", error);
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error("Failed to save strategies to DB:", error);
    return false;
  }
}

export async function saveGeneratedCampaignsToDB(campaigns: Campaign[], companyId: string): Promise<boolean> {
  try {
    const campaignsData = campaigns.map(campaign => ({
      company_id: companyId,
      platform: campaign.platform,
      objective: campaign.objective,
      target_audience: campaign.targetAudience,
      script: campaign.script,
      executive_bot: campaign.recommendedBy
    }));
    
    const { error } = await supabase
      .from('ai_campaigns')
      .insert(campaignsData);
    
    if (error) {
      console.error("Error saving campaigns to DB:", error);
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error("Failed to save campaigns to DB:", error);
    return false;
  }
}

export async function saveGeneratedScriptsToDB(scripts: Script[], companyId: string): Promise<boolean> {
  try {
    const scriptsData = scripts.map(script => ({
      company_id: companyId,
      script_type: script.type,
      content: script.script,
      executive_bot: script.attributedTo
    }));
    
    const { error } = await supabase
      .from('ai_communication_scripts')
      .insert(scriptsData);
    
    if (error) {
      console.error("Error saving scripts to DB:", error);
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error("Failed to save scripts to DB:", error);
    return false;
  }
}

export async function saveExecutiveDebateToDB(debate: DebateStatement[], summary: string, companyId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('ai_executive_debates')
      .insert({
        company_id: companyId,
        debate_content: debate,
        summary: summary
      });
    
    if (error) {
      console.error("Error saving executive debate to DB:", error);
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error("Failed to save executive debate to DB:", error);
    return false;
  }
}

export async function updateCompanyWorkflowStatus(companyId: string, workflowData: any): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('companies')
      .update({
        ai_workflow_generated: true,
        ai_workflow_generated_at: new Date().toISOString(),
        ai_workflow_data: workflowData
      })
      .eq('id', companyId);
    
    if (error) {
      console.error("Error updating company workflow status:", error);
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error("Failed to update company workflow status:", error);
    return false;
  }
}

export function setupStrategyRefresh(
  companyProfile: CompanyProfile, 
  companyId: string, 
  onRefresh: (strategies: Strategy[]) => void,
  intervalDays = 10
): () => void {
  const intervalMs = intervalDays * 24 * 60 * 60 * 1000;
  
  const intervalId = setInterval(async () => {
    console.log(`Auto-refreshing strategies after ${intervalDays} days`);
    const newStrategies = await refreshStrategies(companyProfile);
    
    if (newStrategies.length > 0) {
      await saveStrategies(newStrategies, companyId);
      
      onRefresh(newStrategies);
      
      toast.success(`Auto-generated ${newStrategies.length} new strategies`);
    }
  }, intervalMs);
  
  return () => clearInterval(intervalId);
}


import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { onNewLeadAdded } from './zapierEventTriggers';

export interface DemoCompanyOptions {
  name?: string;
  industry?: string;
  size?: string;
  goals?: string[];
  riskAppetite?: 'low' | 'medium' | 'high';
  channels?: string[];
  marketingBudget?: string;
  targetMarkets?: string[];
  isPublic?: boolean;
}

const DEFAULT_DEMO = {
  name: 'Allora Demo',
  industry: 'SaaS',
  size: '10-50',
  goals: ['Showcase Platform', 'Generate Leads', 'Demonstrate AI Capabilities'],
  riskAppetite: 'medium' as const,
  channels: ['Email', 'WhatsApp', 'Zoom', 'Phone'],
  marketingBudget: '$1k-$5k',
  targetMarkets: ['North America', 'Europe'],
  isPublic: true
};

/**
 * Creates a demo company with sample data
 */
export async function createDemoCompany(
  userId: string,
  options: DemoCompanyOptions = {}
): Promise<{ success: boolean; companyId?: string; error?: string }> {
  try {
    // Merge options with defaults
    const demoSettings = { ...DEFAULT_DEMO, ...options };
    
    // Create company record
    const { data: companyData, error: companyError } = await supabase
      .from('companies')
      .insert({
        name: demoSettings.name,
        industry: demoSettings.industry,
        size: demoSettings.size,
        created_by: userId,
        is_demo: true,
        is_public: demoSettings.isPublic,
        status: 'active'
      })
      .select()
      .single();
    
    if (companyError) {
      throw new Error(`Error creating demo company: ${companyError.message}`);
    }
    
    const companyId = companyData.id;
    
    // Update user profile to link to this demo company
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        company_id: companyId,
        company: demoSettings.name,
        industry: demoSettings.industry,
        company_size: demoSettings.size,
        goals: demoSettings.goals,
        risk_appetite: demoSettings.riskAppetite,
        preferred_channels: demoSettings.channels,
        marketing_budget: demoSettings.marketingBudget,
        target_markets: demoSettings.targetMarkets,
        is_demo_account: true
      })
      .eq('id', userId);
    
    if (profileError) {
      console.error('Error updating user profile with demo company:', profileError);
    }
    
    // Create demo content using edge function
    await generateDemoContent(userId, companyId, demoSettings);
    
    // Create sample leads
    await createSampleLeads(companyId);
    
    return { success: true, companyId };
  } catch (error) {
    console.error('Error creating demo company:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Generates AI content for the demo company
 */
async function generateDemoContent(
  userId: string,
  companyId: string,
  settings: DemoCompanyOptions
): Promise<void> {
  try {
    const { data, error } = await supabase.functions.invoke('generate-ai-content', {
      body: {
        userId,
        companyId,
        industry: settings.industry,
        riskAppetite: settings.riskAppetite,
        companyName: settings.name,
        companyDetails: {
          goals: settings.goals,
          size: settings.size,
          marketingBudget: settings.marketingBudget,
          targetMarkets: settings.targetMarkets
        },
        isDemo: true
      }
    });
    
    if (error) {
      console.error('Error generating demo content:', error);
      toast.error('Failed to generate demo content');
    } else {
      console.log('Demo content generated:', data);
      toast.success('Demo content generated successfully');
    }
  } catch (error) {
    console.error('Error calling generate-ai-content function:', error);
    toast.error('Error generating demo content');
  }
}

/**
 * Creates sample leads for the demo company
 */
async function createSampleLeads(companyId: string): Promise<void> {
  const demoLeads = [
    {
      name: 'John Smith',
      company: 'TechCorp Inc.',
      email: 'john.smith@example.com',
      phone: '(555) 123-4567',
      source: 'Website',
      status: 'new',
      score: 85
    },
    {
      name: 'Sarah Johnson',
      company: 'Marketing Solutions',
      email: 'sarah.j@example.com',
      phone: '(555) 987-6543',
      source: 'LinkedIn',
      status: 'contacted',
      score: 72
    },
    {
      name: 'Michael Brown',
      company: 'Global Enterprises',
      email: 'mbrown@example.com',
      phone: '(555) 555-5555',
      source: 'Referral',
      status: 'qualified',
      score: 93
    }
  ];
  
  for (const lead of demoLeads) {
    try {
      // Insert the lead
      const { data: leadData, error: leadError } = await supabase
        .from('leads')
        .insert({
          company_id: companyId,
          name: lead.name,
          company: lead.company,
          email: lead.email,
          phone: lead.phone,
          source: lead.source,
          status: lead.status,
          score: lead.score,
          is_demo: true
        })
        .select()
        .single();
      
      if (leadError) {
        console.error('Error creating demo lead:', leadError);
        continue;
      }
      
      // Trigger Zapier event for the new lead
      await onNewLeadAdded({
        company: lead.company,
        leadName: lead.name,
        source: lead.source,
        leadId: leadData.id
      });
      
    } catch (error) {
      console.error('Error in sample lead creation:', error);
    }
  }
}

/**
 * Converts a demo company to a case study (makes it public)
 */
export async function convertDemoToPublicCaseStudy(
  companyId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('companies')
      .update({
        is_public: true,
        is_case_study: true,
        published_at: new Date().toISOString()
      })
      .eq('id', companyId)
      .eq('is_demo', true);
    
    if (error) {
      throw new Error(`Error converting to case study: ${error.message}`);
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error converting demo to case study:', error);
    return { success: false, error: error.message };
  }
}

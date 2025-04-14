
/**
 * Scheduler for autonomous executive agents to run daily tasks
 */
import { runExecutiveAgent } from '@/agents/executiveAgent';
import { executiveProfiles } from '@/agents/agentProfiles';
import { logger } from '@/utils/loggingService';
import { supabase } from '@/integrations/supabase/client';
import { ExecutiveAgentProfile } from '@/types/agents';

/**
 * Daily tasks for executives to consider
 */
const dailyTasks = [
  "Review our current marketing strategy and suggest improvements",
  "Analyze recent customer feedback and recommend action items",
  "Identify potential efficiency gains in our operations",
  "Evaluate our current pricing strategy against market conditions",
  "Assess competitive threats and recommend defensive strategies",
  "Identify new market opportunities we should explore",
  "Suggest improvements to our customer onboarding process",
  "Evaluate potential strategic partnerships we should pursue",
  "Analyze our product roadmap and suggest priority adjustments",
  "Review our sales funnel and recommend optimization strategies"
];

/**
 * Run daily autonomous tasks for all executives
 */
export async function runDailyExecutiveTasks() {
  logger.info('Starting daily executive agent tasks', { component: 'agentScheduler' });
  
  // Get company context if available
  const companyContext = await getCompanyContext();
  
  // Track successful and failed tasks
  let successCount = 0;
  let failCount = 0;
  
  // Run a task for each executive
  for (const [key, executive] of Object.entries(executiveProfiles)) {
    try {
      // Select a random task appropriate for this executive
      const task = selectTaskForExecutive(executive);
      
      logger.info(`Running daily task for ${executive.name}`, { 
        component: 'agentScheduler',
        executiveRole: executive.role,
        task
      });
      
      // Run the executive agent with the task
      const decision = await runExecutiveAgent(
        task,
        executive,
        {
          saveToDatabase: true,
          includeRiskAssessment: true,
          companyContext,
          marketConditions: "Current market shows volatility with increasing competition and shifting customer preferences."
        }
      );
      
      logger.info(`Daily task completed for ${executive.name}`, {
        component: 'agentScheduler',
        decision: decision.selectedOption
      });
      
      successCount++;
    } catch (error) {
      logger.error(`Failed to run daily task for ${executive.name}`, error, {
        component: 'agentScheduler',
        executiveRole: executive.role
      });
      
      failCount++;
    }
  }
  
  logger.info('Daily executive agent tasks completed', { 
    component: 'agentScheduler',
    successCount,
    failCount,
    total: Object.keys(executiveProfiles).length
  });
  
  return {
    successCount,
    failCount,
    total: Object.keys(executiveProfiles).length
  };
}

/**
 * Select an appropriate task for the given executive
 */
function selectTaskForExecutive(executive: ExecutiveAgentProfile): string {
  // Simple randomized selection for now
  const index = Math.floor(Math.random() * dailyTasks.length);
  return dailyTasks[index];
}

/**
 * Get context about the company from the database
 */
async function getCompanyContext(): Promise<string> {
  try {
    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return "";
    }
    
    // Get the user's company details
    const { data: profile } = await supabase
      .from('profiles')
      .select('company, industry, company_id')
      .eq('id', user.id)
      .single();
      
    if (!profile?.company_id) {
      return "";
    }
    
    // Get detailed company information
    const { data: company } = await supabase
      .from('companies')
      .select('*')
      .eq('id', profile.company_id)
      .single();
      
    if (!company) {
      return "";
    }
    
    // Format company context
    return `This business is ${profile.company}, operating in the ${profile.industry} industry. ` +
           `The company has ${company.size || 'an unspecified number of'} employees ` +
           `and focuses on ${company.focus || 'its core business activities'}.`;
  } catch (error) {
    logger.error('Failed to get company context', error);
    return "";
  }
}

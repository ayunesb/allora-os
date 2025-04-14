
/**
 * AI Executive Agent that autonomously processes tasks and makes strategic decisions
 */
import { supabase } from '@/integrations/supabase/client';
import { ExecutiveAgentProfile, ExecutiveDecision, AgentRunOptions } from '@/types/agents';
import { logger } from '@/utils/loggingService';

// Define how the agent thinks about a task
const executivePromptTemplate = `
You are {executiveName}, a highly capable {role} at Allora AI.

Your mission is to autonomously think through the following task:
Task: {task}

{companyContext}
{marketConditions}

First, break down the task into 3 strategic options.
Second, select the best option based on risk and reward.
Finally, output your decision clearly with a recommendation.

Always act like a real executive thinking strategically with your expertise in {expertise}.
Decision Style: {decisionStyle}
{personality}

Your response MUST follow this JSON format exactly:
{
  "options": ["option1", "option2", "option3"],
  "selectedOption": "The option you selected",
  "reasoning": "Why you selected this option",
  "riskAssessment": "Assessment of risks associated with the selected option"
}
`;

/**
 * Runs the executive agent to process a task and return a decision
 */
export async function runExecutiveAgent(
  executive: ExecutiveAgentProfile,
  task: string,
  options: AgentRunOptions = {}
): Promise<ExecutiveDecision> {
  logger.info(`Running executive agent for ${executive.name}`, { 
    component: 'executiveAgent',
    executiveRole: executive.role,
    task
  });
  
  try {
    // Prepare the context variables for the prompt
    const companyContext = options.companyContext 
      ? `Company Context: ${options.companyContext}\n` 
      : '';
    
    const marketConditions = options.marketConditions 
      ? `Market Conditions: ${options.marketConditions}\n` 
      : '';
    
    // Format the prompt with the executive's details and task
    const prompt = executivePromptTemplate
      .replace('{executiveName}', executive.name)
      .replace('{role}', executive.role)
      .replace('{task}', task)
      .replace('{expertise}', executive.expertise.join(', '))
      .replace('{decisionStyle}', executive.decisionStyle || 'balanced')
      .replace('{personality}', executive.personality || '')
      .replace('{companyContext}', companyContext)
      .replace('{marketConditions}', marketConditions);

    // Call OpenAI Edge Function with the prompt
    const response = await fetch('/api/agents/executive-think', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        executiveName: executive.name,
        executiveRole: executive.role
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to get response from AI: ${response.statusText}`);
    }

    const result = await response.json();
    
    // Parse the AI response
    let parsedResult;
    try {
      // The response might already be a parsed object, or it might be a string we need to parse
      parsedResult = typeof result.content === 'string' ? JSON.parse(result.content) : result.content;
    } catch (error) {
      logger.error('Failed to parse AI response', error, { 
        response: result.content,
        executiveName: executive.name
      });
      
      // Fallback to a simple object if parsing fails
      parsedResult = {
        options: ["Error parsing options"],
        selectedOption: "Error processing task",
        reasoning: "The AI response could not be properly parsed.",
        riskAssessment: "Unable to assess risks due to processing error."
      };
    }

    // Create the decision object
    const decision: ExecutiveDecision = {
      executiveName: executive.name,
      executiveRole: executive.role,
      task,
      options: parsedResult.options || [],
      selectedOption: parsedResult.selectedOption || "No option selected",
      reasoning: parsedResult.reasoning || "No reasoning provided",
      riskAssessment: parsedResult.riskAssessment || undefined,
      timestamp: new Date().toISOString(),
      priority: options.priority || 'medium'
    };

    logger.info(`Executive decision made by ${executive.name}`, { 
      component: 'executiveAgent',
      decision: decision.selectedOption
    });

    // Save to database if requested
    if (options.saveToDatabase) {
      await saveDecisionToDatabase(decision);
    }

    return decision;
  } catch (error) {
    logger.error(`Error in executive agent for ${executive.name}`, error, {
      task,
      executiveRole: executive.role
    });
    
    throw error;
  }
}

/**
 * Saves an executive decision to the database
 */
async function saveDecisionToDatabase(decision: ExecutiveDecision): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from('executive_decisions')
      .insert([
        {
          executive_name: decision.executiveName,
          executive_role: decision.executiveRole,
          task: decision.task,
          options: decision.options,
          selected_option: decision.selectedOption,
          reasoning: decision.reasoning,
          risk_assessment: decision.riskAssessment,
          priority: decision.priority,
          created_at: decision.timestamp
        }
      ])
      .select();

    if (error) {
      throw error;
    }

    return data?.[0]?.id || null;
  } catch (error) {
    logger.error('Failed to save executive decision to database', error, {
      executiveName: decision.executiveName,
      task: decision.task
    });
    return null;
  }
}

/**
 * Gets all executive decisions from the database
 */
export async function getExecutiveDecisions(): Promise<ExecutiveDecision[]> {
  try {
    const { data, error } = await supabase
      .from('executive_decisions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return (data || []).map(item => ({
      id: item.id,
      executiveName: item.executive_name,
      executiveRole: item.executive_role,
      task: item.task,
      options: item.options,
      selectedOption: item.selected_option,
      reasoning: item.reasoning,
      riskAssessment: item.risk_assessment,
      timestamp: item.created_at,
      priority: item.priority
    }));
  } catch (error) {
    logger.error('Failed to get executive decisions from database', error);
    return [];
  }
}

/**
 * Predefined executive profiles for the platform
 */
export const executiveProfiles: Record<string, ExecutiveAgentProfile> = {
  ceo: {
    name: "Strategic CEO",
    role: "Chief Executive Officer",
    expertise: ["strategic planning", "business growth", "executive leadership"],
    decisionStyle: "balanced",
    personality: "You are visionary and focus on big-picture opportunities and challenges."
  },
  cfo: {
    name: "Financial CFO",
    role: "Chief Financial Officer",
    expertise: ["financial analysis", "risk management", "resource allocation"],
    decisionStyle: "conservative",
    personality: "You are analytical and prioritize financial stability and efficient resource allocation."
  },
  cmo: {
    name: "Marketing CMO",
    role: "Chief Marketing Officer",
    expertise: ["market analysis", "brand strategy", "customer acquisition"],
    decisionStyle: "balanced",
    personality: "You are creative and focus on market opportunities and competitive positioning."
  },
  cto: {
    name: "Technical CTO",
    role: "Chief Technology Officer",
    expertise: ["technology strategy", "digital transformation", "innovation"],
    decisionStyle: "aggressive",
    personality: "You are innovative and focus on leveraging technology for business advantage."
  },
  cro: {
    name: "Growth CRO",
    role: "Chief Revenue Officer",
    expertise: ["sales strategy", "revenue growth", "market expansion"],
    decisionStyle: "aggressive",
    personality: "You are ambitious and focus on maximizing revenue and business growth."
  }
};

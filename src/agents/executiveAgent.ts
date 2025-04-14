
/**
 * AI Executive Agent that autonomously processes tasks and makes strategic decisions
 */
import { logger } from '@/utils/loggingService';
import { ExecutiveAgentProfile, ExecutiveDecision, AgentRunOptions } from '@/types/agents';
import { executivePromptTemplate } from './promptTemplates';
import { saveDecisionToDatabase, getExecutiveDecisions } from './decisionService';
import { executiveProfiles } from './agentProfiles';

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

// Re-export necessary items for backward compatibility
export { executiveProfiles, getExecutiveDecisions };

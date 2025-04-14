
/**
 * AI Executive Agent that autonomously processes tasks and makes strategic decisions
 */
import { logger } from '@/utils/loggingService';
import { ExecutiveAgentProfile, ExecutiveDecision, AgentRunOptions } from '@/types/agents';
import { executivePromptTemplate } from './promptTemplates';
import { saveDecisionToDatabase, getExecutiveDecisions } from './decisionService';
import { executiveProfiles } from './agentProfiles';
import { getUserPreferences } from '@/utils/selfLearning/preferencesService';
import { fetchRecentMemories, formatMemoriesForPrompt, saveDecisionToMemory } from '@/services/memoryService';

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
    // Get user preferences if userId is provided
    let userPreferences = null;
    let memories = [];
    
    if (options.userId) {
      try {
        userPreferences = await getUserPreferences(options.userId);
        logger.info('Using personalized user preferences for executive agent', {
          component: 'executiveAgent',
          userId: options.userId,
          preferences: userPreferences
        });
        
        // Fetch recent memories for this executive
        memories = await fetchRecentMemories(options.userId, executive.name, 5);
        logger.info(`Retrieved ${memories.length} memories for executive ${executive.name}`, {
          component: 'executiveAgent',
          userId: options.userId
        });
      } catch (error) {
        logger.warn('Failed to get user preferences or memories, using defaults', {
          component: 'executiveAgent',
          error
        });
      }
    }
    
    // Format memories for the prompt
    const memoryText = formatMemoriesForPrompt(memories);
    
    // Prepare the context variables for the prompt
    const companyContext = options.companyContext 
      ? `Company Context: ${options.companyContext}\n` 
      : '';
    
    const marketConditions = options.marketConditions 
      ? `Market Conditions: ${options.marketConditions}\n` 
      : '';
    
    // Add user preferences to prompt if available
    let userPreferencesContext = '';
    if (userPreferences) {
      userPreferencesContext = `
User Preferences:
- Communication Style: ${userPreferences.responseStyle || 'balanced'}
- Technical Level: ${userPreferences.technicalLevel || 'intermediate'}
- Risk Appetite: ${userPreferences.riskAppetite || 'medium'}
- Focus Area: ${userPreferences.focusArea || 'general'}

Adapt your decision making and communication style to match these preferences.
`;
    }
    
    // Add memory context to the prompt
    const memoryContext = `
Recent Memory Log:
${memoryText}

`;
    
    // Format the prompt with the executive's details, task, and user preferences
    const prompt = executivePromptTemplate
      .replace('{executiveName}', executive.name)
      .replace('{role}', executive.role)
      .replace('{task}', task)
      .replace('{expertise}', executive.expertise.join(', '))
      .replace('{decisionStyle}', executive.decisionStyle || 'balanced')
      .replace('{personality}', executive.personality || '')
      .replace('{companyContext}', companyContext)
      .replace('{marketConditions}', marketConditions)
      .replace('{userPreferences}', userPreferencesContext)
      .replace('{memoryContext}', memoryContext);

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

    // Apply user risk appetite to calculated risk assessment if needed
    if (userPreferences && userPreferences.riskAppetite && parsedResult.riskAssessment) {
      // Adjust risk assessment based on user preferences
      if (userPreferences.riskAppetite === 'high') {
        // For high risk appetite users, decrease perceived risk
        parsedResult.riskAssessment = parsedResult.riskAssessment.replace(
          /high risk/gi, 
          "acceptable risk"
        );
      } else if (userPreferences.riskAppetite === 'low') {
        // For low risk appetite users, increase perceived risk
        parsedResult.riskAssessment = parsedResult.riskAssessment.replace(
          /medium risk/gi, 
          "significant risk"
        );
      }
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
    
    // Save to memory if userId is provided
    if (options.userId) {
      await saveDecisionToMemory(options.userId, decision);
      logger.info('Saved decision to memory', {
        component: 'executiveAgent',
        executiveName: executive.name,
        userId: options.userId
      });
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

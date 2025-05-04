import { v4 as uuidv4 } from 'uuid';
import { saveExecutiveDecision } from './executiveMemory';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/loggingService';
// Re-export executiveProfiles from agentProfiles
export { executiveProfiles } from './agentProfiles';
// Re-export getExecutiveDecisions from executiveMemory
export { getExecutiveDecisions } from './executiveMemory';
/**
 * Runs an executive agent to make a decision on a given task
 * @param task The task to perform
 * @param executiveProfile The executive profile to use
 * @param options Additional options
 * @returns The decision made by the executive
 */
export async function runExecutiveAgent(task, executiveProfile, options = {}) {
    const { saveToDatabase = true } = options;
    try {
        logger.info(`Running ${executiveProfile.name} (${executiveProfile.role}) for task: ${task}`);
        // Create a UUID for this decision
        const decisionId = uuidv4();
        // Call the edge function to get the agent's response
        const { data, error } = await supabase.functions.invoke('executive-agent', {
            body: {
                task,
                executiveName: executiveProfile.name,
                executiveRole: executiveProfile.role
            }
        });
        if (error) {
            throw new Error(`Error running executive agent: ${error.message}`);
        }
        // Parse the response
        const content = JSON.parse(data.content);
        const decision = {
            id: decisionId,
            executiveName: executiveProfile.name,
            executiveRole: executiveProfile.role,
            task,
            options: content.options || [],
            selectedOption: content.selectedOption || "N/A",
            reasoning: content.reasoning || "No reasoning provided",
            riskAssessment: content.riskAssessment || "No risk assessment provided",
            priority: content.priority || "medium",
            timestamp: new Date().toISOString()
        };
        // Save the decision to the database if requested
        if (saveToDatabase) {
            // Get the current user
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                await saveExecutiveDecision(decision, user.id);
            }
            else {
                logger.warn("No user found, decision not saved to database");
            }
        }
        return decision;
    }
    catch (error) {
        logger.error("Error in runExecutiveAgent:", error);
        // Return a complete fallback decision object with all required properties
        return {
            id: uuidv4(),
            executiveName: executiveProfile.name,
            executiveRole: executiveProfile.role,
            task,
            options: ["Error occurred"],
            selectedOption: "N/A",
            reasoning: `Unable to complete task due to technical issues: ${error.message}`,
            riskAssessment: "N/A - Error occurred",
            priority: "medium",
            timestamp: new Date().toISOString()
        };
    }
}

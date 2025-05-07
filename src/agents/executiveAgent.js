var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { v4 as uuidv4 } from "uuid";
import { saveExecutiveDecision, } from "./executiveMemory";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/utils/loggingService";
// Re-export executiveProfiles from agentProfiles
export { executiveProfiles } from "./agentProfiles";
// Re-export getExecutiveDecisions from executiveMemory
export { getExecutiveDecisions } from "./executiveMemory";
/**
 * Runs an executive agent to make a decision on a given task
 * @param task The task to perform
 * @param executiveProfile The executive profile to use
 * @param options Additional options
 * @returns The decision made by the executive
 */
export function runExecutiveAgent(task_1, executiveProfile_1) {
    return __awaiter(this, arguments, void 0, function* (task, executiveProfile, options = {}) {
        const { saveToDatabase = true } = options;
        try {
            logger.info(`Running ${executiveProfile.name} (${executiveProfile.role}) for task: ${task}`);
            // Create a UUID for this decision
            const decisionId = uuidv4();
            // Call the edge function to get the agent's response
            const { data, error } = yield supabase.functions.invoke("executive-agent", {
                body: {
                    task,
                    executiveName: executiveProfile.name,
                    executiveRole: executiveProfile.role,
                },
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
                timestamp: new Date().toISOString(),
            };
            // Save the decision to the database if requested
            if (saveToDatabase) {
                // Get the current user
                const { data: { user }, } = yield supabase.auth.getUser();
                if (user) {
                    yield saveExecutiveDecision(decision, user.id);
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
                timestamp: new Date().toISOString(),
            };
        }
    });
}

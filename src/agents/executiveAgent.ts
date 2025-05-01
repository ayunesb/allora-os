
import { v4 as uuidv4 } from 'uuid';
import { supabase } from "@/integrations/supabase/client";
import {
  ExecutiveAgentProfile,
  ExecutiveDecision,
  AgentRunOptions,
} from "@/types/agents";
import { executivePromptTemplate } from "@/agents/promptTemplates";
import { generateStrategy } from "@/backend/strategy";
import { getDecisionStyle, getPersonality } from "@/utils/agentUtils";
import { executiveProfiles } from "./agentProfiles";
import { 
  fetchExecutiveInbox, 
  formatInboxForPrompt, 
  markMessagesAsRead, 
  notifyOtherExecutives, 
  sendExecutiveMessage 
} from "./executiveMessaging";
import { 
  fetchCoachingMemories, 
  saveExecutiveDecision, 
  getExecutiveDecisions 
} from "./executiveMemory";

export { executiveProfiles };

/**
 * Runs an executive agent to make a strategic decision
 */
export async function runExecutiveAgent(
  task: string,
  profile: ExecutiveAgentProfile,
  options: AgentRunOptions = {}
): Promise<ExecutiveDecision> {
  const {
    saveToDatabase = true,
    includeRiskAssessment = true,
    priority = "medium",
    companyContext = "",
    marketConditions = "",
    userId = "user-unknown",
  } = options;

  try {
    // Fetch unread messages for the executive
    const inboxMessages = await fetchExecutiveInbox(profile.name);
    const memoryContext = formatInboxForPrompt(inboxMessages);

    // Fetch coaching memories
    const coachingMemories = await fetchCoachingMemories(profile.name);

    // Construct user preferences string
    const userPreferences = `User Risk Appetite: ${
      options.includeRiskAssessment ? "High" : "Low"
    }\nPriority: ${priority}`;

    // Call our Supabase edge function to process the prompt
    const { data, error } = await supabase.functions.invoke("executive-think", {
      body: {
        prompt: executivePromptTemplate,
        executiveName: profile.name,
        executiveRole: profile.role,
        expertise: profile.expertise.join(", "),
        decisionStyle: getDecisionStyle(profile.decisionStyle),
        personality: getPersonality(profile.personality),
        task: task,
        memoryContext: memoryContext,
        coachingMemories: coachingMemories,
        userPreferences: userPreferences,
        companyContext: companyContext,
        marketConditions: marketConditions,
      },
    });

    if (error) {
      console.error("Error in edge function:", error);
      throw new Error(`AI Execution error: ${error.message}`);
    }

    // Parse the JSON content
    const content = data.content;
    const parsed = JSON.parse(content);

    // Create a new executive decision object
    const decision: ExecutiveDecision = {
      id: uuidv4(),
      executiveName: profile.name,
      executiveRole: profile.role,
      task: task,
      options: parsed.options,
      selectedOption: parsed.selectedOption,
      reasoning: parsed.reasoning,
      riskAssessment: includeRiskAssessment ? parsed.riskAssessment : "N/A",
      timestamp: new Date().toISOString(),
      priority: priority,
    };

    // Save the decision to the database
    if (saveToDatabase) {
      await saveExecutiveDecision(decision, userId);
    }

    // Send message notifications to other executives
    if (inboxMessages.length > 0) {
      await notifyOtherExecutives(profile.name, profile.role, inboxMessages);
    }

    return decision;
  } catch (error: any) {
    console.error("Error during AI execution:", error);

    // Return a fallback decision on error
    return {
      id: uuidv4(),
      executiveName: profile.name,
      executiveRole: profile.role,
      task: task,
      options: ["Unable to generate options due to technical issues."],
      selectedOption: "N/A",
      reasoning: `I apologize, but I was unable to properly analyze this task due to technical issues. Please try again later. Error details: ${error.message}`,
      riskAssessment: "Unable to assess risks due to technical error",
      timestamp: new Date().toISOString(),
      priority: "medium",
    };
  }
}

/**
 * Runs an executive agent to generate a business strategy
 */
export async function runExecutiveStrategy(
  task: string,
  profile: ExecutiveAgentProfile,
  options: AgentRunOptions = {}
) {
  try {
    // Run the executive agent to get a decision
    const decision = await runExecutiveAgent(task, profile, options);

    // Generate a strategy from the decision
    const strategy = await generateStrategy(decision);

    return strategy;
  } catch (error) {
    console.error("Error during AI strategy execution:", error);
    throw error;
  }
}

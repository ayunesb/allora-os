import { v4 as uuidv4 } from 'uuid';
import { supabase } from "@/integrations/supabase/client";
import {
  ExecutiveAgentProfile,
  ExecutiveDecision,
  AgentRunOptions,
} from "@/types/agents";
import {
  executivePromptTemplate,
  messageNotificationTemplate,
  generateMessageTemplate,
} from "@/agents/promptTemplates";
import { generateStrategy } from "@/backend/strategy";
import { getDecisionStyle, getPersonality } from "@/utils/agentUtils";
import { sendExecutiveMessage } from "@/agents/meshNetwork";
import { formatInboxForPrompt } from "./meshNetwork";
import { executiveProfiles } from "./agentProfiles";

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
 * Saves an executive decision to the database
 */
export async function saveExecutiveDecision(
  decision: ExecutiveDecision,
  userId: string
) {
  const { data, error } = await supabase
    .from("executive_decisions")
    .insert([
      {
        ...decision,
        user_id: userId,
      },
    ]);

  if (error) {
    console.error("Failed to save executive decision:", error);
    throw new Error(`Failed to save executive decision: ${error.message}`);
  }

  return data;
}

/**
 * Fetches executive decisions from the database
 */
export async function getExecutiveDecisions(): Promise<ExecutiveDecision[]> {
  try {
    const { data, error } = await supabase
      .from("executive_decisions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch executive decisions:", error);
      throw new Error(`Failed to fetch executive decisions: ${error.message}`);
    }

    return data || [];
  } catch (error: any) {
    console.error("Error fetching executive decisions:", error);
    return [];
  }
}

/**
 * Fetches unread messages for a specific executive
 */
export async function fetchExecutiveInbox(executiveName: string) {
  const { data, error } = await supabase
    .from("executive_messages")
    .select("*")
    .eq("to_executive", executiveName)
    .eq("status", "unread")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Failed to fetch messages:", error);
    return [];
  }

  return data || [];
}

/**
 * Sends a message to other executives notifying them of recent messages
 */
async function notifyOtherExecutives(
  executiveName: string,
  executiveRole: string,
  messages: any[]
) {
  for (const msg of messages) {
    const notification = messageNotificationTemplate
      .replace("{senderName}", executiveName)
      .replace("{senderRole}", executiveRole)
      .replace("{messageContent}", msg.message_content);

    // Send the notification to the executive who sent the message
    await sendExecutiveMessage(
      executiveName,
      msg.from_executive,
      notification
    );
  }

  // Mark messages as read
  await markMessagesAsRead(executiveName);
}

/**
 * Marks messages as read for a specific executive
 */
async function markMessagesAsRead(executiveName: string) {
  const { error } = await supabase
    .from("executive_messages")
    .update({ status: "read" })
    .eq("to_executive", executiveName)
    .eq("status", "unread");

  if (error) {
    console.error("Failed to mark messages as read:", error);
  }
}

/**
 * Generates a message from one executive to another
 */
export async function generateExecutiveMessage(
  executiveName: string,
  role: string,
  recipientName: string,
  recipientRole: string,
  topic: string
) {
  const prompt = generateMessageTemplate
    .replace("{executiveName}", executiveName)
    .replace("{role}", role)
    .replace("{recipientName}", recipientName)
    .replace("{recipientRole}", recipientRole)
    .replace("{topic}", topic);

  // Call our Supabase edge function to process the prompt
  const { data, error } = await supabase.functions.invoke("generate-text", {
    body: {
      prompt: prompt,
    },
  });

  if (error) {
    console.error("Failed to generate executive message:", error);
    throw new Error(`Failed to generate executive message: ${error.message}`);
  }

  return data.content;
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

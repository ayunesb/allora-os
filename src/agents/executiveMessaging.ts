
import { supabase } from "@/integrations/supabase/client";
import { messageNotificationTemplate, generateMessageTemplate } from "@/agents/promptTemplates";

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
 * Format inbox messages for use in AI prompts
 */
export function formatInboxForPrompt(messages: any[]): string {
  if (!messages || messages.length === 0) {
    return "No unread messages in your inbox.";
  }

  return messages
    .map(
      (msg) => `From: ${msg.from_executive}\nMessage: ${msg.message_content}`
    )
    .join("\n\n");
}

/**
 * Marks messages as read for a specific executive
 */
export async function markMessagesAsRead(executiveName: string) {
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
 * Sends a message to other executives notifying them of recent messages
 */
export async function notifyOtherExecutives(
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
 * Sends a message from one executive to another
 */
export async function sendExecutiveMessage(
  fromExecutive: string,
  toExecutive: string,
  messageContent: string
) {
  const { error } = await supabase
    .from("executive_messages")
    .insert({
      from_executive: fromExecutive,
      to_executive: toExecutive,
      message_content: messageContent,
      status: "unread"
    });

  if (error) {
    console.error("Failed to send executive message:", error);
    throw new Error(`Failed to send executive message: ${error.message}`);
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

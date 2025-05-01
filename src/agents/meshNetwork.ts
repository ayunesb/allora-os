
import { supabase } from "@/integrations/supabase/client";
import { ExecutiveMessage } from "@/types/agents";

/**
 * Fetch messages for a specific executive
 */
export async function fetchMessagesForExecutive(executiveName: string): Promise<ExecutiveMessage[]> {
  try {
    const { data, error } = await supabase
      .from("executive_messages")
      .select("*")
      .or(`from_executive.eq.${executiveName},to_executive.eq.${executiveName}`)
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) {
      console.error("Failed to fetch executive messages:", error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error("Error in fetchMessagesForExecutive:", error);
    return [];
  }
}

/**
 * Format inbox messages for use in AI prompts
 */
export function formatInboxForPrompt(messages: ExecutiveMessage[]): string {
  if (!messages || messages.length === 0) {
    return "No unread messages in your inbox.";
  }

  return messages
    .map(
      (msg) => `From: ${msg.from_executive}\nMessage: ${msg.message_content}`
    )
    .join("\n\n");
}


import { supabase } from "@/integrations/supabase/client";

export interface ExecutiveMessage {
  id: string;
  from_executive: string;
  to_executive: string;
  message_content: string;
  task_link?: string;
  status: string;
  created_at: string;
}

/**
 * Sends a message from one executive to another
 */
export async function sendExecutiveMessage(
  fromExecutive: string,
  toExecutive: string,
  messageContent: string,
  taskLink: string = ""
) {
  const { data, error } = await supabase.from("executive_messages").insert([
    {
      from_executive: fromExecutive,
      to_executive: toExecutive,
      message_content: messageContent,
      task_link: taskLink,
      status: "unread",
    },
  ]);

  if (error) {
    console.error("Failed to send executive message:", error);
    throw new Error(`Failed to send executive message: ${error.message}`);
  }
  
  return data;
}

/**
 * Fetches unread messages for a specific executive
 */
export async function fetchMessagesForExecutive(executiveName: string): Promise<ExecutiveMessage[]> {
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
 * Mark messages as read for a specific executive
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
 * Formats inbox messages for insertion into an AI prompt
 */
export function formatInboxForPrompt(messages: ExecutiveMessage[]): string {
  if (messages.length === 0) {
    return "";
  }

  return messages
    .map((msg) => `From ${msg.from_executive}: "${msg.message_content}"`)
    .join("\n");
}


import { supabase } from "@/integrations/supabase/client";
import { ExecutiveMessage } from "@/types/agents";

// Format inbox messages for prompt
export function formatInboxForPrompt(messages: ExecutiveMessage[]): string {
  if (!messages || messages.length === 0) return "No unread messages in your inbox.";

  return messages.map(msg => 
    `Message from ${msg.from_executive}: ${msg.message_content}`
  ).join('\n\n');
}

// Send a message between executives
export async function sendExecutiveMessage(
  fromExecutive: string,
  toExecutive: string,
  message: string
): Promise<void> {
  try {
    await supabase.from('executive_messages').insert([
      {
        from_executive: fromExecutive,
        to_executive: toExecutive,
        message_content: message,
        status: 'unread'
      }
    ]);
  } catch (error) {
    console.error("Error sending executive message:", error);
    throw error;
  }
}

// Fetch messages for an executive
export async function fetchMessagesForExecutive(
  executiveName: string
): Promise<ExecutiveMessage[]> {
  try {
    const { data, error } = await supabase
      .from('executive_messages')
      .select('*')
      .or(`from_executive.eq.${executiveName},to_executive.eq.${executiveName}`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as ExecutiveMessage[];
  } catch (error) {
    console.error("Error fetching executive messages:", error);
    return [];
  }
}

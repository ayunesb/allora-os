
/**
 * Executive Mesh Network
 * 
 * This module enables AI-to-AI communication between executive agents.
 * It allows executives to send messages to each other and check their inboxes
 * before making decisions, creating a more collaborative AI executive team.
 */
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/loggingService';

export interface ExecutiveMessage {
  id?: string;
  from_executive: string;
  to_executive: string;
  message_content: string;
  task_link?: string;
  status: 'unread' | 'read';
  created_at?: string;
}

/**
 * Send a message from one executive to another
 */
export async function sendExecutiveMessage(
  fromExecutive: string,
  toExecutive: string,
  messageContent: string,
  taskLink: string = ""
): Promise<boolean> {
  try {
    const { error } = await supabase.from("executive_messages").insert([
      {
        from_executive: fromExecutive,
        to_executive: toExecutive,
        message_content: messageContent,
        task_link: taskLink,
        status: "unread",
      },
    ]);

    if (error) {
      logger.error("Failed to send executive message:", error, {
        fromExecutive,
        toExecutive,
        component: 'meshNetwork'
      });
      return false;
    }
    
    logger.info(`Message sent from ${fromExecutive} to ${toExecutive}`, {
      component: 'meshNetwork'
    });
    return true;
  } catch (error) {
    logger.error("Error in sendExecutiveMessage:", error, {
      component: 'meshNetwork'
    });
    return false;
  }
}

/**
 * Fetch unread messages for a specific executive
 */
export async function fetchMessagesForExecutive(executiveName: string): Promise<ExecutiveMessage[]> {
  try {
    const { data, error } = await supabase
      .from("executive_messages")
      .select("*")
      .eq("to_executive", executiveName)
      .eq("status", "unread")
      .order("created_at", { ascending: true });

    if (error) {
      logger.error("Failed to fetch messages:", error, {
        executiveName,
        component: 'meshNetwork'
      });
      return [];
    }

    return data || [];
  } catch (error) {
    logger.error("Error in fetchMessagesForExecutive:", error, {
      executiveName,
      component: 'meshNetwork'
    });
    return [];
  }
}

/**
 * Fetch all messages for a specific executive
 */
export async function fetchAllMessagesForExecutive(
  executiveName: string, 
  limit: number = 20
): Promise<ExecutiveMessage[]> {
  try {
    const { data, error } = await supabase
      .from("executive_messages")
      .select("*")
      .or(`to_executive.eq.${executiveName},from_executive.eq.${executiveName}`)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      logger.error("Failed to fetch all messages:", error, {
        executiveName,
        component: 'meshNetwork'
      });
      return [];
    }

    return data || [];
  } catch (error) {
    logger.error("Error in fetchAllMessagesForExecutive:", error, {
      executiveName,
      component: 'meshNetwork'
    });
    return [];
  }
}

/**
 * Mark messages as read for a specific executive
 */
export async function markMessagesAsRead(executiveName: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("executive_messages")
      .update({ status: "read" })
      .eq("to_executive", executiveName)
      .eq("status", "unread");

    if (error) {
      logger.error("Failed to mark messages as read:", error, {
        executiveName,
        component: 'meshNetwork'
      });
      return false;
    }
    
    return true;
  } catch (error) {
    logger.error("Error in markMessagesAsRead:", error, {
      executiveName,
      component: 'meshNetwork'
    });
    return false;
  }
}

/**
 * Format unread messages for inclusion in executive prompts
 */
export function formatMessagesForPrompt(messages: ExecutiveMessage[]): string {
  if (!messages.length) {
    return "No unread messages.";
  }

  return messages
    .map((msg) => `From ${msg.from_executive}: ${msg.message_content}`)
    .join("\n");
}

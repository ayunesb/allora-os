
import { supabase } from "@/integrations/supabase/client";
import { ExecutiveDecision } from "@/types/agents";

/**
 * Fetches coaching memories for an executive
 */
export async function fetchCoachingMemories(executiveName: string): Promise<string> {
  try {
    const { data, error } = await supabase
      .from("executive_memory")
      .select("*")
      .eq("executive_name", executiveName)
      .ilike("task", "Self-Coaching on:%")
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) {
      console.error("Failed to fetch coaching memories:", error);
      return "No previous coaching memories available.";
    }

    if (!data || data.length === 0) {
      return "No previous coaching notes.";
    }

    return data
      .map((memory) => `Coaching Note on ${memory.task.replace('Self-Coaching on: ', '')}: ${memory.decision}`)
      .join("\n\n");
  } catch (error) {
    console.error("Error fetching coaching memories:", error);
    return "Error retrieving coaching memories.";
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
 * Save decision to executive memory
 */
export async function saveMemory(userId: string, executiveName: string, task: string, decision: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("executive_memory").insert({
      user_id: userId,
      executive_name: executiveName,
      task: task,
      decision: decision,
    });

    if (error) {
      console.error("Error saving to memory:", error);
      return false;
    }

    console.log("Memory saved successfully");
    return true;
  } catch (error) {
    console.error("Failed to save to memory:", error);
    return false;
  }
}

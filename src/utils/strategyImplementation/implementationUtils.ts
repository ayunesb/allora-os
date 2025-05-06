import {
  StrategyMilestone,
  ImplementationStatus,
} from "@/models/strategyImplementation";
import { supabase } from "@/backend/supabase";
import { toast } from "sonner";

// Fetch all milestones for a strategy
export async function fetchStrategyMilestones(
  strategyId: string,
): Promise<StrategyMilestone[]> {
  try {
    const { data, error } = await supabase
      .from("strategy_milestones")
      .select("*")
      .eq("strategyId", strategyId)
      .order("dueDate", { ascending: true });

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error: any) {
    console.error("Error fetching strategy milestones:", error.message);
    return [];
  }
}

// Create a new milestone
export async function createMilestone(
  milestone: Omit<StrategyMilestone, "id" | "created_at">,
): Promise<StrategyMilestone | null> {
  try {
    const { data, error } = await supabase
      .from("strategy_milestones")
      .insert([
        {
          ...milestone,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    toast.success("Milestone created successfully");
    return data;
  } catch (error: any) {
    toast.error(`Failed to create milestone: ${error.message}`);
    return null;
  }
}

// Update a milestone
export async function updateMilestone(
  id: string,
  updates: Partial<Omit<StrategyMilestone, "id" | "created_at">>,
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("strategy_milestones")
      .update(updates)
      .eq("id", id);

    if (error) {
      throw error;
    }

    toast.success("Milestone updated successfully");
    return true;
  } catch (error: any) {
    toast.error(`Failed to update milestone: ${error.message}`);
    return false;
  }
}

// Delete a milestone
export async function deleteMilestone(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("strategy_milestones")
      .delete()
      .eq("id", id);

    if (error) {
      throw error;
    }

    toast.success("Milestone deleted successfully");
    return true;
  } catch (error: any) {
    toast.error(`Failed to delete milestone: ${error.message}`);
    return false;
  }
}

// Calculate overall progress for a strategy based on its milestones
export function calculateStrategyProgress(
  milestones: StrategyMilestone[],
): number {
  if (milestones.length === 0) return 0;

  const totalProgress = milestones.reduce(
    (sum, milestone) => sum + milestone.progress,
    0,
  );
  return Math.round(totalProgress / milestones.length);
}

// Get status color based on implementation status
export function getStatusColor(status: ImplementationStatus): string {
  switch (status) {
    case "not_started":
      return "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200";
    case "in_progress":
      return "bg-blue-100 text-blue-700 dark:bg-blue-800/30 dark:text-blue-300";
    case "completed":
      return "bg-green-100 text-green-700 dark:bg-green-800/30 dark:text-green-300";
    case "delayed":
      return "bg-amber-100 text-amber-700 dark:bg-amber-800/30 dark:text-amber-300";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
  }
}

import { supabase } from "@/backend/supabase";
import { toast } from "sonner";
import { Task } from "@/models/task";

export async function fetchStrategyTasks(strategyId: string): Promise<Task[]> {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("strategy_id", strategyId)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    // Cast the data to ensure it matches the Task type
    return (data || []).map((task) => ({
      ...task,
      status: task.status as Task["status"],
    }));
  } catch (error: any) {
    console.error("Error fetching tasks:", error.message);
    return [];
  }
}

export async function createTask(
  strategyId: string,
  title: string,
  status: "pending" | "in_progress" | "completed" = "pending",
): Promise<Task | null> {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .insert([
        {
          strategy_id: strategyId,
          title,
          status,
        },
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    toast.success("Task created successfully");

    // Cast the data to ensure it matches the Task type
    return data
      ? {
          ...data,
          status: data.status as Task["status"],
        }
      : null;
  } catch (error: any) {
    toast.error(`Failed to create task: ${error.message}`);
    return null;
  }
}

export async function updateTaskStatus(
  taskId: string,
  status: "pending" | "in_progress" | "completed",
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("tasks")
      .update({ status })
      .eq("id", taskId);

    if (error) {
      throw error;
    }

    toast.success("Task status updated successfully");
    return true;
  } catch (error: any) {
    toast.error(`Failed to update task status: ${error.message}`);
    return false;
  }
}

export async function deleteTask(taskId: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("tasks").delete().eq("id", taskId);

    if (error) {
      throw error;
    }

    toast.success("Task deleted successfully");
    return true;
  } catch (error: any) {
    toast.error(`Failed to delete task: ${error.message}`);
    return false;
  }
}

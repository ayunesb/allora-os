import { supabase } from "@/backend/supabase";
import { toast } from "sonner";

/**
 * Deletes a user account and all associated data
 * This is a destructive action that cannot be undone
 */
export async function deleteUserAccount(): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    console.log("Starting account deletion process");

    // Call the Supabase Edge Function that will handle the deletion with admin privileges
    const { data, error } = await supabase.functions.invoke("delete-account", {
      method: "POST",
    });

    if (error) {
      console.error("Error calling delete-account function:", error);
      throw new Error(error.message || "Failed to delete account");
    }

    if (!data.success) {
      throw new Error(data.error || "Failed to delete account");
    }

    // If the deletion was only partial (auth record not deleted), return partial success
    if (data.partial) {
      return {
        success: true,
        error: data.error,
      };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Account deletion failed:", error);
    return {
      success: false,
      error:
        error.message || "An unexpected error occurred during account deletion",
    };
  }
}

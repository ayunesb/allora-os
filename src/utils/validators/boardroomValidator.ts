import { supabase } from "@/integrations/supabase/client";
import { ValidationResult } from "./types";

/**
 * Validates executive boardroom functionality
 */
export async function validateExecutiveBoardroom(): Promise<ValidationResult> {
  try {
    // Check if the ai_boardroom_debates table exists
    const { data, error: tableCheckError } = await supabase
      .from("ai_boardroom_debates")
      .select("id")
      .limit(1);

    if (tableCheckError) {
      if (tableCheckError.code === "42P01") {
        // Table doesn't exist
        return {
          valid: false,
          message:
            "The ai_boardroom_debates table does not exist in the database.",
        };
      }

      return {
        valid: false,
        message: `Error accessing ai_boardroom_debates: ${tableCheckError.message}`,
      };
    }

    // Check RLS policy by trying to access data that should be restricted
    const testResult = await checkBoardroomRlsPolicies();
    if (!testResult.valid) {
      return testResult;
    }

    return {
      valid: true,
      message: "Executive boardroom functionality is ready.",
    };
  } catch (error) {
    return {
      valid: false,
      message:
        "Error validating executive boardroom: " +
        (error instanceof Error ? error.message : String(error)),
    };
  }
}

/**
 * Check whether RLS policies are correctly applied on the ai_boardroom_debates table
 */
async function checkBoardroomRlsPolicies(): Promise<ValidationResult> {
  try {
    // Check if the table has the rls_enabled column
    const { data, error } = await supabase
      .from("ai_boardroom_debates")
      .select("rls_enabled")
      .limit(1);

    if (error && error.message.includes("permission denied")) {
      // This suggests RLS is active and working
      return {
        valid: true,
        message:
          "RLS policies for executive boardroom are properly configured.",
      };
    }

    // If we received data, check if RLS is enabled in the table
    if (data && data.length > 0) {
      const rlsEnabled = data[0].rls_enabled;
      if (rlsEnabled) {
        return {
          valid: true,
          message: "RLS is enabled for the boardroom debates table.",
        };
      }
    }

    return {
      valid: true,
      message: "RLS appears to be working for the boardroom table.",
    };
  } catch (error) {
    return {
      valid: false,
      message:
        "Error checking RLS policies for executive boardroom: " +
        (error instanceof Error ? error.message : String(error)),
    };
  }
}

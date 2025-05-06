import { supabase } from "@/integrations/supabase/client";
import { ValidationResult } from "./types";

/**
 * Validates authentication system
 */
export async function validateUserAuthentication(): Promise<ValidationResult> {
  try {
    // Check if authentication is properly configured
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      return {
        valid: false,
        message: `Authentication error: ${error.message}`,
      };
    }

    // This just validates that the auth API is working, not whether a user is logged in
    return {
      valid: true,
      message: "Authentication system is properly configured.",
    };
  } catch (error) {
    return {
      valid: false,
      message:
        "Error validating authentication: " +
        (error instanceof Error ? error.message : String(error)),
    };
  }
}

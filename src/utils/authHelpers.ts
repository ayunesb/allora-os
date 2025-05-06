import { supabase } from "@/backend/supabase";

export async function resetPassword(
  email: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    // Get the current URL origin (e.g., https://example.com)
    const origin = window.location.origin;
    const redirectTo = `${origin}/update-password`;

    console.log("Sending password reset to:", email);
    console.log("Redirect URL:", redirectTo);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    if (error) {
      console.error("Password reset error:", error);
      throw error;
    }

    return { success: true };
  } catch (error: any) {
    console.error("Reset password error details:", error);
    return {
      success: false,
      error: error.message || "Failed to send reset instructions",
    };
  }
}

export async function updatePassword(
  newPassword: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      throw error;
    }

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to update password",
    };
  }
}

export async function verifyOtp(
  email: string,
  token: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "recovery",
    });

    if (error) {
      throw error;
    }

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to verify OTP",
    };
  }
}

export async function resendVerificationEmail(
  email: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    // Get the current URL origin for the redirect
    const origin = window.location.origin;
    const redirectTo = `${origin}/login`;

    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    if (error) {
      throw error;
    }

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to resend verification email",
    };
  }
}

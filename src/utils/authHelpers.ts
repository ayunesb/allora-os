
import { supabase } from '@/backend/supabase';

export async function resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Get the current URL origin (e.g., https://example.com)
    const origin = window.location.origin;
    const redirectTo = `${origin}/update-password`;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    if (error) {
      throw error;
    }

    return { success: true };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.message || 'Failed to send reset instructions' 
    };
  }
}

export async function updatePassword(newPassword: string): Promise<{ success: boolean; error?: string }> {
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
      error: error.message || 'Failed to update password' 
    };
  }
}

export async function verifyOtp(email: string, token: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'recovery',
    });

    if (error) {
      throw error;
    }

    return { success: true };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.message || 'Failed to verify OTP' 
    };
  }
}

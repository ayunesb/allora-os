
import { supabase } from '@/backend/supabase';

export async function handleSignIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return { success: true };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.message || 'Failed to sign in' 
    };
  }
}

export async function handleSignUp(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return { success: true };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.message || 'Failed to sign up' 
    };
  }
}

export async function handleSignOut() {
  await supabase.auth.signOut();
}

export async function refreshSession() {
  try {
    const { data, error } = await supabase.auth.refreshSession();
    if (error) throw error;
    
    return { session: data.session, user: data.session?.user ?? null };
  } catch (error) {
    console.error('Error refreshing session:', error);
    throw error;
  }
}

export async function sendPasswordResetEmail(email: string) {
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

export async function verifyOtpCode(email: string, token: string) {
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'recovery',
    });

    if (error) {
      throw error;
    }

    return { success: true, session: data.session };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to verify reset code',
    };
  }
}

export async function updateUserPassword(password: string) {
  try {
    const { error } = await supabase.auth.updateUser({
      password,
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

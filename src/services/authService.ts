import { supabase } from '@/integrations/supabase/client';

export async function handleSignIn(email: string, password: string, rememberMe = false) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: {
        // If rememberMe is true, session will be kept until explicitly signed out
        // Otherwise, session expires after browser close (default behavior)
      }
    });

    if (error) {
      throw error;
    }

    // Store user preference for "remember me" in local storage
    if (rememberMe) {
      localStorage.setItem('rememberMe', 'true');
    } else {
      localStorage.removeItem('rememberMe');
    }

    return { success: true };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.message || 'Failed to sign in' 
    };
  }
}

export async function handleGitHubSignIn() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/login`
      }
    });

    if (error) {
      throw error;
    }

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to sign in with GitHub'
    };
  }
}

export async function handleSignUp(email: string, password: string) {
  try {
    // Get the current URL origin for the redirect
    const origin = window.location.origin;
    const redirectTo = `${origin}/login`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectTo
      }
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
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    // Clear any auth related items from storage
    localStorage.removeItem('rememberMe');
    return { success: true };
  } catch (error) {
    console.error('Error signing out:', error);
    return { success: false, error: error.message };
  }
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

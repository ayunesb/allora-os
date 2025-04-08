
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

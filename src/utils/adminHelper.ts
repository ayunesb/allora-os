
import { supabase } from '@/integrations/supabase/client';

/**
 * Checks if the current logged-in user has admin role
 * @returns Promise resolving to boolean indicating if user is admin
 */
export async function checkIfUserIsAdmin(): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return false;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    
    if (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
    
    return data?.role === 'admin';
  } catch (error) {
    console.error('Unexpected error during admin check:', error);
    return false;
  }
}

/**
 * Grants admin privileges to a user by email
 * @param email Email of the user to make admin
 * @returns Promise resolving to boolean indicating success
 */
export async function grantAdminPrivileges(email: string): Promise<boolean> {
  try {
    // First, try to find the user by email
    const { data: userData, error: userError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .single();
    
    if (userError) {
      console.error('Error finding user by email:', userError);
      return false;
    }
    
    if (!userData) {
      console.error('No user found with email:', email);
      return false;
    }
    
    // Update the user's role to admin
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ role: 'admin' })
      .eq('id', userData.id);
    
    if (updateError) {
      console.error('Error updating user role:', updateError);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Unexpected error during admin privilege grant:', error);
    return false;
  }
}

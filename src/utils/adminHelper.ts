
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// The only email allowed to be an admin
const ADMIN_EMAIL = 'ayunesb@icloud.com';

/**
 * Helper function to set the current user as an admin
 * This is useful for development and testing purposes
 */
export async function setCurrentUserAsAdmin(): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("You must be logged in to become an admin");
      return false;
    }
    
    // Check if the user has the authorized email
    if (user.email !== ADMIN_EMAIL) {
      toast.error(`Only ${ADMIN_EMAIL} is authorized to be an admin`);
      return false;
    }
    
    // Update the profile role to admin
    const { error } = await supabase
      .from('profiles')
      .update({ role: 'admin' })
      .eq('id', user.id);
      
    if (error) {
      console.error("Error setting user as admin:", error);
      toast.error("Failed to set user as admin: " + error.message);
      return false;
    }
    
    toast.success("You are now an admin. Please refresh the page.");
    return true;
    
  } catch (error) {
    console.error("Error in setCurrentUserAsAdmin:", error);
    toast.error("An unexpected error occurred");
    return false;
  }
}

/**
 * Check if the current user is an admin
 */
export async function checkIfUserIsAdmin(): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return false;
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
      
    if (error || !data) {
      return false;
    }
    
    return data.role === 'admin';
    
  } catch (error) {
    console.error("Error in checkIfUserIsAdmin:", error);
    return false;
  }
}

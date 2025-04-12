
// Export all the verification utilities
export * from './tableVerification';
export * from './rlsVerification';
export * from './functionVerification';
export * from './displayResults';

// Add a new dedicated function to check if a user is logged in and has admin privileges
export async function checkVerificationAccess() {
  try {
    // Import supabase client
    const { supabase } = await import('@/integrations/supabase/client');
    
    // Check if user is logged in
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      console.log("Database verification: No active session found");
      return { canAccess: false, reason: 'authentication', message: 'You must be logged in to verify database' };
    }
    
    // Check if user has a profile with admin role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();
    
    if (profileError) {
      console.error("Error checking user role:", profileError);
      return { canAccess: false, reason: 'profile', message: 'Could not verify user permissions' };
    }
    
    if (profile?.role !== 'admin') {
      console.log("User does not have admin role:", profile?.role);
      return { canAccess: false, reason: 'permission', message: 'Admin role required for database verification' };
    }
    
    return { canAccess: true };
  } catch (error) {
    console.error("Error checking verification access:", error);
    return { canAccess: false, reason: 'error', message: 'Error checking permissions' };
  }
}


import { supabase } from '@/backend/supabase';
import { User } from '@/models/user';

/**
 * Fetches all users belonging to a specific company
 * @param companyId The company ID to fetch users for
 * @returns Array of User objects
 */
export async function fetchCompanyUsers(companyId: string): Promise<User[]> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, name, company, company_id, role, created_at')
      .eq('company_id', companyId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return (data || []).map(profile => ({
      ...profile,
      email: '', // Add a default empty email since it's required in the User type
      role: profile.role as User['role']
    }));
  } catch (error: any) {
    console.error('Error fetching company users:', error.message);
    return [];
  }
}

/**
 * Helper function to lookup a user by email and handle errors properly
 * @param email User email to lookup
 * @returns User ID or null if not found
 */
export async function getUserIdByEmail(email: string): Promise<string | null> {
  try {
    // Can't directly query auth.users table, so we need a different approach
    // Use the auth API to get user information by email
    const response = await fetch(`${window.location.origin}/api/get-user-by-email?email=${encodeURIComponent(email)}`);
    const data = await response.json();
    
    if (!data.success || !data.userId) {
      console.error('Error finding user by email:', data.error);
      return null;
    }
    
    return data.userId;
  } catch (error) {
    console.error('Unexpected error looking up user by email:', error);
    return null;
  }
}

/**
 * Gets user profile by email with proper error handling and type safety
 * @param email User email to lookup
 * @returns User profile or null if not found
 */
export async function getUserProfileByEmail(email: string): Promise<User | null> {
  try {
    const userId = await getUserIdByEmail(email);
    
    if (!userId) {
      console.error(`No user found with email: ${email}`);
      return null;
    }
    
    // Explicitly select fields without 'email' since it doesn't exist in the profiles table
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('id, name, company, company_id, role, created_at')
      .eq('id', userId)
      .single();
    
    if (profileError) {
      console.error('Error finding user profile:', profileError);
      return null;
    }
    
    // Check if we have valid profile data before continuing
    if (!profileData) {
      return null;
    }
    
    // Create a User object with the profile data and add the email
    return {
      id: profileData.id,
      name: profileData.name,
      company_id: profileData.company_id,
      role: profileData.role as User['role'],
      created_at: profileData.created_at,
      email: email // Add the email from the parameter
    };
  } catch (error) {
    console.error('Unexpected error in getUserProfileByEmail:', error);
    return null;
  }
}

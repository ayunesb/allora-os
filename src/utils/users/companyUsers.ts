
import { supabase } from '@/backend/supabase';
import { toast } from 'sonner';

/**
 * Removes a user from a company by updating their company_id to null
 * @param userId The ID of the user to remove
 * @returns Boolean indicating success
 */
export async function removeUserFromCompany(userId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ company_id: null })
      .eq('id', userId);

    if (error) {
      throw error;
    }

    toast.success('User removed from company');
    return true;
  } catch (error: any) {
    console.error('Error removing user from company:', error.message);
    toast.error(`Failed to remove user: ${error.message}`);
    return false;
  }
}

/**
 * Invites a user to join a company and assigns them a role (DEPRECATED)
 * This is a legacy function that is maintained for backward compatibility.
 * For new code, use the inviteUserToCompany function from invitations.ts instead.
 * 
 * @deprecated Use inviteUserToCompany from invitations.ts instead
 * @param userEmail The email of the user to invite
 * @param companyId The company ID to assign the user to
 * @param role The role to assign to the user
 * @returns Boolean indicating success
 */
export async function assignUserToCompany(
  userEmail: string,
  companyId: string,
  role: 'admin' | 'user' = 'user'
): Promise<boolean> {
  try {
    // This is a simplified version for the demo
    // In production, you would send an email invitation
    const { data: userData, error: userError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', userEmail)
      .single();
    
    if (userError) {
      if (userError.code === 'PGRST116') {
        toast.error(`User with email ${userEmail} not found`);
      } else {
        toast.error(`Error finding user: ${userError.message}`);
      }
      return false;
    }
    
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ 
        company_id: companyId,
        role
      })
      .eq('id', userData.id);
    
    if (updateError) {
      toast.error(`Failed to update user: ${updateError.message}`);
      return false;
    }
    
    toast.success('User successfully added to company');
    return true;
  } catch (error: any) {
    console.error('Error inviting user to company:', error);
    toast.error(`Failed to invite user: ${error.message}`);
    return false;
  }
}

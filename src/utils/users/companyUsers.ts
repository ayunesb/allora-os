
import { supabase } from '@/backend/supabase';
import { toast } from 'sonner';

/**
 * Removes a user from a company
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

    toast.success('User removed from company successfully');
    return true;
  } catch (error: any) {
    toast.error(`Failed to remove user from company: ${error.message}`);
    return false;
  }
}

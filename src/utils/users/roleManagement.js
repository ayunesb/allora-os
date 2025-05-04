import { supabase } from '@/backend/supabase';
import { toast } from 'sonner';
/**
 * Updates a user's role within the system
 * @param userId The ID of the user to update
 * @param role The new role to assign
 * @returns Boolean indicating success
 */
export async function updateUserRole(userId, role) {
    try {
        const { error } = await supabase
            .from('profiles')
            .update({ role })
            .eq('id', userId);
        if (error) {
            throw error;
        }
        toast.success('User role updated successfully');
        return true;
    }
    catch (error) {
        toast.error(`Failed to update user role: ${error.message}`);
        return false;
    }
}

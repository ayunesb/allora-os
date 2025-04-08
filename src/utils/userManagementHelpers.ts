
import { supabase } from '@/backend/supabase';
import { toast } from 'sonner';
import { User } from '@/models/user';

export async function fetchCompanyUsers(companyId: string): Promise<User[]> {
  try {
    const { data, error } = await (supabase
      .from('profiles') as any)
      .select('id, name, company, company_id, role, created_at')
      .eq('company_id', companyId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error: any) {
    console.error('Error fetching company users:', error.message);
    return [];
  }
}

export async function updateUserRole(
  userId: string,
  role: 'admin' | 'user'
): Promise<boolean> {
  try {
    const { error } = await (supabase
      .from('profiles') as any)
      .update({ role })
      .eq('id', userId);

    if (error) {
      throw error;
    }

    toast.success('User role updated successfully');
    return true;
  } catch (error: any) {
    toast.error(`Failed to update user role: ${error.message}`);
    return false;
  }
}

export async function inviteUserToCompany(
  email: string,
  companyId: string,
  role: 'admin' | 'user' = 'user'
): Promise<boolean> {
  try {
    // This would normally send an invitation email via Postmark
    // For now, we'll just show a success message with instructions
    toast.success(`Invitation to ${email} would be sent here. In a real implementation, this would send an email with a signup link that automatically assigns the user to the company.`);
    return true;
  } catch (error: any) {
    toast.error(`Failed to invite user: ${error.message}`);
    return false;
  }
}

export async function removeUserFromCompany(userId: string): Promise<boolean> {
  try {
    const { error } = await (supabase
      .from('profiles') as any)
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

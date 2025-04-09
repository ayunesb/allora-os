
import { supabase } from '@/backend/supabase';
import { toast } from 'sonner';
import { User } from '@/models/user';
import { sendEmail } from '@/backend/postmark';

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

    // Transform the data to match the User type, including adding the required email field
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

export async function updateUserRole(
  userId: string,
  role: 'admin' | 'user'
): Promise<boolean> {
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
    console.log(`Inviting user ${email} to company ${companyId} with role ${role}`);
    
    // Send invitation email using the Postmark service
    const result = await sendEmail({
      to: email,
      subject: 'Invitation to join Allora AI',
      htmlBody: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4f46e5;">You've Been Invited!</h2>
          <p>You've been invited to join a company on Allora AI.</p>
          <p>To accept this invitation, please click the button below to create your account:</p>
          <a href="${window.location.origin}/signup?email=${encodeURIComponent(email)}&company_id=${companyId}&role=${role}" 
             style="display: inline-block; background-color: #4f46e5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin: 20px 0;">
            Accept Invitation
          </a>
          <p>If you have any questions, please contact the company administrator.</p>
          <p>Thank you,<br>The Allora AI Team</p>
        </div>
      `,
      textBody: `
        You've been invited to join a company on Allora AI.
        
        To accept this invitation, please visit this link to create your account:
        ${window.location.origin}/signup?email=${encodeURIComponent(email)}&company_id=${companyId}&role=${role}
        
        If you have any questions, please contact the company administrator.
        
        Thank you,
        The Allora AI Team
      `
    });

    if (!result.success) {
      throw new Error(result.message || 'Failed to send invitation email');
    }

    toast.success(`Invitation sent to ${email}`);
    return true;
  } catch (error: any) {
    console.error('Failed to invite user:', error);
    toast.error(`Failed to invite user: ${error.message}`);
    return false;
  }
}

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

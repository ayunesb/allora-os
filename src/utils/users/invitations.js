import { supabase } from '@/backend/supabase';
import { toast } from 'sonner';
import { sendEmail } from '@/backend/postmark';
/**
 * Invites a user to join a company
 * @param email Email of the user to invite
 * @param companyId ID of the company to invite to
 * @param role Role to assign to the user (default: 'user')
 * @returns Boolean indicating success
 */
export async function inviteUserToCompany(email, companyId, role = 'user') {
    try {
        console.log(`Inviting user ${email} to company ${companyId} with role ${role}`);
        const { data: companyData, error: companyError } = await supabase
            .from('companies')
            .select('name')
            .eq('id', companyId)
            .single();
        if (companyError) {
            throw new Error(`Failed to get company information: ${companyError.message}`);
        }
        const companyName = companyData.name || 'Our Company';
        const result = await sendEmail({
            to: email,
            subject: 'Invitation to join Allora AI',
            companyName,
            htmlBody: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4f46e5;">You've Been Invited!</h2>
          <p>You've been invited to join ${companyName} on Allora AI.</p>
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
        You've been invited to join ${companyName} on Allora AI.
        
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
        console.log('Invitation email sent successfully');
        toast.success(`Invitation sent to ${email}`);
        return true;
    }
    catch (error) {
        console.error('Failed to invite user:', error);
        toast.error(`Failed to invite user: ${error.message}`);
        return false;
    }
}

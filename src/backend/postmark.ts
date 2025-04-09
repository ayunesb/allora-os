
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * Sends an email using Postmark
 * @param to Recipient email address
 * @param subject Email subject
 * @param htmlBody HTML content of the email (optional if using template)
 * @param textBody Plain text content of the email (optional if using template)
 * @param templateId Postmark template ID (optional)
 * @param templateModel Data for the template (optional)
 * @param leadId Lead ID to associate the email with (optional)
 * @returns A promise with the result of the operation
 */
export const sendEmail = async ({
  to,
  subject,
  htmlBody,
  textBody,
  templateId,
  templateModel,
  leadId
}: {
  to: string;
  subject: string;
  htmlBody?: string;
  textBody?: string;
  templateId?: string;
  templateModel?: Record<string, any>;
  leadId?: string;
}): Promise<{
  success: boolean;
  messageId?: string;
  message?: string;
}> => {
  try {
    // Get the current auth session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      console.warn("No session found when sending email. This might be expected for public emails.");
    }

    // Call the Postmark edge function
    const { data, error } = await supabase.functions.invoke(
      "postmark",
      {
        body: {
          action: "send-email",
          to,
          subject,
          htmlBody,
          textBody,
          templateId,
          templateModel,
          leadId
        }
      }
    );

    console.log("Postmark edge function response:", data);

    if (error || !data.success) {
      console.error('Error sending email:', error || data?.message, data?.details);
      toast.error(data?.message || error?.message || 'Failed to send email');
      return { 
        success: false, 
        message: error?.message || data?.message || 'Failed to send email'
      };
    }

    toast.success('Email sent successfully');
    return {
      success: true,
      messageId: data.messageId,
      message: 'Email sent successfully'
    };
  } catch (error) {
    console.error('Failed to send email:', error);
    toast.error('Failed to send email: ' + (error instanceof Error ? error.message : 'Unknown error'));
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Unknown error sending email'
    };
  }
};

/**
 * Sends a campaign email to multiple leads
 * @param campaignId Campaign ID to send emails for
 * @param subject Email subject
 * @param htmlBody HTML content of the email (optional if using template)
 * @param textBody Plain text content of the email (optional if using template)
 * @param templateId Postmark template ID (optional)
 * @param templateModel Data for the template (optional)
 * @param messageType Type of leads to email ('new', 'contacted', 'qualified', 'all', etc.)
 * @returns A promise with the result of the operation
 */
export const sendCampaignEmail = async ({
  campaignId,
  subject,
  htmlBody,
  textBody,
  templateId,
  templateModel,
  messageType = 'all'
}: {
  campaignId: string;
  subject?: string;
  htmlBody?: string;
  textBody?: string;
  templateId?: string;
  templateModel?: Record<string, any>;
  messageType?: string;
}): Promise<{
  success: boolean;
  totalSent?: number;
  totalFailed?: number;
  results?: any[];
  message?: string;
}> => {
  try {
    // Get the current auth session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('Authentication required to send campaign emails');
    }

    // Call the Postmark edge function
    const { data, error } = await supabase.functions.invoke(
      "postmark",
      {
        body: {
          action: "send-campaign",
          campaignId,
          subject,
          htmlBody,
          textBody,
          templateId,
          templateModel,
          messageType
        }
      }
    );

    if (error) {
      console.error('Error sending campaign emails:', error);
      return { 
        success: false, 
        message: error.message
      };
    }

    return {
      success: true,
      totalSent: data.totalSent,
      totalFailed: data.totalFailed,
      results: data.results
    };
  } catch (error) {
    console.error('Failed to send campaign emails:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Unknown error sending campaign emails'
    };
  }
};

import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
export async function sendEmail(to, subject, htmlBody, textBody, leadId) {
    try {
        const { data, error } = await supabase.functions.invoke('postmark', {
            body: { action: 'send-email', to, subject, htmlBody, textBody, leadId }
        });
        if (error)
            throw error;
        if (data.success) {
            toast.success('Email sent successfully');
            return true;
        }
        else {
            throw new Error(data.message || 'Failed to send email');
        }
    }
    catch (error) {
        toast.error(`Email error: ${error.message}`);
        return false;
    }
}
export async function sendTemplateEmail(to, templateId, templateModel, leadId) {
    try {
        const { data, error } = await supabase.functions.invoke('postmark', {
            body: {
                action: 'send-email',
                to,
                subject: '', // Not needed for templates
                templateId,
                templateModel,
                leadId
            }
        });
        if (error)
            throw error;
        if (data.success) {
            toast.success('Email sent successfully');
            return true;
        }
        else {
            throw new Error(data.message || 'Failed to send email');
        }
    }
    catch (error) {
        toast.error(`Email error: ${error.message}`);
        return false;
    }
}
export async function sendCampaignEmails(campaignId, subject, htmlBody, textBody, messageType) {
    try {
        const { data, error } = await supabase.functions.invoke('postmark', {
            body: {
                action: 'send-campaign',
                campaignId,
                subject,
                htmlBody,
                textBody,
                messageType
            }
        });
        if (error)
            throw error;
        if (data.success) {
            toast.success(`Sent ${data.totalSent} emails, failed ${data.totalFailed}`);
            return data;
        }
        else {
            throw new Error(data.message || 'Failed to send campaign emails');
        }
    }
    catch (error) {
        toast.error(`Campaign email error: ${error.message}`);
        return null;
    }
}
export async function sendCampaignTemplateEmails(campaignId, templateId, templateModel, messageType) {
    try {
        const { data, error } = await supabase.functions.invoke('postmark', {
            body: {
                action: 'send-campaign',
                campaignId,
                templateId,
                templateModel,
                messageType
            }
        });
        if (error)
            throw error;
        if (data.success) {
            toast.success(`Sent ${data.totalSent} emails, failed ${data.totalFailed}`);
            return data;
        }
        else {
            throw new Error(data.message || 'Failed to send campaign template emails');
        }
    }
    catch (error) {
        toast.error(`Campaign email error: ${error.message}`);
        return null;
    }
}

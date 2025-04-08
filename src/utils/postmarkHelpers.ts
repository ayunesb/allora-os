
import { supabase } from '@/backend/supabase';
import { toast } from 'sonner';

export async function sendEmail(
  to: string, 
  subject: string, 
  htmlBody?: string, 
  textBody?: string, 
  leadId?: string
) {
  try {
    const { data, error } = await supabase.functions.invoke('postmark', {
      body: { action: 'send-email', to, subject, htmlBody, textBody, leadId }
    });

    if (error) throw error;
    
    if (data.success) {
      toast.success('Email sent successfully');
      return true;
    } else {
      throw new Error(data.message || 'Failed to send email');
    }
  } catch (error: any) {
    toast.error(`Email error: ${error.message}`);
    return false;
  }
}

export async function sendTemplateEmail(
  to: string, 
  templateId: number, 
  templateModel: Record<string, any>, 
  leadId?: string
) {
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

    if (error) throw error;
    
    if (data.success) {
      toast.success('Email sent successfully');
      return true;
    } else {
      throw new Error(data.message || 'Failed to send email');
    }
  } catch (error: any) {
    toast.error(`Email error: ${error.message}`);
    return false;
  }
}

export async function sendCampaignEmails(
  campaignId: string,
  subject: string,
  htmlBody?: string,
  textBody?: string,
  messageType?: 'all' | 'new' | 'contacted' | 'qualified' | 'closed'
) {
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

    if (error) throw error;
    
    if (data.success) {
      toast.success(`Sent ${data.totalSent} emails, failed ${data.totalFailed}`);
      return data;
    } else {
      throw new Error(data.message || 'Failed to send campaign emails');
    }
  } catch (error: any) {
    toast.error(`Campaign email error: ${error.message}`);
    return null;
  }
}

export async function sendCampaignTemplateEmails(
  campaignId: string,
  templateId: number,
  templateModel: Record<string, any>,
  messageType?: 'all' | 'new' | 'contacted' | 'qualified' | 'closed'
) {
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

    if (error) throw error;
    
    if (data.success) {
      toast.success(`Sent ${data.totalSent} emails, failed ${data.totalFailed}`);
      return data;
    } else {
      throw new Error(data.message || 'Failed to send campaign template emails');
    }
  } catch (error: any) {
    toast.error(`Campaign email error: ${error.message}`);
    return null;
  }
}

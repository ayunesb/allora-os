
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type MessageChannel = 'sms' | 'whatsapp';

export async function sendSMS(to: string, body: string, leadId?: string, channel: MessageChannel = 'sms') {
  try {
    const { data, error } = await supabase.functions.invoke('twilio', {
      body: { action: 'send-sms', to, body, leadId, channel }
    });

    if (error) throw error;
    
    if (data.success) {
      const channelName = channel === 'whatsapp' ? 'WhatsApp message' : 'SMS';
      toast.success(`${channelName} sent successfully`);
      return true;
    } else {
      throw new Error(data.message || `Failed to send ${channel}`);
    }
  } catch (error: any) {
    const channelName = channel === 'whatsapp' ? 'WhatsApp' : 'SMS';
    toast.error(`${channelName} error: ${error.message}`);
    return false;
  }
}

export async function sendWhatsApp(to: string, body: string, leadId?: string) {
  return sendSMS(to, body, leadId, 'whatsapp');
}

export async function sendBulkSMS(body: string, messageType: 'all' | 'new' | 'contacted' | 'qualified' | 'closed', channel: MessageChannel = 'sms') {
  try {
    const { data, error } = await supabase.functions.invoke('twilio', {
      body: { action: 'send-bulk-sms', body, messageType, channel }
    });

    if (error) throw error;
    
    if (data.success) {
      const channelName = channel === 'whatsapp' ? 'WhatsApp messages' : 'SMS messages';
      toast.success(`Sent ${data.totalSent} ${channelName}, failed ${data.totalFailed}`);
      return data;
    } else {
      throw new Error(data.message || `Failed to send bulk ${channel}`);
    }
  } catch (error: any) {
    const channelName = channel === 'whatsapp' ? 'WhatsApp' : 'SMS';
    toast.error(`Bulk ${channelName} error: ${error.message}`);
    return null;
  }
}

export async function sendBulkWhatsApp(body: string, messageType: 'all' | 'new' | 'contacted' | 'qualified' | 'closed') {
  return sendBulkSMS(body, messageType, 'whatsapp');
}

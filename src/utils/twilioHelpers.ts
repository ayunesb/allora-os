
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export async function sendSMS(to: string, body: string, leadId?: string) {
  try {
    const { data, error } = await supabase.functions.invoke('twilio', {
      body: { action: 'send-sms', to, body, leadId }
    });

    if (error) throw error;
    
    if (data.success) {
      toast.success('SMS sent successfully');
      return true;
    } else {
      throw new Error(data.message || 'Failed to send SMS');
    }
  } catch (error: any) {
    toast.error(`SMS error: ${error.message}`);
    return false;
  }
}

export async function sendBulkSMS(body: string, messageType: 'all' | 'new' | 'contacted' | 'qualified' | 'closed') {
  try {
    const { data, error } = await supabase.functions.invoke('twilio', {
      body: { action: 'send-bulk-sms', body, messageType }
    });

    if (error) throw error;
    
    if (data.success) {
      toast.success(`Sent ${data.totalSent} messages, failed ${data.totalFailed}`);
      return data;
    } else {
      throw new Error(data.message || 'Failed to send bulk SMS');
    }
  } catch (error: any) {
    toast.error(`Bulk SMS error: ${error.message}`);
    return null;
  }
}

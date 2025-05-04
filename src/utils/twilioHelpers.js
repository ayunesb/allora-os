import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
export async function sendSMS(to, body, leadId, channel = 'sms') {
    try {
        const { data, error } = await supabase.functions.invoke('twilio', {
            body: { action: 'send-sms', to, body, leadId, channel }
        });
        if (error)
            throw error;
        if (data.success) {
            const channelName = channel === 'whatsapp' ? 'WhatsApp message' : 'SMS';
            toast.success(`${channelName} sent successfully`);
            return true;
        }
        else {
            throw new Error(data.message || `Failed to send ${channel}`);
        }
    }
    catch (error) {
        const channelName = channel === 'whatsapp' ? 'WhatsApp' : 'SMS';
        toast.error(`${channelName} error: ${error.message}`);
        return false;
    }
}
export async function sendWhatsApp(to, body, leadId) {
    return sendSMS(to, body, leadId, 'whatsapp');
}
export async function sendBulkSMS(body, messageType, channel = 'sms') {
    try {
        const { data, error } = await supabase.functions.invoke('twilio', {
            body: { action: 'send-bulk-sms', body, messageType, channel }
        });
        if (error)
            throw error;
        if (data.success) {
            const channelName = channel === 'whatsapp' ? 'WhatsApp messages' : 'SMS messages';
            toast.success(`Sent ${data.totalSent} ${channelName}, failed ${data.totalFailed}`);
            return data;
        }
        else {
            throw new Error(data.message || `Failed to send bulk ${channel}`);
        }
    }
    catch (error) {
        const channelName = channel === 'whatsapp' ? 'WhatsApp' : 'SMS';
        toast.error(`Bulk ${channelName} error: ${error.message}`);
        return null;
    }
}
export async function sendBulkWhatsApp(body, messageType) {
    return sendBulkSMS(body, messageType, 'whatsapp');
}
export async function getWhatsAppTemplates() {
    try {
        const { data, error } = await supabase.functions.invoke('twilio', {
            body: { action: 'get-whatsapp-templates' }
        });
        if (error) {
            console.error("Error invoking Twilio function:", error);
            throw new Error(`Error invoking Twilio function: ${error.message}`);
        }
        if (!data.success) {
            console.error("Error from Twilio API:", data.error);
            throw new Error(data.error || "Failed to retrieve WhatsApp templates");
        }
        return data.templates || [];
    }
    catch (error) {
        console.error("WhatsApp template fetch error:", error);
        toast.error(`Error fetching WhatsApp templates: ${error.message}`);
        throw error; // Re-throw to allow caller to handle
    }
}
export async function sendWhatsAppTemplate(to, templateName, variables, leadId) {
    try {
        const { data, error } = await supabase.functions.invoke('twilio', {
            body: { action: 'send-whatsapp-template', to, templateName, variables, leadId }
        });
        if (error)
            throw error;
        if (data.success) {
            toast.success('WhatsApp template sent successfully');
            return true;
        }
        else {
            throw new Error(data.message || 'Failed to send WhatsApp template');
        }
    }
    catch (error) {
        toast.error(`WhatsApp template error: ${error.message}`);
        return false;
    }
}
export async function trackMessageStatus(messageSid) {
    try {
        const { data, error } = await supabase.functions.invoke('twilio', {
            body: { action: 'get-message-status', messageSid }
        });
        if (error)
            throw error;
        return data.status || 'unknown';
    }
    catch (error) {
        console.error(`Error tracking message status: ${error.message}`);
        return 'error';
    }
}

import { supabase } from '@/integrations/supabase/client';
/**
 * Sends an SMS message to a specified phone number with company metadata
 * @param to The phone number to send the SMS to
 * @param body The message content
 * @param companyId The company ID to associate the message with
 * @param leadId Optional lead ID to associate the message with
 * @returns A promise with the result of the operation
 */
export const sendSMS = async (to, body, companyId, leadId) => {
    try {
        // Get the current auth session
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            throw new Error('Authentication required to send SMS');
        }
        // Call the Twilio edge function
        const { data, error } = await supabase.functions.invoke("twilio", {
            body: {
                action: "send-sms",
                to,
                body,
                leadId,
                companyId // Pass company ID for tracking
            }
        });
        if (error || !data.success) {
            console.error('Error sending SMS:', error || data.message);
            return {
                success: false,
                message: error?.message || data?.message || 'Failed to send SMS'
            };
        }
        return {
            success: true,
            message: 'SMS sent successfully',
            sid: data.sid
        };
    }
    catch (error) {
        console.error('Failed to send SMS:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unknown error sending SMS'
        };
    }
};
/**
 * Sends bulk SMS messages to leads in a campaign
 * @param messageType The type of leads to message ('new', 'contacted', 'qualified', 'all', etc.)
 * @param body The message content
 * @param companyId The company ID to associate the messages with
 * @returns A promise with the result of the operation
 */
export const sendBulkSMS = async (messageType, body, companyId) => {
    try {
        // Get the current auth session
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            throw new Error('Authentication required to send bulk SMS');
        }
        // Call the Twilio edge function
        const { data, error } = await supabase.functions.invoke("twilio", {
            body: {
                action: "send-bulk-sms",
                messageType,
                body,
                companyId // Pass company ID for tracking
            }
        });
        if (error) {
            console.error('Error sending bulk SMS:', error);
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
    }
    catch (error) {
        console.error('Failed to send bulk SMS:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unknown error sending bulk SMS'
        };
    }
};

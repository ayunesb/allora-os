var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supabase } from "@/integrations/supabase/client";
/**
 * Sends an SMS message to a specified phone number with company metadata
 * @param to The phone number to send the SMS to
 * @param body The message content
 * @param companyId The company ID to associate the message with
 * @param leadId Optional lead ID to associate the message with
 * @returns A promise with the result of the operation
 */
export const sendSMS = (to, body, companyId, leadId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get the current auth session
        const { data: { session }, } = yield supabase.auth.getSession();
        if (!session) {
            throw new Error("Authentication required to send SMS");
        }
        // Call the Twilio edge function
        const { data, error } = yield supabase.functions.invoke("twilio", {
            body: {
                action: "send-sms",
                to,
                body,
                leadId,
                companyId, // Pass company ID for tracking
            },
        });
        if (error || !data.success) {
            console.error("Error sending SMS:", error || data.message);
            return {
                success: false,
                message: (error === null || error === void 0 ? void 0 : error.message) || (data === null || data === void 0 ? void 0 : data.message) || "Failed to send SMS",
            };
        }
        return {
            success: true,
            message: "SMS sent successfully",
            sid: data.sid,
        };
    }
    catch (error) {
        console.error("Failed to send SMS:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Unknown error sending SMS",
        };
    }
});
/**
 * Sends bulk SMS messages to leads in a campaign
 * @param messageType The type of leads to message ('new', 'contacted', 'qualified', 'all', etc.)
 * @param body The message content
 * @param companyId The company ID to associate the messages with
 * @returns A promise with the result of the operation
 */
export const sendBulkSMS = (messageType, body, companyId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get the current auth session
        const { data: { session }, } = yield supabase.auth.getSession();
        if (!session) {
            throw new Error("Authentication required to send bulk SMS");
        }
        // Call the Twilio edge function
        const { data, error } = yield supabase.functions.invoke("twilio", {
            body: {
                action: "send-bulk-sms",
                messageType,
                body,
                companyId, // Pass company ID for tracking
            },
        });
        if (error) {
            console.error("Error sending bulk SMS:", error);
            return {
                success: false,
                message: error.message,
            };
        }
        return {
            success: true,
            totalSent: data.totalSent,
            totalFailed: data.totalFailed,
            results: data.results,
        };
    }
    catch (error) {
        console.error("Failed to send bulk SMS:", error);
        return {
            success: false,
            message: error instanceof Error
                ? error.message
                : "Unknown error sending bulk SMS",
        };
    }
});

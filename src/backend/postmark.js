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
import { toast } from "sonner";
/**
 * Sends an email using Postmark with company metadata
 * @param to Recipient email address
 * @param subject Email subject
 * @param companyName Company name for tracking and tagging
 * @param htmlBody HTML content of the email (optional if using template)
 * @param textBody Plain text content of the email (optional if using template)
 * @param templateId Postmark template ID (optional)
 * @param templateModel Data for the template (optional)
 * @param leadId Lead ID to associate the email with (optional)
 * @returns A promise with the result of the operation
 */
export const sendEmail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ to, subject, companyName, htmlBody, textBody, templateId, templateModel, leadId, }) {
    try {
        // Get the current auth session
        const { data: { session }, } = yield supabase.auth.getSession();
        if (!session) {
            console.warn("No session found when sending email. This might be expected for public emails.");
        }
        // Call the Postmark edge function
        const { data, error } = yield supabase.functions.invoke("postmark", {
            body: {
                action: "send-email",
                to,
                subject,
                htmlBody,
                textBody,
                templateId,
                templateModel,
                leadId,
                tag: companyName, // Use company name as tag for tracking
            },
        });
        console.log("Postmark edge function response:", data);
        if (error || !data.success) {
            console.error("Error sending email:", error || (data === null || data === void 0 ? void 0 : data.message), data === null || data === void 0 ? void 0 : data.details);
            toast.error((data === null || data === void 0 ? void 0 : data.message) || (error === null || error === void 0 ? void 0 : error.message) || "Failed to send email");
            return {
                success: false,
                message: (error === null || error === void 0 ? void 0 : error.message) || (data === null || data === void 0 ? void 0 : data.message) || "Failed to send email",
            };
        }
        toast.success("Email sent successfully");
        return {
            success: true,
            messageId: data.messageId,
            message: "Email sent successfully",
        };
    }
    catch (error) {
        console.error("Failed to send email:", error);
        toast.error("Failed to send email: " +
            (error instanceof Error ? error.message : "Unknown error"));
        return {
            success: false,
            message: error instanceof Error ? error.message : "Unknown error sending email",
        };
    }
});
/**
 * Sends a campaign email to multiple leads
 * @param campaignId Campaign ID to send emails for
 * @param subject Email subject
 * @param companyName Company name for tracking and tagging
 * @param htmlBody HTML content of the email (optional if using template)
 * @param textBody Plain text content of the email (optional if using template)
 * @param templateId Postmark template ID (optional)
 * @param templateModel Data for the template (optional)
 * @param messageType Type of leads to email ('new', 'contacted', 'qualified', 'all', etc.)
 * @returns A promise with the result of the operation
 */
export const sendCampaignEmail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ campaignId, subject, companyName, htmlBody, textBody, templateId, templateModel, messageType = "all", }) {
    try {
        // Get the current auth session
        const { data: { session }, } = yield supabase.auth.getSession();
        if (!session) {
            throw new Error("Authentication required to send campaign emails");
        }
        // Call the Postmark edge function
        const { data, error } = yield supabase.functions.invoke("postmark", {
            body: {
                action: "send-campaign",
                campaignId,
                subject,
                htmlBody,
                textBody,
                templateId,
                templateModel,
                messageType,
                tag: companyName, // Use company name as tag for tracking
            },
        });
        if (error) {
            console.error("Error sending campaign emails:", error);
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
        console.error("Failed to send campaign emails:", error);
        return {
            success: false,
            message: error instanceof Error
                ? error.message
                : "Unknown error sending campaign emails",
        };
    }
});

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
export function sendEmail(to, subject, htmlBody, textBody, leadId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase.functions.invoke("postmark", {
                body: { action: "send-email", to, subject, htmlBody, textBody, leadId },
            });
            if (error)
                throw error;
            if (data.success) {
                toast.success("Email sent successfully");
                return true;
            }
            else {
                throw new Error(data.message || "Failed to send email");
            }
        }
        catch (error) {
            toast.error(`Email error: ${error.message}`);
            return false;
        }
    });
}
export function sendTemplateEmail(to, templateId, templateModel, leadId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase.functions.invoke("postmark", {
                body: {
                    action: "send-email",
                    to,
                    subject: "", // Not needed for templates
                    templateId,
                    templateModel,
                    leadId,
                },
            });
            if (error)
                throw error;
            if (data.success) {
                toast.success("Email sent successfully");
                return true;
            }
            else {
                throw new Error(data.message || "Failed to send email");
            }
        }
        catch (error) {
            toast.error(`Email error: ${error.message}`);
            return false;
        }
    });
}
export function sendCampaignEmails(campaignId, subject, htmlBody, textBody, messageType) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase.functions.invoke("postmark", {
                body: {
                    action: "send-campaign",
                    campaignId,
                    subject,
                    htmlBody,
                    textBody,
                    messageType,
                },
            });
            if (error)
                throw error;
            if (data.success) {
                toast.success(`Sent ${data.totalSent} emails, failed ${data.totalFailed}`);
                return data;
            }
            else {
                throw new Error(data.message || "Failed to send campaign emails");
            }
        }
        catch (error) {
            toast.error(`Campaign email error: ${error.message}`);
            return null;
        }
    });
}
export function sendCampaignTemplateEmails(campaignId, templateId, templateModel, messageType) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase.functions.invoke("postmark", {
                body: {
                    action: "send-campaign",
                    campaignId,
                    templateId,
                    templateModel,
                    messageType,
                },
            });
            if (error)
                throw error;
            if (data.success) {
                toast.success(`Sent ${data.totalSent} emails, failed ${data.totalFailed}`);
                return data;
            }
            else {
                throw new Error(data.message || "Failed to send campaign template emails");
            }
        }
        catch (error) {
            toast.error(`Campaign email error: ${error.message}`);
            return null;
        }
    });
}

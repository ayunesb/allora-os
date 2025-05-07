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
export function sendSMS(to_1, body_1, leadId_1) {
    return __awaiter(this, arguments, void 0, function* (to, body, leadId, channel = "sms") {
        try {
            const { data, error } = yield supabase.functions.invoke("twilio", {
                body: { action: "send-sms", to, body, leadId, channel },
            });
            if (error)
                throw error;
            if (data.success) {
                const channelName = channel === "whatsapp" ? "WhatsApp message" : "SMS";
                toast.success(`${channelName} sent successfully`);
                return true;
            }
            else {
                throw new Error(data.message || `Failed to send ${channel}`);
            }
        }
        catch (error) {
            const channelName = channel === "whatsapp" ? "WhatsApp" : "SMS";
            toast.error(`${channelName} error: ${error.message}`);
            return false;
        }
    });
}
export function sendWhatsApp(to, body, leadId) {
    return __awaiter(this, void 0, void 0, function* () {
        return sendSMS(to, body, leadId, "whatsapp");
    });
}
export function sendBulkSMS(body_1, messageType_1) {
    return __awaiter(this, arguments, void 0, function* (body, messageType, channel = "sms") {
        try {
            const { data, error } = yield supabase.functions.invoke("twilio", {
                body: { action: "send-bulk-sms", body, messageType, channel },
            });
            if (error)
                throw error;
            if (data.success) {
                const channelName = channel === "whatsapp" ? "WhatsApp messages" : "SMS messages";
                toast.success(`Sent ${data.totalSent} ${channelName}, failed ${data.totalFailed}`);
                return data;
            }
            else {
                throw new Error(data.message || `Failed to send bulk ${channel}`);
            }
        }
        catch (error) {
            const channelName = channel === "whatsapp" ? "WhatsApp" : "SMS";
            toast.error(`Bulk ${channelName} error: ${error.message}`);
            return null;
        }
    });
}
export function sendBulkWhatsApp(body, messageType) {
    return __awaiter(this, void 0, void 0, function* () {
        return sendBulkSMS(body, messageType, "whatsapp");
    });
}
export function getWhatsAppTemplates() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase.functions.invoke("twilio", {
                body: { action: "get-whatsapp-templates" },
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
    });
}
export function sendWhatsAppTemplate(to, templateName, variables, leadId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase.functions.invoke("twilio", {
                body: {
                    action: "send-whatsapp-template",
                    to,
                    templateName,
                    variables,
                    leadId,
                },
            });
            if (error)
                throw error;
            if (data.success) {
                toast.success("WhatsApp template sent successfully");
                return true;
            }
            else {
                throw new Error(data.message || "Failed to send WhatsApp template");
            }
        }
        catch (error) {
            toast.error(`WhatsApp template error: ${error.message}`);
            return false;
        }
    });
}
export function trackMessageStatus(messageSid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase.functions.invoke("twilio", {
                body: { action: "get-message-status", messageSid },
            });
            if (error)
                throw error;
            return data.status || "unknown";
        }
        catch (error) {
            console.error(`Error tracking message status: ${error.message}`);
            return "error";
        }
    });
}

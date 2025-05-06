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
import { messageNotificationTemplate, generateMessageTemplate, } from "@/agents/promptTemplates";
/**
 * Fetches unread messages for a specific executive
 */
export function fetchExecutiveInbox(executiveName) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabase
            .from("executive_messages")
            .select("*")
            .eq("to_executive", executiveName)
            .eq("status", "unread")
            .order("created_at", { ascending: true });
        if (error) {
            console.error("Failed to fetch messages:", error);
            return [];
        }
        return data || [];
    });
}
/**
 * Format inbox messages for use in AI prompts
 */
export function formatInboxForPrompt(messages) {
    if (!messages || messages.length === 0) {
        return "No unread messages in your inbox.";
    }
    return messages
        .map((msg) => `From: ${msg.from_executive}\nMessage: ${msg.message_content}`)
        .join("\n\n");
}
/**
 * Marks messages as read for a specific executive
 */
export function markMessagesAsRead(executiveName) {
    return __awaiter(this, void 0, void 0, function* () {
        const { error } = yield supabase
            .from("executive_messages")
            .update({ status: "read" })
            .eq("to_executive", executiveName)
            .eq("status", "unread");
        if (error) {
            console.error("Failed to mark messages as read:", error);
        }
    });
}
/**
 * Sends a message to other executives notifying them of recent messages
 */
export function notifyOtherExecutives(executiveName, executiveRole, messages) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const msg of messages) {
            const notification = messageNotificationTemplate
                .replace("{senderName}", executiveName)
                .replace("{senderRole}", executiveRole)
                .replace("{messageContent}", msg.message_content);
            // Send the notification to the executive who sent the message
            yield sendExecutiveMessage(executiveName, msg.from_executive, notification);
        }
        // Mark messages as read
        yield markMessagesAsRead(executiveName);
    });
}
/**
 * Sends a message from one executive to another
 */
export function sendExecutiveMessage(fromExecutive, toExecutive, messageContent) {
    return __awaiter(this, void 0, void 0, function* () {
        const { error } = yield supabase.from("executive_messages").insert({
            from_executive: fromExecutive,
            to_executive: toExecutive,
            message_content: messageContent,
            status: "unread",
        });
        if (error) {
            console.error("Failed to send executive message:", error);
            throw new Error(`Failed to send executive message: ${error.message}`);
        }
    });
}
/**
 * Generates a message from one executive to another
 */
export function generateExecutiveMessage(executiveName, role, recipientName, recipientRole, topic) {
    return __awaiter(this, void 0, void 0, function* () {
        const prompt = generateMessageTemplate
            .replace("{executiveName}", executiveName)
            .replace("{role}", role)
            .replace("{recipientName}", recipientName)
            .replace("{recipientRole}", recipientRole)
            .replace("{topic}", topic);
        // Call our Supabase edge function to process the prompt
        const { data, error } = yield supabase.functions.invoke("generate-text", {
            body: {
                prompt: prompt,
            },
        });
        if (error) {
            console.error("Failed to generate executive message:", error);
            throw new Error(`Failed to generate executive message: ${error.message}`);
        }
        return data.content;
    });
}

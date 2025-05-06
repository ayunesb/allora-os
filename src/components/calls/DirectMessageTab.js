var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { MessageSquare, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { sendWhatsApp } from "@/utils/twilioHelpers";
export default function DirectMessageTab({ phoneNumber, selectedLeadId, onMessageSent, isLoadingMutation, }) {
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const handleSendMessage = () => __awaiter(this, void 0, void 0, function* () {
        if (!phoneNumber.trim()) {
            toast.error("Please enter a valid phone number");
            return;
        }
        if (!message.trim()) {
            toast.error("Please enter a message");
            return;
        }
        const formattedNumber = phoneNumber.replace(/[^0-9+]/g, "");
        setIsSending(true);
        try {
            const sentViaApi = yield sendWhatsApp(formattedNumber, message, selectedLeadId);
            if (!sentViaApi) {
                window.open(`https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`, "_blank");
                if (selectedLeadId) {
                    const communicationData = {
                        type: "whatsapp",
                        status: "completed",
                        notes: message,
                        metadata: { initial_message: message, sent_via: "web_link" },
                    };
                    const { error } = yield onMessageSent(communicationData);
                    if (error) {
                        console.error("Error saving communication data:", error.message);
                        toast.error("Failed to save communication data");
                    }
                }
            }
            setMessage("");
            toast.success("WhatsApp message processed");
        }
        catch (error) {
            console.error("Error with WhatsApp message:", error);
            toast.error("Failed to send WhatsApp message");
        }
        finally {
            setIsSending(false);
        }
    });
    const handleOpenWhatsAppWeb = () => {
        const formattedNumber = phoneNumber.replace(/[^0-9+]/g, "");
        window.open(`https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`, "_blank");
    };
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "whatsapp-message", children: "Message" }), _jsx(Textarea, { id: "whatsapp-message", placeholder: "Type your message here...", value: message, onChange: (e) => setMessage(e.target.value), rows: 4 })] }), _jsxs("div", { className: "flex space-x-2", children: [_jsx(Button, { onClick: handleSendMessage, disabled: isSending || isLoadingMutation || !phoneNumber || !message, className: "flex-1", children: isSending ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Sending..."] })) : (_jsxs(_Fragment, { children: [_jsx(Send, { className: "mr-2 h-4 w-4" }), "Send via Twilio"] })) }), _jsxs(Button, { variant: "outline", onClick: handleOpenWhatsAppWeb, disabled: !phoneNumber || !message, children: [_jsx(MessageSquare, { className: "mr-2 h-4 w-4" }), "Open WhatsApp"] })] })] }));
}

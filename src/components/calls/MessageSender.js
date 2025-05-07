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
import { Send as SendIcon, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { sendSMS } from "@/utils/twilioHelpers";
import { toast } from "sonner";
import { useSelfLearning } from "@/hooks/useSelfLearning";
import { useAuthState } from "@/hooks/useAuthState";
export default function MessageSender({ phoneNumber, onPhoneNumberChange }) {
    const [message, setMessage] = useState("");
    const [isSendingMessage, setIsSendingMessage] = useState(false);
    const { user } = useAuthState();
    const { trackAction } = useSelfLearning();
    const handleSendMessage = () => __awaiter(this, void 0, void 0, function* () {
        if (!phoneNumber.trim()) {
            toast.error("Please enter a valid phone number");
            return;
        }
        if (!message.trim()) {
            toast.error("Please enter a message");
            return;
        }
        setIsSendingMessage(true);
        try {
            if (user === null || user === void 0 ? void 0 : user.id) {
                trackAction("send_sms", "message_send", phoneNumber, "sms_message", {
                    phoneNumber,
                    messageLength: message.length,
                });
            }
            const result = yield sendSMS(phoneNumber, message);
            if (result) {
                toast.success("Message sent successfully");
                setMessage("");
            }
        }
        catch (error) {
            console.error("SMS error:", error);
            toast.error("Failed to send message");
        }
        finally {
            setIsSendingMessage(false);
        }
    });
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Send SMS" }), _jsx(CardDescription, { children: "Send text messages to leads" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "sms-phone", children: "Phone Number" }), _jsx(Input, { id: "sms-phone", placeholder: "+1 (555) 123-4567", value: phoneNumber, onChange: (e) => onPhoneNumberChange(e.target.value) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "sms-message", children: "Message" }), _jsxs("div", { className: "flex flex-col space-y-2", children: [_jsx("textarea", { id: "sms-message", rows: 3, className: "min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background", placeholder: "Enter your message here...", value: message, onChange: (e) => setMessage(e.target.value) }), _jsx(Button, { onClick: handleSendMessage, disabled: isSendingMessage, className: "self-end", children: isSendingMessage ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Sending..."] })) : (_jsxs(_Fragment, { children: [_jsx(SendIcon, { className: "mr-2 h-4 w-4" }), "Send"] })) })] })] })] })] }));
}

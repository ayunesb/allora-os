import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
export const ChatInput = ({ onSendMessage, isLoading = false, placeholder = "Type your message...", }) => {
    const [message, setMessage] = useState("");
    const handleChange = (e) => {
        setMessage(e.target.value);
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };
    const handleSendMessage = () => {
        if (message.trim() && !isLoading) {
            onSendMessage(message);
            setMessage("");
        }
    };
    return (_jsxs("div", { className: "relative", children: [_jsx(Textarea, { value: message, onChange: handleChange, onKeyDown: handleKeyDown, placeholder: placeholder, className: "pr-12 resize-none min-h-[80px]", disabled: isLoading }), _jsxs(Button, { size: "icon", className: "absolute bottom-2 right-2", onClick: handleSendMessage, disabled: !message.trim() || isLoading, children: [isLoading ? (_jsx(Loader2, { className: "h-4 w-4 animate-spin" })) : (_jsx(Send, { className: "h-4 w-4" })), _jsx("span", { className: "sr-only", children: "Send message" })] })] }));
};

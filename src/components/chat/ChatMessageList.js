import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
export const ChatMessageList = ({ messages, isTyping = false, onClearChat, }) => {
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        var _a;
        (_a = messagesEndRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    if (messages.length === 0) {
        return (_jsx("div", { className: "h-[400px] flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-muted-foreground mb-2", children: "No messages yet" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Start the conversation by sending a message" })] }) }));
    }
    return (_jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute top-0 right-0", children: _jsx(Button, { variant: "ghost", size: "icon", onClick: onClearChat, className: "text-muted-foreground hover:text-foreground", children: _jsx(Trash2, { size: 16 }) }) }), _jsxs("div", { className: "space-y-4 mt-2 max-h-[400px] overflow-y-auto pr-2", children: [messages.map((message) => (_jsx("div", { className: `flex ${message.sender === "user" ? "justify-end" : "justify-start"}`, children: _jsxs("div", { className: `max-w-[80%] px-4 py-2 rounded-lg ${message.sender === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"}`, children: [message.text, _jsx("div", { className: `text-xs mt-1 ${message.sender === "user"
                                        ? "text-primary-foreground/70"
                                        : "text-muted-foreground"}`, children: new Date(message.timestamp).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    }) })] }) }, message.id))), isTyping && (_jsx("div", { className: "flex justify-start", children: _jsx("div", { className: "max-w-[80%] px-4 py-2 rounded-lg bg-muted", children: _jsxs("div", { className: "flex gap-1 items-center h-6", children: [_jsx(Skeleton, { className: "h-2 w-2 rounded-full animate-pulse" }), _jsx(Skeleton, { className: "h-2 w-2 rounded-full animate-pulse delay-75" }), _jsx(Skeleton, { className: "h-2 w-2 rounded-full animate-pulse delay-150" })] }) }) })), _jsx("div", { ref: messagesEndRef })] })] }));
};

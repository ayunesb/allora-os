import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
const BotChatPanel = ({ children, variant = "default", size = "medium", botId, bot, selectedBot, onSelectBot, allBots, }) => {
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    // Use botId if provided or use selectedBot if available
    const activeBotName = (selectedBot === null || selectedBot === void 0 ? void 0 : selectedBot.name) || (bot === null || bot === void 0 ? void 0 : bot.name) || "Bot";
    const handleSend = () => {
        if (!message.trim())
            return;
        // Add user message to chat
        const userMessage = {
            id: Date.now().toString(),
            content: message,
            isUser: true,
        };
        setChatHistory([...chatHistory, userMessage]);
        // Clear input
        setMessage("");
        // Simulate bot response
        setTimeout(() => {
            const botMessage = {
                id: (Date.now() + 1).toString(),
                content: `This is a response from ${activeBotName}`,
                isUser: false,
            };
            setChatHistory((prev) => [...prev, botMessage]);
        }, 1000);
    };
    return (_jsxs(Card, { className: "flex flex-col h-full", children: [_jsx(CardHeader, { className: "pb-3", children: _jsxs(CardTitle, { className: "text-lg font-medium", children: [activeBotName, " ", (bot === null || bot === void 0 ? void 0 : bot.title) ? `- ${bot.title}` : ""] }) }), _jsx(CardContent, { className: "flex-1 overflow-auto pb-6", children: _jsxs("div", { className: "space-y-4", children: [chatHistory.map((msg) => (_jsx("div", { className: `p-3 rounded-lg max-w-[80%] ${msg.isUser
                                ? "bg-primary text-primary-foreground ml-auto"
                                : "bg-muted text-muted-foreground"}`, children: msg.content }, msg.id))), chatHistory.length === 0 && (_jsxs("div", { className: "text-center text-muted-foreground py-8", children: ["Start a conversation with ", activeBotName] }))] }) }), _jsx("div", { className: "p-4 border-t", children: _jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { value: message, onChange: (e) => setMessage(e.target.value), placeholder: "Type a message...", className: "flex-1", onKeyDown: (e) => e.key === "Enter" && handleSend() }), _jsx(Button, { size: "icon", onClick: handleSend, children: _jsx(Send, { className: "h-4 w-4" }) })] }) })] }));
};
export default BotChatPanel;

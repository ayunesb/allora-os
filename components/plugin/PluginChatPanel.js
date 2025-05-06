var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import Message from "./Message";
import { usePlugin } from "@/hooks/usePlugin";
const PluginChatPanel = ({ pluginId }) => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const { plugin } = usePlugin(pluginId);
    const bottomRef = useRef(null);
    useEffect(() => {
        var _a;
        (_a = bottomRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    const sendMessage = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!input.trim())
            return;
        const userMessage = {
            id: crypto.randomUUID(),
            sender: "user",
            message: input,
            created_at: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);
        try {
            const res = yield fetch("/api/plugin-chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage.message, pluginId }),
            });
            const data = yield res.json();
            setMessages((prev) => [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    sender: "agent",
                    message: data.response.message,
                    created_at: new Date().toISOString(),
                },
            ]);
        }
        catch (error) {
            console.error("Failed to send message:", error);
        }
        finally {
            setLoading(false);
        }
    });
    return (_jsxs("div", { className: "flex flex-col h-full", children: [_jsxs("div", { className: "flex-1 overflow-y-auto p-4", children: [messages.map((msg) => (_jsx(Message, { message: msg }, msg.id))), _jsx("div", { ref: bottomRef })] }), _jsx("div", { className: "p-4 border-t border-border", children: _jsx("input", { type: "text", value: input, onChange: (e) => setInput(e.target.value), onKeyPress: (e) => {
                        if (e.key === "Enter")
                            sendMessage();
                    }, className: "w-full p-2 border border-border rounded-lg", placeholder: "Type a message...", disabled: loading }) })] }));
};
export default PluginChatPanel;

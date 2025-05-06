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
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchMessagesForExecutive } from "@/agents/meshNetwork";
import { useAuth } from "@/context/AuthContext";
export const ExecutiveMessages = ({ executiveName, executiveRole, avatarUrl, }) => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();
    useEffect(() => {
        const loadMessages = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                setIsLoading(true);
                const executiveMessages = yield fetchMessagesForExecutive(executiveName);
                setMessages(executiveMessages);
            }
            catch (error) {
                console.error("Failed to fetch executive messages:", error);
            }
            finally {
                setIsLoading(false);
            }
        });
        loadMessages();
    }, [executiveName]);
    const getInitials = (name) => {
        return name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .toUpperCase();
    };
    return (_jsxs(Card, { className: "w-full", children: [_jsxs(CardHeader, { className: "pb-2", children: [_jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: ["Messages", messages.filter((m) => !m.read).length > 0 && (_jsx(Badge, { variant: "destructive", className: "rounded-full h-5 min-w-5 flex items-center justify-center p-1", children: messages.filter((m) => !m.read).length }))] }), _jsx(CardDescription, { children: "Communications with other executives" })] }), _jsx(CardContent, { children: isLoading ? (_jsx("div", { className: "flex items-center justify-center p-6", children: _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" }) })) : messages.length > 0 ? (_jsx(ScrollArea, { className: "h-[320px] pr-4", children: _jsx("div", { className: "space-y-4", children: messages.map((message) => (_jsxs("div", { className: `flex gap-3 ${!message.read ? "bg-primary/5 p-2 rounded-md" : ""}`, children: [_jsxs(Avatar, { className: "h-8 w-8", children: [_jsx(AvatarImage, { src: message.from === executiveName ? avatarUrl : undefined }), _jsx(AvatarFallback, { children: getInitials(message.from) })] }), _jsxs("div", { className: "space-y-1 flex-1", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("p", { className: "text-sm font-medium", children: message.from }), _jsx("time", { className: "text-xs text-muted-foreground", children: new Date(message.timestamp).toLocaleDateString() })] }), _jsx("p", { className: "text-sm text-muted-foreground", children: message.content })] })] }, message.id))) }) })) : (_jsxs("div", { className: "text-center p-6 text-muted-foreground", children: [_jsx("p", { children: "No messages yet" }), _jsx(Button, { variant: "outline", size: "sm", className: "mt-2", onClick: () => {
                                // Placeholder for message generation
                                console.log("Generate sample message");
                            }, children: "Generate Introduction" })] })) })] }));
};
export default ExecutiveMessages;

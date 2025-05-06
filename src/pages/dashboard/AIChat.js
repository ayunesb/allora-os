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
import { PageTitle } from "@/components/ui/typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Send, Mic, RefreshCw, ThumbsUp, ThumbsDown, } from "lucide-react";
import { toast } from "sonner";
import { useApiClient } from "@/utils/api/apiClientEnhanced";
const AIChat = ({ children, executiveName, executiveRole, messages, }) => {
    const [inputMessage, setInputMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("ceo");
    const messagesEndRef = useRef(null);
    const { execute } = useApiClient();
    const executives = {
        ceo: {
            id: "1",
            name: "Alex Chen",
            role: "CEO",
            avatarUrl: "/assets/executives/ceo-avatar.png",
        },
        cfo: {
            id: "2",
            name: "Morgan Patel",
            role: "CFO",
            avatarUrl: "/assets/executives/cfo-avatar.png",
        },
        cmo: {
            id: "3",
            name: "Sarah Johnson",
            role: "CMO",
            avatarUrl: "/assets/executives/cmo-avatar.png",
        },
        cto: {
            id: "4",
            name: "David Miller",
            role: "CTO",
            avatarUrl: "/assets/executives/cto-avatar.png",
        },
    };
    const activeExecutive = executives[activeTab];
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    const scrollToBottom = () => {
        var _a;
        (_a = messagesEndRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
    };
    const handleSendMessage = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!inputMessage.trim())
            return;
        const userMessage = {
            id: Date.now().toString(),
            content: inputMessage,
            role: "user",
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMessage]);
        setInputMessage("");
        // Add loading message
        const loadingMessageId = Date.now().toString() + "-loading";
        const loadingMessage = {
            id: loadingMessageId,
            content: "Thinking...",
            role: "assistant",
            timestamp: new Date(),
            executiveName: activeExecutive.name,
            executiveRole: activeExecutive.role,
            isLoading: true,
        };
        setIsLoading(true);
        setMessages((prev) => [...prev, loadingMessage]);
        try {
            // Simulate API call to get AI response
            // In a real implementation, this would call your backend
            setTimeout(() => {
                // Remove loading message and add actual response
                setMessages((prev) => prev.filter((m) => m.id !== loadingMessageId));
                const response = {
                    id: Date.now().toString(),
                    content: generateResponse(inputMessage, activeExecutive),
                    role: "assistant",
                    timestamp: new Date(),
                    executiveName: activeExecutive.name,
                    executiveRole: activeExecutive.role,
                };
                setMessages((prev) => [...prev, response]);
                setIsLoading(false);
            }, 1500);
            // For a real implementation with your API:
            /*
                  const response = await execute<{response: string}>('/api/chat', 'POST', {
                    message: inputMessage,
                    executiveId: activeExecutive.id
                  });
                  
                  setMessages(prev => prev.filter(m => m.id !== loadingMessageId));
                  
                  const aiMessage: Message = {
                    id: Date.now().toString(),
                    content: response.response,
                    role: 'assistant',
                    timestamp: new Date(),
                    executiveName: activeExecutive.name,
                    executiveRole: activeExecutive.role
                  };
                  
                  setMessages(prev => [...prev, aiMessage]);
                  */
        }
        catch (error) {
            console.error("Failed to get response:", error);
            toast.error("Failed to get response from AI executive.");
            setMessages((prev) => prev.filter((m) => m.id !== loadingMessageId));
        }
        finally {
            setIsLoading(false);
        }
    });
    const generateResponse = (message, executive) => {
        // This is a placeholder. In a real app, this would come from your AI backend
        const responses = {
            ceo: [
                "Based on our strategic direction, I'd recommend focusing on market expansion while maintaining our core values.",
                "Let's approach this challenge by leveraging our organizational strengths and addressing our weaknesses head-on.",
                "I see significant potential in this opportunity. Let's assemble a cross-functional team to explore it further.",
            ],
            cfo: [
                "From a financial perspective, we should consider the ROI and cash flow implications before proceeding.",
                "Our quarterly projections indicate we have capacity for this investment if we adjust our spending in Q3.",
                "I recommend a phased approach to minimize financial risk while testing market response.",
            ],
            cmo: [
                "Our target audience would respond positively to this messaging based on our recent market research.",
                "I suggest we position this offering as premium in our existing markets before expanding to new segments.",
                "This aligns well with our brand values and would complement our current marketing initiatives.",
            ],
            cto: [
                "We can implement this using our existing technology stack with minimal additional resources.",
                "From a technical standpoint, we should consider scalability and security implications first.",
                "I recommend developing an MVP to test key assumptions before committing to a full implementation.",
            ],
        };
        const roleResponses = responses[executive.id === "1"
            ? "ceo"
            : executive.id === "2"
                ? "cfo"
                : executive.id === "3"
                    ? "cmo"
                    : "cto"];
        return roleResponses[Math.floor(Math.random() * roleResponses.length)];
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };
    const provideFeedback = (messageId, isPositive) => {
        toast.success(`${isPositive ? "Positive" : "Negative"} feedback recorded. Thank you!`);
        // Here you would typically send this feedback to your API
    };
    return (_jsxs("div", { className: "container px-4 py-6 h-full flex flex-col", children: [_jsx(PageTitle, { title: "AI Executive Chat", description: "Chat with your AI executives for strategic insights and guidance" }), _jsx("div", { className: "mt-6 flex-1 flex flex-col gap-4 h-full", children: _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "w-full", children: [_jsxs(TabsList, { className: "grid grid-cols-4 mb-4", children: [_jsx(TabsTrigger, { value: "ceo", children: "CEO" }), _jsx(TabsTrigger, { value: "cfo", children: "CFO" }), _jsx(TabsTrigger, { value: "cmo", children: "CMO" }), _jsx(TabsTrigger, { value: "cto", children: "CTO" })] }), _jsxs(Card, { className: "flex-1 flex flex-col h-[calc(100vh-260px)]", children: [_jsx(CardHeader, { className: "pb-2 border-b", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Avatar, { className: "h-8 w-8", children: [_jsx(AvatarImage, { src: activeExecutive.avatarUrl }), _jsx(AvatarFallback, { children: activeExecutive.name.charAt(0) })] }), _jsx("div", { children: _jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [activeExecutive.name, _jsxs("span", { className: "text-sm font-normal text-muted-foreground", children: ["\u2022 ", activeExecutive.role] })] }) })] }) }), _jsx(CardContent, { className: "flex-1 overflow-auto py-4 px-4", children: messages.length === 0 ? (_jsx("div", { className: "h-full flex items-center justify-center text-center", children: _jsxs("div", { className: "max-w-md", children: [_jsx(MessageSquare, { className: "h-12 w-12 mx-auto mb-4 text-muted-foreground/50" }), _jsxs("h3", { className: "text-lg font-medium mb-2", children: ["Chat with ", activeExecutive.name] }), _jsxs("p", { className: "text-sm text-muted-foreground", children: ["Start a conversation with your ", activeExecutive.role, " to get strategic insights and guidance tailored to your business."] })] }) })) : (_jsxs("div", { className: "space-y-4", children: [messages.map((message) => {
                                                var _a;
                                                return (_jsx("div", { className: `flex ${message.role === "user" ? "justify-end" : "justify-start"}`, children: _jsxs("div", { className: `max-w-[80%] rounded-lg px-4 py-2 ${message.role === "user"
                                                            ? "bg-primary text-primary-foreground"
                                                            : "bg-muted"}`, children: [message.role === "assistant" && (_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsxs(Avatar, { className: "h-6 w-6", children: [_jsx(AvatarImage, { src: activeExecutive.avatarUrl }), _jsx(AvatarFallback, { children: (_a = message.executiveName) === null || _a === void 0 ? void 0 : _a.charAt(0) })] }), _jsx("span", { className: "text-xs font-semibold", children: message.executiveName }), _jsxs("span", { className: "text-xs text-muted-foreground", children: ["\u2022 ", message.executiveRole] })] })), _jsx("div", { className: "text-sm", children: message.isLoading ? (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(RefreshCw, { className: "h-4 w-4 animate-spin" }), _jsx("span", { children: message.content })] })) : (message.content) }), message.role === "assistant" && !message.isLoading && (_jsxs("div", { className: "flex justify-end gap-1 mt-1", children: [_jsx(Button, { variant: "ghost", size: "icon", className: "h-6 w-6", onClick: () => provideFeedback(message.id, true), children: _jsx(ThumbsUp, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "ghost", size: "icon", className: "h-6 w-6", onClick: () => provideFeedback(message.id, false), children: _jsx(ThumbsDown, { className: "h-4 w-4" }) })] }))] }) }, message.id));
                                            }), _jsx("div", { ref: messagesEndRef })] })) }), _jsx("div", { className: "p-4 border-t", children: _jsxs("div", { className: "flex items-end gap-2", children: [_jsx(Textarea, { placeholder: "Type your message...", value: inputMessage, onChange: (e) => setInputMessage(e.target.value), onKeyDown: handleKeyDown, className: "flex-1 min-h-[60px] resize-none", disabled: isLoading }), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx(Button, { size: "icon", variant: "outline", type: "button", disabled: isLoading, onClick: () => toast.info("Voice input feature coming soon!"), children: _jsx(Mic, { className: "h-5 w-5" }) }), _jsx(Button, { size: "icon", type: "button", disabled: !inputMessage.trim() || isLoading, onClick: handleSendMessage, children: _jsx(Send, { className: "h-5 w-5" }) })] })] }) })] })] }) })] }));
};
export default AIChat;

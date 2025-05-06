import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, ThumbsUp, ThumbsDown, Send, Download, Save, Sparkles, User, } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
const DebateChat = ({ debateTitle, debateObjective, messages, participants, isLoading, onSendMessage, onSaveDebate, onExportDebate, onGenerateSummary, newMessage, onNewMessageChange, onVoteMessage, onToggleFavorite, }) => {
    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);
    // Auto-scroll to bottom when new messages come in
    useEffect(() => {
        var _a;
        (_a = messagesEndRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    // Create a map of participants for easy lookup
    const participantsMap = new Map();
    participants.forEach((participant) => {
        participantsMap.set(participant.name, participant);
    });
    // Determine if the scrollable area needs a bottom fade for UX
    const [showScrollIndicator, setShowScrollIndicator] = useState(false);
    const messagesContainerRef = useRef(null);
    useEffect(() => {
        const container = messagesContainerRef.current;
        if (!container)
            return;
        const checkScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = container;
            setShowScrollIndicator(scrollHeight > clientHeight &&
                scrollTop < scrollHeight - clientHeight - 20);
        };
        container.addEventListener("scroll", checkScroll);
        checkScroll();
        return () => container.removeEventListener("scroll", checkScroll);
    }, [messages]);
    return (_jsxs(Card, { className: "flex flex-col h-full", children: [_jsx(CardHeader, { className: "pb-4 flex-shrink-0", children: _jsxs(CardTitle, { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold", children: debateTitle }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: debateObjective })] }), _jsx("div", { className: "flex space-x-1", children: participants.map((participant) => (_jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx("div", { className: "-mr-3 border-2 border-background rounded-full transition-transform hover:scale-105 hover:z-10", children: _jsxs(Avatar, { className: "h-8 w-8", children: [_jsx(AvatarImage, { src: participant.avatar, alt: participant.name }), _jsx(AvatarFallback, { children: participant.name
                                                                .split(" ")
                                                                .map((n) => n[0])
                                                                .join("") })] }) }) }), _jsx(TooltipContent, { children: _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: participant.name }), _jsx("p", { className: "text-xs text-muted-foreground", children: participant.role })] }) })] }) }, participant.id || participant.name))) })] }) }), _jsxs(CardContent, { ref: messagesContainerRef, className: "flex-grow overflow-y-auto px-4 pb-0 relative", children: [_jsx(AnimatePresence, { initial: false, children: showScrollIndicator && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" })) }), _jsxs("div", { className: "space-y-4 pb-4", children: [_jsx(AnimatePresence, { initial: false, children: messages.map((message, i) => {
                                    const isSystemMessage = message.senderId === "system";
                                    const isUserMessage = message.isUser;
                                    const participant = participantsMap.get(message.sender);
                                    if (isSystemMessage) {
                                        return (_jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3 }, className: "flex justify-center", children: _jsx("div", { className: "bg-muted/50 text-muted-foreground text-sm py-2 px-4 rounded-full", children: message.content }) }, message.id));
                                    }
                                    return (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3, delay: Math.min(i * 0.05, 0.3) }, className: cn("flex", isUserMessage ? "justify-end" : "justify-start"), children: _jsxs("div", { className: cn("flex items-start gap-2 max-w-[85%]", isUserMessage && "flex-row-reverse"), children: [_jsx(Avatar, { className: "h-8 w-8 mt-0.5 flex-shrink-0", children: isUserMessage ? (_jsxs(_Fragment, { children: [_jsx(AvatarImage, { src: "/avatars/user.png", alt: "You" }), _jsx(AvatarFallback, { children: _jsx(User, { className: "h-4 w-4" }) })] })) : (_jsxs(_Fragment, { children: [_jsx(AvatarImage, { src: participant === null || participant === void 0 ? void 0 : participant.avatar, alt: message.sender }), _jsx(AvatarFallback, { children: message.sender
                                                                    .split(" ")
                                                                    .map((n) => n[0])
                                                                    .join("") })] })) }), _jsxs("div", { className: cn("space-y-1", isUserMessage && "items-end"), children: [_jsxs("div", { className: cn("inline-flex items-center", isUserMessage && "flex-row-reverse"), children: [_jsx("span", { className: cn("text-sm font-medium px-1", isUserMessage ? "text-primary" : ""), children: message.sender }), !isUserMessage && (_jsx("span", { className: "text-xs text-muted-foreground px-1", children: participant === null || participant === void 0 ? void 0 : participant.role }))] }), _jsx("div", { className: cn("rounded-lg p-3", isUserMessage
                                                                ? "bg-primary text-primary-foreground"
                                                                : "bg-muted text-card-foreground"), children: _jsx("p", { className: "text-sm whitespace-pre-wrap", children: message.content }) }), !isSystemMessage && (_jsxs("div", { className: cn("flex items-center text-xs text-muted-foreground gap-2 pt-0.5", isUserMessage && "justify-end"), children: [_jsx("button", { onClick: () => onToggleFavorite(message.id), className: cn("p-1 rounded-full hover:bg-muted/50 transition-colors", message.isFavorite
                                                                        ? "text-red-500"
                                                                        : "text-muted-foreground"), children: _jsx(Heart, { className: "h-3 w-3" }) }), _jsx("button", { onClick: () => onVoteMessage(message.id, 1), className: "p-1 rounded-full hover:bg-muted/50 transition-colors", children: _jsx(ThumbsUp, { className: "h-3 w-3" }) }), _jsx("button", { onClick: () => onVoteMessage(message.id, -1), className: "p-1 rounded-full hover:bg-muted/50 transition-colors", children: _jsx(ThumbsDown, { className: "h-3 w-3" }) }), _jsx("span", { className: "text-xs", children: message.votes > 0
                                                                        ? `+${message.votes}`
                                                                        : message.votes })] }))] })] }) }, message.id));
                                }) }), _jsx(AnimatePresence, { children: isLoading && (_jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, className: "flex justify-center py-2", children: _jsxs("div", { className: "flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full", children: [_jsx("div", { className: "flex space-x-1", children: [0, 1, 2].map((i) => (_jsx("div", { className: "w-2 h-2 rounded-full bg-primary/50 animate-pulse", style: { animationDelay: `${i * 0.15}s` } }, i))) }), _jsx("span", { className: "text-sm text-muted-foreground", children: "Executives are thinking..." })] }) })) }), _jsx("div", { ref: messagesEndRef })] })] }), _jsx(CardFooter, { className: "pt-4 pb-4 flex-shrink-0", children: _jsxs("form", { onSubmit: onSendMessage, className: "w-full space-y-2", children: [_jsxs("div", { className: "relative", children: [_jsx(Textarea, { ref: textareaRef, value: newMessage, onChange: onNewMessageChange, placeholder: "Ask a question or provide input to the executives...", className: "min-h-[80px] resize-none pr-12" }), _jsx("div", { className: "absolute bottom-2 right-2", children: _jsxs(Button, { type: "submit", size: "icon", className: "h-8 w-8 rounded-full", disabled: isLoading || !newMessage.trim(), children: [_jsx(Send, { className: "h-4 w-4" }), _jsx("span", { className: "sr-only", children: "Send message" })] }) })] }), _jsxs("div", { className: "flex justify-between", children: [_jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { type: "button", size: "sm", variant: "ghost", onClick: onExportDebate, disabled: messages.length === 0, children: [_jsx(Download, { className: "h-4 w-4 mr-1" }), "Export"] }), _jsxs(Button, { type: "button", size: "sm", variant: "ghost", onClick: onSaveDebate, disabled: messages.length === 0, children: [_jsx(Save, { className: "h-4 w-4 mr-1" }), "Save"] })] }), _jsxs(Button, { type: "button", size: "sm", variant: "outline", onClick: onGenerateSummary, disabled: messages.length < 5, className: "gap-1", children: [_jsx(Sparkles, { className: "h-4 w-4" }), "Generate Summary"] })] })] }) })] }));
};
export default DebateChat;

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MessagesSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
// Add a helper function to normalize messages with different property names
export const normalizeExecutiveMessage = (msg) => {
    return {
        id: msg.id || "",
        created_at: msg.created_at || new Date().toISOString(),
        from_executive: msg.from_executive || msg.fromExecutive || "",
        to_executive: msg.to_executive || msg.toExecutive || "",
        message_content: msg.message_content || msg.content || "",
        content: msg.content || msg.message_content || "",
        status: msg.status || "unread",
    };
};
const RecentExecutiveMessages = ({ messages, isLoading = false, onViewMoreMessages, }) => {
    if (isLoading) {
        return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center", children: [_jsx(MessagesSquare, { className: "h-5 w-5 mr-2" }), "Executive Communications"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: [1, 2, 3].map((i) => (_jsxs("div", { className: "flex items-start space-x-3", children: [_jsx("div", { className: "w-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700 mt-2" }), _jsxs("div", { className: "space-y-1 flex-1", children: [_jsx("div", { className: "h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 animate-pulse" }), _jsx("div", { className: "h-3 bg-gray-100 dark:bg-gray-800 rounded w-full animate-pulse" }), _jsx("div", { className: "h-3 bg-gray-100 dark:bg-gray-800 rounded w-2/3 animate-pulse" })] })] }, i))) }) })] }));
    }
    if (messages.length === 0) {
        return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center", children: [_jsx(MessagesSquare, { className: "h-5 w-5 mr-2" }), "Executive Communications"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "text-center py-6 text-muted-foreground", children: _jsx("p", { children: "No recent executive messages" }) }) })] }));
    }
    // Process messages to ensure they have all properties
    const normalizedMessages = messages.map((msg) => normalizeExecutiveMessage(msg));
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center", children: [_jsx(MessagesSquare, { className: "h-5 w-5 mr-2" }), "Executive Communications"] }) }), _jsxs(CardContent, { children: [_jsx("div", { className: "space-y-4", children: normalizedMessages.slice(0, 5).map((message) => (_jsxs("div", { className: "flex items-start space-x-3", children: [_jsx("div", { className: "w-2 h-2 rounded-full bg-primary mt-2" }), _jsxs("div", { className: "space-y-1 flex-1", children: [_jsxs("div", { className: "flex justify-between items-center", children: [message.from_executive && (_jsxs(Badge, { variant: "outline", className: "bg-primary/10 text-primary text-xs", children: ["From", " ", typeof message.from_executive === "string"
                                                            ? message.from_executive
                                                            : "Executive"] })), message.to_executive && (_jsxs(Badge, { variant: "outline", className: "bg-secondary/10 text-secondary text-xs", children: ["To", " ", typeof message.to_executive === "string"
                                                            ? message.to_executive
                                                            : "Executive"] })), message.status && (_jsx("span", { className: `text-xs ${message.status === "read" ? "text-green-500" : "text-amber-500"}`, children: message.status.charAt(0).toUpperCase() +
                                                        message.status.slice(1) }))] }), _jsx("p", { className: "text-sm line-clamp-2", children: message.message_content || message.content }), _jsx("span", { className: "text-xs text-muted-foreground", children: formatDistanceToNow(new Date(message.created_at), {
                                                addSuffix: true,
                                            }) })] })] }, message.id))) }), messages.length > 5 && (_jsx("div", { className: "mt-4 flex justify-center", children: _jsxs(Button, { variant: "ghost", size: "sm", onClick: onViewMoreMessages, className: "text-xs", children: ["View all messages", _jsx(ArrowRight, { className: "ml-2 h-3 w-3" })] }) }))] })] }));
};
export default RecentExecutiveMessages;

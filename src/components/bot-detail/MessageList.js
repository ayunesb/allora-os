import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
const MessageList = ({ messages }) => {
    return (_jsx("div", { className: "space-y-4 p-4", children: messages.map((message) => (_jsx("div", { className: `flex ${message.sender === "user" ? "justify-end" : "justify-start"}`, children: _jsxs("div", { className: "flex flex-col", children: [message.sender === "bot" && (_jsxs("div", { className: "flex items-center space-x-2 mb-1", children: [_jsxs(Avatar, { className: "h-6 w-6", children: [_jsx(AvatarImage, { src: "/placeholder-executive.png", alt: "AI Bot" }), _jsx(AvatarFallback, { children: "AI" })] }), _jsx("span", { className: "text-xs font-medium text-muted-foreground", children: "AI Advisor" })] })), _jsxs("div", { className: `rounded-lg px-4 py-2 max-w-2xl ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`, children: [_jsx("p", { className: "text-sm", children: message.text }), _jsx("span", { className: "block text-xs text-right mt-1 opacity-70", children: formatDistanceToNow(message.timestamp, { addSuffix: true }) })] })] }) }, message.id))) }));
};
export default MessageList;

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendIcon, RefreshCw, Trash2, Keyboard } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip";
const MessageInput = ({ botName, isLoading, onSendMessage, onRetry, onClear, error, canRetry = false, }) => {
    const [message, setMessage] = useState("");
    const textareaRef = useRef(null);
    const maxLength = 1000; // Set a reasonable character limit
    // Auto focus the textarea when the component mounts
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }, []);
    // Set up keyboard shortcuts
    useEffect(() => {
        const handleKeyboardShortcuts = (e) => {
            // Ctrl+Enter or Cmd+Enter to submit
            if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                if (message.trim() && !isLoading) {
                    onSendMessage(message);
                    setMessage("");
                }
            }
            // Escape to clear input
            if (e.key === "Escape" &&
                document.activeElement === textareaRef.current) {
                setMessage("");
            }
        };
        window.addEventListener("keydown", handleKeyboardShortcuts);
        return () => window.removeEventListener("keydown", handleKeyboardShortcuts);
    }, [message, isLoading, onSendMessage]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() && !isLoading) {
            onSendMessage(message);
            setMessage("");
        }
    };
    const handleKeyDown = (e) => {
        // Submit on Enter (without Shift)
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };
    const getCharacterCountColor = () => {
        const percent = (message.length / maxLength) * 100;
        if (percent < 70)
            return "text-muted-foreground";
        if (percent < 90)
            return "text-amber-500";
        return "text-destructive";
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "w-full flex flex-col gap-2", children: [_jsxs("div", { className: "flex gap-2", children: [_jsxs("div", { className: "flex-grow relative", children: [_jsx(Textarea, { ref: textareaRef, value: message, onChange: (e) => setMessage(e.target.value), onKeyDown: handleKeyDown, placeholder: `Ask ${botName} a question...`, className: "flex-grow resize-none min-h-[60px] max-h-[150px] pr-16", disabled: isLoading, "aria-label": "Your message", "aria-describedby": error ? "message-error" : undefined, maxLength: maxLength }), _jsxs("div", { className: `absolute bottom-2 right-3 text-xs ${getCharacterCountColor()}`, "aria-live": "polite", "aria-atomic": "true", children: [message.length, "/", maxLength] })] }), _jsx("div", { className: "flex flex-col gap-2", children: _jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx(Button, { type: "submit", size: "icon", disabled: !message.trim() || isLoading, "aria-label": "Send message", className: "h-[60px] w-[60px] relative transition-all duration-200 ease-in-out", "data-sending": isLoading, children: _jsx(SendIcon, { className: "h-5 w-5" }) }) }), _jsx(TooltipContent, { side: "left", children: _jsxs("div", { className: "flex flex-col", children: [_jsx("p", { children: "Send message" }), _jsx("span", { className: "text-xs opacity-80 mt-1", children: "Ctrl+Enter" })] }) })] }) }) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsxs(Button, { type: "button", variant: "ghost", size: "sm", className: "h-7 px-2 text-xs text-muted-foreground", children: [_jsx(Keyboard, { className: "h-3 w-3 mr-1" }), _jsx("span", { children: "Shortcuts" })] }) }), _jsx(TooltipContent, { children: _jsxs("div", { className: "text-xs space-y-1", children: [_jsxs("p", { children: [_jsx("span", { className: "font-medium", children: "Enter:" }), " Send message"] }), _jsxs("p", { children: [_jsx("span", { className: "font-medium", children: "Shift+Enter:" }), " New line"] }), _jsxs("p", { children: [_jsx("span", { className: "font-medium", children: "Ctrl/\u2318+Enter:" }), " Send message"] }), _jsxs("p", { children: [_jsx("span", { className: "font-medium", children: "Esc:" }), " Clear input"] })] }) })] }) }), _jsxs("div", { className: "flex gap-2 justify-end", children: [onRetry && (_jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsxs(Button, { type: "button", variant: "outline", size: "sm", onClick: onRetry, disabled: isLoading || !canRetry, "aria-label": "Retry last message", className: "h-7", children: [_jsx(RefreshCw, { className: "h-3.5 w-3.5 mr-1" }), "Retry"] }) }), _jsx(TooltipContent, { children: _jsx("p", { children: "Retry last message" }) })] }) })), onClear && (_jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsxs(Button, { type: "button", variant: "outline", size: "sm", onClick: onClear, disabled: isLoading, "aria-label": "Clear conversation", className: "h-7", children: [_jsx(Trash2, { className: "h-3.5 w-3.5 mr-1" }), "Clear"] }) }), _jsx(TooltipContent, { children: _jsx("p", { children: "Clear conversation" }) })] }) }))] })] }), error && (_jsx("p", { id: "message-error", className: "text-destructive text-sm mt-1", children: error }))] }));
};
export default MessageInput;

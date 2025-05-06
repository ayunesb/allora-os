var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
export function CopyButton({ text, onCopy, className = "", showText = false }) {
    const [isCopied, setIsCopied] = useState(false);
    const handleCopy = () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield navigator.clipboard.writeText(text);
            setIsCopied(true);
            toast.success("Copied to clipboard");
            if (onCopy)
                onCopy();
            // Reset the copied state after 2 seconds
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        }
        catch (error) {
            console.error("Failed to copy text:", error);
            toast.error("Failed to copy to clipboard");
        }
    });
    return (_jsx(Button, { onClick: handleCopy, variant: "ghost", size: "sm", className: `h-8 px-2 ${className}`, disabled: isCopied, children: isCopied ? (_jsxs(_Fragment, { children: [_jsx(Check, { className: "h-3.5 w-3.5 mr-1" }), showText && "Copied"] })) : (_jsxs(_Fragment, { children: [_jsx(Copy, { className: "h-3.5 w-3.5 mr-1" }), showText && "Copy"] })) }));
}
export default CopyButton;

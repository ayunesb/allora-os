import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useHelp } from "@/context/HelpContext";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
export function HelpModal() {
    const { isHelpOpen, closeHelp, currentHelp } = useHelp();
    if (!currentHelp) {
        return null;
    }
    return (_jsx(Dialog, { open: isHelpOpen, onOpenChange: closeHelp, children: _jsxs(DialogContent, { className: "sm:max-w-[500px]", children: [_jsxs(DialogHeader, { children: [_jsxs(DialogTitle, { className: "flex justify-between items-center", children: [_jsx("span", { children: currentHelp.title }), _jsx(Button, { variant: "ghost", size: "icon", onClick: closeHelp, className: "h-8 w-8 rounded-full", "aria-label": "Close help dialog", children: _jsx(X, { className: "h-4 w-4" }) })] }), currentHelp.description && (_jsx(DialogDescription, { children: currentHelp.description }))] }), _jsx("div", { className: "space-y-4 max-h-[60vh] overflow-auto py-4", children: currentHelp.content && (_jsx("div", { className: "prose prose-sm dark:prose-invert max-w-none", dangerouslySetInnerHTML: { __html: currentHelp.content } })) }), _jsx(DialogFooter, { children: _jsx(Button, { onClick: closeHelp, children: "Close" }) })] }) }));
}

import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useHelp } from "@/context/HelpContext";
export function HelpButton({ helpContent, className, variant = "ghost", size = "icon", children, }) {
    const { setCurrentHelp, openHelp } = useHelp();
    const handleClick = () => {
        setCurrentHelp(helpContent);
        openHelp();
    };
    return (_jsx(Button, { type: "button", variant: variant, size: size, onClick: handleClick, className: cn("", className), "aria-label": `Help for ${helpContent.title}`, children: children || _jsx(HelpCircle, { className: "h-4 w-4" }) }));
}

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
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
export default function ZapierTriggerButton({ webhookType, event, payload, label, onResult, autoTrigger = false, size = "default", variant = "outline", className = "", }) {
    const [isTriggering, setIsTriggering] = useState(false);
    const triggerWebhook = () => __awaiter(this, void 0, void 0, function* () {
        setIsTriggering(true);
        try {
            // In a real implementation, this would make an API call to trigger the webhook
            // For this demo, we'll simulate a successful webhook trigger
            yield new Promise((resolve) => setTimeout(resolve, 1500));
            const eventType = event || webhookType || "generic";
            const eventPayload = payload || {};
            toast.success(`Zapier webhook for ${eventType} triggered successfully`);
            if (onResult) {
                onResult(true);
            }
        }
        catch (error) {
            console.error(`Error triggering webhook:`, error);
            toast.error(`Failed to trigger webhook: ${error instanceof Error ? error.message : "Unknown error"}`);
            if (onResult) {
                onResult(false);
            }
        }
        finally {
            setIsTriggering(false);
        }
    });
    // Auto-trigger the webhook if the autoTrigger prop is true
    React.useEffect(() => {
        if (autoTrigger) {
            triggerWebhook();
        }
    }, []);
    if (autoTrigger && label === null) {
        return null; // Don't render anything for auto-trigger with no label
    }
    return (_jsx(Button, { onClick: triggerWebhook, disabled: isTriggering, variant: variant, size: size, className: className, children: isTriggering ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "h-4 w-4 mr-2 animate-spin" }), "Triggering..."] })) : (label) }));
}

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
export function useWebhookTest() {
    const [isLoading, setIsLoading] = useState(false);
    const [lastResult, setLastResult] = useState(null);
    /**
     * Test a webhook URL
     */
    const testWebhook = (url, webhookType) => __awaiter(this, void 0, void 0, function* () {
        if (!url) {
            const result = {
                success: false,
                message: "No URL provided",
            };
            setLastResult(result);
            return result;
        }
        setIsLoading(true);
        try {
            const { data, error } = yield supabase.functions.invoke("test-webhook", {
                body: { url, webhookType, testMode: true }, // TODO: refine type
            });
            if (error) {
                throw error;
            }
            const result = data;
            if (result.success) {
                toast.success("Webhook test successful");
            }
            else {
                toast.error(`Webhook test failed: ${result.message || "Unknown error"}`);
            }
            setLastResult(result);
            return result;
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to test webhook";
            const result = {
                success: false,
                message: errorMessage,
            };
            setLastResult(result);
            toast.error(result.message);
            return result;
        }
        finally {
            setIsLoading(false);
        }
    });
    return {
        testWebhook,
        isLoading,
        lastResult,
    };
}

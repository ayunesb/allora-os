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
export const useZapier = () => {
    const [isLoading, setIsLoading] = useState(false);
    const testWebhook = (webhookUrl) => __awaiter(void 0, void 0, void 0, function* () {
        setIsLoading(true);
        try {
            const response = yield fetch(webhookUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "no-cors",
                body: JSON.stringify({
                    event: "test_webhook",
                    timestamp: new Date().toISOString(),
                    source: window.location.origin,
                }),
            });
            // Since mode is no-cors, we can't actually check the response status
            // We'll assume success but warn the user
            setIsLoading(false);
            return {
                success: true,
                message: "Webhook test request sent. Please check your Zapier account to confirm it was received.",
            };
        }
        catch (error) {
            console.error("Error testing webhook:", error);
            setIsLoading(false);
            return {
                success: false,
                message: error instanceof Error ? error.message : "Unknown error occurred",
                error,
            };
        }
    });
    const triggerBusinessEvent = (webhookUrl, eventType, payload) => __awaiter(void 0, void 0, void 0, function* () {
        setIsLoading(true);
        try {
            yield fetch(webhookUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "no-cors",
                body: JSON.stringify({
                    event: eventType,
                    timestamp: new Date().toISOString(),
                    data: payload,
                }),
            });
            // Due to no-cors mode, we assume success
            setIsLoading(false);
            return {
                success: true,
                message: "Event triggered successfully",
            };
        }
        catch (error) {
            console.error("Error triggering business event:", error);
            setIsLoading(false);
            return {
                success: false,
                message: error instanceof Error ? error.message : "Unknown error occurred",
                error,
            };
        }
    });
    return {
        isLoading,
        testWebhook,
        triggerBusinessEvent,
    };
};
export default useZapier;

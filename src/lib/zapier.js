var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { toast } from "sonner";
export const testZapierWebhook = (webhookUrl) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!webhookUrl || !webhookUrl.startsWith("https://hooks.zapier.com/")) {
            return {
                success: false,
                message: "Invalid Zapier webhook URL",
                statusCode: 400,
            };
        }
        const response = yield fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "no-cors", // Required for CORS issues with Zapier
            body: JSON.stringify({
                test: true,
                timestamp: new Date().toISOString(),
                source: "Allora AI Platform",
            }),
        });
        // Due to no-cors mode, we can't actually check the response status
        // So we'll assume it went through if no error was thrown
        return {
            success: true,
            message: "Webhook test sent to Zapier",
            statusCode: 200,
        };
    }
    catch (error) {
        console.error("Error testing Zapier webhook:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Unknown error occurred",
            statusCode: 500,
        };
    }
});
export const triggerZapierWebhook = (webhookUrl_1, ...args_1) => __awaiter(void 0, [webhookUrl_1, ...args_1], void 0, function* (webhookUrl, data = {}) {
    try {
        if (!webhookUrl) {
            toast.error("No Zapier webhook URL provided");
            return {
                success: false,
                message: "No webhook URL provided",
                statusCode: 400,
            };
        }
        yield fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "no-cors",
            body: JSON.stringify(Object.assign(Object.assign({}, data), { timestamp: new Date().toISOString() })),
        });
        toast.success("Event sent to Zapier");
        return {
            success: true,
            message: "Webhook triggered successfully",
            statusCode: 200,
        };
    }
    catch (error) {
        console.error("Error triggering Zapier webhook:", error);
        toast.error("Failed to trigger Zapier webhook");
        return {
            success: false,
            message: error instanceof Error ? error.message : "Failed to trigger webhook",
            statusCode: 500,
        };
    }
});
export const triggerBusinessEvent = (webhookUrl, eventType, data) => __awaiter(void 0, void 0, void 0, function* () {
    return triggerZapierWebhook(webhookUrl, Object.assign({ eventType }, data));
});

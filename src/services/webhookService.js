var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { logger } from "@/utils/logger"; // Added logger import
export const getWebhookEvents = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // This is a placeholder implementation
        // In a real application, this would fetch data from Supabase
        return [
            {
                id: "event-id",
                webhook_id: "webhook-id",
                createdAt: new Date().toISOString(),
                eventType: "TEST",
                status: "Success",
                payload: { id: "payload-id" },
                targetUrl: "https://example.com",
                resource: "example-resource",
                response: {},
                webhookType: "manual",
                timestamp: new Date().toISOString(),
                duration: 200,
                errorMessage: "",
                responseCode: 200,
            },
        ];
    }
    catch (error) {
        logger.debug("Error fetching webhook events:", error);
        return [];
    }
});
export const getWebhookEventById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Placeholder implementation
        return {
            id: "event-id",
            webhook_id: "webhook-id",
            createdAt: new Date().toISOString(),
            eventType: "TEST",
            status: "Success",
            payload: { id: "payload-id" },
            targetUrl: "https://example.com",
            resource: "example-resource",
            response: {},
            webhookType: "manual",
            timestamp: new Date().toISOString(),
            duration: 200,
            errorMessage: "",
            responseCode: 200,
        };
    }
    catch (error) {
        logger.debug(`Error fetching webhook event with id ${id}:`, error);
        return null;
    }
});
export const testWebhook = (url, type) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = {
            eventType: "TEST",
            timestamp: new Date().toISOString(),
            data: { message: "Test webhook payload" },
        };
        const response = yield fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return { success: true, message: "Webhook test succeeded" };
    }
    catch (error) {
        logger.error("Error testing webhook:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Unknown error occurred",
        };
    }
});
const otherProps = {}; // Replace with the actual definition if available
const fakeEvent = Object.assign(Object.assign({}, otherProps), { validProperty: "value" });
// Example usage:
const tempWebhookEvent = {
    id: "123",
    eventType: "ORDER_CREATED", // Fixed typo from 'event_type' to 'eventType'
    validProperty: "value", // ✅ Now valid
    payload: { id: "mock-id" },
};

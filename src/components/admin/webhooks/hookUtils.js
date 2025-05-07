var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Webhook utilities for working with various webhook types
 */
export function getWebhookTemplateUrl(type) {
    switch (type) {
        case "zapier":
            return "https://hooks.zapier.com/hooks/catch/";
        case "slack":
            return "https://hooks.slack.com/services/";
        case "github":
            return "https://api.github.com/repos/OWNER/REPO/dispatches";
        case "notion":
            return "https://api.notion.com/v1/";
        case "stripe":
            return "https://api.stripe.com/";
        case "custom":
        default:
            return "https://";
    }
}
export function getWebhookDefaultPayload(type) {
    const basePayload = {
        timestamp: new Date().toISOString(),
        source: "Allora AI Platform",
        event_type: "test",
    };
    switch (type) {
        case "zapier":
            return Object.assign(Object.assign({}, basePayload), { data: { message: "Test webhook from Allora AI" } });
        case "slack":
            return {
                text: "Test notification from Allora AI",
                blocks: [
                    {
                        type: "section",
                        text: {
                            type: "mrkdwn",
                            text: "*Test Webhook*\nThis is a test notification from Allora AI platform.",
                        },
                    },
                ],
            };
        case "github":
            return {
                event_type: "test-webhook",
                client_payload: Object.assign(Object.assign({}, basePayload), { source: "Allora AI Platform" }),
            };
        default:
            return basePayload;
    }
}
/**
 * Helper function to properly test webhooks with appropriate headers and payload
 */
export function testWebhookAdvanced(url, type) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!url) {
            return { success: false, message: "No URL provided" };
        }
        const payload = getWebhookDefaultPayload(type);
        try {
            yield fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "no-cors",
                body: JSON.stringify(payload),
            });
            return {
                success: true,
                message: "Webhook test sent successfully",
            };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
            return {
                success: false,
                message: errorMessage,
            };
        }
    });
}

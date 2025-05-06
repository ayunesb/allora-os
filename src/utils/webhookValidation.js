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
 * Validates if a URL has proper format for a webhook
 */
export function validateWebhookUrlFormat(url, type) {
    if (!url)
        return false;
    // Basic URL validation
    try {
        new URL(url);
    }
    catch (_a) {
        return false;
    }
    // Type-specific validation if type provided
    if (type) {
        switch (type) {
            case "zapier":
                return url.includes("hooks.zapier.com");
            case "slack":
                return url.includes("hooks.slack.com");
            case "github":
                return url.includes("api.github.com");
            case "stripe":
                return url.includes("stripe.com");
            case "notion":
                return url.includes("notion.com");
            case "custom":
                return url.startsWith("https://");
            default:
                return true;
        }
    }
    return url.startsWith("https://") || url.startsWith("http://");
}
/**
 * Test a webhook URL with a simple payload
 */
export function testWebhook(url) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!url) {
            return {
                success: false,
                message: "No URL provided",
                statusCode: 400,
            };
        }
        try {
            // Use no-cors to avoid CORS issues in browser
            yield fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "no-cors",
                body: JSON.stringify({
                    test: true,
                    timestamp: new Date().toISOString(),
                }),
            });
            // With no-cors, we can't check response status
            // Assume it went through if no error was thrown
            return {
                success: true,
                message: "Test webhook sent",
                statusCode: 200,
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message || "Unknown error occurred",
                statusCode: 500,
            };
        }
    });
}
/**
 * Sanitize a webhook URL by trimming whitespace
 */
export function sanitizeWebhookUrl(url) {
    return (url === null || url === void 0 ? void 0 : url.trim()) || "";
}

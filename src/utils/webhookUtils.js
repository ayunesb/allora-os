/**
 * Normalizes webhook event objects to handle different property names
 * across the application
 */
export function normalizeWebhookEvent(event) {
    return Object.assign(Object.assign({}, event), { 
        // Ensure compatibility by mapping eventType to event_type if needed
        eventType: "eventType" in event
            ? event.eventType || "unknown"
            : event.event_type || "unknown", 
        // Normalize resource property
        resource: event.resource || "unknown" });
}
/**
 * Creates webhook events with both event_type and eventType properties
 * to maintain compatibility with different components
 */
export function createWebhookEvent(data) {
    return {
        eventType: data.eventType || "custom",
        status: data.status || "pending",
        payload: data.payload, // Ensure payload has required properties
        targetUrl: data.targetUrl || "",
        resource: data.resource || "unknown",
        response: data.response || {},
        webhookType: data.webhookType || "default",
        timestamp: data.timestamp || new Date().toISOString(),
        duration: data.duration || 0,
        errorMessage: data.errorMessage,
        responseCode: data.responseCode,
    };
}
export function buildWebhookResponse(data) {
    var _a, _b;
    return {
        id: data.id || "",
        eventType: data.eventType || "custom",
        webhookId: data.webhookId || "",
        status: data.status || "pending",
        createdAt: data.createdAt || new Date().toISOString(),
        payload: data.payload || { id: "default-id" }, // Ensure `id` is provided
        targetUrl: data.targetUrl || "",
        webhookType: data.webhookType || "custom",
        timestamp: data.timestamp || new Date().toISOString(),
        duration: data.duration || 0,
        errorMessage: (_a = data.errorMessage) !== null && _a !== void 0 ? _a : "Unknown error",
        responseCode: (_b = data.responseCode) !== null && _b !== void 0 ? _b : 500,
        resource: data.resource || "unknown",
        response: data.response || {},
    };
}
export function getMockWebhook() {
    return {
        id: "123",
        webhookId: "abc",
        eventType: "mock",
        status: "pending",
        createdAt: new Date().toISOString(),
        payload: {},
        targetUrl: "https://example.com",
        resource: "example-resource-id",
        response: {},
    };
}
export function getWebhookData(data) {
    var _a;
    const webhookEvent = {
        id: data.id || "123", // Added missing 'id'
        webhook_id: data.webhook_id || "456", // Fixed 'webhookId' to 'webhook_id'
        eventType: data.eventType || "",
        status: data.status || "",
        createdAt: data.createdAt || new Date().toISOString(), // Added missing 'createdAt'
        payload: { id: ((_a = data.payload) === null || _a === void 0 ? void 0 : _a.id) || "" }, // Ensure payload has required properties
        targetUrl: data.targetUrl || "",
        resource: data.resource || "",
        response: data.response || {},
        webhookType: data.webhookType || "",
        timestamp: data.timestamp || "",
        duration: data.duration || 0,
        errorMessage: data.errorMessage || "",
        responseCode: data.responseCode || 0,
    };
    return Object.assign(Object.assign({}, webhookEvent), { payload: data.payload || { id: "default-id" }, targetUrl: data.targetUrl || "", resource: data.resource || "unknown", response: data.response || {} });
}

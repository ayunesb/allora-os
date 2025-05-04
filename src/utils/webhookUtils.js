/**
 * Normalizes webhook event objects to handle different property names
 * across the application
 */
export function normalizeWebhookEvent(event) {
    return {
        ...event,
        // Add eventType as an alias to event_type for backward compatibility
        eventType: event.event_type
    };
}
/**
 * Creates webhook events with both event_type and eventType properties
 * to maintain compatibility with different components
 */
export function createWebhookEvent(data) {
    const event = {
        id: data.id || '',
        webhook_id: data.webhook_id || '',
        event_type: data.event_type || data.eventType || '',
        status: data.status || 'pending',
        created_at: data.created_at || new Date().toISOString(),
        payload: data.payload || {},
        targetUrl: data.targetUrl || '',
        webhookType: data.webhookType || 'custom',
        timestamp: data.timestamp || new Date().toISOString(),
        duration: data.duration,
        errorMessage: data.errorMessage,
        responseCode: data.responseCode,
        source: data.source,
        response: data.response
    };
    return {
        ...event,
        eventType: event.event_type
    };
}

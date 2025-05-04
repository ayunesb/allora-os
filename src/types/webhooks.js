export function validateWebhookUrlFormat(url) {
    return /^https?:\/\/.+/.test(url);
}
export function testWebhook(url) {
    return validateWebhookUrlFormat(url);
}
export function sanitizeWebhookUrl(url) {
    return url.trim().replace(/\s/g, '');
}

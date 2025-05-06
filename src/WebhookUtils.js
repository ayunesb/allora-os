"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleWebhook = void 0;
exports.getMockWebhook = getMockWebhook;
exports.getWebhookData = getWebhookData;
exports.initializeWebhookEvent = initializeWebhookEvent;
function getMockWebhook() {
  return {
    id: "123",
    webhook_id: "abc",
    eventType: "mock",
    status: "pending",
    createdAt: new Date().toISOString(),
    payload: { id: "mock-id" }, // Ensure payload includes required 'id'
    targetUrl: "https://example.com",
    resource: "example-resource-id",
    response: {},
  };
}
var sampleWebhook = function () {
  return {
    id: "sample-id",
    webhook_id: "sample-webhook-id",
    eventType: "sample",
    status: "active",
    createdAt: new Date().toISOString(),
    payload: { id: "sample-id" }, // Ensure payload includes required 'id'
    targetUrl: "https://sample-url.com",
    resource: "sample-resource",
    response: {},
  };
};
exports.sampleWebhook = sampleWebhook;
function getWebhookData(data) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  var defaultWebhookEvent = {
    id: data.id || "default-id",
    webhook_id: data.webhook_id || "default-webhook",
    eventType: data.eventType || "event",
    status: data.status || "pending",
    createdAt: data.createdAt || new Date().toISOString(),
    webhookType:
      (_a = data.webhookType) !== null && _a !== void 0 ? _a : "generic",
    timestamp:
      (_b = data.timestamp) !== null && _b !== void 0
        ? _b
        : new Date().toISOString(),
    duration: (_c = data.duration) !== null && _c !== void 0 ? _c : 0,
    errorMessage: (_d = data.errorMessage) !== null && _d !== void 0 ? _d : "",
    responseCode: (_e = data.responseCode) !== null && _e !== void 0 ? _e : 200,
    payload: data.payload || { id: "default-id" },
    targetUrl: (_f = data.targetUrl) !== null && _f !== void 0 ? _f : "",
    resource: (_g = data.resource) !== null && _g !== void 0 ? _g : "",
    response: (_h = data.response) !== null && _h !== void 0 ? _h : {},
  };
  return {
    id: data.id || "",
    webhook_id: data.webhook_id || "",
    eventType: data.eventType || "custom",
    status: data.status || "pending",
    createdAt: data.createdAt || new Date().toISOString(),
    payload: data.payload || { id: "default-id" }, // Ensure payload includes required 'id'
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
function initializeWebhookEvent(data) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  var defaultWebhookEvent = {
    id: data.id || "default-id",
    webhook_id: data.webhook_id || "default-webhook",
    eventType: data.eventType || "event",
    status: data.status || "pending",
    createdAt: data.createdAt || new Date().toISOString(),
    webhookType:
      (_a = data.webhookType) !== null && _a !== void 0 ? _a : "generic",
    timestamp:
      (_b = data.timestamp) !== null && _b !== void 0
        ? _b
        : new Date().toISOString(),
    duration: (_c = data.duration) !== null && _c !== void 0 ? _c : 0,
    errorMessage: (_d = data.errorMessage) !== null && _d !== void 0 ? _d : "",
    responseCode: (_e = data.responseCode) !== null && _e !== void 0 ? _e : 200,
    payload: data.payload || { id: "default-id" },
    targetUrl: (_f = data.targetUrl) !== null && _f !== void 0 ? _f : "",
    resource: (_g = data.resource) !== null && _g !== void 0 ? _g : "",
    response: (_h = data.response) !== null && _h !== void 0 ? _h : {},
  };
  return {
    eventType: data.eventType || "custom",
    status: data.status || "pending",
    payload: data.payload || { id: "default-id" }, // Ensure payload includes required 'id'
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

"use strict";
/**
 * This compatibility layer helps maintain backward compatibility
 * with older code that might be using different property names.
 */
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeCampaign = normalizeCampaign;
exports.normalizeUser = normalizeUser;
exports.normalizeWebhookEvent = normalizeWebhookEvent;
exports.injectPropertiesCompatibility = injectPropertiesCompatibility;
function normalizeCampaign(campaign) {
  return __assign(__assign({}, campaign), {
    name: campaign.title || campaign.name,
    ad_platform: campaign.platform,
    startDate: campaign.start_date,
  });
}
function normalizeUser(user) {
  if (!user) return null;
  // Ensure user has expected properties
  return __assign(__assign({}, user), {
    name:
      user.name ||
      (user.user_metadata
        ? ""
            .concat(user.user_metadata.firstName || "", " ")
            .concat(user.user_metadata.lastName || "")
            .trim()
        : ""),
    role:
      user.role ||
      (user.user_metadata ? user.user_metadata.role : "") ||
      "user",
    avatar_url:
      user.avatar_url ||
      (user.user_metadata ? user.user_metadata.avatar : undefined),
    // Make sure the company_id is available
    company_id: user.company_id || null,
    company: user.company || null,
    industry: user.industry || null,
  });
}
function normalizeWebhookEvent(event) {
  return __assign(__assign({}, event), {
    eventType: event.eventType || event.event_type || "unknown",
    event_type: event.event_type || event.eventType || "unknown",
    webhookType: event.webhookType || event.webhook_type || "custom",
    webhook_type: event.webhook_type || event.webhookType || "custom",
  });
}
function injectPropertiesCompatibility() {
  /**
   * This is a utility to help with compatibility issues between different versions
   * of the same type definitions. It can be expanded as needed.
   */
  // Add other compatibility layer functions as needed
}

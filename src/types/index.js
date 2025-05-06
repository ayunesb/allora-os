"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __exportStar =
  (this && this.__exportStar) ||
  function (m, exports) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p))
        __createBinding(exports, m, p);
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookResult =
  exports.BusinessEventPayload =
  exports.BusinessEventType =
  exports.WebhookEvent =
  exports.WebhookType =
  exports.sanitizeWebhookUrl =
  exports.testWebhook =
  exports.validateWebhookUrlFormat =
    void 0;
// Export base types
__exportStar(require("./fixed/User"), exports);
__exportStar(require("./fixed/Auth"), exports);
__exportStar(require("./fixed/Agent"), exports);
__exportStar(require("./fixed/Accessibility"), exports);
__exportStar(require("./fixed/Compliance"), exports);
__exportStar(require("./fixed/LaunchChecklist"), exports);
__exportStar(require("./fixed/Campaign"), exports);
__exportStar(require("./fixed/Message"), exports);
__exportStar(require("./fixed/Bot"), exports);
__exportStar(require("./fixed/SocialMedia"), exports);
__exportStar(require("./fixed/Strategy"), exports);
__exportStar(require("./fixed/Webhook"), exports);
// Unified + compatibility types
__exportStar(require("./unified-types"), exports);
// Explicitly re-export required members from './compatibility'
// export { CompatibilityBusinessEventType } from './compatibility'; // Removed due to missing export
// Webhook utility compatibility
var webhookValidation_1 = require("@/utils/webhookValidation");
Object.defineProperty(exports, "validateWebhookUrlFormat", {
  enumerable: true,
  get: function () {
    return webhookValidation_1.validateWebhookUrlFormat;
  },
});
Object.defineProperty(exports, "testWebhook", {
  enumerable: true,
  get: function () {
    return webhookValidation_1.testWebhook;
  },
});
Object.defineProperty(exports, "sanitizeWebhookUrl", {
  enumerable: true,
  get: function () {
    return webhookValidation_1.sanitizeWebhookUrl;
  },
});
// ✅ KEEP CLEAN RE-EXPORTS ONLY
var Webhook_1 = require("./fixed/Webhook");
Object.defineProperty(exports, "WebhookType", {
  enumerable: true,
  get: function () {
    return Webhook_1.WebhookType;
  },
});
__exportStar(require("./fixed/Agent"), exports);
__exportStar(require("./fixed/Webhook"), exports);
__exportStar(require("./unified-types"), exports);
// Explicitly re-export Webhook types to resolve ambiguity
var Webhook_2 = require("./fixed/Webhook");
Object.defineProperty(exports, "WebhookEvent", {
  enumerable: true,
  get: function () {
    return Webhook_2.WebhookEvent;
  },
});
Object.defineProperty(exports, "BusinessEventType", {
  enumerable: true,
  get: function () {
    return Webhook_2.BusinessEventType;
  },
});
Object.defineProperty(exports, "BusinessEventPayload", {
  enumerable: true,
  get: function () {
    return Webhook_2.BusinessEventPayload;
  },
});
Object.defineProperty(exports, "WebhookResult", {
  enumerable: true,
  get: function () {
    return Webhook_2.WebhookResult;
  },
});

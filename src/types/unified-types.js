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
  exports.BusinessEventType =
  exports.BusinessEventPayload =
    void 0;
// Centralized export — do not override this via remix or code scan
__exportStar(require("./fixed/Campaign"), exports);
__exportStar(require("./fixed/Webhook"), exports);
__exportStar(require("./fixed/Layout"), exports);
__exportStar(require("./fixed/Compliance"), exports);
__exportStar(require("./fixed/Accessibility"), exports);
__exportStar(require("./fixed/SocialMedia"), exports);
// ✅ Keep this lean:
var Webhook_1 = require("./fixed/Webhook");
exports.BusinessEventPayload = Webhook_1.default;
var Webhook_2 = require("./fixed/Webhook");
exports.BusinessEventType = Webhook_2.default;
var Webhook_3 = require("./fixed/Webhook");
exports.WebhookResult = Webhook_3.default;

"use strict";
/**
 * Webhook Validation Utility
 *
 * This utility provides webhook validation functionality for various webhook types.
 */
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create(
        (typeof Iterator === "function" ? Iterator : Object).prototype,
      );
    return (
      (g.next = verb(0)),
      (g["throw"] = verb(1)),
      (g["return"] = verb(2)),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeWebhookUrl =
  exports.testWebhook =
  exports.validateWebhookUrlFormat =
    void 0;
var loggingService_1 = require("@/utils/loggingService");
/**
 * Validates a webhook URL format based on the service type
 *
 * @param url The webhook URL to validate
 * @param type The type of webhook service
 * @returns Boolean indicating if the URL format is valid
 */
var validateWebhookUrlFormat = function (url, type) {
  if (!url || typeof url !== "string") return false;
  try {
    // Basic URL validation
    var parsedUrl = new URL(url);
    // Must use HTTPS for security
    if (parsedUrl.protocol !== "https:") {
      loggingService_1.logger.warn(
        "Insecure webhook URL (non-HTTPS): ".concat(url),
      );
      return false;
    }
    // Specific validations per service
    switch (type) {
      case "stripe":
        return (
          url.startsWith("https://api.stripe.com/") ||
          url.includes("hook.stripe.com/") ||
          url.includes("webhook.site/")
        ); // For testing purposes
      case "zapier":
        return (
          url.startsWith("https://hooks.zapier.com/") ||
          url.includes("zapier.com/hooks/") ||
          url.includes("webhook.site/")
        ); // For testing
      case "github":
        return (
          url.includes("github.com/") ||
          url.includes("api.github.com/") ||
          url.includes("webhook.site/")
        );
      case "slack":
        return (
          url.includes("hooks.slack.com/") ||
          url.includes("api.slack.com/") ||
          url.includes("webhook.site/")
        );
      case "custom":
        // For custom webhooks, just ensure it's HTTPS (we already checked this)
        return true;
      default:
        loggingService_1.logger.warn("Unknown webhook type: ".concat(type));
        return false;
    }
  } catch (error) {
    loggingService_1.logger.error("Invalid URL format: ".concat(url), error);
    return false;
  }
};
exports.validateWebhookUrlFormat = validateWebhookUrlFormat;
/**
 * Tests a webhook by sending a test payload
 *
 * @param url The webhook URL to test
 * @param type The type of webhook service
 * @returns Promise with test result
 */
var testWebhook = function (url, type) {
  return __awaiter(void 0, void 0, void 0, function () {
    var testPayload, response_1, error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          if (!(0, exports.validateWebhookUrlFormat)(url, type)) {
            return [
              2 /*return*/,
              {
                success: false,
                message: "Invalid ".concat(type, " webhook URL format"),
              },
            ];
          }
          testPayload = {
            event: "test",
            timestamp: new Date().toISOString(),
            source: "Allora AI Platform",
            message: "This is a test from Allora AI for ".concat(
              type,
              " webhook",
            ),
          };
          return [
            4 /*yield*/,
            fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(testPayload),
            }),
          ];
        case 1:
          response_1 = _a.sent();
          // Check if the response is successful
          if (response_1.ok) {
            return [
              2 /*return*/,
              {
                success: true,
                message: "Successfully triggered ".concat(type, " webhook"),
              },
            ];
          } else {
            return [
              2 /*return*/,
              {
                success: false,
                message: "Failed to trigger "
                  .concat(type, " webhook: ")
                  .concat(response_1.status, " ")
                  .concat(response_1.statusText),
              },
            ];
          }
          return [3 /*break*/, 3];
        case 2:
          error_1 = _a.sent();
          loggingService_1.logger.error(
            "Error testing ".concat(type, " webhook:"),
            error_1,
          );
          return [
            2 /*return*/,
            {
              success: false,
              message: "Error: ".concat(error_1.message || "Unknown error"),
            },
          ];
        case 3:
          return [2 /*return*/];
      }
    });
  });
};
exports.testWebhook = testWebhook;
/**
 * Sanitizes a webhook URL to remove any potential security issues
 *
 * @param url The webhook URL to sanitize
 * @param type The type of webhook service
 * @returns Sanitized URL or null if invalid
 */
var sanitizeWebhookUrl = function (url, type) {
  if (!url || !url.trim()) return null;
  try {
    var trimmedUrl = url.trim();
    // Basic validation
    if (!(0, exports.validateWebhookUrlFormat)(trimmedUrl, type)) {
      return null;
    }
    // Parse URL to ensure it's properly structured
    var parsedUrl = new URL(trimmedUrl);
    // Simple sanity check - strip any excessive query parameters or fragments
    // that might be used for XSS
    if (parsedUrl.search && parsedUrl.search.length > 200) {
      parsedUrl.search = "";
    }
    return parsedUrl.toString();
  } catch (error) {
    loggingService_1.logger.error("Error sanitizing webhook URL:", error);
    return null;
  }
};
exports.sanitizeWebhookUrl = sanitizeWebhookUrl;

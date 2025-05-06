"use strict";
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
exports.getWebhookTemplateUrl = getWebhookTemplateUrl;
exports.getWebhookDefaultPayload = getWebhookDefaultPayload;
exports.testWebhookAdvanced = testWebhookAdvanced;
/**
 * Webhook utilities for working with various webhook types
 */
function getWebhookTemplateUrl(type) {
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
function getWebhookDefaultPayload(type) {
  var basePayload = {
    timestamp: new Date().toISOString(),
    source: "Allora AI Platform",
    event_type: "test",
  };
  switch (type) {
    case "zapier":
      return __assign(__assign({}, basePayload), {
        data: { message: "Test webhook from Allora AI" },
      });
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
        client_payload: __assign(__assign({}, basePayload), {
          source: "Allora AI Platform",
        }),
      };
    default:
      return basePayload;
  }
}
/**
 * Helper function to properly test webhooks with appropriate headers and payload
 */
function testWebhookAdvanced(url, type) {
  return __awaiter(this, void 0, void 0, function () {
    var payload, error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          if (!url) {
            return [
              2 /*return*/,
              { success: false, message: "No URL provided" },
            ];
          }
          payload = getWebhookDefaultPayload(type);
          _a.label = 1;
        case 1:
          _a.trys.push([1, 3, , 4]);
          // Use no-cors mode to handle CORS issues
          return [
            4 /*yield*/,
            fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              mode: "no-cors",
              body: JSON.stringify(payload),
            }),
          ];
        case 2:
          // Use no-cors mode to handle CORS issues
          _a.sent();
          return [
            2 /*return*/,
            {
              success: true,
              message: "Webhook test sent successfully",
            },
          ];
        case 3:
          error_1 = _a.sent();
          return [
            2 /*return*/,
            {
              success: false,
              message:
                error_1 instanceof Error
                  ? error_1.message
                  : "Unknown error occurred",
            },
          ];
        case 4:
          return [2 /*return*/];
      }
    });
  });
}

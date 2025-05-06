"use strict";
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
exports.validateWebhookUrlFormat = validateWebhookUrlFormat;
exports.testWebhook = testWebhook;
exports.sanitizeWebhookUrl = sanitizeWebhookUrl;
/**
 * Validates if a URL has proper format for a webhook
 */
function validateWebhookUrlFormat(url, type) {
  if (!url) return false;
  // Basic URL validation
  try {
    new URL(url);
  } catch (_a) {
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
function testWebhook(url) {
  return __awaiter(this, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          if (!url) {
            return [
              2 /*return*/,
              {
                success: false,
                message: "No URL provided",
                statusCode: 400,
              },
            ];
          }
          _a.label = 1;
        case 1:
          _a.trys.push([1, 3, , 4]);
          // Use no-cors to avoid CORS issues in browser
          return [
            4 /*yield*/,
            fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              mode: "no-cors",
              body: JSON.stringify({
                test: true,
                timestamp: new Date().toISOString(),
              }),
            }),
          ];
        case 2:
          // Use no-cors to avoid CORS issues in browser
          _a.sent();
          // With no-cors, we can't check response status
          // Assume it went through if no error was thrown
          return [
            2 /*return*/,
            {
              success: true,
              message: "Test webhook sent",
              statusCode: 200,
            },
          ];
        case 3:
          error_1 = _a.sent();
          return [
            2 /*return*/,
            {
              success: false,
              message: error_1.message || "Unknown error occurred",
              statusCode: 500,
            },
          ];
        case 4:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Sanitize a webhook URL by trimming whitespace
 */
function sanitizeWebhookUrl(url) {
  return (url === null || url === void 0 ? void 0 : url.trim()) || "";
}

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
exports.testWebhook =
  exports.getWebhookEventById =
  exports.getWebhookEvents =
    void 0;
var getWebhookEvents = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      try {
        // This is a placeholder implementation
        // In a real application, this would fetch data from Supabase
        return [
          2 /*return*/,
          [
            {
              id: "event-id",
              webhook_id: "webhook-id",
              createdAt: new Date().toISOString(),
              eventType: "TEST",
              status: "Success",
              payload: { id: "payload-id" },
              targetUrl: "https://example.com",
              resource: "example-resource",
              response: {},
              webhookType: "manual",
              timestamp: new Date().toISOString(),
              duration: 200,
              errorMessage: "",
              responseCode: 200,
            },
          ],
        ];
      } catch (error) {
        console.error("Error fetching webhook events:", error);
        return [2 /*return*/, []];
      }
      return [2 /*return*/];
    });
  });
};
exports.getWebhookEvents = getWebhookEvents;
var getWebhookEventById = function (id) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      try {
        // Placeholder implementation
        return [
          2 /*return*/,
          {
            id: "event-id",
            webhook_id: "webhook-id",
            createdAt: new Date().toISOString(),
            eventType: "TEST",
            status: "Success",
            payload: { id: "payload-id" },
            targetUrl: "https://example.com",
            resource: "example-resource",
            response: {},
            webhookType: "manual",
            timestamp: new Date().toISOString(),
            duration: 200,
            errorMessage: "",
            responseCode: 200,
          },
        ];
      } catch (error) {
        console.error(
          "Error fetching webhook event with id ".concat(id, ":"),
          error,
        );
        return [2 /*return*/, null];
      }
      return [2 /*return*/];
    });
  });
};
exports.getWebhookEventById = getWebhookEventById;
var testWebhook = function (url, type) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      try {
        // Placeholder implementation
        return [
          2 /*return*/,
          { success: true, message: "Webhook test succeeded" },
        ];
      } catch (error) {
        return [
          2 /*return*/,
          { success: false, message: "Webhook test failed" },
        ];
      }
      return [2 /*return*/];
    });
  });
};
exports.testWebhook = testWebhook;
var fakeEvent = __assign(__assign({}, otherProps), { validProperty: "value" });
// Example usage:
var event = {
  id: "123",
  eventType: "ORDER_CREATED", // Fixed typo from 'event_type' to 'eventType'
  validProperty: "value", // ✅ Now valid
  payload: { id: "mock-id" },
};

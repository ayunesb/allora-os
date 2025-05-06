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
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.triggerBusinessEvent =
  exports.triggerZapierWebhook =
  exports.testZapierWebhook =
    void 0;
var sonner_1 = require("sonner");
var testZapierWebhook = function (webhookUrl) {
  return __awaiter(void 0, void 0, void 0, function () {
    var response_1, error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          if (
            !webhookUrl ||
            !webhookUrl.startsWith("https://hooks.zapier.com/")
          ) {
            return [
              2 /*return*/,
              {
                success: false,
                message: "Invalid Zapier webhook URL",
                statusCode: 400,
              },
            ];
          }
          return [
            4 /*yield*/,
            fetch(webhookUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              mode: "no-cors", // Required for CORS issues with Zapier
              body: JSON.stringify({
                test: true,
                timestamp: new Date().toISOString(),
                source: "Allora AI Platform",
              }),
            }),
          ];
        case 1:
          response_1 = _a.sent();
          // Due to no-cors mode, we can't actually check the response status
          // So we'll assume it went through if no error was thrown
          return [
            2 /*return*/,
            {
              success: true,
              message: "Webhook test sent to Zapier",
              statusCode: 200,
            },
          ];
        case 2:
          error_1 = _a.sent();
          console.error("Error testing Zapier webhook:", error_1);
          return [
            2 /*return*/,
            {
              success: false,
              message:
                error_1 instanceof Error
                  ? error_1.message
                  : "Unknown error occurred",
              statusCode: 500,
            },
          ];
        case 3:
          return [2 /*return*/];
      }
    });
  });
};
exports.testZapierWebhook = testZapierWebhook;
var triggerZapierWebhook = function (webhookUrl_1) {
  var args_1 = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    args_1[_i - 1] = arguments[_i];
  }
  return __awaiter(
    void 0,
    __spreadArray([webhookUrl_1], args_1, true),
    void 0,
    function (webhookUrl, data) {
      var error_2;
      if (data === void 0) {
        data = {};
      }
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            if (!webhookUrl) {
              sonner_1.toast.error("No Zapier webhook URL provided");
              return [
                2 /*return*/,
                {
                  success: false,
                  message: "No webhook URL provided",
                  statusCode: 400,
                },
              ];
            }
            return [
              4 /*yield*/,
              fetch(webhookUrl, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                mode: "no-cors",
                body: JSON.stringify(
                  __assign(__assign({}, data), {
                    timestamp: new Date().toISOString(),
                  }),
                ),
              }),
            ];
          case 1:
            _a.sent();
            sonner_1.toast.success("Event sent to Zapier");
            return [
              2 /*return*/,
              {
                success: true,
                message: "Webhook triggered successfully",
                statusCode: 200,
              },
            ];
          case 2:
            error_2 = _a.sent();
            console.error("Error triggering Zapier webhook:", error_2);
            sonner_1.toast.error("Failed to trigger Zapier webhook");
            return [
              2 /*return*/,
              {
                success: false,
                message:
                  error_2 instanceof Error
                    ? error_2.message
                    : "Failed to trigger webhook",
                statusCode: 500,
              },
            ];
          case 3:
            return [2 /*return*/];
        }
      });
    },
  );
};
exports.triggerZapierWebhook = triggerZapierWebhook;
var triggerBusinessEvent = function (webhookUrl, eventType, data) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [
        2 /*return*/,
        (0, exports.triggerZapierWebhook)(
          webhookUrl,
          __assign({ eventType: eventType }, data),
        ),
      ];
    });
  });
};
exports.triggerBusinessEvent = triggerBusinessEvent;

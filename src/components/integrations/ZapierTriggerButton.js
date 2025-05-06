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
exports.default = ZapierTriggerButton;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var sonner_1 = require("sonner");
var lucide_react_1 = require("lucide-react");
function ZapierTriggerButton(_a) {
  var _this = this;
  var webhookType = _a.webhookType,
    event = _a.event,
    payload = _a.payload,
    label = _a.label,
    onResult = _a.onResult,
    _b = _a.autoTrigger,
    autoTrigger = _b === void 0 ? false : _b,
    _c = _a.size,
    size = _c === void 0 ? "default" : _c,
    _d = _a.variant,
    variant = _d === void 0 ? "outline" : _d,
    _e = _a.className,
    className = _e === void 0 ? "" : _e;
  var _f = (0, react_1.useState)(false),
    isTriggering = _f[0],
    setIsTriggering = _f[1];
  var triggerWebhook = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var eventType, eventPayload, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setIsTriggering(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            // In a real implementation, this would make an API call to trigger the webhook
            // For this demo, we'll simulate a successful webhook trigger
            return [
              4 /*yield*/,
              new Promise(function (resolve) {
                return setTimeout(resolve, 1500);
              }),
            ];
          case 2:
            // In a real implementation, this would make an API call to trigger the webhook
            // For this demo, we'll simulate a successful webhook trigger
            _a.sent();
            eventType = event || webhookType || "generic";
            eventPayload = payload || {};
            sonner_1.toast.success(
              "Zapier webhook for ".concat(
                eventType,
                " triggered successfully",
              ),
            );
            if (onResult) {
              onResult(true);
            }
            return [3 /*break*/, 5];
          case 3:
            error_1 = _a.sent();
            console.error("Error triggering webhook:", error_1);
            sonner_1.toast.error(
              "Failed to trigger webhook: ".concat(
                error_1 instanceof Error ? error_1.message : "Unknown error",
              ),
            );
            if (onResult) {
              onResult(false);
            }
            return [3 /*break*/, 5];
          case 4:
            setIsTriggering(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  // Auto-trigger the webhook if the autoTrigger prop is true
  react_1.default.useEffect(function () {
    if (autoTrigger) {
      triggerWebhook();
    }
  }, []);
  if (autoTrigger && label === null) {
    return null; // Don't render anything for auto-trigger with no label
  }
  return (0, jsx_runtime_1.jsx)(button_1.Button, {
    onClick: triggerWebhook,
    disabled: isTriggering,
    variant: variant,
    size: size,
    className: className,
    children: isTriggering
      ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
              className: "h-4 w-4 mr-2 animate-spin",
            }),
            "Triggering...",
          ],
        })
      : label,
  });
}

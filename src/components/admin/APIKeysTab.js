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
exports.default = APIKeysTab;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var APIKeyInput_1 = require("./APIKeyInput");
var AuthContext_1 = require("@/context/AuthContext");
var sonner_1 = require("sonner");
function APIKeysTab(_a) {
  var _this = this;
  var companyId = _a.companyId,
    initialApiKeys = _a.initialApiKeys,
    isLoading = _a.isLoading;
  var _b = (0, react_1.useState)(initialApiKeys.stripe),
    stripeKey = _b[0],
    setStripeKey = _b[1];
  var _c = (0, react_1.useState)(initialApiKeys.twilio_sid),
    twilioSid = _c[0],
    setTwilioSid = _c[1];
  var _d = (0, react_1.useState)(initialApiKeys.twilio_token),
    twilioToken = _d[0],
    setTwilioToken = _d[1];
  var _e = (0, react_1.useState)(initialApiKeys.heygen),
    heygenKey = _e[0],
    setHeygenKey = _e[1];
  var _f = (0, react_1.useState)(false),
    isSaving = _f[0],
    setIsSaving = _f[1];
  var _g = (0, AuthContext_1.useAuth)(),
    user = _g.user,
    profile = _g.profile;
  var handleSaveApiConfiguration = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!companyId) {
              sonner_1.toast.error("No company found to save settings");
              return [2 /*return*/];
            }
            setIsSaving(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            // Implementation would go here in a real app
            return [
              4 /*yield*/,
              new Promise(function (resolve) {
                return setTimeout(resolve, 1000);
              }),
            ];
          case 2:
            // Implementation would go here in a real app
            _a.sent(); // Simulate API call
            sonner_1.toast.success("API configuration saved successfully");
            return [3 /*break*/, 5];
          case 3:
            error_1 = _a.sent();
            console.error("Error saving API configuration:", error_1);
            sonner_1.toast.error(
              "Failed to save API configuration: ".concat(
                error_1.message || "Unknown error",
              ),
            );
            return [3 /*break*/, 5];
          case 4:
            setIsSaving(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  if (isLoading) {
    return (0, jsx_runtime_1.jsxs)("div", {
      className: "flex items-center justify-center py-4",
      children: [
        (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
          className: "h-6 w-6 animate-spin text-primary",
        }),
        (0, jsx_runtime_1.jsx)("span", {
          className: "ml-2",
          children: "Loading configuration...",
        }),
      ],
    });
  }
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            children: "API Keys Configuration",
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children: "Manage integration keys for external services",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        className: "space-y-6",
        children: [
          (0, jsx_runtime_1.jsx)(APIKeyInput_1.default, {
            id: "stripe-key",
            label: "Stripe API Key",
            placeholder: "sk_test_...",
            value: stripeKey,
            onChange: setStripeKey,
          }),
          (0, jsx_runtime_1.jsx)(APIKeyInput_1.default, {
            id: "twilio-sid",
            label: "Twilio Account SID",
            placeholder: "AC...",
            value: twilioSid,
            onChange: setTwilioSid,
            isSecret: false,
          }),
          (0, jsx_runtime_1.jsx)(APIKeyInput_1.default, {
            id: "twilio-token",
            label: "Twilio Auth Token",
            value: twilioToken,
            onChange: setTwilioToken,
          }),
          (0, jsx_runtime_1.jsx)(APIKeyInput_1.default, {
            id: "heygen-key",
            label: "Heygen API Key",
            value: heygenKey,
            onChange: setHeygenKey,
          }),
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            onClick: handleSaveApiConfiguration,
            disabled: isSaving || !companyId,
            children: isSaving
              ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                      className: "mr-2 h-4 w-4 animate-spin",
                    }),
                    "Saving...",
                  ],
                })
              : "Save API Configuration",
          }),
        ],
      }),
    ],
  });
}

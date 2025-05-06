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
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var react_hook_form_1 = require("react-hook-form");
var use_toast_1 = require("@/components/ui/use-toast");
var APIKeyInput = function (_a) {
  var value = _a.value,
    onChange = _a.onChange,
    placeholder = _a.placeholder,
    error = _a.error;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-1",
    children: [
      (0, jsx_runtime_1.jsx)(input_1.Input, {
        type: "password",
        value: value,
        onChange: function (e) {
          return onChange(e.target.value);
        },
        placeholder: placeholder || "Enter API key",
      }),
      error &&
        (0, jsx_runtime_1.jsx)("p", {
          className: "text-sm text-red-500",
          children: error,
        }),
    ],
  });
};
var CalendlyIntegration = function () {
  var _a;
  var toast = (0, use_toast_1.useToast)().toast;
  var _b = (0, react_1.useState)(false),
    isConnecting = _b[0],
    setIsConnecting = _b[1];
  var _c = (0, react_1.useState)(false),
    isConnected = _c[0],
    setIsConnected = _c[1];
  var _d = (0, react_1.useState)(""),
    apiKeyError = _d[0],
    setApiKeyError = _d[1];
  var _e = (0, react_1.useState)(""),
    apiKeyValue = _e[0],
    setApiKeyValue = _e[1];
  var _f = (0, react_hook_form_1.useForm)({
      defaultValues: {
        apiKey: "",
      },
    }),
    register = _f.register,
    handleSubmit = _f.handleSubmit,
    errors = _f.formState.errors;
  var onSubmit = function (data) {
    return __awaiter(void 0, void 0, void 0, function () {
      var error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setIsConnecting(true);
            setApiKeyError("");
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            // This would normally call an API to validate and save the key
            if (!data.apiKey.startsWith("cal_")) {
              setApiKeyError(
                'Invalid Calendly API key format. Should start with "cal_"',
              );
              throw new Error("Invalid API key format");
            }
            // Simulate API call delay
            return [
              4 /*yield*/,
              new Promise(function (resolve) {
                return setTimeout(resolve, 1000);
              }),
            ];
          case 2:
            // Simulate API call delay
            _a.sent();
            // Set connected status
            setIsConnected(true);
            toast({
              title: "Connected to Calendly",
              description:
                "Your Calendly account has been successfully connected.",
            });
            return [3 /*break*/, 5];
          case 3:
            error_1 = _a.sent();
            console.error("Error connecting to Calendly:", error_1);
            toast({
              title: "Connection Failed",
              description: error_1.message || "Failed to connect to Calendly",
              variant: "destructive",
            });
            return [3 /*break*/, 5];
          case 4:
            setIsConnecting(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  var handleDisconnect = function () {
    setIsConnected(false);
    toast({
      title: "Disconnected",
      description: "Your Calendly account has been disconnected.",
    });
  };
  var handleApiKeyChange = function (value) {
    setApiKeyValue(value);
    var field = register("apiKey");
    field.onChange({ target: { name: field.name, value: value } });
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container py-6",
    children: [
      (0, jsx_runtime_1.jsx)("h1", {
        className: "text-3xl font-bold mb-6",
        children: "Calendly Integration",
      }),
      (0, jsx_runtime_1.jsx)("p", {
        className: "text-muted-foreground mb-6",
        children:
          "Connect Allora AI to your Calendly account to automatically schedule meetings and manage your calendar.",
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                children: "Connect to Calendly",
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children:
                  "Enter your Calendly API key to enable scheduling features in Allora AI.",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            children: !isConnected
              ? (0, jsx_runtime_1.jsxs)("form", {
                  onSubmit: handleSubmit(onSubmit),
                  className: "space-y-4",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-2",
                      children: [
                        (0, jsx_runtime_1.jsx)("label", {
                          htmlFor: "apiKey",
                          className: "text-sm font-medium",
                          children: "Calendly API Key",
                        }),
                        (0, jsx_runtime_1.jsx)(APIKeyInput, {
                          value: apiKeyValue,
                          onChange: handleApiKeyChange,
                          placeholder: "cal_...",
                          error:
                            apiKeyError ||
                            ((_a = errors.apiKey) === null || _a === void 0
                              ? void 0
                              : _a.message),
                        }),
                        (0, jsx_runtime_1.jsxs)("p", {
                          className: "text-xs text-muted-foreground",
                          children: [
                            "You can find your API key in your",
                            " ",
                            (0, jsx_runtime_1.jsx)("a", {
                              href: "https://calendly.com/integrations/api_webhooks",
                              target: "_blank",
                              rel: "noopener noreferrer",
                              className: "text-primary hover:underline",
                              children: "Calendly account settings",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(button_1.Button, {
                      type: "submit",
                      disabled: isConnecting,
                      children: isConnecting
                        ? "Connecting..."
                        : "Connect to Calendly",
                    }),
                  ],
                })
              : (0, jsx_runtime_1.jsxs)("div", {
                  className: "space-y-4",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "p-4 bg-green-50 text-green-800 rounded-md",
                      children: [
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "font-medium",
                          children: "Connected to Calendly",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-sm mt-1",
                          children:
                            "Your Calendly account is now connected to Allora AI. You can now use Calendly features within the application.",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(button_1.Button, {
                      variant: "outline",
                      onClick: handleDisconnect,
                      children: "Disconnect from Calendly",
                    }),
                  ],
                }),
          }),
        ],
      }),
    ],
  });
};
exports.default = CalendlyIntegration;

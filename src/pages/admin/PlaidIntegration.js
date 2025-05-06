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
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var AuthContext_1 = require("@/context/AuthContext");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var react_hook_form_1 = require("react-hook-form");
var use_toast_1 = require("@/components/ui/use-toast");
var PlaidIntegration = function () {
  var toast = (0, use_toast_1.useToast)().toast;
  var profile = (0, AuthContext_1.useAuth)().profile;
  var _a = (0, react_1.useState)(false),
    isLoading = _a[0],
    setIsLoading = _a[1];
  // Initialize personal API keys with plaid fields
  var _b = (0, react_1.useState)({
      stripe: "",
      twilio: "",
      zoom: "",
      openai: "",
      plaid_client_id: "",
      plaid_secret: "",
      plaid_access_token: "",
      plaid_env: "sandbox", // Default value
    }),
    personalApiKeys = _b[0],
    setPersonalApiKeys = _b[1];
  var _c = (0, react_hook_form_1.useForm)({
      defaultValues: {
        plaid_client_id: personalApiKeys.plaid_client_id || "",
        plaid_secret: personalApiKeys.plaid_secret || "",
        plaid_access_token: personalApiKeys.plaid_access_token || "",
        plaid_env: personalApiKeys.plaid_env || "sandbox",
      },
    }),
    register = _c.register,
    handleSubmit = _c.handleSubmit,
    reset = _c.reset;
  // Load API keys from profile
  (0, react_1.useEffect)(
    function () {
      if (
        profile === null || profile === void 0
          ? void 0
          : profile.personal_api_keys
      ) {
        // Convert from possible JSON string
        var keys_1 =
          typeof profile.personal_api_keys === "string"
            ? JSON.parse(profile.personal_api_keys)
            : profile.personal_api_keys;
        setPersonalApiKeys(function (prev) {
          return __assign(__assign({}, prev), keys_1);
        });
        // Reset form with loaded values
        reset({
          plaid_client_id: keys_1.plaid_client_id || "",
          plaid_secret: keys_1.plaid_secret || "",
          plaid_access_token: keys_1.plaid_access_token || "",
          plaid_env: keys_1.plaid_env || "sandbox",
        });
      }
    },
    [profile, reset],
  );
  var onSubmit = function (data) {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        setIsLoading(true);
        try {
          // Implementation would go here in a real app
          console.log("Saving Plaid integration settings:", data);
          toast({
            title: "Settings saved",
            description:
              "Your Plaid integration settings have been updated successfully.",
          });
        } catch (error) {
          console.error("Error saving Plaid settings:", error);
          toast({
            title: "Error",
            description: "Failed to save Plaid integration settings.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
        return [2 /*return*/];
      });
    });
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container py-6",
    children: [
      (0, jsx_runtime_1.jsx)("h1", {
        className: "text-3xl font-bold mb-6",
        children: "Plaid Integration",
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                children: "Connect to Plaid",
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children:
                  "Use Plaid to connect to bank accounts and financial data.",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            children: (0, jsx_runtime_1.jsxs)("form", {
              onSubmit: handleSubmit(onSubmit),
              className: "space-y-4",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "space-y-2",
                  children: [
                    (0, jsx_runtime_1.jsx)("label", {
                      htmlFor: "plaid_client_id",
                      className: "text-sm font-medium",
                      children: "Plaid Client ID",
                    }),
                    (0, jsx_runtime_1.jsx)(
                      input_1.Input,
                      __assign(
                        {
                          id: "plaid_client_id",
                          type: "text",
                          placeholder: "Enter your Plaid Client ID",
                        },
                        register("plaid_client_id"),
                      ),
                    ),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "space-y-2",
                  children: [
                    (0, jsx_runtime_1.jsx)("label", {
                      htmlFor: "plaid_secret",
                      className: "text-sm font-medium",
                      children: "Plaid Secret",
                    }),
                    (0, jsx_runtime_1.jsx)(
                      input_1.Input,
                      __assign(
                        {
                          id: "plaid_secret",
                          type: "password",
                          placeholder: "Enter your Plaid Secret",
                        },
                        register("plaid_secret"),
                      ),
                    ),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "space-y-2",
                  children: [
                    (0, jsx_runtime_1.jsx)("label", {
                      htmlFor: "plaid_access_token",
                      className: "text-sm font-medium",
                      children: "Plaid Access Token",
                    }),
                    (0, jsx_runtime_1.jsx)(
                      input_1.Input,
                      __assign(
                        {
                          id: "plaid_access_token",
                          type: "password",
                          placeholder: "Enter your Plaid Access Token",
                        },
                        register("plaid_access_token"),
                      ),
                    ),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "space-y-2",
                  children: [
                    (0, jsx_runtime_1.jsx)("label", {
                      htmlFor: "plaid_env",
                      className: "text-sm font-medium",
                      children: "Plaid Environment",
                    }),
                    (0, jsx_runtime_1.jsxs)(
                      "select",
                      __assign(
                        {
                          id: "plaid_env",
                          className: "w-full p-2 border rounded-md",
                        },
                        register("plaid_env"),
                        {
                          children: [
                            (0, jsx_runtime_1.jsx)("option", {
                              value: "sandbox",
                              children: "Sandbox",
                            }),
                            (0, jsx_runtime_1.jsx)("option", {
                              value: "development",
                              children: "Development",
                            }),
                            (0, jsx_runtime_1.jsx)("option", {
                              value: "production",
                              children: "Production",
                            }),
                          ],
                        },
                      ),
                    ),
                  ],
                }),
                (0, jsx_runtime_1.jsx)(button_1.Button, {
                  type: "submit",
                  disabled: isLoading,
                  children: isLoading ? "Saving..." : "Save Plaid Settings",
                }),
              ],
            }),
          }),
        ],
      }),
    ],
  });
};
exports.default = PlaidIntegration;

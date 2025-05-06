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
exports.default = StripeIntegration;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var typography_1 = require("@/components/ui/typography");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var alert_1 = require("@/components/ui/alert");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var sonner_1 = require("sonner");
var client_1 = require("@/integrations/supabase/client");
var APIKeyInput_1 = require("@/components/admin/APIKeyInput");
var react_query_1 = require("@tanstack/react-query");
function StripeIntegration() {
  var _this = this;
  var _a = (0, react_1.useState)(""),
    stripeSecretKey = _a[0],
    setStripeSecretKey = _a[1];
  var _b = (0, react_1.useState)(false),
    isSubmitting = _b[0],
    setIsSubmitting = _b[1];
  var _c = (0, react_1.useState)(""),
    testQuery = _c[0],
    setTestQuery = _c[1];
  var _d = (0, react_1.useState)(null),
    testResult = _d[0],
    setTestResult = _d[1];
  var _e = (0, react_1.useState)(false),
    isLoading = _e[0],
    setIsLoading = _e[1];
  var _f = (0, react_query_1.useQuery)({
      queryKey: ["stripe-key-check"],
      queryFn: function () {
        return __awaiter(_this, void 0, void 0, function () {
          var _a, data, error, err_1;
          return __generator(this, function (_b) {
            switch (_b.label) {
              case 0:
                _b.trys.push([0, 2, , 3]);
                return [
                  4 /*yield*/,
                  client_1.supabase.functions.invoke("check-secret", {
                    body: { key: "STRIPE_SECRET_KEY" },
                  }),
                ];
              case 1:
                (_a = _b.sent()), (data = _a.data), (error = _a.error);
                if (error) throw error;
                return [2 /*return*/, data.exists];
              case 2:
                err_1 = _b.sent();
                console.error("Error checking Stripe key:", err_1);
                return [2 /*return*/, false];
              case 3:
                return [2 /*return*/];
            }
          });
        });
      },
    }),
    isKeySet = _f.data,
    isCheckingKey = _f.isLoading;
  var handleSaveKey = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var _a, data, error, err_2;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            if (!stripeSecretKey) {
              sonner_1.toast.error("Please enter a Stripe secret key");
              return [2 /*return*/];
            }
            setIsSubmitting(true);
            _b.label = 1;
          case 1:
            _b.trys.push([1, 3, 4, 5]);
            return [
              4 /*yield*/,
              client_1.supabase.functions.invoke("set-secret", {
                body: {
                  key: "STRIPE_SECRET_KEY",
                  value: stripeSecretKey,
                },
              }),
            ];
          case 2:
            (_a = _b.sent()), (data = _a.data), (error = _a.error);
            if (error) throw error;
            sonner_1.toast.success("Stripe secret key saved successfully");
            setStripeSecretKey("");
            return [3 /*break*/, 5];
          case 3:
            err_2 = _b.sent();
            console.error("Error saving Stripe key:", err_2);
            sonner_1.toast.error("Failed to save Stripe secret key");
            return [3 /*break*/, 5];
          case 4:
            setIsSubmitting(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  var handleTestQuery = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var _a, data, error, err_3;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            if (!testQuery) {
              sonner_1.toast.error("Please enter a test query");
              return [2 /*return*/];
            }
            setIsLoading(true);
            setTestResult(null);
            _b.label = 1;
          case 1:
            _b.trys.push([1, 3, 4, 5]);
            return [
              4 /*yield*/,
              client_1.supabase.functions.invoke("stripe-analytics", {
                body: { query: testQuery },
              }),
            ];
          case 2:
            (_a = _b.sent()), (data = _a.data), (error = _a.error);
            if (error) throw error;
            setTestResult(data.result);
            return [3 /*break*/, 5];
          case 3:
            err_3 = _b.sent();
            console.error("Error executing Stripe test query:", err_3);
            sonner_1.toast.error("Failed to execute Stripe test query");
            return [3 /*break*/, 5];
          case 4:
            setIsLoading(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto px-4 py-6 space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex flex-col gap-2",
        children: [
          (0, jsx_runtime_1.jsx)(typography_1.TypographyH1, {
            children: "Stripe Integration",
          }),
          (0, jsx_runtime_1.jsx)(typography_1.TypographyP, {
            children:
              "Configure Stripe integration for payment analytics and management through the AI agent.",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                children: "Stripe API Configuration",
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children:
                  "Enter your Stripe secret key to enable payment analytics through the AI agent.",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
            className: "space-y-4",
            children: [
              isKeySet
                ? (0, jsx_runtime_1.jsxs)(alert_1.Alert, {
                    className: "bg-green-50 border-green-200",
                    children: [
                      (0, jsx_runtime_1.jsx)(alert_1.AlertTitle, {
                        children: "Stripe integration is active",
                      }),
                      (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, {
                        children:
                          "Your Stripe secret key is configured. The AI agent can now access Stripe data.",
                      }),
                    ],
                  })
                : (0, jsx_runtime_1.jsxs)(alert_1.Alert, {
                    className: "bg-yellow-50 border-yellow-200",
                    children: [
                      (0, jsx_runtime_1.jsx)(alert_1.AlertTitle, {
                        children: "Stripe integration not configured",
                      }),
                      (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, {
                        children:
                          "Enter your Stripe secret key below to enable the integration.",
                      }),
                    ],
                  }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "mt-4",
                children: [
                  (0, jsx_runtime_1.jsx)(APIKeyInput_1.default, {
                    id: "stripe-secret-key",
                    label: "Stripe Secret Key",
                    value: stripeSecretKey,
                    onChange: function (value) {
                      return setStripeSecretKey(value);
                    },
                    placeholder: "sk_live_...",
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-xs text-muted-foreground mt-1",
                    children:
                      "Find this in your Stripe Dashboard under API Keys. Use your secret key (not publishable key).",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                onClick: handleSaveKey,
                disabled: isSubmitting || !stripeSecretKey,
                className: "mt-2",
                children: isSubmitting ? "Saving..." : "Save API Key",
              }),
            ],
          }),
        ],
      }),
      isKeySet &&
        (0, jsx_runtime_1.jsxs)(card_1.Card, {
          children: [
            (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                  children: "Test Stripe Analytics",
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                  children:
                    "Try out some sample queries to test the Stripe analytics integration.",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
              className: "space-y-4",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex flex-col space-y-2",
                  children: [
                    (0, jsx_runtime_1.jsx)(label_1.Label, {
                      htmlFor: "test-query",
                      children: "Test Query",
                    }),
                    (0, jsx_runtime_1.jsx)(input_1.Input, {
                      id: "test-query",
                      placeholder:
                        "e.g., What's our total revenue in the last 30 days?",
                      value: testQuery,
                      onChange: function (e) {
                        return setTestQuery(e.target.value);
                      },
                    }),
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "text-xs text-muted-foreground",
                      children:
                        'Try queries like "total revenue", "active subscriptions", or "refunds this week"',
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)(button_1.Button, {
                  onClick: handleTestQuery,
                  disabled: isLoading || !testQuery,
                  children: isLoading ? "Running..." : "Run Test Query",
                }),
                testResult &&
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "mt-4 p-4 bg-gray-50 rounded-md border",
                    children: [
                      (0, jsx_runtime_1.jsx)("h3", {
                        className: "font-medium mb-2",
                        children: "Result:",
                      }),
                      (0, jsx_runtime_1.jsx)("pre", {
                        className: "whitespace-pre-wrap text-sm",
                        children: testResult,
                      }),
                    ],
                  }),
              ],
            }),
          ],
        }),
    ],
  });
}

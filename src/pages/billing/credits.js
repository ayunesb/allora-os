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
exports.default = CreditsPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var supabase_js_1 = require("@supabase/supabase-js");
// Initialize supabase client
var supabaseUrl = "https://tnfqzklfdwknmplrygag.supabase.co";
var supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRuZnF6a2xmZHdrbm1wbHJ5Z2FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2OTUwNTksImV4cCI6MjA2MDI3MTA1OX0.8s7ol8jfz_6anK4l2aGBXaICDf3lLHmHSPovcXXGQ1A";
var supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseAnonKey);
function CreditsPage() {
  var _this = this;
  var _a = (0, react_1.useState)(0),
    credits = _a[0],
    setCredits = _a[1];
  var _b = (0, react_1.useState)(true),
    isLoading = _b[0],
    setIsLoading = _b[1];
  (0, react_1.useEffect)(function () {
    fetchCredits();
  }, []);
  var fetchCredits = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var _a, data, error, error_1;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            setIsLoading(true);
            _b.label = 1;
          case 1:
            _b.trys.push([1, 3, 4, 5]);
            return [
              4 /*yield*/,
              supabase.from("billing_profiles").select("credits").single(),
            ];
          case 2:
            (_a = _b.sent()), (data = _a.data), (error = _a.error);
            if (error) throw error;
            setCredits(
              (data === null || data === void 0 ? void 0 : data.credits) || 0,
            );
            return [3 /*break*/, 5];
          case 3:
            error_1 = _b.sent();
            console.error("Error fetching credits:", error_1);
            setCredits(100); // Fallback to default credits
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
  var handlePurchaseCredits = function () {
    // Implement credit purchase flow
    console.log("Purchase credits clicked");
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto py-8 px-4",
    children: [
      (0, jsx_runtime_1.jsx)("h1", {
        className: "text-3xl font-bold mb-6",
        children: "Credits & Billing",
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "grid gap-6 md:grid-cols-2",
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                children: [
                  (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                    className: "flex items-center gap-2",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Coins, {
                        className: "h-5 w-5 text-primary",
                      }),
                      "Your Credits",
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                    children:
                      "Credits are used for AI operations and strategy generation",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                children: (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex items-center justify-between",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      children: [
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-4xl font-bold",
                          children: isLoading ? "..." : credits,
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-sm text-muted-foreground mt-1",
                          children: "Available Credits",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)(button_1.Button, {
                      variant: "outline",
                      size: "sm",
                      onClick: fetchCredits,
                      disabled: isLoading,
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                          className: "h-4 w-4 mr-2",
                        }),
                        "Refresh",
                      ],
                    }),
                  ],
                }),
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                children: [
                  (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                    className: "flex items-center gap-2",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.CreditCard, {
                        className: "h-5 w-5 text-primary",
                      }),
                      "Purchase Credits",
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                    children: "Add more credits to your account",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                children: (0, jsx_runtime_1.jsxs)("div", {
                  className: "space-y-4",
                  children: [
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "text-sm",
                      children:
                        "Purchase additional credits to continue using AI features and generating strategies.",
                    }),
                    (0, jsx_runtime_1.jsx)(button_1.Button, {
                      onClick: handlePurchaseCredits,
                      children: "Buy More Credits",
                    }),
                  ],
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

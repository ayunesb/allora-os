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
exports.default = Dashboard;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var AuthContext_1 = require("@/context/AuthContext");
var sonner_1 = require("sonner");
var AiRecommendations_1 = require("@/components/dashboard/AiRecommendations");
var DashboardAnalytics_1 = require("@/components/dashboard/DashboardAnalytics");
var CeoMessage_1 = require("@/components/dashboard/CeoMessage");
var QuickAccess_1 = require("@/components/dashboard/QuickAccess");
var DashboardLoading_1 = require("@/components/dashboard/DashboardLoading");
var ProductionDataAlert_1 = require("@/components/dashboard/ProductionDataAlert");
var useDashboardData_1 = require("@/hooks/useDashboardData");
var client_1 = require("@/integrations/supabase/client");
var useStrategies_1 = require("@/hooks/useStrategies");
var useProductionData_1 = require("@/hooks/useProductionData");
var authCompatibility_1 = require("@/utils/authCompatibility");
var react_router_dom_1 = require("react-router-dom");
function Dashboard() {
  var _this = this;
  var navigate = (0, react_router_dom_1.useNavigate)();
  var _a = (0, AuthContext_1.useAuth)(),
    user = _a.user,
    profile = _a.profile;
  var _b = (0, react_1.useState)(false),
    isRefreshing = _b[0],
    setIsRefreshing = _b[1];
  var _c = (0, useDashboardData_1.useDashboardData)(
      user === null || user === void 0 ? void 0 : user.id,
    ),
    data = _c.data,
    isLoading = _c.isLoading,
    error = _c.error,
    refetch = _c.refetch;
  var isProductionMode = (0, useProductionData_1.useProductionData)()
    .isProductionMode;
  var _d = (0, react_1.useState)("your company"),
    companyName = _d[0],
    setCompanyName = _d[1];
  var strategies = (0, useStrategies_1.useStrategies)().strategies;
  var normalizedUser = (0, authCompatibility_1.normalizeUserObject)(
    user || profile,
  );
  // Fetch real company name
  (0, react_1.useEffect)(
    function () {
      var fetchCompanyData = function () {
        return __awaiter(_this, void 0, void 0, function () {
          var _a, data_1, error_1, err_1;
          return __generator(this, function (_b) {
            switch (_b.label) {
              case 0:
                if (
                  !(normalizedUser === null || normalizedUser === void 0
                    ? void 0
                    : normalizedUser.company_id)
                )
                  return [3 /*break*/, 4];
                _b.label = 1;
              case 1:
                _b.trys.push([1, 3, , 4]);
                return [
                  4 /*yield*/,
                  client_1.supabase
                    .from("companies")
                    .select("name")
                    .eq("id", normalizedUser.company_id)
                    .single(),
                ];
              case 2:
                (_a = _b.sent()), (data_1 = _a.data), (error_1 = _a.error);
                if (!error_1 && data_1) {
                  setCompanyName(data_1.name);
                }
                return [3 /*break*/, 4];
              case 3:
                err_1 = _b.sent();
                console.error("Error fetching company data:", err_1);
                return [3 /*break*/, 4];
              case 4:
                return [2 /*return*/];
            }
          });
        });
      };
      fetchCompanyData();
    },
    [
      normalizedUser === null || normalizedUser === void 0
        ? void 0
        : normalizedUser.company_id,
    ],
  );
  (0, react_1.useEffect)(
    function () {
      if (error) {
        console.error("Dashboard data error:", error);
        sonner_1.toast.error(
          "Error loading dashboard data. Please try refreshing.",
        );
      }
    },
    [error],
  );
  var handleRefreshData = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var err_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setIsRefreshing(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            return [4 /*yield*/, refetch()];
          case 2:
            _a.sent();
            sonner_1.toast.success("Dashboard data refreshed");
            return [3 /*break*/, 5];
          case 3:
            err_2 = _a.sent();
            console.error("Error refreshing data:", err_2);
            sonner_1.toast.error("Failed to refresh data");
            return [3 /*break*/, 5];
          case 4:
            setIsRefreshing(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  var handleSetupProduction = function () {
    // Redirect to the admin launch page
    window.location.href = "/admin/launch-verification";
  };
  var navigateToStrategyGenerator = function () {
    navigate("/dashboard/strategy-generator");
  };
  if (isLoading && !data) {
    return (0, jsx_runtime_1.jsx)(DashboardLoading_1.DashboardLoading, {});
  }
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex items-center justify-between",
        children: [
          (0, jsx_runtime_1.jsx)("h1", {
            className: "text-2xl font-bold tracking-tight",
            children: "Dashboard",
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            onClick: handleRefreshData,
            variant: "outline",
            size: "sm",
            disabled: isRefreshing,
            className: "flex items-center gap-1",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                className: "h-4 w-4 ".concat(
                  isRefreshing ? "animate-spin" : "",
                ),
              }),
              (0, jsx_runtime_1.jsx)("span", { children: "Refresh Data" }),
            ],
          }),
        ],
      }),
      !isProductionMode &&
        (0, jsx_runtime_1.jsx)(ProductionDataAlert_1.default, {}),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8",
        children: [
          (0, jsx_runtime_1.jsx)("div", {
            className: "md:col-span-2",
            children: (0, jsx_runtime_1.jsx)(CeoMessage_1.default, {
              riskAppetite:
                (normalizedUser === null || normalizedUser === void 0
                  ? void 0
                  : normalizedUser.risk_appetite) || "medium",
            }),
          }),
          (0, jsx_runtime_1.jsx)("div", {
            children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                  className: "pb-2",
                  children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                    className: "text-xl",
                    children: "Executive Insight",
                  }),
                }),
                (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center gap-4",
                      children: [
                        (0, jsx_runtime_1.jsx)("div", {
                          className:
                            "flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary",
                          children: (0, jsx_runtime_1.jsx)(
                            lucide_react_1.Sparkles,
                            { className: "h-6 w-6" },
                          ),
                        }),
                        (0, jsx_runtime_1.jsx)("div", {
                          children: (0, jsx_runtime_1.jsx)("h3", {
                            className: "text-lg font-bold",
                            children: "AI Strategy Generator",
                          }),
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "mt-4 text-sm text-muted-foreground",
                      children:
                        "Generate tailored business strategies using AI based on your company profile, goals, and risk tolerance.",
                    }),
                    (0, jsx_runtime_1.jsxs)(button_1.Button, {
                      className: "mt-4 w-full",
                      onClick: navigateToStrategyGenerator,
                      children: [
                        (0, jsx_runtime_1.jsx)("span", {
                          children: "Create Strategies",
                        }),
                        (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, {
                          className: "ml-2 h-4 w-4",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
      data &&
        (0, jsx_runtime_1.jsx)(AiRecommendations_1.default, {
          recommendations: data.recommendations || [],
          onApprove: function (index) {
            sonner_1.toast.success(
              "Recommendation ".concat(index + 1, " approved"),
            );
          },
        }),
      (0, jsx_runtime_1.jsx)(DashboardAnalytics_1.DashboardAnalytics, {}),
      (0, jsx_runtime_1.jsx)(QuickAccess_1.default, {}),
    ],
  });
}

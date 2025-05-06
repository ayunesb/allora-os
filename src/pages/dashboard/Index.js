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
var useDashboardData_1 = require("@/hooks/useDashboardData");
var DashboardHeader_1 = require("@/components/dashboard/DashboardHeader");
var CeoMessage_1 = require("@/components/dashboard/CeoMessage");
var AiRecommendations_1 = require("@/components/dashboard/AiRecommendations");
var QuickAccess_1 = require("@/components/dashboard/QuickAccess");
var DashboardLoading_1 = require("@/components/dashboard/DashboardLoading");
var StrategyDisplay_1 = require("@/components/dashboard/StrategyDisplay");
var WelcomeVideo_1 = require("@/components/dashboard/WelcomeVideo");
var UpcomingZoomMeeting_1 = require("@/components/dashboard/UpcomingZoomMeeting");
var react_1 = require("react");
var AuthContext_1 = require("@/context/AuthContext");
var client_1 = require("@/integrations/supabase/client");
var ErrorBoundary_1 = require("@/components/ErrorBoundary");
var sonner_1 = require("sonner");
function Dashboard() {
  var _this = this;
  var _a = (0, react_1.useTransition)(),
    isPending = _a[0],
    startTransition = _a[1];
  var _b = (0, react_1.useState)(false),
    isInitialized = _b[0],
    setIsInitialized = _b[1];
  var _c = (0, AuthContext_1.useAuth)(),
    user = _c.user,
    profile = _c.profile;
  // Create needed state variables to match what the components expect
  var _d = (0, react_1.useState)(0),
    pendingApprovals = _d[0],
    setPendingApprovals = _d[1];
  var _e = (0, react_1.useState)([]),
    aiRecommendations = _e[0],
    setAiRecommendations = _e[1];
  var _f = (0, react_1.useState)("medium"),
    riskAppetite = _f[0],
    setRiskAppetite = _f[1];
  var _g = (0, useDashboardData_1.useDashboardData)(
      user === null || user === void 0 ? void 0 : user.id,
    ),
    data = _g.data,
    isLoading = _g.isLoading,
    error = _g.error;
  (0, react_1.useEffect)(
    function () {
      if (data) {
        // Update state based on fetched data
        setAiRecommendations(data.recommendations || []);
        // Set other state values if available in the data
      }
    },
    [data],
  );
  var handleApproveRecommendation = function (index) {
    sonner_1.toast.success("Approved recommendation: ".concat(index + 1));
    // Implementation for approving recommendations would go here
  };
  // Auto-generate initial dashboard and track first visit
  (0, react_1.useEffect)(
    function () {
      if (
        !isInitialized &&
        (user === null || user === void 0 ? void 0 : user.id) &&
        (profile === null || profile === void 0 ? void 0 : profile.company_id)
      ) {
        var trackFirstVisit_1 = function () {
          return __awaiter(_this, void 0, void 0, function () {
            var tableCheckError,
              _a,
              visits,
              visitsError,
              _b,
              strategies,
              strategiesError,
              genError,
              error_1;
            return __generator(this, function (_c) {
              switch (_c.label) {
                case 0:
                  _c.trys.push([0, 8, 9, 10]);
                  return [
                    4 /*yield*/,
                    client_1.supabase
                      .from("information_schema.tables")
                      .select("table_name")
                      .eq("table_schema", "public")
                      .eq("table_name", "user_activity")
                      .single(),
                  ];
                case 1:
                  tableCheckError = _c.sent().error;
                  if (tableCheckError) {
                    console.log(
                      "User activity table may not exist:",
                      tableCheckError,
                    );
                    setIsInitialized(true);
                    return [2 /*return*/];
                  }
                  return [
                    4 /*yield*/,
                    client_1.supabase
                      .from("user_activity")
                      .select("*")
                      .eq("user_id", user.id)
                      .eq("activity_type", "dashboard_visit")
                      .limit(1),
                  ];
                case 2:
                  (_a = _c.sent()),
                    (visits = _a.data),
                    (visitsError = _a.error);
                  if (visitsError) {
                    console.error("Error checking visits:", visitsError);
                    setIsInitialized(true);
                    return [2 /*return*/];
                  }
                  if (!(!visits || visits.length === 0))
                    return [3 /*break*/, 7];
                  // This is the first visit, record it if table exists
                  return [
                    4 /*yield*/,
                    client_1.supabase.from("user_activity").insert([
                      {
                        user_id: user.id,
                        activity_type: "dashboard_visit",
                        activity_data: { first_visit: true },
                      },
                    ]),
                  ];
                case 3:
                  // This is the first visit, record it if table exists
                  _c.sent();
                  return [
                    4 /*yield*/,
                    client_1.supabase
                      .from("strategies")
                      .select("count")
                      .eq("company_id", profile.company_id),
                  ];
                case 4:
                  (_b = _c.sent()),
                    (strategies = _b.data),
                    (strategiesError = _b.error);
                  if (!strategiesError) return [3 /*break*/, 5];
                  console.error("Error checking strategies:", strategiesError);
                  return [3 /*break*/, 7];
                case 5:
                  if (!(strategies && strategies.length === 0))
                    return [3 /*break*/, 7];
                  return [
                    4 /*yield*/,
                    client_1.supabase.functions.invoke("generate-strategies", {
                      body: {
                        companyId: profile.company_id,
                        riskLevel: profile.risk_appetite || "medium",
                        industry: profile.industry || "General",
                        urgent: true,
                      },
                    }),
                  ];
                case 6:
                  genError = _c.sent().error;
                  if (genError)
                    console.error(
                      "Error generating initial strategies:",
                      genError,
                    );
                  _c.label = 7;
                case 7:
                  return [3 /*break*/, 10];
                case 8:
                  error_1 = _c.sent();
                  console.error(
                    "Error tracking first dashboard visit:",
                    error_1,
                  );
                  return [3 /*break*/, 10];
                case 9:
                  setIsInitialized(true);
                  return [7 /*endfinally*/];
                case 10:
                  return [2 /*return*/];
              }
            });
          });
        };
        startTransition(function () {
          trackFirstVisit_1();
        });
      }
    },
    [
      user === null || user === void 0 ? void 0 : user.id,
      profile,
      isInitialized,
      startTransition,
    ],
  );
  // For initial loading state
  if (isLoading || isPending) {
    return (0, jsx_runtime_1.jsx)(DashboardLoading_1.DashboardLoading, {});
  }
  return (0, jsx_runtime_1.jsx)(ErrorBoundary_1.ErrorBoundary, {
    children: (0, jsx_runtime_1.jsxs)("div", {
      className: "min-h-screen space-y-8",
      children: [
        (0, jsx_runtime_1.jsx)(DashboardHeader_1.DashboardHeader, {
          pendingApprovals: pendingApprovals,
        }),
        (0, jsx_runtime_1.jsx)(ErrorBoundary_1.ErrorBoundary, {
          children: (0, jsx_runtime_1.jsx)(WelcomeVideo_1.WelcomeVideo, {}),
        }),
        (0, jsx_runtime_1.jsx)(ErrorBoundary_1.ErrorBoundary, {
          children: (0, jsx_runtime_1.jsx)(
            UpcomingZoomMeeting_1.UpcomingZoomMeeting,
            {},
          ),
        }),
        (0, jsx_runtime_1.jsx)(ErrorBoundary_1.ErrorBoundary, {
          children: (0, jsx_runtime_1.jsx)(CeoMessage_1.default, {
            riskAppetite: riskAppetite,
          }),
        }),
        (0, jsx_runtime_1.jsx)(ErrorBoundary_1.ErrorBoundary, {
          children: (0, jsx_runtime_1.jsx)(
            StrategyDisplay_1.StrategyDisplay,
            {},
          ),
        }),
        (0, jsx_runtime_1.jsx)(ErrorBoundary_1.ErrorBoundary, {
          children: (0, jsx_runtime_1.jsx)(AiRecommendations_1.default, {
            recommendations: aiRecommendations,
            onApprove: handleApproveRecommendation,
          }),
        }),
        (0, jsx_runtime_1.jsx)(ErrorBoundary_1.ErrorBoundary, {
          children: (0, jsx_runtime_1.jsx)(QuickAccess_1.default, {}),
        }),
      ],
    }),
  });
}

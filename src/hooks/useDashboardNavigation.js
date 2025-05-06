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
exports.useDashboardNavigation = useDashboardNavigation;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var AuthContext_1 = require("@/context/AuthContext");
var sonner_1 = require("sonner");
var onboarding_1 = require("@/utils/onboarding");
function useDashboardNavigation() {
  var _this = this;
  var _a = (0, AuthContext_1.useAuth)(),
    user = _a.user,
    isLoading = _a.isLoading,
    profile = _a.profile,
    refreshSession = _a.refreshSession,
    signOut = _a.signOut;
  var navigate = (0, react_router_dom_1.useNavigate)();
  var _b = (0, react_1.useState)(false),
    mobileMenuOpen = _b[0],
    setMobileMenuOpen = _b[1];
  var navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Strategies", path: "/dashboard/strategies" },
    { label: "Campaigns", path: "/dashboard/campaigns" },
    { label: "Calls", path: "/dashboard/calls" },
    { label: "Leads", path: "/dashboard/leads" },
    { label: "AI Bots", path: "/dashboard/ai-bots" },
  ];
  (0, react_1.useEffect)(
    function () {
      var checkUserOnboarding = function () {
        return __awaiter(_this, void 0, void 0, function () {
          var hasCompletedOnboarding;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                if (!(user && !isLoading)) return [3 /*break*/, 2];
                return [
                  4 /*yield*/,
                  (0, onboarding_1.checkOnboardingStatus)(user.id),
                ];
              case 1:
                hasCompletedOnboarding = _a.sent();
                if (!hasCompletedOnboarding) {
                  sonner_1.toast.info("Please complete onboarding first");
                  navigate("/onboarding");
                }
                _a.label = 2;
              case 2:
                return [2 /*return*/];
            }
          });
        });
      };
      checkUserOnboarding();
    },
    [user, isLoading, profile, navigate],
  );
  var handleRefreshSession = function () {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            sonner_1.toast.info("Refreshing session...");
            return [4 /*yield*/, refreshSession()];
          case 1:
            _a.sent();
            sonner_1.toast.success("Session refreshed");
            return [2 /*return*/];
        }
      });
    });
  };
  var handleSignOut = function () {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, signOut()];
          case 1:
            _a.sent();
            navigate("/");
            sonner_1.toast.success("You have been logged out");
            return [2 /*return*/];
        }
      });
    });
  };
  var handleNavigateToProfile = function () {
    navigate("/dashboard/profile");
    setMobileMenuOpen(false);
  };
  // Check if session needs refresh
  var needsSessionRefresh = function () {
    if (!(user === null || user === void 0 ? void 0 : user.updated_at))
      return false;
    var sessionTime = new Date(user.updated_at).getTime();
    var thirtyMinutesAgo = Date.now() - 30 * 60 * 1000;
    return sessionTime < thirtyMinutesAgo;
  };
  return {
    user: user,
    isLoading: isLoading,
    navItems: navItems,
    mobileMenuOpen: mobileMenuOpen,
    setMobileMenuOpen: setMobileMenuOpen,
    needsSessionRefresh: needsSessionRefresh,
    handleRefreshSession: handleRefreshSession,
    handleSignOut: handleSignOut,
    handleNavigateToProfile: handleNavigateToProfile,
  };
}

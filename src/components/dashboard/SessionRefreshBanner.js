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
exports.SessionRefreshBanner = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var AuthContext_1 = require("@/context/AuthContext");
var sonner_1 = require("sonner");
var authCompatibility_1 = require("@/utils/authCompatibility");
var SessionRefreshBanner = function (_a) {
  var _b = _a.threshold,
    threshold = _b === void 0 ? 45 : _b;
  var _c = (0, react_1.useState)(false),
    showBanner = _c[0],
    setShowBanner = _c[1];
  var _d = (0, react_1.useState)(false),
    isRefreshing = _d[0],
    setIsRefreshing = _d[1];
  var authContext = (0, AuthContext_1.useAuth)();
  var auth = (0, authCompatibility_1.createAuthCompatibilityLayer)(authContext);
  (0, react_1.useEffect)(
    function () {
      // Check if session needs refreshing - use last activity or created_at
      var checkSessionAge = function () {
        if (!auth.user) return;
        // Use updated_at if available, otherwise fall back to created_at
        var sessionTimestamp = auth.user.updated_at || auth.user.created_at;
        if (!sessionTimestamp) return;
        var sessionUpdateTime = new Date(sessionTimestamp).getTime();
        var thresholdMs = threshold * 60 * 1000; // Convert minutes to ms
        var now = Date.now();
        setShowBanner(now - sessionUpdateTime > thresholdMs);
      };
      checkSessionAge();
      // Check every 5 minutes
      var interval = setInterval(checkSessionAge, 5 * 60 * 1000);
      return function () {
        return clearInterval(interval);
      };
    },
    [auth.user, threshold],
  );
  var handleRefresh = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!auth.refreshSession) return [2 /*return*/];
            setIsRefreshing(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            return [4 /*yield*/, auth.refreshSession()];
          case 2:
            _a.sent();
            setShowBanner(false);
            sonner_1.toast.success("Session refreshed successfully");
            return [3 /*break*/, 5];
          case 3:
            error_1 = _a.sent();
            console.error("Failed to refresh session:", error_1);
            sonner_1.toast.error("Failed to refresh session");
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
  if (!showBanner) return null;
  return (0, jsx_runtime_1.jsx)("div", {
    className:
      "fixed bottom-4 right-4 z-50 max-w-sm p-4 bg-muted/80 backdrop-blur rounded-lg shadow-lg border border-muted-foreground/20",
    children: (0, jsx_runtime_1.jsxs)("div", {
      className: "flex items-start space-x-3",
      children: [
        (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
          className: "h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0",
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "flex-1",
          children: [
            (0, jsx_runtime_1.jsx)("h3", {
              className: "font-medium text-sm",
              children: "Session expiring soon",
            }),
            (0, jsx_runtime_1.jsx)("p", {
              className: "text-xs text-muted-foreground mt-1",
              children:
                "Your session will expire soon. Refresh to stay logged in.",
            }),
            (0, jsx_runtime_1.jsx)(button_1.Button, {
              onClick: handleRefresh,
              size: "sm",
              className: "mt-2 h-8",
              disabled: isRefreshing,
              children: isRefreshing
                ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                        className: "h-3.5 w-3.5 mr-1.5 animate-spin",
                      }),
                      "Refreshing...",
                    ],
                  })
                : "Refresh Session",
            }),
          ],
        }),
      ],
    }),
  });
};
exports.SessionRefreshBanner = SessionRefreshBanner;

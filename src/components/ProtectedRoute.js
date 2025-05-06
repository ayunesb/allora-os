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
exports.default = ProtectedRoute;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var useAuth_1 = require("@/hooks/useAuth");
var sonner_1 = require("sonner");
// Loading state component
var AuthLoadingState = function () {
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "flex flex-col items-center justify-center min-h-screen p-4",
    children: [
      (0, jsx_runtime_1.jsx)("div", {
        className:
          "animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4",
      }),
      (0, jsx_runtime_1.jsx)("p", {
        className: "text-lg text-center text-muted-foreground",
        children: "Verifying your access...",
      }),
    ],
  });
};
// Auth error state component
var AuthErrorState = function (_a) {
  var error = _a.error,
    onRetry = _a.onRetry,
    isRetrying = _a.isRetrying;
  return (0, jsx_runtime_1.jsx)("div", {
    className: "flex flex-col items-center justify-center min-h-screen p-4",
    children: (0, jsx_runtime_1.jsxs)("div", {
      className: "p-6 bg-destructive/10 rounded-lg max-w-md",
      children: [
        (0, jsx_runtime_1.jsx)("h2", {
          className: "text-xl font-bold mb-4 text-destructive",
          children: "Authentication Error",
        }),
        (0, jsx_runtime_1.jsx)("p", { className: "mb-4", children: error }),
        (0, jsx_runtime_1.jsx)("button", {
          onClick: onRetry,
          disabled: isRetrying,
          className:
            "bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors",
          children: isRetrying ? "Retrying..." : "Retry",
        }),
      ],
    }),
  });
};
// Verification required state component
var VerificationRequiredState = function (_a) {
  var onRefresh = _a.onRefresh,
    onResendVerification = _a.onResendVerification,
    isResending = _a.isResending;
  return (0, jsx_runtime_1.jsx)("div", {
    className: "flex flex-col items-center justify-center min-h-screen p-4",
    children: (0, jsx_runtime_1.jsxs)("div", {
      className: "p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg max-w-md",
      children: [
        (0, jsx_runtime_1.jsx)("h2", {
          className:
            "text-xl font-bold mb-4 text-yellow-700 dark:text-yellow-400",
          children: "Email Verification Required",
        }),
        (0, jsx_runtime_1.jsx)("p", {
          className: "mb-4",
          children: "Please verify your email address before continuing.",
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "flex flex-col sm:flex-row gap-3",
          children: [
            (0, jsx_runtime_1.jsx)("button", {
              onClick: onRefresh,
              className:
                "bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors",
              children: "I've Verified My Email",
            }),
            (0, jsx_runtime_1.jsx)("button", {
              onClick: onResendVerification,
              disabled: isResending,
              className:
                "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors",
              children: isResending
                ? "Sending..."
                : "Resend Verification Email",
            }),
          ],
        }),
      ],
    }),
  });
};
function ProtectedRoute(_a) {
  var _this = this;
  var _b, _c, _d;
  var children = _a.children,
    roleRequired = _a.roleRequired,
    adminOnly = _a.adminOnly,
    _e = _a.requireVerified,
    requireVerified = _e === void 0 ? false : _e;
  var auth = (0, useAuth_1.useAuth)();
  var location = (0, react_router_dom_1.useLocation)();
  var _f = (0, react_1.useState)(true),
    isVerifying = _f[0],
    setIsVerifying = _f[1];
  var _g = (0, react_1.useState)(Date.now()),
    lastVerified = _g[0],
    setLastVerified = _g[1];
  // Force session verification on sensitive routes or after time threshold
  (0, react_1.useEffect)(
    function () {
      var verifyAuthentication = function () {
        return __awaiter(_this, void 0, void 0, function () {
          var isSensitiveRoute, timeThreshold, shouldVerify;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                setIsVerifying(true);
                isSensitiveRoute =
                  adminOnly || roleRequired === "admin" || requireVerified;
                timeThreshold = isSensitiveRoute ? 30000 : 300000;
                shouldVerify =
                  auth.user &&
                  (Date.now() - lastVerified > timeThreshold ||
                    isSensitiveRoute);
                if (!(shouldVerify && auth.refreshSession))
                  return [3 /*break*/, 2];
                return [4 /*yield*/, auth.refreshSession()];
              case 1:
                _a.sent();
                setLastVerified(Date.now());
                _a.label = 2;
              case 2:
                setIsVerifying(false);
                return [2 /*return*/];
            }
          });
        });
      };
      verifyAuthentication();
    },
    [
      location.pathname,
      auth.user,
      adminOnly,
      roleRequired,
      requireVerified,
      auth.refreshSession,
      lastVerified,
    ],
  );
  // Handle loading state
  if (auth.isLoading || auth.loading || isVerifying) {
    return (0, jsx_runtime_1.jsx)(AuthLoadingState, {});
  }
  // Handle expired session
  if (auth.isSessionExpired) {
    return (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, {
      to: "/login",
      state: { from: location, expired: true },
      replace: true,
    });
  }
  // Handle unauthenticated users
  if (!auth.user && auth.hasInitialized) {
    sonner_1.toast.error("Please log in to access this page", {
      description: "This page requires authentication.",
    });
    return (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, {
      to: "/login",
      state: { from: location },
      replace: true,
    });
  }
  // Handle auth errors
  if (auth.authError) {
    return (0, jsx_runtime_1.jsx)(AuthErrorState, {
      error: auth.authError,
      onRetry: function () {
        return __awaiter(_this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                if (!auth.refreshSession) return [3 /*break*/, 2];
                return [4 /*yield*/, auth.refreshSession()];
              case 1:
                _a.sent();
                _a.label = 2;
              case 2:
                return [2 /*return*/];
            }
          });
        });
      },
      isRetrying: false,
    });
  }
  // Handle verification requirement
  if (requireVerified && !auth.isEmailVerified && auth.hasInitialized) {
    return (0, jsx_runtime_1.jsx)(VerificationRequiredState, {
      onRefresh: function () {
        return __awaiter(_this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                if (!auth.refreshSession) return [3 /*break*/, 2];
                return [4 /*yield*/, auth.refreshSession()];
              case 1:
                _a.sent();
                _a.label = 2;
              case 2:
                return [2 /*return*/];
            }
          });
        });
      },
      onResendVerification: function () {
        return __awaiter(_this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            return [2 /*return*/];
          });
        });
      },
      isResending: false,
    });
  }
  // Handle admin access check
  if ((adminOnly || roleRequired === "admin") && auth.hasInitialized) {
    var isAdmin =
      ((_b = auth.profile) === null || _b === void 0 ? void 0 : _b.role) ===
        "admin" ||
      (((_c = auth.user) === null || _c === void 0
        ? void 0
        : _c.app_metadata) &&
        auth.user.app_metadata.is_admin);
    if (!isAdmin) {
      sonner_1.toast.error("You don't have permission to access this page", {
        description: "This area requires administrator privileges.",
      });
      return (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, {
        to: "/dashboard",
        replace: true,
      });
    }
  } else if (roleRequired && auth.profile && auth.hasInitialized) {
    var userRole =
      ((_d = auth.profile) === null || _d === void 0 ? void 0 : _d.role) ||
      "user";
    var hasRequiredRole =
      userRole === roleRequired ||
      (roleRequired === "user" && userRole === "admin");
    if (!hasRequiredRole) {
      sonner_1.toast.error("You don't have permission to access this page", {
        description: "You need ".concat(
          roleRequired,
          " privileges to access this area.",
        ),
      });
      return (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, {
        to: "/dashboard",
        replace: true,
      });
    }
  }
  return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
}

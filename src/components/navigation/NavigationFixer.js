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
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NavigationFixer;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var navigation_1 = require("@/utils/navigation");
var routeTracker_1 = require("@/utils/routeTracker");
var sonner_1 = require("sonner");
var loggingService_1 = require("@/utils/loggingService");
var AuthContext_1 = require("@/context/AuthContext");
function NavigationFixer() {
  var location = (0, react_router_dom_1.useLocation)();
  var navigate = (0, react_router_dom_1.useNavigate)();
  var user = (0, AuthContext_1.useAuth)().user;
  var _a = (0, react_1.useState)(false),
    attemptedFix = _a[0],
    setAttemptedFix = _a[1];
  var _b = (0, react_1.useState)({}),
    suspiciousRouteAttempts = _b[0],
    setSuspiciousRouteAttempts = _b[1];
  // Calculate isAuthenticated based on user presence
  var isAuthenticated = !!user;
  (0, react_1.useEffect)(
    function () {
      // Reset the fix attempt flag when the location changes
      setAttemptedFix(false);
      // Track visited route for analytics and smart suggestions
      (0, navigation_1.trackRouteVisit)(location.pathname);
      // Also track route access for legal pages specifically
      (0, routeTracker_1.trackRouteAccess)(location.pathname);
    },
    [location.pathname],
  );
  (0, react_1.useEffect)(
    function () {
      var currentPath = location.pathname;
      // Skip processing for known valid routes
      var knownValidPaths = [
        "/",
        "/login",
        "/signup",
        "/dashboard",
        "/admin",
        "/onboarding",
        "/compliance",
        "/home",
        "/pricing",
        "/auth",
        "/reset-password",
        "/email-confirm",
        "/verify-otp",
        "/update-password",
        "/diagnostics",
        "/not-found",
        "/contact",
        "/about",
        "/faq",
        "/legal",
      ];
      // Add all legal routes to known valid paths
      var allValidPaths = __spreadArray(
        __spreadArray([], knownValidPaths, true),
        routeTracker_1.validLegalRoutes,
        true,
      );
      var isKnownValid = allValidPaths.some(function (path) {
        return (
          currentPath === path || currentPath.startsWith("".concat(path, "/"))
        );
      });
      if (isKnownValid || attemptedFix) {
        return;
      }
      // Check for suspicious admin/restricted area access attempts
      var restrictedPaths = ["/admin", "/compliance"];
      var isRestrictedPath = restrictedPaths.some(function (path) {
        return currentPath.startsWith(path) && !isAuthenticated;
      });
      if (isRestrictedPath) {
        // Log suspicious activity
        setSuspiciousRouteAttempts(function (prev) {
          var _a;
          var count = (prev[currentPath] || 0) + 1;
          var newState = __assign(
            __assign({}, prev),
            ((_a = {}), (_a[currentPath] = count), _a),
          );
          // If multiple attempts, log as potential security issue
          if (count > 1) {
            loggingService_1.logger.warn(
              "Multiple unauthorized access attempts to restricted area",
              {
                path: currentPath,
                attempts: count,
                userAgent: navigator.userAgent,
              },
            );
          }
          return newState;
        });
        // Redirect to login
        loggingService_1.logger.info(
          "Unauthorized access attempt to restricted area: ".concat(
            currentPath,
          ),
        );
        sonner_1.toast.error("You need to be logged in to access this area");
        navigate("/login", { replace: true, state: { from: currentPath } });
        setAttemptedFix(true);
        return;
      }
      // Try to normalize the route
      var normalizedPath = (0, navigation_1.normalizeRoute)(currentPath);
      // If normalization changed the path, redirect to the normalized path
      if (normalizedPath !== currentPath) {
        loggingService_1.logger.info(
          "Fixing navigation: Redirecting from "
            .concat(currentPath, " to ")
            .concat(normalizedPath),
        );
        // Show a toast notification about the redirect
        sonner_1.toast.info("Redirecting to the correct page");
        // Navigate to the normalized path
        navigate(normalizedPath, { replace: true });
        setAttemptedFix(true);
      } else if (
        !currentPath.match(/^\/(api|assets|images|css|js|fonts|favicon)/)
      ) {
        // Check if this is an admin or dashboard path that might be misspelled
        var isLikelyAdminPath = /^\/adm(in)?.*/.test(currentPath);
        var isLikelyDashboardPath = /^\/dash(board)?.*/.test(currentPath);
        var isLikelyCompliancePath = /^\/comp(liance)?.*/.test(currentPath);
        var isLikelySystemPath = /^\/sys(tem)?.*/.test(currentPath);
        var isLikelyDiagnosticsPath = /^\/diag(nostics)?.*/.test(currentPath);
        var isLikelyLegalPath =
          /^\/(legal|terms|priv|cookie|refund|message|consent|gdpr).*/.test(
            currentPath,
          );
        if (isLikelyAdminPath) {
          navigate("/admin", {
            replace: true,
            state: { attemptedPath: currentPath },
          });
          sonner_1.toast.info("Redirecting to the admin dashboard");
        } else if (isLikelyDashboardPath) {
          navigate("/dashboard", {
            replace: true,
            state: { attemptedPath: currentPath },
          });
          sonner_1.toast.info("Redirecting to the dashboard");
        } else if (isLikelyCompliancePath) {
          navigate("/compliance", {
            replace: true,
            state: { attemptedPath: currentPath },
          });
          sonner_1.toast.info("Redirecting to the compliance area");
        } else if (isLikelySystemPath) {
          navigate("/admin/system-health", {
            replace: true,
            state: { attemptedPath: currentPath },
          });
          sonner_1.toast.info("Redirecting to system health");
        } else if (isLikelyDiagnosticsPath) {
          navigate("/admin/diagnostics", {
            replace: true,
            state: { attemptedPath: currentPath },
          });
          sonner_1.toast.info("Redirecting to diagnostics");
        } else if (isLikelyLegalPath) {
          // Special handling for potential legal pages with typos
          var suggestedRoutes = (0, routeTracker_1.getSuggestedLegalRoutes)(
            currentPath,
          );
          if (suggestedRoutes.length > 0) {
            // If we have suggestions, go to the first one
            navigate(suggestedRoutes[0].path, {
              replace: true,
              state: {
                attemptedPath: currentPath,
                suggestions: suggestedRoutes,
              },
            });
            sonner_1.toast.info(
              "Redirecting to ".concat(suggestedRoutes[0].name),
            );
          } else {
            // If no suggestions, go to the main legal page
            navigate("/legal", {
              replace: true,
              state: { attemptedPath: currentPath },
            });
            sonner_1.toast.info("Redirecting to legal information");
          }
        } else {
          // If path doesn't match known patterns and couldn't be normalized, it's likely a 404
          loggingService_1.logger.info(
            "Navigation to unknown path: ".concat(currentPath),
          );
          navigate("/not-found", {
            replace: true,
            state: { attemptedPath: currentPath },
          });
        }
        setAttemptedFix(true);
      }
      // Enhanced legal route checking - specifically for /legal/something routes
      if (
        currentPath.includes("/legal/") &&
        !(0, routeTracker_1.isValidLegalRoute)(currentPath)
      ) {
        loggingService_1.logger.warn(
          "Potential 404 for legal route: ".concat(currentPath),
        );
        // Get suggested legal routes
        var suggestedRoutes = (0, routeTracker_1.getSuggestedLegalRoutes)(
          currentPath,
        );
        if (suggestedRoutes.length > 0) {
          sonner_1.toast.info(
            "Redirecting to ".concat(suggestedRoutes[0].name),
          );
          loggingService_1.logger.info(
            "Suggested legal routes: ".concat(JSON.stringify(suggestedRoutes)),
          );
          navigate(suggestedRoutes[0].path, {
            replace: true,
            state: {
              attemptedPath: currentPath,
              suggestedRoutes: suggestedRoutes,
            },
          });
        } else {
          sonner_1.toast.error("Invalid legal document route");
          navigate("/legal", {
            replace: true,
            state: { attemptedPath: currentPath },
          });
        }
        setAttemptedFix(true);
      }
    },
    [location.pathname, navigate, attemptedFix, isAuthenticated],
  );
  // This component doesn't render anything visible
  return null;
}

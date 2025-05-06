"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var alert_1 = require("@/components/ui/alert");
var sonner_1 = require("sonner");
var loggingService_1 = require("@/utils/loggingService");
var NotFoundCard = function (_a) {
  var _b = _a.resourceType,
    resourceType = _b === void 0 ? "Advisor" : _b,
    _c = _a.redirectPath,
    redirectPath = _c === void 0 ? "/dashboard/ai-bots" : _c,
    _d = _a.redirectLabel,
    redirectLabel = _d === void 0 ? "Back to Advisors" : _d,
    _e = _a.message,
    message =
      _e === void 0
        ? "We couldn't find the executive advisor you're looking for. This may be because the advisor has been removed or the URL is incorrect."
        : _e,
    _f = _a.autoRedirectDelay,
    autoRedirectDelay = _f === void 0 ? 0 : _f, // 0 means no auto-redirect
    _g = _a.logError, // 0 means no auto-redirect
    logError = _g === void 0 ? true : _g;
  var navigate = (0, react_router_dom_1.useNavigate)();
  (0, react_1.useEffect)(
    function () {
      if (logError) {
        // Log the 404 error for this resource
        loggingService_1.logger.error(
          "Resource not found: "
            .concat(resourceType, " at path ")
            .concat(window.location.pathname),
        );
      }
      // If autoRedirectDelay is specified, automatically redirect after the delay
      if (autoRedirectDelay > 0) {
        var timer_1 = setTimeout(function () {
          sonner_1.toast.info("Redirecting to ".concat(redirectLabel));
          navigate(redirectPath);
        }, autoRedirectDelay * 1000);
        return function () {
          return clearTimeout(timer_1);
        };
      }
    },
    [
      navigate,
      autoRedirectDelay,
      redirectPath,
      redirectLabel,
      resourceType,
      logError,
    ],
  );
  return (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
    className: "pt-6 flex flex-col items-center justify-center min-h-[300px]",
    children: [
      (0, jsx_runtime_1.jsx)("div", {
        className: "mb-4 text-destructive",
        children: (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
          className: "h-12 w-12",
          "aria-hidden": "true",
        }),
      }),
      (0, jsx_runtime_1.jsxs)("h2", {
        className: "text-xl font-semibold mb-2",
        id: "not-found-title",
        children: [resourceType, " not found"],
      }),
      (0, jsx_runtime_1.jsxs)(alert_1.Alert, {
        variant: "destructive",
        className: "mb-4",
        children: [
          (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
            className: "h-4 w-4",
          }),
          (0, jsx_runtime_1.jsx)(alert_1.AlertTitle, { children: "Not Found" }),
          (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, {
            children: message,
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex flex-col sm:flex-row gap-3 mt-2",
        children: [
          (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
            to: redirectPath,
            "aria-labelledby": "not-found-title",
            children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
              variant: "outline",
              className: "flex items-center gap-2",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowLeft, {
                  className: "h-4 w-4",
                  "aria-hidden": "true",
                }),
                (0, jsx_runtime_1.jsx)("span", { children: redirectLabel }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
            to: "/dashboard",
            "aria-label": "Return to dashboard",
            children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
              variant: "secondary",
              className: "flex items-center gap-2",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Home, {
                  className: "h-4 w-4",
                  "aria-hidden": "true",
                }),
                (0, jsx_runtime_1.jsx)("span", { children: "Dashboard" }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
            to: "/dashboard/ai-bots",
            "aria-label": "Browse all advisors",
            children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
              variant: "default",
              className: "flex items-center gap-2",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Search, {
                  className: "h-4 w-4",
                  "aria-hidden": "true",
                }),
                (0, jsx_runtime_1.jsx)("span", { children: "Browse All" }),
              ],
            }),
          }),
        ],
      }),
      autoRedirectDelay > 0 &&
        (0, jsx_runtime_1.jsxs)("p", {
          className: "text-sm text-muted-foreground mt-4",
          children: ["Auto-redirecting in ", autoRedirectDelay, " seconds..."],
        }),
    ],
  });
};
exports.default = NotFoundCard;

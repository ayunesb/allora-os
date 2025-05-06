"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalErrorModal = GlobalErrorModal;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var dialog_1 = require("@/components/ui/dialog");
var button_1 = require("@/components/ui/button");
var errorEventBus_1 = require("@/utils/errorHandling/errorEventBus");
function GlobalErrorModal() {
  var _a = (0, react_1.useState)(false),
    isOpen = _a[0],
    setIsOpen = _a[1];
  var _b = (0, react_1.useState)(null),
    error = _b[0],
    setError = _b[1];
  (0, react_1.useEffect)(function () {
    // Subscribe to global errors
    var handleError = function (appError) {
      // Only show the modal for critical errors
      if (appError.isCritical) {
        setError(appError);
        setIsOpen(true);
      }
    };
    errorEventBus_1.errorEventBus.subscribe(handleError);
    return function () {
      errorEventBus_1.errorEventBus.unsubscribe(handleError);
    };
  }, []);
  var handleClose = function () {
    setIsOpen(false);
  };
  var handleRefresh = function () {
    window.location.reload();
  };
  if (!error) return null;
  return (0, jsx_runtime_1.jsx)(dialog_1.Dialog, {
    open: isOpen,
    onOpenChange: setIsOpen,
    children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, {
      className: "sm:max-w-md",
      children: [
        (0, jsx_runtime_1.jsxs)(dialog_1.DialogHeader, {
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-center",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, {
                  className: "h-5 w-5 text-destructive mr-2",
                }),
                (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, {
                  children: "Application Error",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)(dialog_1.DialogDescription, {
              children:
                "We've encountered an unexpected error. Our team has been notified.",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "bg-muted p-3 rounded-md overflow-auto max-h-40 text-xs",
          children: [
            (0, jsx_runtime_1.jsx)("p", {
              className: "font-mono",
              children: error.message,
            }),
            error.code &&
              (0, jsx_runtime_1.jsxs)("p", {
                className: "font-mono mt-1",
                children: ["Error code: ", error.code],
              }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)(dialog_1.DialogFooter, {
          className: "flex justify-between items-center",
          children: [
            (0, jsx_runtime_1.jsxs)(button_1.Button, {
              variant: "outline",
              onClick: handleClose,
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.X, {
                  className: "h-4 w-4 mr-2",
                }),
                "Close",
              ],
            }),
            (0, jsx_runtime_1.jsx)(button_1.Button, {
              onClick: handleRefresh,
              children: "Refresh Application",
            }),
          ],
        }),
      ],
    }),
  });
}

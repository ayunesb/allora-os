"use strict";
var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError(
          "Class extends value " + String(b) + " is not a constructor or null",
        );
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorRecoveryWrapper = ErrorRecoveryWrapper;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var sonner_1 = require("sonner");
var loggingService_1 = require("@/utils/loggingService");
function ErrorRecoveryWrapper(_a) {
  var children = _a.children,
    fallbackComponent = _a.fallbackComponent,
    onReset = _a.onReset,
    _b = _a.errorTitle,
    errorTitle = _b === void 0 ? "Something went wrong" : _b,
    _c = _a.errorMessage,
    errorMessage =
      _c === void 0
        ? "We encountered an error loading this component. Your data is safe, and you can try again."
        : _c,
    _d = _a.componentName,
    componentName = _d === void 0 ? "unknown component" : _d;
  var _e = (0, react_1.useState)(false),
    hasError = _e[0],
    setHasError = _e[1];
  var _f = (0, react_1.useState)(null),
    error = _f[0],
    setError = _f[1];
  var _g = (0, react_1.useState)(null),
    errorInfo = _g[0],
    setErrorInfo = _g[1];
  // Reset error state when children change
  (0, react_1.useEffect)(
    function () {
      setHasError(false);
      setError(null);
    },
    [children],
  );
  var handleReset = function () {
    setHasError(false);
    setError(null);
    // Execute custom reset logic if provided
    if (onReset) {
      onReset();
    }
    sonner_1.toast.success("Component has been reset");
  };
  var handleCatchError = function (error, errorInfo) {
    // Log the error
    loggingService_1.logger.error(
      "Error in ".concat(componentName, ":"),
      error,
      {
        component: componentName,
        errorInfo: errorInfo.componentStack,
      },
    );
    // Update state
    setHasError(true);
    setError(error);
    setErrorInfo(errorInfo);
  };
  if (hasError) {
    // Use custom fallback if provided, otherwise show default error UI
    if (fallbackComponent) {
      return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {
        children: fallbackComponent,
      });
    }
    return (0, jsx_runtime_1.jsxs)(card_1.Card, {
      className:
        "w-full border border-red-200 bg-red-50/50 dark:bg-red-950/10 dark:border-red-900/50",
      children: [
        (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
          children: (0, jsx_runtime_1.jsxs)("div", {
            className: "flex items-center space-x-2",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, {
                className: "h-5 w-5 text-red-500",
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                className: "text-lg",
                children: errorTitle,
              }),
            ],
          }),
        }),
        (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
          children: [
            (0, jsx_runtime_1.jsx)("p", {
              className: "text-muted-foreground mb-4",
              children: errorMessage,
            }),
            process.env.NODE_ENV !== "production" &&
              error &&
              (0, jsx_runtime_1.jsxs)("div", {
                className:
                  "bg-muted p-3 rounded-md overflow-auto max-h-32 text-xs",
                children: [
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "font-mono text-red-500",
                    children: error.toString(),
                  }),
                  errorInfo &&
                    (0, jsx_runtime_1.jsx)("pre", {
                      className: "mt-2 text-muted-foreground",
                      children: errorInfo.componentStack,
                    }),
                ],
              }),
          ],
        }),
        (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
          className: "flex justify-end space-x-2",
          children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
            onClick: handleReset,
            className: "flex items-center",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                className: "mr-2 h-4 w-4",
              }),
              "Try Again",
            ],
          }),
        }),
      ],
    });
  }
  // Use error boundary class to catch errors in children
  return (0, jsx_runtime_1.jsx)(ErrorBoundaryClass, {
    onError: handleCatchError,
    children: children,
  });
}
// Class component is required for error boundaries
var ErrorBoundaryClass = /** @class */ (function (_super) {
  __extends(ErrorBoundaryClass, _super);
  function ErrorBoundaryClass() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  ErrorBoundaryClass.prototype.componentDidCatch = function (error, errorInfo) {
    this.props.onError(error, errorInfo);
  };
  ErrorBoundaryClass.prototype.render = function () {
    return this.props.children;
  };
  return ErrorBoundaryClass;
})(react_1.default.Component);

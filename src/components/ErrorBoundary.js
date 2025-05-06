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
exports.ErrorBoundary = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var loggingService_1 = require("@/utils/loggingService");
var ErrorBoundary = /** @class */ (function (_super) {
  __extends(ErrorBoundary, _super);
  function ErrorBoundary(props) {
    var _this = _super.call(this, props) || this;
    _this.state = { hasError: false, error: null, errorInfo: null };
    _this.resetErrorBoundary = _this.resetErrorBoundary.bind(_this);
    return _this;
  }
  ErrorBoundary.getDerivedStateFromError = function (error) {
    loggingService_1.logger.error("ErrorBoundary caught an error:", error);
    console.error("ErrorBoundary caught an error:", error);
    return { hasError: true, error: error, errorInfo: null };
  };
  ErrorBoundary.prototype.componentDidCatch = function (error, errorInfo) {
    // Log the error
    loggingService_1.logger.error("Uncaught error in component:", error, {
      componentStack: errorInfo.componentStack,
      componentName: this.constructor.name,
    });
    console.error("Component error stack:", errorInfo.componentStack);
    // Update state with error info
    this.setState({ errorInfo: errorInfo });
    // Call the onError prop if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  };
  ErrorBoundary.prototype.resetErrorBoundary = function () {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };
  ErrorBoundary.prototype.render = function () {
    var _this = this;
    if (this.state.hasError) {
      if (this.props.fallback) {
        if (typeof this.props.fallback === "function") {
          return this.props.fallback({
            error: this.state.error || new Error("Unknown error"),
            resetErrorBoundary: this.resetErrorBoundary,
          });
        }
        return this.props.fallback;
      }
      return (0, jsx_runtime_1.jsx)("div", {
        className:
          "flex items-center justify-center min-h-screen p-4 bg-background",
        children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
          className: "w-full max-w-md",
          children: [
            (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
              children: (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center space-x-2",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, {
                    className: "h-6 w-6 text-destructive",
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                    children: "Something went wrong",
                  }),
                ],
              }),
            }),
            (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
              children: [
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-muted-foreground mb-4",
                  children:
                    "An unexpected error occurred. Our team has been notified.",
                }),
                this.state.error &&
                  (0, jsx_runtime_1.jsxs)("div", {
                    className:
                      "bg-muted p-3 rounded-md overflow-auto max-h-40 text-xs",
                    children: [
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "font-mono",
                        children: this.state.error.toString(),
                      }),
                      this.state.errorInfo &&
                        (0, jsx_runtime_1.jsx)("pre", {
                          className:
                            "mt-2 text-xs font-mono overflow-auto max-h-40",
                          children: this.state.errorInfo.componentStack,
                        }),
                    ],
                  }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
              className: "flex justify-end space-x-2",
              children: [
                (0, jsx_runtime_1.jsx)(button_1.Button, {
                  variant: "outline",
                  onClick: function () {
                    return (window.location.href = "/");
                  },
                  children: "Go to Home",
                }),
                (0, jsx_runtime_1.jsxs)(button_1.Button, {
                  onClick: function () {
                    _this.resetErrorBoundary();
                    window.location.reload();
                  },
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                      className: "mr-2 h-4 w-4",
                    }),
                    "Try Again",
                  ],
                }),
              ],
            }),
          ],
        }),
      });
    }
    return (0, jsx_runtime_1.jsx)(react_1.Suspense, {
      fallback: (0, jsx_runtime_1.jsx)("div", {
        className: "flex items-center justify-center p-8",
        children: (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
          className: "w-6 h-6 animate-spin text-muted-foreground",
        }),
      }),
      children: this.props.children,
    });
  };
  return ErrorBoundary;
})(react_1.Component);
exports.ErrorBoundary = ErrorBoundary;
exports.default = ErrorBoundary;

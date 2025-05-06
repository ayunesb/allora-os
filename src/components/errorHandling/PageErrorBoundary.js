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
exports.PageErrorBoundary = PageErrorBoundary;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var react_router_dom_1 = require("react-router-dom");
var ErrorBoundaryFallback = /** @class */ (function (_super) {
  __extends(ErrorBoundaryFallback, _super);
  function ErrorBoundaryFallback(props) {
    var _this = _super.call(this, props) || this;
    _this.resetErrorBoundary = function () {
      _this.setState({
        hasError: false,
        error: null,
      });
    };
    _this.state = {
      hasError: false,
      error: null,
    };
    return _this;
  }
  ErrorBoundaryFallback.getDerivedStateFromError = function (error) {
    return {
      hasError: true,
      error: error,
    };
  };
  ErrorBoundaryFallback.prototype.componentDidCatch = function (
    error,
    errorInfo,
  ) {
    console.error("Error in ".concat(this.props.pageName, ":"), error);
    console.error("Component stack:", errorInfo.componentStack);
    // Here you could also send the error to a monitoring service like Sentry
  };
  ErrorBoundaryFallback.prototype.render = function () {
    if (this.state.hasError) {
      return (0, jsx_runtime_1.jsx)(ErrorFallbackUI, {
        error: this.state.error,
        pageName: this.props.pageName,
        resetErrorBoundary: this.resetErrorBoundary,
      });
    }
    return this.props.children;
  };
  return ErrorBoundaryFallback;
})(react_1.Component);
// Separate the UI component to use hooks
function ErrorFallbackUI(_a) {
  var error = _a.error,
    pageName = _a.pageName,
    resetErrorBoundary = _a.resetErrorBoundary;
  var navigate = (0, react_router_dom_1.useNavigate)();
  return (0, jsx_runtime_1.jsx)("div", {
    className: "container mx-auto px-4 py-12 flex justify-center",
    children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
      className: "w-full max-w-lg",
      children: [
        (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
          children: (0, jsx_runtime_1.jsxs)("div", {
            className: "flex items-center gap-2",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, {
                className: "h-6 w-6 text-destructive",
              }),
              (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                children: ["Error in ", pageName],
              }),
            ],
          }),
        }),
        (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
          children: [
            (0, jsx_runtime_1.jsx)("p", {
              className: "text-muted-foreground mb-4",
              children:
                "We encountered an error while loading this page. Our team has been notified of the issue.",
            }),
            (0, jsx_runtime_1.jsx)("div", {
              className:
                "bg-muted p-3 rounded-md text-xs font-mono overflow-auto max-h-40",
              children: error.message,
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
          className: "flex justify-end gap-2",
          children: [
            (0, jsx_runtime_1.jsxs)(button_1.Button, {
              variant: "outline",
              onClick: function () {
                return navigate("/");
              },
              className: "flex items-center gap-1",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Home, {
                  className: "h-4 w-4",
                }),
                "Home",
              ],
            }),
            (0, jsx_runtime_1.jsxs)(button_1.Button, {
              onClick: resetErrorBoundary,
              className: "flex items-center gap-1",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                  className: "h-4 w-4",
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
// Wrapper component with hooks
function PageErrorBoundary(_a) {
  var children = _a.children,
    pageName = _a.pageName;
  return (0, jsx_runtime_1.jsx)(ErrorBoundaryFallback, {
    pageName: pageName,
    children: children,
  });
}

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.lazyLoad = lazyLoad;
exports.lazyLoadOnVisible = lazyLoadOnVisible;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
/**
 * Default loading component
 */
var DefaultLoadingFallback = function () {
  return (0, jsx_runtime_1.jsx)("div", {
    className: "flex items-center justify-center min-h-[200px]",
    children: (0, jsx_runtime_1.jsx)("div", {
      className:
        "h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin",
    }),
  });
};
/**
 * Error fallback component
 */
var ErrorFallback = function (_a) {
  var error = _a.error,
    resetErrorBoundary = _a.resetErrorBoundary;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "p-4 border border-red-300 rounded bg-red-50 text-red-800",
    children: [
      (0, jsx_runtime_1.jsx)("h2", {
        className: "text-lg font-semibold mb-2",
        children: "Something went wrong",
      }),
      (0, jsx_runtime_1.jsx)("p", {
        className: "mb-2",
        children: error.message,
      }),
      (0, jsx_runtime_1.jsx)("button", {
        className:
          "px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors",
        onClick: resetErrorBoundary,
        children: "Try again",
      }),
    ],
  });
};
/**
 * Error boundary component
 */
var LazyErrorBoundary = /** @class */ (function (_super) {
  __extends(LazyErrorBoundary, _super);
  function LazyErrorBoundary(props) {
    var _this = _super.call(this, props) || this;
    _this.resetErrorBoundary = function () {
      _this.setState({ hasError: false, error: null });
    };
    _this.state = { hasError: false, error: null };
    return _this;
  }
  LazyErrorBoundary.getDerivedStateFromError = function (error) {
    return { hasError: true, error: error };
  };
  LazyErrorBoundary.prototype.render = function () {
    if (this.state.hasError && this.state.error) {
      var Fallback = this.props.fallback;
      return (0, jsx_runtime_1.jsx)(Fallback, {
        error: this.state.error,
        resetErrorBoundary: this.resetErrorBoundary,
      });
    }
    return this.props.children;
  };
  return LazyErrorBoundary;
})(react_1.default.Component);
function lazyLoad(importFunc, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.fallback,
    fallback =
      _a === void 0 ? (0, jsx_runtime_1.jsx)(DefaultLoadingFallback, {}) : _a,
    _b = options.errorBoundary,
    errorBoundary = _b === void 0 ? true : _b,
    _c = options.preload,
    preload = _c === void 0 ? false : _c;
  // Create the lazy component
  var LazyComponent = (0, react_1.lazy)(importFunc);
  // Preload the component if requested
  if (preload) {
    importFunc();
  }
  // Create a wrapper that applies Suspense and optional ErrorBoundary
  var WrappedComponent = function (props) {
    var content = (0, jsx_runtime_1.jsx)(react_1.Suspense, {
      fallback: fallback,
      children: (0, jsx_runtime_1.jsx)(LazyComponent, __assign({}, props)),
    });
    if (errorBoundary) {
      return (0, jsx_runtime_1.jsx)(LazyErrorBoundary, {
        fallback: ErrorFallback,
        children: content,
      });
    }
    return content;
  };
  return WrappedComponent;
}
/**
 * Creates a lazy-loaded component that only loads when it becomes visible in the viewport
 * @param importFunc Function that returns the import promise
 * @param options Configuration options
 * @returns Lazy-loaded component that loads on viewport visibility
 */
function lazyLoadOnVisible(importFunc, options) {
  if (options === void 0) {
    options = {};
  }
  var LazyComponent = lazyLoad(importFunc, options);
  var VisibilityWrapper = function (props) {
    var _a = react_1.default.useState(false),
      isVisible = _a[0],
      setIsVisible = _a[1];
    var ref = react_1.default.useRef(null);
    react_1.default.useEffect(function () {
      if (!ref.current) return;
      var observer = new IntersectionObserver(
        function (_a) {
          var entry = _a[0];
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { rootMargin: "200px" }, // Start loading when within 200px of viewport
      );
      observer.observe(ref.current);
      return function () {
        observer.disconnect();
      };
    }, []);
    return (0, jsx_runtime_1.jsx)("div", {
      ref: ref,
      className: "min-h-[10px]",
      children: isVisible
        ? (0, jsx_runtime_1.jsx)(LazyComponent, __assign({}, props))
        : options.fallback ||
          (0, jsx_runtime_1.jsx)(DefaultLoadingFallback, {}),
    });
  };
  return VisibilityWrapper;
}

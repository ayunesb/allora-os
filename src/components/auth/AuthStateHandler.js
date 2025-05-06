"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthStateHandler = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var AuthLoadingState_1 = require("./AuthLoadingState");
var AuthErrorState_1 = require("./AuthErrorState");
var AuthStateHandler = function (_a) {
  var isLoading = _a.isLoading,
    authError = _a.authError,
    onRetry = _a.onRetry,
    isRetrying = _a.isRetrying,
    children = _a.children;
  var _b = (0, react_1.useState)(false),
    loadingTimeout = _b[0],
    setLoadingTimeout = _b[1];
  // Set a timeout to avoid infinite loading
  (0, react_1.useEffect)(
    function () {
      var timer;
      if (isLoading && !loadingTimeout) {
        timer = window.setTimeout(function () {
          setLoadingTimeout(true);
        }, 10000); // 10 seconds loading timeout
      }
      return function () {
        if (timer) clearTimeout(timer);
      };
    },
    [isLoading, loadingTimeout],
  );
  // Show loading state but with timeout protection
  if (isLoading && !loadingTimeout) {
    return (0, jsx_runtime_1.jsx)(AuthLoadingState_1.AuthLoadingState, {});
  }
  // If loading took too long, give user the option to retry or navigate back
  if (loadingTimeout && isLoading) {
    return (0, jsx_runtime_1.jsx)(AuthErrorState_1.AuthErrorState, {
      error:
        "Loading took too long. There might be an issue with the connection.",
      onRetry: onRetry,
      isRetrying: isRetrying,
    });
  }
  if (authError) {
    return (0, jsx_runtime_1.jsx)(AuthErrorState_1.AuthErrorState, {
      error: authError,
      onRetry: onRetry,
      isRetrying: isRetrying,
    });
  }
  return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
};
exports.AuthStateHandler = AuthStateHandler;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CheckoutPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var useUser_1 = require("@/hooks/useUser");
var CreditsCheckout_1 = require("@/components/payments/CreditsCheckout");
var PageErrorBoundary_1 = require("@/components/errorHandling/PageErrorBoundary");
var react_helmet_async_1 = require("react-helmet-async");
function CheckoutPage() {
  var _a = (0, react_1.useState)(false),
    isProcessing = _a[0],
    setIsProcessing = _a[1];
  var user = (0, useUser_1.useUser)().user;
  return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
    children: [
      (0, jsx_runtime_1.jsx)(react_helmet_async_1.Helmet, {
        children: (0, jsx_runtime_1.jsx)("title", {
          children: "Purchase Credits - Allora AI",
        }),
      }),
      (0, jsx_runtime_1.jsx)(PageErrorBoundary_1.PageErrorBoundary, {
        pageName: "Purchase Credits",
        children: (0, jsx_runtime_1.jsx)(CreditsCheckout_1.CreditsCheckout, {}),
      }),
    ],
  });
}

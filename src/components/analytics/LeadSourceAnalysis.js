"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var LeadSourceAnalysis = function (_a) {
  var data = _a.data,
    _b = _a.isLoading,
    isLoading = _b === void 0 ? false : _b;
  if (isLoading) {
    return (0, jsx_runtime_1.jsxs)(card_1.Card, {
      children: [
        (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
          children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            children: "Lead Source Analysis",
          }),
        }),
        (0, jsx_runtime_1.jsx)(card_1.CardContent, {
          children: (0, jsx_runtime_1.jsx)("p", {
            children: "Loading lead source data...",
          }),
        }),
      ],
    });
  }
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
        children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
          children: "Lead Source Analysis",
        }),
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: (0, jsx_runtime_1.jsx)("p", {
          children: "Lead source analysis will be displayed here",
        }),
      }),
    ],
  });
};
exports.default = LeadSourceAnalysis;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PolicyDocuments;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var DocumentList_1 = require("./policy-documents/DocumentList");
var use_mobile_1 = require("@/hooks/use-mobile");
function PolicyDocuments() {
  var breakpoint = (0, use_mobile_1.useBreakpoint)();
  var isMobileView = ["xs", "mobile"].includes(breakpoint);
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        className: isMobileView ? "px-4 py-3" : undefined,
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
            className: "flex items-center",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.FileText, {
                className: "mr-2 h-5 w-5 text-primary",
              }),
              "Policy Documents",
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children: "Legal and compliance documents",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        className: isMobileView ? "px-4 py-3 pt-0" : undefined,
        children: (0, jsx_runtime_1.jsx)(DocumentList_1.default, {}),
      }),
    ],
  });
}

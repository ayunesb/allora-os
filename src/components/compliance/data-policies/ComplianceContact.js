"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ComplianceContact;
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("@/components/ui/button");
function ComplianceContact() {
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-4",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        children: [
          (0, jsx_runtime_1.jsx)("h3", {
            className: "font-medium",
            children: "Data Protection Officer",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-sm text-muted-foreground",
            children: "Jane Smith",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        children: [
          (0, jsx_runtime_1.jsx)("h3", {
            className: "font-medium",
            children: "Email",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-sm text-muted-foreground",
            children: "dpo@allora-ai.com",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        children: [
          (0, jsx_runtime_1.jsx)("h3", {
            className: "font-medium",
            children: "Response Time",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-sm text-muted-foreground",
            children: "Within 48 hours",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(button_1.Button, {
        className: "w-full",
        children: "Contact DPO",
      }),
    ],
  });
}

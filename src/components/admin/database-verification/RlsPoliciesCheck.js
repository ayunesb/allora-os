"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RlsPoliciesCheck = RlsPoliciesCheck;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
function RlsPoliciesCheck(_a) {
  var policies = _a.policies;
  if (!policies || policies.length === 0) return null;
  // Count disabled RLS policies
  var disabledPolicies = policies.filter(function (policy) {
    return !policy.exists;
  }).length;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "rounded-md border border-border/60 overflow-hidden",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className:
          "bg-muted/30 px-4 py-3 font-medium border-b border-border/60 flex justify-between items-center",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex items-center gap-2",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, {
                className: "h-4 w-4 text-blue-500",
              }),
              (0, jsx_runtime_1.jsx)("span", {
                children: "Row Level Security Policies",
              }),
            ],
          }),
          disabledPolicies > 0
            ? (0, jsx_runtime_1.jsxs)("span", {
                className:
                  "text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full",
                children: [disabledPolicies, " disabled"],
              })
            : (0, jsx_runtime_1.jsx)("span", {
                className:
                  "text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full",
                children: "All enabled",
              }),
        ],
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "divide-y divide-border/60",
        children: policies.map(function (policy, index) {
          return (0, jsx_runtime_1.jsxs)(
            "div",
            {
              className: "px-4 py-3 flex items-center justify-between",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex items-center gap-2",
                  children: [
                    policy.exists
                      ? (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle2, {
                          className: "h-5 w-5 text-green-500",
                        })
                      : (0, jsx_runtime_1.jsx)(lucide_react_1.XCircle, {
                          className: "h-5 w-5 text-red-500",
                        }),
                    (0, jsx_runtime_1.jsx)("span", {
                      className: "font-medium",
                      children: policy.table,
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)("span", {
                  className: "text-sm ".concat(
                    policy.exists ? "text-green-600" : "text-red-600",
                  ),
                  children: policy.exists ? "Enabled" : "Disabled",
                }),
              ],
            },
            "".concat(policy.table, "-").concat(index),
          );
        }),
      }),
    ],
  });
}

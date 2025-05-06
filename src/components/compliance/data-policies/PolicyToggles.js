"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var switch_1 = require("@/components/ui/switch");
var label_1 = require("@/components/ui/label");
var PolicyToggles = function (_a) {
  var policies = _a.policies,
    onPolicyToggle = _a.onPolicyToggle;
  return (0, jsx_runtime_1.jsx)("div", {
    className: "space-y-4",
    children: (0, jsx_runtime_1.jsxs)("div", {
      className: "grid gap-4 md:grid-cols-2",
      children: [
        (0, jsx_runtime_1.jsxs)("div", {
          className: "flex items-center space-x-2",
          children: [
            (0, jsx_runtime_1.jsx)(switch_1.Switch, {
              id: "dataDeletion",
              checked: policies.dataDeletion,
              onCheckedChange: function () {
                return onPolicyToggle("dataDeletion");
              },
            }),
            (0, jsx_runtime_1.jsx)(label_1.Label, {
              htmlFor: "dataDeletion",
              children: "Data Deletion Policy",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "flex items-center space-x-2",
          children: [
            (0, jsx_runtime_1.jsx)(switch_1.Switch, {
              id: "dataMinimization",
              checked: policies.dataMinimization,
              onCheckedChange: function () {
                return onPolicyToggle("dataMinimization");
              },
            }),
            (0, jsx_runtime_1.jsx)(label_1.Label, {
              htmlFor: "dataMinimization",
              children: "Data Minimization",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "flex items-center space-x-2",
          children: [
            (0, jsx_runtime_1.jsx)(switch_1.Switch, {
              id: "dataEncryption",
              checked: policies.dataEncryption,
              onCheckedChange: function () {
                return onPolicyToggle("dataEncryption");
              },
            }),
            (0, jsx_runtime_1.jsx)(label_1.Label, {
              htmlFor: "dataEncryption",
              children: "Data Encryption",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "flex items-center space-x-2",
          children: [
            (0, jsx_runtime_1.jsx)(switch_1.Switch, {
              id: "dataRetention",
              checked: policies.dataRetention,
              onCheckedChange: function () {
                return onPolicyToggle("dataRetention");
              },
            }),
            (0, jsx_runtime_1.jsx)(label_1.Label, {
              htmlFor: "dataRetention",
              children: "Data Retention Limits",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "flex items-center space-x-2",
          children: [
            (0, jsx_runtime_1.jsx)(switch_1.Switch, {
              id: "gdpr",
              checked: policies.gdpr,
              onCheckedChange: function () {
                return onPolicyToggle("gdpr");
              },
            }),
            (0, jsx_runtime_1.jsx)(label_1.Label, {
              htmlFor: "gdpr",
              children: "GDPR Compliance",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "flex items-center space-x-2",
          children: [
            (0, jsx_runtime_1.jsx)(switch_1.Switch, {
              id: "ccpa",
              checked: policies.ccpa,
              onCheckedChange: function () {
                return onPolicyToggle("ccpa");
              },
            }),
            (0, jsx_runtime_1.jsx)(label_1.Label, {
              htmlFor: "ccpa",
              children: "CCPA Compliance",
            }),
          ],
        }),
      ],
    }),
  });
};
exports.default = PolicyToggles;

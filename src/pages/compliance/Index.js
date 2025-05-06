"use strict";
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
exports.default = ComplianceIndex;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var typography_1 = require("@/components/ui/typography");
var PolicyToggles_1 = require("@/components/compliance/data-policies/PolicyToggles");
var useCompliance_1 = require("@/hooks/useCompliance");
function ComplianceIndex() {
  var compliance = (0, useCompliance_1.useCompliance)();
  var handleToggle = function (policy) {
    var _a;
    if (compliance && compliance.updatePreference) {
      compliance.updatePreference(
        "policies.".concat(policy),
        !((_a = compliance.policies) === null || _a === void 0
          ? void 0
          : _a[policy]),
      );
    }
  };
  // Create a safe policies object that meets the DataPoliciesState requirements
  var defaultPolicies = {
    dataDeletion: false,
    dataMinimization: false,
    dataEncryption: false,
    dataRetention: false,
    ccpa: false,
    gdpr: false,
  };
  // Merge the compliance policies with our default structure
  var policies = __assign(
    __assign({}, defaultPolicies),
    (compliance === null || compliance === void 0
      ? void 0
      : compliance.policies) || {},
  );
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto px-4 py-6 space-y-6",
    children: [
      (0, jsx_runtime_1.jsx)("div", {
        className:
          "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
        children: (0, jsx_runtime_1.jsx)(typography_1.TypographyH1, {
          children: "Compliance Center",
        }),
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                children: "Data Policies",
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children:
                  "Configure your organization's data handling policies",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
            children: [
              (0, jsx_runtime_1.jsx)(typography_1.TypographyP, {
                children:
                  "Enable or disable various data handling policies to align with regulatory requirements and internal standards.",
              }),
              (0, jsx_runtime_1.jsx)("div", {
                className: "mt-4",
                children: (0, jsx_runtime_1.jsx)(PolicyToggles_1.default, {
                  policies: policies,
                  onPolicyToggle: handleToggle,
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

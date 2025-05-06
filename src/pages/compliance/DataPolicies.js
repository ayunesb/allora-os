"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DataPolicies;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var tabs_1 = require("@/components/ui/tabs");
var PolicyDocuments_1 = require("@/components/compliance/data-policies/PolicyDocuments");
var PolicyToggles_1 = require("@/components/compliance/data-policies/PolicyToggles");
var RegulatoryFrameworks_1 = require("@/components/compliance/data-policies/RegulatoryFrameworks");
var ComplianceContact_1 = require("@/components/compliance/data-policies/ComplianceContact");
function DataPolicies() {
  return (0, jsx_runtime_1.jsx)("div", {
    className: "space-y-6",
    children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
      children: [
        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
          children: [
            (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
              className: "text-xl",
              children: "Data Policies",
            }),
            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
              children:
                "Manage your organization's data handling policies and compliance documents",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsx)(card_1.CardContent, {
          children: (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
            defaultValue: "documents",
            className: "w-full",
            children: [
              (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
                className: "mb-4",
                children: [
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "documents",
                    children: "Policy Documents",
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "settings",
                    children: "Policy Settings",
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "frameworks",
                    children: "Regulatory Frameworks",
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "contact",
                    children: "Compliance Contact",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "documents",
                children: (0, jsx_runtime_1.jsx)(PolicyDocuments_1.default, {}),
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "settings",
                children: (0, jsx_runtime_1.jsx)(PolicyToggles_1.default, {}),
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "frameworks",
                children: (0, jsx_runtime_1.jsx)(
                  RegulatoryFrameworks_1.default,
                  {},
                ),
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "contact",
                children: (0, jsx_runtime_1.jsx)(
                  ComplianceContact_1.default,
                  {},
                ),
              }),
            ],
          }),
        }),
      ],
    }),
  });
}

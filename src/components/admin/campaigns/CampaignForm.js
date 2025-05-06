"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var label_1 = require("@/components/ui/label");
var input_1 = require("@/components/ui/input");
var select_1 = require("@/components/ui/select");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var CampaignForm = function (_a) {
  var data = _a.data,
    onChange = _a.onChange,
    onSubmit = _a.onSubmit,
    companies = _a.companies,
    isSubmitting = _a.isSubmitting;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-4 py-4",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-2",
        children: [
          (0, jsx_runtime_1.jsx)(label_1.Label, {
            htmlFor: "name",
            children: "Campaign Name*",
          }),
          (0, jsx_runtime_1.jsx)(input_1.Input, {
            id: "name",
            value: data.name,
            onChange: function (e) {
              return onChange({ name: e.target.value });
            },
            placeholder: "Summer Promotion 2025",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-2",
        children: [
          (0, jsx_runtime_1.jsx)(label_1.Label, {
            htmlFor: "platform",
            children: "Platform",
          }),
          (0, jsx_runtime_1.jsxs)(select_1.Select, {
            value: data.platform,
            onValueChange: function (value) {
              return onChange({ platform: value });
            },
            children: [
              (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                id: "platform",
                children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                  placeholder: "Select platform",
                }),
              }),
              (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                children: [
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "Email",
                    children: "Email",
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "SMS",
                    children: "SMS",
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "Facebook",
                    children: "Facebook",
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "Google",
                    children: "Google",
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "LinkedIn",
                    children: "LinkedIn",
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "Twitter",
                    children: "Twitter",
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "Instagram",
                    children: "Instagram",
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "TikTok",
                    children: "TikTok",
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "Other",
                    children: "Other",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-2",
        children: [
          (0, jsx_runtime_1.jsx)(label_1.Label, {
            htmlFor: "budget",
            children: "Budget ($)",
          }),
          (0, jsx_runtime_1.jsx)(input_1.Input, {
            id: "budget",
            type: "number",
            value: data.budget.toString(),
            onChange: function (e) {
              return onChange({ budget: parseFloat(e.target.value) || 0 });
            },
            placeholder: "1000",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-2",
        children: [
          (0, jsx_runtime_1.jsx)(label_1.Label, {
            htmlFor: "company",
            children: "Company*",
          }),
          (0, jsx_runtime_1.jsxs)(select_1.Select, {
            value: data.company_id,
            onValueChange: function (value) {
              return onChange({ company_id: value });
            },
            children: [
              (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                id: "company",
                children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                  placeholder: "Select company",
                }),
              }),
              (0, jsx_runtime_1.jsx)(select_1.SelectContent, {
                children: companies.map(function (company) {
                  return (0, jsx_runtime_1.jsx)(
                    select_1.SelectItem,
                    { value: company.id, children: company.name },
                    company.id,
                  );
                }),
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(button_1.Button, {
        onClick: onSubmit,
        disabled: isSubmitting || !data.name || !data.company_id,
        className: "w-full mt-4",
        children: isSubmitting
          ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                  className: "mr-2 h-4 w-4 animate-spin",
                }),
                "Creating...",
              ],
            })
          : "Create Campaign",
      }),
    ],
  });
};
exports.default = CampaignForm;

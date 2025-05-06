"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IndustryForm;
var jsx_runtime_1 = require("react/jsx-runtime");
var alert_1 = require("@/components/ui/alert");
var lucide_react_1 = require("lucide-react");
var select_1 = require("@/components/ui/select");
var label_1 = require("@/components/ui/label");
var industries = [
  { value: "technology", label: "Technology" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "finance", label: "Finance" },
  { value: "retail", label: "Retail" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "real_estate", label: "Real Estate" },
  { value: "hospitality", label: "Hospitality" },
  { value: "other", label: "Other" },
];
function IndustryForm(_a) {
  var industry = _a.industry,
    setIndustry = _a.setIndustry,
    error = _a.error;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-4",
    children: [
      (0, jsx_runtime_1.jsx)("h3", {
        className: "text-lg font-medium",
        children: "Industry Information",
      }),
      (0, jsx_runtime_1.jsx)("p", {
        className: "text-sm text-muted-foreground",
        children: "Select the industry that best describes your company.",
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-2",
        children: [
          (0, jsx_runtime_1.jsx)(label_1.Label, {
            htmlFor: "industry-select",
            children: "Industry",
          }),
          (0, jsx_runtime_1.jsxs)(select_1.Select, {
            value: industry,
            onValueChange: setIndustry,
            children: [
              (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                id: "industry-select",
                className: error ? "border-destructive" : "",
                children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                  placeholder: "Select industry",
                }),
              }),
              (0, jsx_runtime_1.jsx)(select_1.SelectContent, {
                children: industries.map(function (industryOption) {
                  return (0, jsx_runtime_1.jsx)(
                    select_1.SelectItem,
                    {
                      value: industryOption.value,
                      children: industryOption.label,
                    },
                    industryOption.value,
                  );
                }),
              }),
            ],
          }),
          error &&
            (0, jsx_runtime_1.jsxs)(alert_1.Alert, {
              variant: "destructive",
              className: "py-2",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
                  className: "h-4 w-4",
                }),
                (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, {
                  className: "ml-2 text-xs",
                  children: error,
                }),
              ],
            }),
        ],
      }),
    ],
  });
}

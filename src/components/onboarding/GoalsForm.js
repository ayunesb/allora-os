"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GoalsForm;
var jsx_runtime_1 = require("react/jsx-runtime");
var checkbox_1 = require("@/components/ui/checkbox");
var alert_1 = require("@/components/ui/alert");
var lucide_react_1 = require("lucide-react");
var select_1 = require("@/components/ui/select");
var label_1 = require("@/components/ui/label");
// Business goals options
var businessGoals = [
  { id: "increase_revenue", label: "Increase Revenue" },
  { id: "expand_markets", label: "Expand to New Markets" },
  { id: "launch_products", label: "Launch New Products" },
  { id: "improve_retention", label: "Improve Customer Retention" },
  { id: "automate_operations", label: "Automate Operations" },
  { id: "raise_funding", label: "Raise Funding" },
  { id: "improve_efficiency", label: "Improve Operational Efficiency" },
  { id: "scale_team", label: "Scale Team & Talent" },
];
// Time horizon options
var timeHorizons = [
  { value: "6_months", label: "6 months" },
  { value: "12_months", label: "12 months" },
  { value: "18_months", label: "18 months" },
  { value: "24_months", label: "24 months" },
];
function GoalsForm(_a) {
  var goals = _a.goals,
    toggleGoal = _a.toggleGoal,
    companyName = _a.companyName,
    industry = _a.industry,
    error = _a.error,
    _b = _a.companyDetails,
    companyDetails = _b === void 0 ? {} : _b,
    _c = _a.updateCompanyDetails,
    updateCompanyDetails = _c === void 0 ? function () {} : _c;
  // Company name display for the form
  var displayCompanyName = companyName || "Your company";
  // Handle updating company time horizon
  var handleTimeHorizonChange = function (value) {
    if (updateCompanyDetails) {
      updateCompanyDetails({ timeHorizon: value });
    }
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        children: [
          (0, jsx_runtime_1.jsx)("h3", {
            className: "text-lg font-medium",
            children: "Business Goals",
          }),
          (0, jsx_runtime_1.jsxs)("p", {
            className: "text-sm text-muted-foreground mt-1",
            children: [
              "Select the primary goals for ",
              displayCompanyName,
              " in the ",
              industry,
              " industry.",
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-4",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsxs)("p", {
                className: "text-sm font-medium mb-3",
                children: [
                  "Primary Business Goals ",
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "text-destructive",
                    children: "*",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-3",
                children: businessGoals.map(function (item) {
                  return (0, jsx_runtime_1.jsxs)(
                    "div",
                    {
                      className: "flex items-center space-x-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, {
                          id: item.id,
                          checked: goals.includes(item.id),
                          onCheckedChange: function () {
                            return toggleGoal(item.id);
                          },
                        }),
                        (0, jsx_runtime_1.jsx)("label", {
                          htmlFor: item.id,
                          className:
                            "text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                          children: item.label,
                        }),
                      ],
                    },
                    item.id,
                  );
                }),
              }),
              error &&
                (0, jsx_runtime_1.jsxs)(alert_1.Alert, {
                  variant: "destructive",
                  className: "mt-4 py-2",
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
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2 pt-2",
            children: [
              (0, jsx_runtime_1.jsx)(label_1.Label, {
                htmlFor: "time-horizon",
                children: "Time Horizon for Achieving Goals",
              }),
              (0, jsx_runtime_1.jsxs)(select_1.Select, {
                value:
                  (companyDetails === null || companyDetails === void 0
                    ? void 0
                    : companyDetails.timeHorizon) || "",
                onValueChange: handleTimeHorizonChange,
                children: [
                  (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                    id: "time-horizon",
                    children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                      placeholder: "Select time horizon",
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectContent, {
                    children: timeHorizons.map(function (horizon) {
                      return (0, jsx_runtime_1.jsx)(
                        select_1.SelectItem,
                        { value: horizon.value, children: horizon.label },
                        horizon.value,
                      );
                    }),
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

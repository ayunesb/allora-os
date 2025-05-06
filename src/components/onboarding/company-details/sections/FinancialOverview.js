"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialOverview = FinancialOverview;
var jsx_runtime_1 = require("react/jsx-runtime");
var accordion_1 = require("@/components/ui/accordion");
var input_1 = require("@/components/ui/input");
var textarea_1 = require("@/components/ui/textarea");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
function FinancialOverview(_a) {
  var companyDetails = _a.companyDetails,
    handleTextChange = _a.handleTextChange,
    onNext = _a.onNext;
  return (0, jsx_runtime_1.jsxs)(accordion_1.AccordionItem, {
    value: "financial",
    children: [
      (0, jsx_runtime_1.jsx)(accordion_1.AccordionTrigger, {
        className: "text-base font-medium",
        children: "Financial Overview",
      }),
      (0, jsx_runtime_1.jsxs)(accordion_1.AccordionContent, {
        className: "space-y-4 pt-4",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsx)("label", {
                className: "text-sm font-medium",
                children: "Current Financials",
              }),
              (0, jsx_runtime_1.jsx)(textarea_1.Textarea, {
                placeholder: "Profit/Loss, Cash Flow",
                value: companyDetails.financials || "",
                onChange: function (e) {
                  return handleTextChange("financials", e.target.value);
                },
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsx)("label", {
                className: "text-sm font-medium",
                children: "Burn Rate",
              }),
              (0, jsx_runtime_1.jsx)(input_1.Input, {
                placeholder: "Monthly cash spend",
                value: companyDetails.burnRate || "",
                onChange: function (e) {
                  return handleTextChange("burnRate", e.target.value);
                },
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsx)("label", {
                className: "text-sm font-medium",
                children: "Runway",
              }),
              (0, jsx_runtime_1.jsx)(input_1.Input, {
                placeholder: "How many months left before needing new funding?",
                value: companyDetails.runway || "",
                onChange: function (e) {
                  return handleTextChange("runway", e.target.value);
                },
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "flex justify-end mt-4",
            children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
              onClick: function (e) {
                return onNext && onNext("financial");
              },
              className: "gap-2",
              children: [
                "Continue to Strategic Goals",
                (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, {
                  className: "h-4 w-4",
                }),
              ],
            }),
          }),
        ],
      }),
    ],
  });
}

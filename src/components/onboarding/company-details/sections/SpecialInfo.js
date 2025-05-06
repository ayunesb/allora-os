"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialInfo = SpecialInfo;
var jsx_runtime_1 = require("react/jsx-runtime");
var accordion_1 = require("@/components/ui/accordion");
var textarea_1 = require("@/components/ui/textarea");
function SpecialInfo(_a) {
  var companyDetails = _a.companyDetails,
    handleTextChange = _a.handleTextChange;
  return (0, jsx_runtime_1.jsxs)(accordion_1.AccordionItem, {
    value: "special",
    children: [
      (0, jsx_runtime_1.jsx)(accordion_1.AccordionTrigger, {
        className: "text-base font-medium",
        children: "Special Info (Optional)",
      }),
      (0, jsx_runtime_1.jsxs)(accordion_1.AccordionContent, {
        className: "space-y-4 pt-4",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsx)("label", {
                className: "text-sm font-medium",
                children: "Social Impact Goals",
              }),
              (0, jsx_runtime_1.jsx)(textarea_1.Textarea, {
                placeholder:
                  "Any sustainability, diversity, social initiatives?",
                value: companyDetails.socialImpact || "",
                onChange: function (e) {
                  return handleTextChange("socialImpact", e.target.value);
                },
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsx)("label", {
                className: "text-sm font-medium",
                children: "Exit Strategy",
              }),
              (0, jsx_runtime_1.jsx)(textarea_1.Textarea, {
                placeholder: "IPO? Acquisition? Long-term private?",
                value: companyDetails.exitStrategy || "",
                onChange: function (e) {
                  return handleTextChange("exitStrategy", e.target.value);
                },
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

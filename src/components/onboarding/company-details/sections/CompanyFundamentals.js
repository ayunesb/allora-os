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
exports.CompanyFundamentals = CompanyFundamentals;
var jsx_runtime_1 = require("react/jsx-runtime");
var accordion_1 = require("@/components/ui/accordion");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var textarea_1 = require("@/components/ui/textarea");
var radio_group_1 = require("@/components/ui/radio-group");
var lucide_react_1 = require("lucide-react");
function CompanyFundamentals(_a) {
  var companyDetails = _a.companyDetails,
    handleTextChange = _a.handleTextChange,
    newItem = _a.newItem,
    setNewItem = _a.setNewItem,
    addToArray = _a.addToArray,
    removeFromArray = _a.removeFromArray,
    onNext = _a.onNext;
  return (0, jsx_runtime_1.jsxs)(accordion_1.AccordionItem, {
    value: "fundamentals",
    children: [
      (0, jsx_runtime_1.jsx)(accordion_1.AccordionTrigger, {
        className: "text-base font-medium",
        children: "Company Fundamentals",
      }),
      (0, jsx_runtime_1.jsxs)(accordion_1.AccordionContent, {
        className: "space-y-4 pt-4",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsx)("label", {
                className: "text-sm font-medium",
                children: "Company Description",
              }),
              (0, jsx_runtime_1.jsx)(textarea_1.Textarea, {
                placeholder: "What does your company do?",
                value: companyDetails.description || "",
                onChange: function (e) {
                  return handleTextChange("description", e.target.value);
                },
                className: "min-h-[100px]",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsx)("label", {
                className: "text-sm font-medium",
                children: "Mission Statement",
              }),
              (0, jsx_runtime_1.jsx)(textarea_1.Textarea, {
                placeholder: "What is your company's mission?",
                value: companyDetails.mission || "",
                onChange: function (e) {
                  return handleTextChange("mission", e.target.value);
                },
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsx)("label", {
                className: "text-sm font-medium",
                children: "Vision",
              }),
              (0, jsx_runtime_1.jsx)(textarea_1.Textarea, {
                placeholder: "What is your long-term vision?",
                value: companyDetails.vision || "",
                onChange: function (e) {
                  return handleTextChange("vision", e.target.value);
                },
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsx)("label", {
                className: "text-sm font-medium",
                children: "Target Market",
              }),
              (0, jsx_runtime_1.jsx)(textarea_1.Textarea, {
                placeholder:
                  "Who is your customer? (Age, geography, demographics, psychographics)",
                value: companyDetails.targetMarket || "",
                onChange: function (e) {
                  return handleTextChange("targetMarket", e.target.value);
                },
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsx)("label", {
                className: "text-sm font-medium",
                children: "Business Type",
              }),
              (0, jsx_runtime_1.jsx)("div", {
                className: "flex flex-col space-y-2",
                children: (0, jsx_runtime_1.jsxs)(radio_group_1.RadioGroup, {
                  value: companyDetails.businessType || "B2B",
                  onValueChange: function (value) {
                    return handleTextChange("businessType", value);
                  },
                  className: "flex space-x-4",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center space-x-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(radio_group_1.RadioGroupItem, {
                          value: "B2B",
                          id: "b2b",
                        }),
                        (0, jsx_runtime_1.jsx)(label_1.Label, {
                          htmlFor: "b2b",
                          children: "B2B",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center space-x-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(radio_group_1.RadioGroupItem, {
                          value: "B2C",
                          id: "b2c",
                        }),
                        (0, jsx_runtime_1.jsx)(label_1.Label, {
                          htmlFor: "b2c",
                          children: "B2C",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center space-x-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(radio_group_1.RadioGroupItem, {
                          value: "Both",
                          id: "both",
                        }),
                        (0, jsx_runtime_1.jsx)(label_1.Label, {
                          htmlFor: "both",
                          children: "Both",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsx)("label", {
                className: "text-sm font-medium",
                children: "Core Products / Services",
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(input_1.Input, {
                    placeholder: "Add a product or service",
                    value: newItem.coreProducts || "",
                    onChange: function (e) {
                      return setNewItem(
                        __assign(__assign({}, newItem), {
                          coreProducts: e.target.value,
                        }),
                      );
                    },
                  }),
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    type: "button",
                    size: "icon",
                    onClick: function () {
                      return addToArray("coreProducts");
                    },
                    children: (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, {
                      className: "h-4 w-4",
                    }),
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)("div", {
                className: "flex flex-wrap gap-2 mt-2",
                children: (companyDetails.coreProducts || []).map(
                  function (product, index) {
                    return (0, jsx_runtime_1.jsxs)(
                      "div",
                      {
                        className:
                          "flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm",
                        children: [
                          product,
                          (0, jsx_runtime_1.jsx)("button", {
                            onClick: function () {
                              return removeFromArray("coreProducts", index);
                            },
                            className:
                              "ml-2 text-muted-foreground hover:text-foreground",
                            children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, {
                              className: "h-3 w-3",
                            }),
                          }),
                        ],
                      },
                      index,
                    );
                  },
                ),
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsx)("label", {
                className: "text-sm font-medium",
                children: "Business Model",
              }),
              (0, jsx_runtime_1.jsx)(input_1.Input, {
                placeholder:
                  "How does your company make money? (SaaS, e-commerce, etc.)",
                value: companyDetails.businessModel || "",
                onChange: function (e) {
                  return handleTextChange("businessModel", e.target.value);
                },
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "flex justify-end mt-4",
            children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
              onClick: function (e) {
                return onNext && onNext("fundamentals");
              },
              className: "gap-2",
              children: [
                "Continue to Market Analysis",
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

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
exports.MarketingSales = MarketingSales;
var jsx_runtime_1 = require("react/jsx-runtime");
var accordion_1 = require("@/components/ui/accordion");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var lucide_react_1 = require("lucide-react");
function MarketingSales(_a) {
  var companyDetails = _a.companyDetails,
    handleTextChange = _a.handleTextChange,
    newItem = _a.newItem,
    setNewItem = _a.setNewItem,
    addToArray = _a.addToArray,
    removeFromArray = _a.removeFromArray,
    onNext = _a.onNext;
  return (0, jsx_runtime_1.jsxs)(accordion_1.AccordionItem, {
    value: "marketing",
    children: [
      (0, jsx_runtime_1.jsx)(accordion_1.AccordionTrigger, {
        className: "text-base font-medium",
        children: "Marketing & Sales",
      }),
      (0, jsx_runtime_1.jsxs)(accordion_1.AccordionContent, {
        className: "space-y-4 pt-4",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsx)("label", {
                className: "text-sm font-medium",
                children: "Customer Acquisition Strategies",
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(input_1.Input, {
                    placeholder: "Add an acquisition strategy",
                    value: newItem.acquisitionStrategy || "",
                    onChange: function (e) {
                      return setNewItem(
                        __assign(__assign({}, newItem), {
                          acquisitionStrategy: e.target.value,
                        }),
                      );
                    },
                  }),
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    type: "button",
                    size: "icon",
                    onClick: function () {
                      return addToArray("acquisitionStrategy");
                    },
                    children: (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, {
                      className: "h-4 w-4",
                    }),
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)("div", {
                className: "flex flex-wrap gap-2 mt-2",
                children: (companyDetails.acquisitionStrategy || []).map(
                  function (strategy, index) {
                    return (0, jsx_runtime_1.jsxs)(
                      "div",
                      {
                        className:
                          "flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm",
                        children: [
                          strategy,
                          (0, jsx_runtime_1.jsx)("button", {
                            onClick: function () {
                              return removeFromArray(
                                "acquisitionStrategy",
                                index,
                              );
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
                children: "Sales Channels",
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(input_1.Input, {
                    placeholder: "Add a sales channel",
                    value: newItem.salesChannels || "",
                    onChange: function (e) {
                      return setNewItem(
                        __assign(__assign({}, newItem), {
                          salesChannels: e.target.value,
                        }),
                      );
                    },
                  }),
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    type: "button",
                    size: "icon",
                    onClick: function () {
                      return addToArray("salesChannels");
                    },
                    children: (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, {
                      className: "h-4 w-4",
                    }),
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)("div", {
                className: "flex flex-wrap gap-2 mt-2",
                children: (companyDetails.salesChannels || []).map(
                  function (channel, index) {
                    return (0, jsx_runtime_1.jsxs)(
                      "div",
                      {
                        className:
                          "flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm",
                        children: [
                          channel,
                          (0, jsx_runtime_1.jsx)("button", {
                            onClick: function () {
                              return removeFromArray("salesChannels", index);
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
                children: "Customer Retention",
              }),
              (0, jsx_runtime_1.jsx)(input_1.Input, {
                placeholder: "What is the retention rate? Churn?",
                value: companyDetails.customerRetention || "",
                onChange: function (e) {
                  return handleTextChange("customerRetention", e.target.value);
                },
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsx)("label", {
                className: "text-sm font-medium",
                children: "Pricing Strategy",
              }),
              (0, jsx_runtime_1.jsx)(input_1.Input, {
                placeholder: "How are products/services priced?",
                value: companyDetails.pricingStrategy || "",
                onChange: function (e) {
                  return handleTextChange("pricingStrategy", e.target.value);
                },
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "flex justify-end mt-4",
            children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
              onClick: function (e) {
                return onNext && onNext("marketing");
              },
              className: "gap-2",
              children: [
                "Continue to AI/Automation Readiness",
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

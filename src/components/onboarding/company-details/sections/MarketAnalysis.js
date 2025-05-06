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
exports.MarketAnalysis = MarketAnalysis;
var jsx_runtime_1 = require("react/jsx-runtime");
var accordion_1 = require("@/components/ui/accordion");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var textarea_1 = require("@/components/ui/textarea");
var lucide_react_1 = require("lucide-react");
function MarketAnalysis(_a) {
  var companyDetails = _a.companyDetails,
    handleTextChange = _a.handleTextChange,
    newItem = _a.newItem,
    setNewItem = _a.setNewItem,
    addToArray = _a.addToArray,
    removeFromArray = _a.removeFromArray,
    onNext = _a.onNext;
  return (0, jsx_runtime_1.jsxs)(accordion_1.AccordionItem, {
    value: "market",
    children: [
      (0, jsx_runtime_1.jsx)(accordion_1.AccordionTrigger, {
        className: "text-base font-medium",
        children: "Market Analysis",
      }),
      (0, jsx_runtime_1.jsxs)(accordion_1.AccordionContent, {
        className: "space-y-4 pt-4",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsx)("label", {
                className: "text-sm font-medium",
                children: "Market Size & Growth",
              }),
              (0, jsx_runtime_1.jsx)(input_1.Input, {
                placeholder: "How big is your target market? (TAM/SAM/SOM)",
                value: companyDetails.marketSize || "",
                onChange: function (e) {
                  return handleTextChange("marketSize", e.target.value);
                },
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsx)("label", {
                className: "text-sm font-medium",
                children: "Competitors",
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(input_1.Input, {
                    placeholder: "Add a competitor",
                    value: newItem.competitors || "",
                    onChange: function (e) {
                      return setNewItem(
                        __assign(__assign({}, newItem), {
                          competitors: e.target.value,
                        }),
                      );
                    },
                  }),
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    type: "button",
                    size: "icon",
                    onClick: function () {
                      return addToArray("competitors");
                    },
                    children: (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, {
                      className: "h-4 w-4",
                    }),
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)("div", {
                className: "flex flex-wrap gap-2 mt-2",
                children: (companyDetails.competitors || []).map(
                  function (competitor, index) {
                    return (0, jsx_runtime_1.jsxs)(
                      "div",
                      {
                        className:
                          "flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm",
                        children: [
                          competitor,
                          (0, jsx_runtime_1.jsx)("button", {
                            onClick: function () {
                              return removeFromArray("competitors", index);
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
                children: "Differentiators",
              }),
              (0, jsx_runtime_1.jsx)(textarea_1.Textarea, {
                placeholder: "What makes your company unique vs competitors?",
                value: companyDetails.differentiators || "",
                onChange: function (e) {
                  return handleTextChange("differentiators", e.target.value);
                },
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsx)("label", {
                className: "text-sm font-medium",
                children: "Customer Pain Points",
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(input_1.Input, {
                    placeholder: "Add a pain point",
                    value: newItem.painPoints || "",
                    onChange: function (e) {
                      return setNewItem(
                        __assign(__assign({}, newItem), {
                          painPoints: e.target.value,
                        }),
                      );
                    },
                  }),
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    type: "button",
                    size: "icon",
                    onClick: function () {
                      return addToArray("painPoints");
                    },
                    children: (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, {
                      className: "h-4 w-4",
                    }),
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)("div", {
                className: "flex flex-wrap gap-2 mt-2",
                children: (companyDetails.painPoints || []).map(
                  function (painPoint, index) {
                    return (0, jsx_runtime_1.jsxs)(
                      "div",
                      {
                        className:
                          "flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm",
                        children: [
                          painPoint,
                          (0, jsx_runtime_1.jsx)("button", {
                            onClick: function () {
                              return removeFromArray("painPoints", index);
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
          (0, jsx_runtime_1.jsx)("div", {
            className: "flex justify-end mt-4",
            children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
              onClick: function (e) {
                return onNext && onNext("market");
              },
              className: "gap-2",
              children: [
                "Continue to Growth & Traction",
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

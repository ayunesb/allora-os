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
exports.ProductTechnology = ProductTechnology;
var jsx_runtime_1 = require("react/jsx-runtime");
var accordion_1 = require("@/components/ui/accordion");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var textarea_1 = require("@/components/ui/textarea");
var lucide_react_1 = require("lucide-react");
var select_1 = require("@/components/ui/select");
function ProductTechnology(_a) {
  var companyDetails = _a.companyDetails,
    handleTextChange = _a.handleTextChange,
    newItem = _a.newItem,
    setNewItem = _a.setNewItem,
    addToArray = _a.addToArray,
    removeFromArray = _a.removeFromArray,
    onNext = _a.onNext;
  return (0, jsx_runtime_1.jsxs)(accordion_1.AccordionItem, {
    value: "product",
    children: [
      (0, jsx_runtime_1.jsx)(accordion_1.AccordionTrigger, {
        className: "text-base font-medium",
        children: "Product & Technology",
      }),
      (0, jsx_runtime_1.jsxs)(accordion_1.AccordionContent, {
        className: "space-y-4 pt-4",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsx)("label", {
                className: "text-sm font-medium",
                children: "Technology Stack",
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(input_1.Input, {
                    placeholder:
                      "Add a technology (AI, blockchain, cloud, etc.)",
                    value: newItem.techStack || "",
                    onChange: function (e) {
                      return setNewItem(
                        __assign(__assign({}, newItem), {
                          techStack: e.target.value,
                        }),
                      );
                    },
                  }),
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    type: "button",
                    size: "icon",
                    onClick: function () {
                      return addToArray("techStack");
                    },
                    children: (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, {
                      className: "h-4 w-4",
                    }),
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)("div", {
                className: "flex flex-wrap gap-2 mt-2",
                children: (companyDetails.techStack || []).map(
                  function (tech, index) {
                    return (0, jsx_runtime_1.jsxs)(
                      "div",
                      {
                        className:
                          "flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm",
                        children: [
                          tech,
                          (0, jsx_runtime_1.jsx)("button", {
                            onClick: function () {
                              return removeFromArray("techStack", index);
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
                children: "Current Product Stage",
              }),
              (0, jsx_runtime_1.jsxs)(select_1.Select, {
                value: companyDetails.productStage || "unknown",
                onValueChange: function (value) {
                  return handleTextChange("productStage", value);
                },
                children: [
                  (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                    children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                      placeholder: "Select product stage",
                    }),
                  }),
                  (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                    children: [
                      (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                        value: "unknown",
                        children: "Unknown",
                      }),
                      (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                        value: "idea",
                        children: "Idea",
                      }),
                      (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                        value: "mvp",
                        children: "MVP",
                      }),
                      (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                        value: "beta",
                        children: "Beta",
                      }),
                      (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                        value: "launched",
                        children: "Launched",
                      }),
                      (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                        value: "scaling",
                        children: "Scaling",
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
              (0, jsx_runtime_1.jsx)("label", {
                className: "text-sm font-medium",
                children: "Intellectual Property",
              }),
              (0, jsx_runtime_1.jsx)(textarea_1.Textarea, {
                placeholder: "Any patents, trademarks, proprietary tech?",
                value: companyDetails.intellectualProperty || "",
                onChange: function (e) {
                  return handleTextChange(
                    "intellectualProperty",
                    e.target.value,
                  );
                },
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsx)("label", {
                className: "text-sm font-medium",
                children: "R&D Pipeline",
              }),
              (0, jsx_runtime_1.jsx)(textarea_1.Textarea, {
                placeholder: "Any upcoming product innovations?",
                value: companyDetails.rdPipeline || "",
                onChange: function (e) {
                  return handleTextChange("rdPipeline", e.target.value);
                },
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "flex justify-end mt-4",
            children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
              onClick: function (e) {
                return onNext && onNext("product");
              },
              className: "gap-2",
              children: [
                "Continue to Team & Leadership",
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

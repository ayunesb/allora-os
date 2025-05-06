"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Forecast;
var jsx_runtime_1 = require("react/jsx-runtime");
var page_title_1 = require("@/components/ui/page-title");
var card_1 = require("@/components/ui/card");
var tabs_1 = require("@/components/ui/tabs");
function Forecast() {
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto p-4",
    children: [
      (0, jsx_runtime_1.jsx)(page_title_1.PageTitle, {
        title: "Financial Forecast",
        description: "Projected financial performance",
        children: "Financial Forecast",
      }),
      (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
        defaultValue: "overview",
        className: "space-y-4",
        children: [
          (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
            children: [
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "overview",
                children: "Overview",
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "scenarios",
                children: "Scenarios",
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "metrics",
                children: "Key Metrics",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "overview",
            className: "space-y-4",
            children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                  children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                    children: "Revenue Forecast",
                  }),
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                  children: (0, jsx_runtime_1.jsx)("p", {
                    children:
                      "Revenue forecast visualization will appear here.",
                  }),
                }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "scenarios",
            className: "space-y-4",
            children: (0, jsx_runtime_1.jsx)("p", {
              children: "Scenario planning tools will appear here.",
            }),
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "metrics",
            className: "space-y-4",
            children: (0, jsx_runtime_1.jsx)("p", {
              children: "Key performance metrics will appear here.",
            }),
          }),
        ],
      }),
    ],
  });
}

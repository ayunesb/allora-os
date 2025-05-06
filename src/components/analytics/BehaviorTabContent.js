"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var RiskAppetiteDistribution_1 = require("./RiskAppetiteDistribution");
var InteractionTimeline_1 = require("./InteractionTimeline");
var BehaviorTabContent = function (_a) {
  var insights = _a.insights,
    riskData = _a.riskData,
    activityData = _a.activityData;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "grid grid-cols-1 md:grid-cols-2 gap-6",
        children: [
          (0, jsx_runtime_1.jsx)(RiskAppetiteDistribution_1.default, {
            data: riskData,
          }),
          (0, jsx_runtime_1.jsx)(InteractionTimeline_1.default, {
            data: activityData,
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            children: [
              (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                className: "flex items-center",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Target, {
                    className: "mr-2 h-5 w-5 text-primary",
                  }),
                  "Learning Progress",
                ],
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children: "How the AI system is adapting to your preferences",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            children: (0, jsx_runtime_1.jsx)("div", {
              className: "space-y-4",
              children:
                insights.length > 0
                  ? (0, jsx_runtime_1.jsx)("ul", {
                      className: "space-y-2",
                      children: insights.map(function (insight, index) {
                        return (0, jsx_runtime_1.jsxs)(
                          "li",
                          {
                            className:
                              "flex justify-between p-2 border-b border-border/30",
                            children: [
                              (0, jsx_runtime_1.jsx)("span", {
                                className: "font-medium",
                                children: insight.title,
                              }),
                              (0, jsx_runtime_1.jsx)("span", {
                                className: "text-primary",
                                children: insight.value,
                              }),
                            ],
                          },
                          index,
                        );
                      }),
                    })
                  : (0, jsx_runtime_1.jsx)("p", {
                      className: "text-muted-foreground text-center py-4",
                      children:
                        "Continue using the platform to generate learning insights",
                    }),
            }),
          }),
        ],
      }),
    ],
  });
};
exports.default = BehaviorTabContent;

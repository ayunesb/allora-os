"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var RecommendationsTabContent = function (_a) {
  var recommendations = _a.recommendations;
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
            className: "flex items-center",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.TrendingUp, {
                className: "mr-2 h-5 w-5 text-primary",
              }),
              "Personalized Recommendations",
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children: "Based on your usage patterns and preferences",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "space-y-6",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsx)("h3", {
                  className: "text-lg font-medium mb-2",
                  children: "Recommended Strategies",
                }),
                recommendations.strategies.length > 0
                  ? (0, jsx_runtime_1.jsx)("ul", {
                      className: "space-y-2",
                      children: recommendations.strategies.map(
                        function (strategy, index) {
                          return (0, jsx_runtime_1.jsxs)(
                            "li",
                            {
                              className: "p-3 bg-accent/30 rounded-md",
                              children: [
                                (0, jsx_runtime_1.jsx)("div", {
                                  className: "font-medium",
                                  children: strategy.title,
                                }),
                                (0, jsx_runtime_1.jsx)("div", {
                                  className: "text-sm text-muted-foreground",
                                  children: strategy.description,
                                }),
                              ],
                            },
                            index,
                          );
                        },
                      ),
                    })
                  : (0, jsx_runtime_1.jsx)("p", {
                      className: "text-muted-foreground",
                      children: "No strategy recommendations yet",
                    }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsx)("h3", {
                  className: "text-lg font-medium mb-2",
                  children: "Preferred Topics",
                }),
                (0, jsx_runtime_1.jsx)("div", {
                  className: "flex flex-wrap gap-2",
                  children:
                    recommendations.topics.length > 0
                      ? recommendations.topics.map(function (topic, index) {
                          return (0, jsx_runtime_1.jsx)(
                            "div",
                            {
                              className:
                                "px-3 py-1 bg-primary/20 text-primary rounded-full text-sm",
                              children: topic,
                            },
                            index,
                          );
                        })
                      : (0, jsx_runtime_1.jsx)("p", {
                          className: "text-muted-foreground",
                          children: "No topic preferences detected yet",
                        }),
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsx)("h3", {
                  className: "text-lg font-medium mb-2",
                  children: "Preferred Executives",
                }),
                (0, jsx_runtime_1.jsx)("div", {
                  className: "flex flex-wrap gap-2",
                  children:
                    recommendations.executives.length > 0
                      ? recommendations.executives.map(
                          function (executive, index) {
                            return (0, jsx_runtime_1.jsx)(
                              "div",
                              {
                                className:
                                  "px-3 py-1 bg-secondary/40 rounded-full text-sm",
                                children: executive,
                              },
                              index,
                            );
                          },
                        )
                      : (0, jsx_runtime_1.jsx)("p", {
                          className: "text-muted-foreground",
                          children: "No executive preferences detected yet",
                        }),
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
};
exports.default = RecommendationsTabContent;

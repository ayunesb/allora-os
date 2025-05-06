"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var scroll_area_1 = require("@/components/ui/scroll-area");
var avatar_1 = require("@/components/ui/avatar");
var lucide_react_1 = require("lucide-react");
var DebateSummaryDisplay = function (_a) {
  var summary = _a.summary,
    debateTopic = _a.debateTopic,
    executives = _a.executives,
    onSaveStrategy = _a.onSaveStrategy,
    onNewDebate = _a.onNewDebate;
  return (0, jsx_runtime_1.jsx)(scroll_area_1.ScrollArea, {
    className: "h-full",
    children: (0, jsx_runtime_1.jsxs)("div", {
      className: "p-6",
      children: [
        (0, jsx_runtime_1.jsxs)("h2", {
          className:
            "text-2xl font-bold text-white mb-6 flex items-center gap-2",
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.BarChart, {
              className: "h-6 w-6 text-purple-500",
            }),
            (0, jsx_runtime_1.jsxs)("span", {
              children: ["Debate Summary: ", debateTopic],
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6",
          children: [
            (0, jsx_runtime_1.jsxs)(card_1.Card, {
              className: "bg-gray-900 border-gray-800 shadow-lg",
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                  className: "pb-3 border-b border-gray-800",
                  children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                    className: "text-lg text-white",
                    children: "Winning Strategy",
                  }),
                }),
                (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                  className: "pt-4",
                  children: [
                    (0, jsx_runtime_1.jsx)("div", {
                      className:
                        "bg-gradient-to-r from-purple-950/50 to-blue-950/50 border border-purple-800/30 rounded-lg p-4",
                      children: (0, jsx_runtime_1.jsx)("p", {
                        className: "text-white",
                        children: summary.winningStrategy,
                      }),
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "mt-4 grid grid-cols-1 md:grid-cols-2 gap-4",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className:
                            "bg-green-950/30 border border-green-800/30 rounded-lg p-4",
                          children: [
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "flex items-center gap-2 mb-2",
                              children: [
                                (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, {
                                  className: "h-4 w-4 text-green-500",
                                }),
                                (0, jsx_runtime_1.jsx)("h4", {
                                  className: "font-medium text-green-400",
                                  children: "Safe Move",
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-sm text-white",
                              children: summary.safeMove,
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          className:
                            "bg-amber-950/30 border border-amber-800/30 rounded-lg p-4",
                          children: [
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "flex items-center gap-2 mb-2",
                              children: [
                                (0, jsx_runtime_1.jsx)(lucide_react_1.Zap, {
                                  className: "h-4 w-4 text-amber-500",
                                }),
                                (0, jsx_runtime_1.jsx)("h4", {
                                  className: "font-medium text-amber-400",
                                  children: "Bold Move",
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-sm text-white",
                              children: summary.boldMove,
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(card_1.Card, {
              className: "bg-gray-900 border-gray-800 shadow-lg",
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                  className: "pb-3 border-b border-gray-800",
                  children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                    className: "text-lg text-white",
                    children: "Key Points",
                  }),
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                  className: "pt-4",
                  children: (0, jsx_runtime_1.jsxs)("div", {
                    className: "space-y-4",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        children: [
                          (0, jsx_runtime_1.jsxs)("h4", {
                            className:
                              "font-medium text-white flex items-center gap-2 mb-2",
                            children: [
                              (0, jsx_runtime_1.jsx)(lucide_react_1.ThumbsUp, {
                                className: "h-4 w-4 text-purple-500",
                              }),
                              (0, jsx_runtime_1.jsx)("span", {
                                children: "Key Disagreements",
                              }),
                            ],
                          }),
                          (0, jsx_runtime_1.jsx)("ul", {
                            className: "space-y-2",
                            children: summary.keyDisagreements.map(
                              function (point, idx) {
                                return (0, jsx_runtime_1.jsx)(
                                  "li",
                                  {
                                    className:
                                      "bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm text-gray-300",
                                    children: point,
                                  },
                                  idx,
                                );
                              },
                            ),
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        children: [
                          (0, jsx_runtime_1.jsxs)("h4", {
                            className:
                              "font-medium text-white flex items-center gap-2 mb-2",
                            children: [
                              (0, jsx_runtime_1.jsx)(lucide_react_1.Lightbulb, {
                                className: "h-4 w-4 text-amber-500",
                              }),
                              (0, jsx_runtime_1.jsx)("span", {
                                children: "Alternative Ideas",
                              }),
                            ],
                          }),
                          (0, jsx_runtime_1.jsx)("ul", {
                            className: "space-y-2",
                            children: summary.alternativeIdeas.map(
                              function (idea, idx) {
                                return (0, jsx_runtime_1.jsx)(
                                  "li",
                                  {
                                    className:
                                      "bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm text-gray-300",
                                    children: idea,
                                  },
                                  idx,
                                );
                              },
                            ),
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              ],
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)(card_1.Card, {
          className: "bg-gray-900 border-gray-800 shadow-lg mb-6",
          children: [
            (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
              className: "pb-3 border-b border-gray-800",
              children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                className: "text-lg text-white",
                children: "Executive Performance",
              }),
            }),
            (0, jsx_runtime_1.jsx)(card_1.CardContent, {
              className: "pt-4",
              children: (0, jsx_runtime_1.jsx)("div", {
                className:
                  "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4",
                children: executives.map(function (exec) {
                  var performance = summary.executivePerformance[exec.id];
                  if (!performance) return null;
                  return (0, jsx_runtime_1.jsxs)(
                    "div",
                    {
                      className:
                        "bg-gray-800 border border-gray-700 rounded-lg p-4 flex flex-col items-center",
                      children: [
                        (0, jsx_runtime_1.jsxs)(avatar_1.Avatar, {
                          className:
                            "h-16 w-16 mb-2 border-2 border-purple-600/50",
                          children: [
                            (0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, {
                              src: exec.avatar,
                              alt: exec.name,
                            }),
                            (0, jsx_runtime_1.jsx)(avatar_1.AvatarFallback, {
                              className: "bg-purple-900 text-white",
                              children: exec.name
                                .split(" ")
                                .map(function (n) {
                                  return n[0];
                                })
                                .join(""),
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)("h4", {
                          className: "font-medium text-white text-center mb-1",
                          children: exec.name,
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-xs text-gray-400 text-center mb-3",
                          children: exec.title,
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "w-full space-y-2",
                          children: [
                            (0, jsx_runtime_1.jsxs)("div", {
                              children: [
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className:
                                    "flex justify-between items-center text-xs mb-1",
                                  children: [
                                    (0, jsx_runtime_1.jsx)("span", {
                                      className: "text-gray-400",
                                      children: "Boldness",
                                    }),
                                    (0, jsx_runtime_1.jsxs)("span", {
                                      className: "text-purple-400",
                                      children: [
                                        performance.boldnessScore,
                                        "%",
                                      ],
                                    }),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsx)("div", {
                                  className:
                                    "h-1.5 bg-gray-700 rounded-full overflow-hidden",
                                  children: (0, jsx_runtime_1.jsx)("div", {
                                    className:
                                      "h-full bg-purple-500 rounded-full",
                                    style: {
                                      width: "".concat(
                                        performance.boldnessScore,
                                        "%",
                                      ),
                                    },
                                  }),
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)("div", {
                              children: [
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className:
                                    "flex justify-between items-center text-xs mb-1",
                                  children: [
                                    (0, jsx_runtime_1.jsx)("span", {
                                      className: "text-gray-400",
                                      children: "Risk Alignment",
                                    }),
                                    (0, jsx_runtime_1.jsxs)("span", {
                                      className: "text-blue-400",
                                      children: [
                                        performance.riskAlignment,
                                        "%",
                                      ],
                                    }),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsx)("div", {
                                  className:
                                    "h-1.5 bg-gray-700 rounded-full overflow-hidden",
                                  children: (0, jsx_runtime_1.jsx)("div", {
                                    className:
                                      "h-full bg-blue-500 rounded-full",
                                    style: {
                                      width: "".concat(
                                        performance.riskAlignment,
                                        "%",
                                      ),
                                    },
                                  }),
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)("div", {
                              children: [
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className:
                                    "flex justify-between items-center text-xs mb-1",
                                  children: [
                                    (0, jsx_runtime_1.jsx)("span", {
                                      className: "text-gray-400",
                                      children: "Innovation",
                                    }),
                                    (0, jsx_runtime_1.jsxs)("span", {
                                      className: "text-amber-400",
                                      children: [
                                        performance.innovationScore,
                                        "%",
                                      ],
                                    }),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsx)("div", {
                                  className:
                                    "h-1.5 bg-gray-700 rounded-full overflow-hidden",
                                  children: (0, jsx_runtime_1.jsx)("div", {
                                    className:
                                      "h-full bg-amber-500 rounded-full",
                                    style: {
                                      width: "".concat(
                                        performance.innovationScore,
                                        "%",
                                      ),
                                    },
                                  }),
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    },
                    exec.id,
                  );
                }),
              }),
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "flex flex-wrap gap-4 justify-center",
          children: [
            (0, jsx_runtime_1.jsxs)(button_1.Button, {
              variant: "outline",
              className:
                "border-purple-600 text-purple-400 hover:bg-purple-950 hover:text-purple-300",
              onClick: onNewDebate,
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, {
                  className: "h-4 w-4 mr-2",
                }),
                (0, jsx_runtime_1.jsx)("span", { children: "New Debate" }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(button_1.Button, {
              className:
                "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700",
              onClick: onSaveStrategy,
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Save, {
                  className: "h-4 w-4 mr-2",
                }),
                (0, jsx_runtime_1.jsx)("span", { children: "Save Strategy" }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(button_1.Button, {
              variant: "outline",
              className: "border-gray-700 text-gray-300 hover:bg-gray-800",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.FileDown, {
                  className: "h-4 w-4 mr-2",
                }),
                (0, jsx_runtime_1.jsx)("span", { children: "Export Summary" }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
};
exports.default = DebateSummaryDisplay;

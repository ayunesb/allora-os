"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var useExecutiveDebate_1 = require("@/hooks/useExecutiveDebate");
var avatar_1 = require("@/components/ui/avatar");
var card_1 = require("@/components/ui/card");
var consultation_1 = require("@/utils/consultation");
var lucide_react_1 = require("lucide-react");
var skeleton_1 = require("@/components/ui/skeleton");
var tabs_1 = require("@/components/ui/tabs");
var ExecutiveBoardroom = function () {
  var _a = (0, useExecutiveDebate_1.useExecutiveDebate)(),
    debateMessages = _a.debateMessages,
    debateSummary = _a.debateSummary,
    isLoading = _a.isLoading;
  if (isLoading) {
    return (0, jsx_runtime_1.jsx)("div", {
      className: "space-y-6",
      children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            className: "pb-3",
            children: [
              (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                className: "h-6 w-3/4",
              }),
              (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                className: "h-4 w-1/2 mt-2",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            children: (0, jsx_runtime_1.jsx)("div", {
              className: "space-y-4",
              children: [1, 2, 3].map(function (i) {
                return (0, jsx_runtime_1.jsxs)(
                  "div",
                  {
                    className: "flex gap-4",
                    children: [
                      (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                        className: "h-12 w-12 rounded-full",
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "space-y-2 flex-1",
                        children: [
                          (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                            className: "h-4 w-1/3",
                          }),
                          (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                            className: "h-16 w-full",
                          }),
                        ],
                      }),
                    ],
                  },
                  i,
                );
              }),
            }),
          }),
        ],
      }),
    });
  }
  return (0, jsx_runtime_1.jsx)("div", {
    className: "space-y-6",
    children: (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
      defaultValue: "debate",
      className: "space-y-4",
      children: [
        (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
          className: "mb-2",
          children: [
            (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, {
              value: "debate",
              className: "flex items-center gap-2",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.MessageSquare, {
                  className: "h-4 w-4",
                }),
                (0, jsx_runtime_1.jsx)("span", {
                  children: "Debate Transcript",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, {
              value: "summary",
              className: "flex items-center gap-2",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, {
                  className: "h-4 w-4",
                }),
                (0, jsx_runtime_1.jsx)("span", {
                  children: "Decision Summary",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, {
              value: "contributors",
              className: "flex items-center gap-2",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Users, {
                  className: "h-4 w-4",
                }),
                (0, jsx_runtime_1.jsx)("span", {
                  children: "Key Contributors",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, {
              value: "process",
              className: "flex items-center gap-2",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Brain, {
                  className: "h-4 w-4",
                }),
                (0, jsx_runtime_1.jsx)("span", {
                  children: "Thinking Process",
                }),
              ],
            }),
          ],
        }),
        (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
          value: "debate",
          children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                className: "pb-3",
                children: [
                  (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                    className: "text-xl font-bold",
                    children: "Executive Boardroom Debate",
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                    children:
                      "See how our AI executive team analyzed your company's needs and debated the best strategic approach",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                children: (0, jsx_runtime_1.jsx)("div", {
                  className: "space-y-6",
                  children: debateMessages.map(function (message) {
                    return (0, jsx_runtime_1.jsxs)(
                      "div",
                      {
                        className: "flex gap-4",
                        children: [
                          (0, jsx_runtime_1.jsxs)(avatar_1.Avatar, {
                            className: "h-12 w-12 border-2 border-background",
                            children: [
                              (0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, {
                                src: message.executive.avatar,
                                alt: message.executive.name,
                              }),
                              (0, jsx_runtime_1.jsx)(avatar_1.AvatarFallback, {
                                children: message.executive.name.charAt(0),
                              }),
                            ],
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "space-y-1 flex-1",
                            children: [
                              (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex items-center gap-2",
                                children: [
                                  (0, jsx_runtime_1.jsx)("span", {
                                    className: "font-medium",
                                    children: message.executive.name,
                                  }),
                                  (0, jsx_runtime_1.jsx)("span", {
                                    className: "text-xs text-muted-foreground",
                                    children:
                                      message.executive.role ||
                                      (0, consultation_1.formatRoleTitle)(
                                        message.executive.role || "",
                                      ),
                                  }),
                                ],
                              }),
                              (0, jsx_runtime_1.jsx)("div", {
                                className: "bg-secondary/10 rounded-lg p-3",
                                children: (0, jsx_runtime_1.jsx)("p", {
                                  children: message.content,
                                }),
                              }),
                            ],
                          }),
                        ],
                      },
                      message.id,
                    );
                  }),
                }),
              }),
            ],
          }),
        }),
        (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
          value: "summary",
          children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                className: "pb-3",
                children: [
                  (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                    className: "text-xl font-bold",
                    children: "Decision Summary",
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                    children:
                      "The key decisions and recommendations from the executive team",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                children: (0, jsx_runtime_1.jsx)("div", {
                  className: "bg-secondary/10 rounded-lg p-4",
                  children: (0, jsx_runtime_1.jsx)("p", {
                    children:
                      typeof debateSummary === "string"
                        ? debateSummary
                        : "No summary is available for this debate yet.",
                  }),
                }),
              }),
            ],
          }),
        }),
        (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
          value: "contributors",
          children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                className: "pb-3",
                children: [
                  (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                    className: "text-xl font-bold",
                    children: "Key Contributors",
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                    children:
                      "The executive team members who contributed to this analysis",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                children: (0, jsx_runtime_1.jsx)("div", {
                  className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                  children: debateMessages
                    .filter(function (m, i, arr) {
                      return (
                        arr.findIndex(function (m2) {
                          return m2.executive.name === m.executive.name;
                        }) === i
                      );
                    })
                    .map(function (message) {
                      return (0, jsx_runtime_1.jsxs)(
                        "div",
                        {
                          className:
                            "flex items-center gap-3 p-3 bg-secondary/10 rounded-lg",
                          children: [
                            (0, jsx_runtime_1.jsxs)(avatar_1.Avatar, {
                              className: "h-10 w-10 border-2 border-primary/20",
                              children: [
                                (0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, {
                                  src: message.executive.avatar,
                                  alt: message.executive.name,
                                }),
                                (0, jsx_runtime_1.jsx)(
                                  avatar_1.AvatarFallback,
                                  {
                                    children: message.executive.name.charAt(0),
                                  },
                                ),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)("div", {
                              children: [
                                (0, jsx_runtime_1.jsx)("p", {
                                  className: "font-medium",
                                  children: message.executive.name,
                                }),
                                (0, jsx_runtime_1.jsx)("p", {
                                  className: "text-xs text-muted-foreground",
                                  children:
                                    message.executive.role ||
                                    (0, consultation_1.formatRoleTitle)(
                                      message.executive.role || "",
                                    ),
                                }),
                              ],
                            }),
                          ],
                        },
                        message.executive.name,
                      );
                    }),
                }),
              }),
            ],
          }),
        }),
        (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
          value: "process",
          children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                className: "pb-3",
                children: [
                  (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                    className: "text-xl font-bold",
                    children: "Thinking Process",
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                    children:
                      "How our AI executive team approached the analysis of your business needs",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                children: (0, jsx_runtime_1.jsxs)("div", {
                  className: "space-y-4",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "bg-secondary/10 rounded-lg p-4",
                      children: [
                        (0, jsx_runtime_1.jsxs)("h3", {
                          className: "font-medium mb-2 flex items-center gap-2",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Lightbulb, {
                              className: "h-4 w-4 text-amber-400",
                            }),
                            "Analysis Methodology",
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-sm",
                          children:
                            "Our AI executive team analyzes your business information through multiple perspectives, using industry-specific knowledge and strategic frameworks to provide comprehensive insights.",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "bg-secondary/10 rounded-lg p-4",
                      children: [
                        (0, jsx_runtime_1.jsxs)("h3", {
                          className: "font-medium mb-2 flex items-center gap-2",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Briefcase, {
                              className: "h-4 w-4 text-blue-400",
                            }),
                            "Business Context Integration",
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-sm",
                          children:
                            "The team integrates your specific business context with market trends, competitive analysis, and growth opportunities to create tailored recommendations.",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            ],
          }),
        }),
      ],
    }),
  });
};
exports.default = ExecutiveBoardroom;

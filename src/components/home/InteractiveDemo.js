"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var tabs_1 = require("@/components/ui/tabs");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var framer_motion_1 = require("framer-motion");
var InteractiveDemo = function () {
  var _a = (0, react_1.useState)(1),
    step = _a[0],
    setStep = _a[1];
  var totalSteps = 3;
  var nextStep = function () {
    setStep(function (prev) {
      return prev >= totalSteps ? 1 : prev + 1;
    });
  };
  var fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto px-4 py-12 md:py-16",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "text-center mb-10",
        children: [
          (0, jsx_runtime_1.jsx)("h2", {
            className: "text-3xl md:text-4xl font-bold mb-4",
            children: "See Allora AI in Action",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-muted-foreground max-w-2xl mx-auto",
            children:
              "Experience how our AI executive team transforms your business strategy with real-time insights and actionable recommendations.",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
        defaultValue: "strategy",
        className: "w-full max-w-5xl mx-auto",
        children: [
          (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
            className: "grid w-full grid-cols-4",
            children: [
              (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, {
                value: "strategy",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.BarChart, {
                    className: "h-4 w-4 mr-2",
                  }),
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "hidden sm:inline",
                    children: "Strategy",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, {
                value: "debate",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Users, {
                    className: "h-4 w-4 mr-2",
                  }),
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "hidden sm:inline",
                    children: "AI Boardroom",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, {
                value: "campaigns",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.MessageSquare, {
                    className: "h-4 w-4 mr-2",
                  }),
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "hidden sm:inline",
                    children: "Campaigns",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, {
                value: "insights",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Brain, {
                    className: "h-4 w-4 mr-2",
                  }),
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "hidden sm:inline",
                    children: "Insights",
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className:
              "mt-6 bg-black/5 rounded-xl p-1 sm:p-4 md:p-6 min-h-[400px]",
            children: [
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "strategy",
                className: "mt-0",
                children: (0, jsx_runtime_1.jsx)(card_1.Card, {
                  className: "border-none shadow-none",
                  children: (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                    className: "p-0",
                    children: (0, jsx_runtime_1.jsxs)(
                      framer_motion_1.motion.div,
                      {
                        initial: "hidden",
                        animate: "visible",
                        variants: fadeIn,
                        className: "p-4",
                        children: [
                          step === 1 &&
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "space-y-4",
                              children: [
                                (0, jsx_runtime_1.jsx)("h3", {
                                  className: "text-xl font-bold",
                                  children: "Sample Strategy: Market Expansion",
                                }),
                                (0, jsx_runtime_1.jsx)("p", {
                                  children:
                                    "Our AI has analyzed your industry positioning and identified 3 high-growth market segments that align with your current capabilities.",
                                }),
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className:
                                    "bg-primary/10 p-4 rounded-lg border border-primary/20",
                                  children: [
                                    (0, jsx_runtime_1.jsx)("h4", {
                                      className: "font-medium",
                                      children: "Executive Insight:",
                                    }),
                                    (0, jsx_runtime_1.jsx)("p", {
                                      className: "text-sm italic",
                                      children:
                                        '"With your current cash flow, targeting the enterprise segment would yield 25% higher ROI than consumer markets." - AI Finance Advisor',
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          step === 2 &&
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "space-y-4",
                              children: [
                                (0, jsx_runtime_1.jsx)("h3", {
                                  className: "text-xl font-bold",
                                  children: "Implementation Roadmap",
                                }),
                                (0, jsx_runtime_1.jsx)("p", {
                                  children:
                                    "Your AI executive team has developed a 90-day roadmap for successful implementation:",
                                }),
                                (0, jsx_runtime_1.jsxs)("ul", {
                                  className: "list-disc pl-5 space-y-2",
                                  children: [
                                    (0, jsx_runtime_1.jsx)("li", {
                                      children:
                                        "Week 1-2: Market research validation",
                                    }),
                                    (0, jsx_runtime_1.jsx)("li", {
                                      children:
                                        "Week 3-4: Competitor analysis & positioning",
                                    }),
                                    (0, jsx_runtime_1.jsx)("li", {
                                      children:
                                        "Week 5-8: Initial outreach & lead generation",
                                    }),
                                    (0, jsx_runtime_1.jsx)("li", {
                                      children:
                                        "Week 9-12: Sales enablement & account management",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          step === 3 &&
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "space-y-4",
                              children: [
                                (0, jsx_runtime_1.jsx)("h3", {
                                  className: "text-xl font-bold",
                                  children: "Projected Outcomes",
                                }),
                                (0, jsx_runtime_1.jsx)("p", {
                                  children:
                                    "Based on industry benchmarks and your company profile, our AI projects:",
                                }),
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className: "grid grid-cols-2 gap-4",
                                  children: [
                                    (0, jsx_runtime_1.jsxs)("div", {
                                      className:
                                        "bg-primary/5 p-3 rounded-lg border border-primary/10",
                                      children: [
                                        (0, jsx_runtime_1.jsx)("p", {
                                          className: "text-sm font-medium",
                                          children: "Revenue Growth",
                                        }),
                                        (0, jsx_runtime_1.jsx)("p", {
                                          className:
                                            "text-2xl font-bold text-primary",
                                          children: "+22%",
                                        }),
                                      ],
                                    }),
                                    (0, jsx_runtime_1.jsxs)("div", {
                                      className:
                                        "bg-primary/5 p-3 rounded-lg border border-primary/10",
                                      children: [
                                        (0, jsx_runtime_1.jsx)("p", {
                                          className: "text-sm font-medium",
                                          children: "Customer Acquisition",
                                        }),
                                        (0, jsx_runtime_1.jsx)("p", {
                                          className:
                                            "text-2xl font-bold text-primary",
                                          children: "+15%",
                                        }),
                                      ],
                                    }),
                                    (0, jsx_runtime_1.jsxs)("div", {
                                      className:
                                        "bg-primary/5 p-3 rounded-lg border border-primary/10",
                                      children: [
                                        (0, jsx_runtime_1.jsx)("p", {
                                          className: "text-sm font-medium",
                                          children: "Market Share",
                                        }),
                                        (0, jsx_runtime_1.jsx)("p", {
                                          className:
                                            "text-2xl font-bold text-primary",
                                          children: "+7%",
                                        }),
                                      ],
                                    }),
                                    (0, jsx_runtime_1.jsxs)("div", {
                                      className:
                                        "bg-primary/5 p-3 rounded-lg border border-primary/10",
                                      children: [
                                        (0, jsx_runtime_1.jsx)("p", {
                                          className: "text-sm font-medium",
                                          children: "Customer Retention",
                                        }),
                                        (0, jsx_runtime_1.jsx)("p", {
                                          className:
                                            "text-2xl font-bold text-primary",
                                          children: "+18%",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          (0, jsx_runtime_1.jsx)("div", {
                            className: "flex justify-end mt-6",
                            children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
                              onClick: nextStep,
                              className: "group",
                              children: [
                                "Next ",
                                (0, jsx_runtime_1.jsx)(
                                  lucide_react_1.ChevronRight,
                                  {
                                    className:
                                      "ml-2 h-4 w-4 transition-transform group-hover:translate-x-1",
                                  },
                                ),
                              ],
                            }),
                          }),
                        ],
                      },
                      "strategy-".concat(step),
                    ),
                  }),
                }),
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "debate",
                className: "mt-0",
                children: (0, jsx_runtime_1.jsx)(card_1.Card, {
                  className: "border-none shadow-none",
                  children: (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                    className: "p-4",
                    children: (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-6",
                      children: [
                        (0, jsx_runtime_1.jsx)("h3", {
                          className: "text-xl font-bold",
                          children: "Executive Boardroom Debate",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-muted-foreground",
                          children:
                            "Watch how our AI executives debate the best strategy for your business, considering different perspectives and approaches.",
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "space-y-4",
                          children: [
                            (0, jsx_runtime_1.jsxs)("div", {
                              className:
                                "flex items-start gap-3 bg-blue-50 p-3 rounded-lg",
                              children: [
                                (0, jsx_runtime_1.jsx)("div", {
                                  className:
                                    "h-10 w-10 rounded-full bg-blue-200 flex-shrink-0 flex items-center justify-center",
                                  children: "EB",
                                }),
                                (0, jsx_runtime_1.jsxs)("div", {
                                  children: [
                                    (0, jsx_runtime_1.jsx)("p", {
                                      className: "font-medium",
                                      children: "Elon B, Innovation Advisor",
                                    }),
                                    (0, jsx_runtime_1.jsx)("p", {
                                      className: "text-sm",
                                      children:
                                        '"We should focus on disruptive product innovation to create a new market category."',
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)("div", {
                              className:
                                "flex items-start gap-3 bg-green-50 p-3 rounded-lg",
                              children: [
                                (0, jsx_runtime_1.jsx)("div", {
                                  className:
                                    "h-10 w-10 rounded-full bg-green-200 flex-shrink-0 flex items-center justify-center",
                                  children: "WB",
                                }),
                                (0, jsx_runtime_1.jsxs)("div", {
                                  children: [
                                    (0, jsx_runtime_1.jsx)("p", {
                                      className: "font-medium",
                                      children: "Warren B, Investment Advisor",
                                    }),
                                    (0, jsx_runtime_1.jsx)("p", {
                                      className: "text-sm",
                                      children:
                                        '"I disagree. The ROI on operational efficiency would be 36% higher in the first year."',
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)("div", {
                              className:
                                "flex items-start gap-3 bg-purple-50 p-3 rounded-lg",
                              children: [
                                (0, jsx_runtime_1.jsx)("div", {
                                  className:
                                    "h-10 w-10 rounded-full bg-purple-200 flex-shrink-0 flex items-center justify-center",
                                  children: "SN",
                                }),
                                (0, jsx_runtime_1.jsxs)("div", {
                                  children: [
                                    (0, jsx_runtime_1.jsx)("p", {
                                      className: "font-medium",
                                      children: "Satya N, Strategy Advisor",
                                    }),
                                    (0, jsx_runtime_1.jsx)("p", {
                                      className: "text-sm",
                                      children:
                                        '"Let\'s consider a hybrid approach. We can improve operations while developing our innovation pipeline."',
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          className:
                            "bg-primary/10 p-4 rounded-lg border border-primary/20",
                          children: [
                            (0, jsx_runtime_1.jsx)("h4", {
                              className: "font-medium",
                              children: "Consensus Recommendation:",
                            }),
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-sm",
                              children:
                                "After debate, the executive team recommends a phased approach: first optimize operations (3 months), then invest 25% of savings into product innovation.",
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                }),
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "campaigns",
                className: "mt-0",
                children: (0, jsx_runtime_1.jsx)(card_1.Card, {
                  className: "border-none shadow-none",
                  children: (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                    className: "p-4",
                    children: (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-6",
                      children: [
                        (0, jsx_runtime_1.jsx)("h3", {
                          className: "text-xl font-bold",
                          children: "AI-Generated Marketing Campaigns",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-muted-foreground",
                          children:
                            "Our AI creates ready-to-launch marketing campaigns tailored to your business objectives and target audience.",
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                          children: [
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "border rounded-lg p-4 space-y-3",
                              children: [
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className: "flex items-center space-x-2",
                                  children: [
                                    (0, jsx_runtime_1.jsx)("div", {
                                      className:
                                        "h-8 w-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center",
                                      children: "FB",
                                    }),
                                    (0, jsx_runtime_1.jsx)("h4", {
                                      className: "font-medium",
                                      children: "Facebook Campaign",
                                    }),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsx)("p", {
                                  className: "text-sm",
                                  children:
                                    "Targeted at decision-makers in mid-market companies",
                                }),
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className: "space-y-1 text-sm",
                                  children: [
                                    (0, jsx_runtime_1.jsxs)("p", {
                                      children: [
                                        (0, jsx_runtime_1.jsx)("span", {
                                          className: "font-medium",
                                          children: "Headline:",
                                        }),
                                        ' "Cut Decision Time by 65%"',
                                      ],
                                    }),
                                    (0, jsx_runtime_1.jsxs)("p", {
                                      children: [
                                        (0, jsx_runtime_1.jsx)("span", {
                                          className: "font-medium",
                                          children: "Hook:",
                                        }),
                                        ' "AI that thinks like your best executives"',
                                      ],
                                    }),
                                    (0, jsx_runtime_1.jsxs)("p", {
                                      children: [
                                        (0, jsx_runtime_1.jsx)("span", {
                                          className: "font-medium",
                                          children: "CTA:",
                                        }),
                                        ' "Get Executive Insights Now"',
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "border rounded-lg p-4 space-y-3",
                              children: [
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className: "flex items-center space-x-2",
                                  children: [
                                    (0, jsx_runtime_1.jsx)("div", {
                                      className:
                                        "h-8 w-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center",
                                      children: "LI",
                                    }),
                                    (0, jsx_runtime_1.jsx)("h4", {
                                      className: "font-medium",
                                      children: "LinkedIn Campaign",
                                    }),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsx)("p", {
                                  className: "text-sm",
                                  children:
                                    "Focused on C-suite executives in growing companies",
                                }),
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className: "space-y-1 text-sm",
                                  children: [
                                    (0, jsx_runtime_1.jsxs)("p", {
                                      children: [
                                        (0, jsx_runtime_1.jsx)("span", {
                                          className: "font-medium",
                                          children: "Headline:",
                                        }),
                                        ' "Your AI Executive Team"',
                                      ],
                                    }),
                                    (0, jsx_runtime_1.jsxs)("p", {
                                      children: [
                                        (0, jsx_runtime_1.jsx)("span", {
                                          className: "font-medium",
                                          children: "Hook:",
                                        }),
                                        ' "McKinsey-quality strategies at 1/10th the cost"',
                                      ],
                                    }),
                                    (0, jsx_runtime_1.jsxs)("p", {
                                      children: [
                                        (0, jsx_runtime_1.jsx)("span", {
                                          className: "font-medium",
                                          children: "CTA:",
                                        }),
                                        ' "Transform Your Business"',
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          className:
                            "bg-primary/10 p-4 rounded-lg border border-primary/20",
                          children: [
                            (0, jsx_runtime_1.jsx)("h4", {
                              className: "font-medium",
                              children: "Campaign Performance Projection:",
                            }),
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-sm",
                              children:
                                "Based on your industry and target market, these campaigns are projected to generate 45 qualified leads in the first month with a 12% conversion rate.",
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                }),
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "insights",
                className: "mt-0",
                children: (0, jsx_runtime_1.jsx)(card_1.Card, {
                  className: "border-none shadow-none",
                  children: (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                    className: "p-4",
                    children: (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-6",
                      children: [
                        (0, jsx_runtime_1.jsx)("h3", {
                          className: "text-xl font-bold",
                          children: "AI Business Insights",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-muted-foreground",
                          children:
                            "Our AI analyzes market trends, competitive landscapes, and your business data to generate actionable insights.",
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "space-y-4",
                          children: [
                            (0, jsx_runtime_1.jsxs)("div", {
                              className:
                                "border rounded-lg p-4 bg-gradient-to-r from-primary/5 to-transparent",
                              children: [
                                (0, jsx_runtime_1.jsx)("h4", {
                                  className: "font-medium text-lg",
                                  children: "Market Opportunity Analysis",
                                }),
                                (0, jsx_runtime_1.jsx)("p", {
                                  className: "text-sm mt-2",
                                  children:
                                    "Emerging market segment in [Industry] showing 26% YoY growth with limited competition from established players.",
                                }),
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className: "mt-3 text-sm",
                                  children: [
                                    (0, jsx_runtime_1.jsx)("p", {
                                      className: "font-medium",
                                      children: "Key Insight:",
                                    }),
                                    (0, jsx_runtime_1.jsx)("p", {
                                      className: "italic",
                                      children:
                                        "First-mover advantage can secure 15-20% market share within 12 months if entering with a focused solution.",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)("div", {
                              className:
                                "border rounded-lg p-4 bg-gradient-to-r from-primary/5 to-transparent",
                              children: [
                                (0, jsx_runtime_1.jsx)("h4", {
                                  className: "font-medium text-lg",
                                  children: "Competitive Edge Assessment",
                                }),
                                (0, jsx_runtime_1.jsx)("p", {
                                  className: "text-sm mt-2",
                                  children:
                                    "Analysis of 12 competitors revealed a significant gap in [specific feature/service] that aligns with your core strengths.",
                                }),
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className: "mt-3 text-sm",
                                  children: [
                                    (0, jsx_runtime_1.jsx)("p", {
                                      className: "font-medium",
                                      children: "Key Insight:",
                                    }),
                                    (0, jsx_runtime_1.jsx)("p", {
                                      className: "italic",
                                      children:
                                        "Positioning around this unique value proposition could increase conversion rates by 32% based on industry benchmarks.",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          className:
                            "bg-primary/10 p-4 rounded-lg border border-primary/20",
                          children: [
                            (0, jsx_runtime_1.jsx)("h4", {
                              className: "font-medium",
                              children: "McKinsey-Grade Analysis:",
                            }),
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-sm",
                              children:
                                "Our AI combines data from 50+ industry sources, proprietary algorithms, and benchmarks from 10,000+ companies to deliver insights comparable to top consulting firms.",
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
exports.default = InteractiveDemo;

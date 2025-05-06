"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var DebateSummary = function (_a) {
  var debateTitle = _a.debateTitle,
    onReturnToDebate = _a.onReturnToDebate,
    onExportSummary = _a.onExportSummary,
    onSaveToReports = _a.onSaveToReports;
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            children: "Executive Summary",
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children:
              "AI-generated summary of the key points and decisions from the debate",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        className: "space-y-4",
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "p-4 border rounded-lg bg-muted/50",
          children: [
            (0, jsx_runtime_1.jsx)("h3", {
              className: "text-lg font-medium mb-2",
              children: debateTitle,
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-3",
              children: [
                (0, jsx_runtime_1.jsxs)("p", {
                  children: [
                    "This executive summary provides an overview of the key points discussed during the ",
                    debateTitle,
                    " debate.",
                  ],
                }),
                (0, jsx_runtime_1.jsx)("h4", {
                  className: "font-medium",
                  children: "Key Insights:",
                }),
                (0, jsx_runtime_1.jsxs)("ul", {
                  className: "list-disc pl-5 space-y-1",
                  children: [
                    (0, jsx_runtime_1.jsx)("li", {
                      children:
                        "The CEO emphasized the importance of aligning our strategy with long-term vision and mission.",
                    }),
                    (0, jsx_runtime_1.jsx)("li", {
                      children:
                        "The CFO highlighted the need for careful budgeting and ROI analysis for all initiatives.",
                    }),
                    (0, jsx_runtime_1.jsx)("li", {
                      children:
                        "The CTO suggested leveraging emerging technologies to gain competitive advantage.",
                    }),
                    (0, jsx_runtime_1.jsx)("li", {
                      children:
                        "The CMO stressed the importance of aligning with our brand positioning and customer needs.",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)("h4", {
                  className: "font-medium",
                  children: "Recommendations:",
                }),
                (0, jsx_runtime_1.jsxs)("ul", {
                  className: "list-disc pl-5 space-y-1",
                  children: [
                    (0, jsx_runtime_1.jsx)("li", {
                      children:
                        "Develop a comprehensive roadmap that balances short-term results with long-term goals.",
                    }),
                    (0, jsx_runtime_1.jsx)("li", {
                      children:
                        "Establish clear metrics for measuring success and ROI for all initiatives.",
                    }),
                    (0, jsx_runtime_1.jsx)("li", {
                      children:
                        "Create cross-functional teams to ensure holistic implementation of strategies.",
                    }),
                    (0, jsx_runtime_1.jsx)("li", {
                      children:
                        "Regularly review and adjust approaches based on market feedback and performance data.",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)("h4", {
                  className: "font-medium",
                  children: "Next Steps:",
                }),
                (0, jsx_runtime_1.jsxs)("ol", {
                  className: "list-decimal pl-5 space-y-1",
                  children: [
                    (0, jsx_runtime_1.jsx)("li", {
                      children:
                        "Schedule follow-up meeting to assign action items and responsibilities.",
                    }),
                    (0, jsx_runtime_1.jsx)("li", {
                      children:
                        "Prepare detailed implementation plan with timelines and resource requirements.",
                    }),
                    (0, jsx_runtime_1.jsx)("li", {
                      children:
                        "Develop communication strategy for stakeholders.",
                    }),
                    (0, jsx_runtime_1.jsx)("li", {
                      children:
                        "Set up regular review cycles to track progress and make adjustments.",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
        className: "flex justify-between",
        children: [
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            variant: "outline",
            onClick: onReturnToDebate,
            children: "Return to Debate",
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex space-x-2",
            children: [
              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                variant: "outline",
                onClick: onExportSummary,
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Download, {
                    className: "h-4 w-4 mr-1",
                  }),
                  "Export Summary",
                ],
              }),
              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                onClick: onSaveToReports,
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Save, {
                    className: "h-4 w-4 mr-1",
                  }),
                  "Save to Reports",
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
exports.default = DebateSummary;

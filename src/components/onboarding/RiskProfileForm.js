"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RiskProfileForm;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var radio_group_1 = require("@/components/ui/radio-group");
var label_1 = require("@/components/ui/label");
var lucide_react_1 = require("lucide-react");
function RiskProfileForm(_a) {
  var riskAppetite = _a.riskAppetite,
    setRiskAppetite = _a.setRiskAppetite,
    executiveTeamEnabled = _a.executiveTeamEnabled,
    setExecutiveTeamEnabled = _a.setExecutiveTeamEnabled,
    companyName = _a.companyName;
  var displayCompanyName = companyName || "your company";
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        children: [
          (0, jsx_runtime_1.jsx)("h3", {
            className: "text-lg font-medium",
            children: "Risk Appetite",
          }),
          (0, jsx_runtime_1.jsxs)("p", {
            className: "text-sm text-muted-foreground mt-1",
            children: [
              "Select the risk profile that best matches ",
              displayCompanyName,
              "'s approach to growth.",
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(radio_group_1.RadioGroup, {
        value: riskAppetite,
        onValueChange: function (value) {
          return setRiskAppetite(value);
        },
        className: "grid gap-4",
        children: [
          (0, jsx_runtime_1.jsx)(card_1.Card, {
            className: "border ".concat(
              riskAppetite === "low"
                ? "border-risk-low-DEFAULT"
                : "border-muted",
            ),
            children: (0, jsx_runtime_1.jsx)(card_1.CardContent, {
              className: "pt-4",
              children: (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-start gap-4",
                children: [
                  (0, jsx_runtime_1.jsx)(radio_group_1.RadioGroupItem, {
                    value: "low",
                    id: "risk-low",
                    className: "mt-1",
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "space-y-2",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.ShieldAlert, {
                            className: "h-5 w-5 text-risk-low",
                          }),
                          (0, jsx_runtime_1.jsx)(label_1.Label, {
                            htmlFor: "risk-low",
                            className: "font-medium",
                            children: "Conservative (Low Risk)",
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "text-sm text-muted-foreground pl-7",
                        children: [
                          (0, jsx_runtime_1.jsx)("p", {
                            children:
                              "Prioritize steady, reliable growth with minimal financial risk.",
                          }),
                          (0, jsx_runtime_1.jsx)("p", {
                            className: "mt-1",
                            children:
                              "Focus on proven strategies and consistent results.",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
          }),
          (0, jsx_runtime_1.jsx)(card_1.Card, {
            className: "border ".concat(
              riskAppetite === "medium"
                ? "border-risk-medium-DEFAULT"
                : "border-muted",
            ),
            children: (0, jsx_runtime_1.jsx)(card_1.CardContent, {
              className: "pt-4",
              children: (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-start gap-4",
                children: [
                  (0, jsx_runtime_1.jsx)(radio_group_1.RadioGroupItem, {
                    value: "medium",
                    id: "risk-medium",
                    className: "mt-1",
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "space-y-2",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, {
                            className: "h-5 w-5 text-risk-medium",
                          }),
                          (0, jsx_runtime_1.jsx)(label_1.Label, {
                            htmlFor: "risk-medium",
                            className: "font-medium",
                            children: "Balanced (Moderate Risk)",
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "text-sm text-muted-foreground pl-7",
                        children: [
                          (0, jsx_runtime_1.jsx)("p", {
                            children:
                              "Balance growth opportunities with calculated risks.",
                          }),
                          (0, jsx_runtime_1.jsx)("p", {
                            className: "mt-1",
                            children:
                              "Mix proven strategies with selective innovation.",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
          }),
          (0, jsx_runtime_1.jsx)(card_1.Card, {
            className: "border ".concat(
              riskAppetite === "high"
                ? "border-risk-high-DEFAULT"
                : "border-muted",
            ),
            children: (0, jsx_runtime_1.jsx)(card_1.CardContent, {
              className: "pt-4",
              children: (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-start gap-4",
                children: [
                  (0, jsx_runtime_1.jsx)(radio_group_1.RadioGroupItem, {
                    value: "high",
                    id: "risk-high",
                    className: "mt-1",
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "space-y-2",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.Zap, {
                            className: "h-5 w-5 text-risk-high",
                          }),
                          (0, jsx_runtime_1.jsx)(label_1.Label, {
                            htmlFor: "risk-high",
                            className: "font-medium",
                            children: "Aggressive (High Risk)",
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "text-sm text-muted-foreground pl-7",
                        children: [
                          (0, jsx_runtime_1.jsx)("p", {
                            children:
                              "Prioritize rapid expansion and breakthrough opportunities.",
                          }),
                          (0, jsx_runtime_1.jsx)("p", {
                            className: "mt-1",
                            children:
                              "Embrace innovation and disruptive strategies for maximum growth potential.",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
    ],
  });
}

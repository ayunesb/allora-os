"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiBehaviorSettings = AiBehaviorSettings;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var label_1 = require("@/components/ui/label");
var switch_1 = require("@/components/ui/switch");
var select_1 = require("@/components/ui/select");
var slider_1 = require("@/components/ui/slider");
function AiBehaviorSettings() {
  var _a = (0, react_1.useState)(70),
    creativeThinking = _a[0],
    setCreativeThinking = _a[1];
  var _b = (0, react_1.useState)(50),
    riskTolerance = _b[0],
    setRiskTolerance = _b[1];
  var _c = (0, react_1.useState)(60),
    autonomyLevel = _c[0],
    setAutonomyLevel = _c[1];
  var _d = (0, react_1.useState)(true),
    proactiveAssistance = _d[0],
    setProactiveAssistance = _d[1];
  var _e = (0, react_1.useState)("balanced"),
    executiveModel = _e[0],
    setExecutiveModel = _e[1];
  var _f = (0, react_1.useState)("normal"),
    decisionSpeed = _f[0],
    setDecisionSpeed = _f[1];
  return (0, jsx_runtime_1.jsx)("div", {
    className: "space-y-6",
    children: (0, jsx_runtime_1.jsx)(card_1.Card, {
      children: (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        className: "pt-6",
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "space-y-6",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-2",
              children: [
                (0, jsx_runtime_1.jsx)(label_1.Label, {
                  htmlFor: "executive-model",
                  children: "Executive AI Model",
                }),
                (0, jsx_runtime_1.jsxs)(select_1.Select, {
                  value: executiveModel,
                  onValueChange: setExecutiveModel,
                  children: [
                    (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                      id: "executive-model",
                      children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                        placeholder: "Select model",
                      }),
                    }),
                    (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                      children: [
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "cautious",
                          children: "Cautious",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "balanced",
                          children: "Balanced",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "aggressive",
                          children: "Growth-focused",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "innovative",
                          children: "Innovative",
                        }),
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-sm text-muted-foreground",
                  children: "Determines overall approach to business decisions",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-2",
              children: [
                (0, jsx_runtime_1.jsx)(label_1.Label, {
                  htmlFor: "decision-speed",
                  children: "Decision Speed",
                }),
                (0, jsx_runtime_1.jsxs)(select_1.Select, {
                  value: decisionSpeed,
                  onValueChange: setDecisionSpeed,
                  children: [
                    (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                      id: "decision-speed",
                      children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                        placeholder: "Select speed",
                      }),
                    }),
                    (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                      children: [
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "deliberate",
                          children: "Deliberate",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "normal",
                          children: "Normal",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "fast",
                          children: "Fast",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "immediate",
                          children: "Immediate",
                        }),
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-sm text-muted-foreground",
                  children: "How quickly the AI executive team makes decisions",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-2",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex justify-between",
                  children: [
                    (0, jsx_runtime_1.jsx)(label_1.Label, {
                      htmlFor: "creative-thinking",
                      children: "Creative Thinking",
                    }),
                    (0, jsx_runtime_1.jsxs)("span", {
                      className: "text-sm text-muted-foreground",
                      children: [creativeThinking, "%"],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)(slider_1.Slider, {
                  id: "creative-thinking",
                  min: 0,
                  max: 100,
                  step: 10,
                  value: [creativeThinking],
                  onValueChange: function (values) {
                    return setCreativeThinking(values[0]);
                  },
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-sm text-muted-foreground",
                  children:
                    "Higher values prioritize novel and innovative solutions",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-2",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex justify-between",
                  children: [
                    (0, jsx_runtime_1.jsx)(label_1.Label, {
                      htmlFor: "risk-tolerance",
                      children: "Risk Tolerance",
                    }),
                    (0, jsx_runtime_1.jsxs)("span", {
                      className: "text-sm text-muted-foreground",
                      children: [riskTolerance, "%"],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)(slider_1.Slider, {
                  id: "risk-tolerance",
                  min: 0,
                  max: 100,
                  step: 10,
                  value: [riskTolerance],
                  onValueChange: function (values) {
                    return setRiskTolerance(values[0]);
                  },
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-sm text-muted-foreground",
                  children: "Higher values mean more aggressive strategies",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-2",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex justify-between",
                  children: [
                    (0, jsx_runtime_1.jsx)(label_1.Label, {
                      htmlFor: "autonomy-level",
                      children: "Autonomy Level",
                    }),
                    (0, jsx_runtime_1.jsxs)("span", {
                      className: "text-sm text-muted-foreground",
                      children: [autonomyLevel, "%"],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)(slider_1.Slider, {
                  id: "autonomy-level",
                  min: 0,
                  max: 100,
                  step: 10,
                  value: [autonomyLevel],
                  onValueChange: function (values) {
                    return setAutonomyLevel(values[0]);
                  },
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-sm text-muted-foreground",
                  children:
                    "How independently the AI can make decisions without confirmation",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-center justify-between",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  children: [
                    (0, jsx_runtime_1.jsx)(label_1.Label, {
                      htmlFor: "proactive",
                      className: "mb-1 block",
                      children: "Proactive Assistance",
                    }),
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "text-sm text-muted-foreground",
                      children:
                        "Allow AI to suggest actions without being asked",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                  id: "proactive",
                  checked: proactiveAssistance,
                  onCheckedChange: setProactiveAssistance,
                }),
              ],
            }),
          ],
        }),
      }),
    }),
  });
}

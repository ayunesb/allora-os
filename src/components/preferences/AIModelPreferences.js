"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AIModelPreferences;
var jsx_runtime_1 = require("react/jsx-runtime");
var label_1 = require("@/components/ui/label");
var switch_1 = require("@/components/ui/switch");
var select_1 = require("@/components/ui/select");
var slider_1 = require("@/components/ui/slider");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
function AIModelPreferences(_a) {
  var preferences = _a.preferences,
    updatePreference = _a.updatePreference;
  var handleModelChange = function (value) {
    updatePreference("modelPreference", value);
  };
  var toggleDebate = function (enabled) {
    updatePreference("enableDebate", enabled);
  };
  var toggleVectorSearch = function (enabled) {
    updatePreference("enableVectorSearch", enabled);
  };
  var toggleLearning = function (enabled) {
    updatePreference("enableLearning", enabled);
  };
  var handleParticipantChange = function (value) {
    updatePreference("maxDebateParticipants", value[0]);
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-4",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        children: [
          (0, jsx_runtime_1.jsx)(label_1.Label, {
            htmlFor: "defaultModel",
            children: "AI Model Preference",
          }),
          (0, jsx_runtime_1.jsxs)(select_1.Select, {
            value: preferences.modelPreference || "auto",
            onValueChange: handleModelChange,
            children: [
              (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                id: "defaultModel",
                children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                  placeholder: "Select AI model",
                }),
              }),
              (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                children: [
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "auto",
                    children: "Auto (System Choice)",
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "gpt-4o-mini",
                    children: "OpenAI GPT-4o Mini (Fast)",
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "gpt-4o",
                    children: "OpenAI GPT-4o (Powerful)",
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "claude-3-sonnet-20240229",
                    children: "Anthropic Claude 3 Sonnet",
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "gemini-1.5-pro",
                    children: "Google Gemini 1.5 Pro",
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-sm text-muted-foreground mt-1",
            children: "Select your preferred AI model for generating responses",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.Card, {
        className: "border-dashed",
        children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
          className: "pt-6 space-y-4",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-center justify-between",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "space-y-0.5",
                  children: [
                    (0, jsx_runtime_1.jsxs)(label_1.Label, {
                      htmlFor: "enableDebate",
                      className: "flex items-center gap-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, {
                          className: "h-4 w-4 text-blue-500",
                        }),
                        "Multi-Executive Debate",
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "text-sm text-muted-foreground",
                      children:
                        "Enable executives to debate and provide multiple perspectives",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                  id: "enableDebate",
                  checked: preferences.enableDebate || false,
                  onCheckedChange: toggleDebate,
                }),
              ],
            }),
            preferences.enableDebate &&
              (0, jsx_runtime_1.jsxs)("div", {
                children: [
                  (0, jsx_runtime_1.jsxs)(label_1.Label, {
                    className: "flex items-center gap-2",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Bot, {
                        className: "h-4 w-4 text-violet-500",
                      }),
                      "Maximum Debate Participants",
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "pt-4 pb-2",
                    children: (0, jsx_runtime_1.jsx)(slider_1.Slider, {
                      value: [preferences.maxDebateParticipants || 3],
                      min: 2,
                      max: 5,
                      step: 1,
                      onValueChange: handleParticipantChange,
                    }),
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className:
                      "flex justify-between text-xs text-muted-foreground",
                    children: [
                      (0, jsx_runtime_1.jsx)("span", { children: "2" }),
                      (0, jsx_runtime_1.jsx)("span", { children: "3" }),
                      (0, jsx_runtime_1.jsx)("span", { children: "4" }),
                      (0, jsx_runtime_1.jsx)("span", { children: "5" }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-sm text-muted-foreground mt-2",
                    children:
                      "Number of executives that can participate in a debate",
                  }),
                ],
              }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-center justify-between pt-2",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "space-y-0.5",
                  children: [
                    (0, jsx_runtime_1.jsxs)(label_1.Label, {
                      htmlFor: "enableMemory",
                      className: "flex items-center gap-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.Database, {
                          className: "h-4 w-4 text-green-500",
                        }),
                        "AI Memory & Vector Search",
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "text-sm text-muted-foreground",
                      children:
                        "Allow AI to remember previous conversations and use them for context",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                  id: "enableMemory",
                  checked: preferences.enableVectorSearch || false,
                  onCheckedChange: toggleVectorSearch,
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-center justify-between pt-2",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "space-y-0.5",
                  children: [
                    (0, jsx_runtime_1.jsxs)(label_1.Label, {
                      htmlFor: "enableLearning",
                      className: "flex items-center gap-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.Brain, {
                          className: "h-4 w-4 text-amber-500",
                        }),
                        "Learning from Feedback",
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "text-sm text-muted-foreground",
                      children:
                        "Enable AI to learn from your feedback to improve future responses",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                  id: "enableLearning",
                  checked: preferences.enableLearning || false,
                  onCheckedChange: toggleLearning,
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}

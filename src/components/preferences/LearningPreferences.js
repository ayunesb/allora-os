"use strict";
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LearningPreferences;
var jsx_runtime_1 = require("react/jsx-runtime");
var label_1 = require("@/components/ui/label");
var switch_1 = require("@/components/ui/switch");
var slider_1 = require("@/components/ui/slider");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var checkbox_1 = require("@/components/ui/checkbox");
function LearningPreferences(_a) {
  var preferences = _a.preferences,
    updatePreference = _a.updatePreference;
  var handleLearningRateChange = function (value) {
    updatePreference("learningRate", value[0]);
  };
  var toggleFeedbackLearning = function (enabled) {
    updatePreference("enableFeedbackLearning", enabled);
  };
  var toggleAutomaticResearch = function (enabled) {
    updatePreference("enableAutomaticResearch", enabled);
  };
  var toggleContentAnalysis = function (enabled) {
    updatePreference("enableContentAnalysis", enabled);
  };
  var toggleKnowledgeAreas = function (area, checked) {
    var currentAreas = preferences.knowledgeAreas || [];
    var newAreas;
    if (checked) {
      newAreas = __spreadArray(
        __spreadArray([], currentAreas, true),
        [area],
        false,
      );
    } else {
      newAreas = currentAreas.filter(function (a) {
        return a !== area;
      });
    }
    updatePreference("knowledgeAreas", newAreas);
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        children: [
          (0, jsx_runtime_1.jsxs)(label_1.Label, {
            className: "flex items-center gap-2 mb-3",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Brain, {
                className: "h-4 w-4 text-violet-500",
              }),
              "Learning Capabilities",
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
                          htmlFor: "enableFeedbackLearning",
                          className: "flex items-center gap-2",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.LineChart, {
                              className: "h-4 w-4 text-green-500",
                            }),
                            "Learn from Your Feedback",
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-sm text-muted-foreground",
                          children:
                            "Allow AI to adjust responses based on your likes and dislikes",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                      id: "enableFeedbackLearning",
                      checked: preferences.enableFeedbackLearning || false,
                      onCheckedChange: toggleFeedbackLearning,
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  children: [
                    (0, jsx_runtime_1.jsxs)(label_1.Label, {
                      className: "flex items-center gap-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.BookOpen, {
                          className: "h-4 w-4 text-amber-500",
                        }),
                        "Learning Rate",
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)("div", {
                      className: "pt-4 pb-2",
                      children: (0, jsx_runtime_1.jsx)(slider_1.Slider, {
                        value: [preferences.learningRate || 0.5],
                        min: 0.1,
                        max: 1.0,
                        step: 0.1,
                        onValueChange: handleLearningRateChange,
                      }),
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className:
                        "flex justify-between text-xs text-muted-foreground",
                      children: [
                        (0, jsx_runtime_1.jsx)("span", {
                          children: "Conservative",
                        }),
                        (0, jsx_runtime_1.jsx)("span", {
                          children: "Balanced",
                        }),
                        (0, jsx_runtime_1.jsx)("span", {
                          children: "Aggressive",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "text-sm text-muted-foreground mt-2",
                      children: "How quickly the AI adapts to your preferences",
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
                          htmlFor: "enableAutomaticResearch",
                          className: "flex items-center gap-2",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Globe, {
                              className: "h-4 w-4 text-blue-500",
                            }),
                            "Automatic Research",
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-sm text-muted-foreground",
                          children:
                            "Allow AI to search for up-to-date information on topics",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                      id: "enableAutomaticResearch",
                      checked: preferences.enableAutomaticResearch || false,
                      onCheckedChange: toggleAutomaticResearch,
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
                          htmlFor: "enableContentAnalysis",
                          className: "flex items-center gap-2",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.History, {
                              className: "h-4 w-4 text-indigo-500",
                            }),
                            "Content Analysis",
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-sm text-muted-foreground",
                          children:
                            "Enable analysis of your documents and past conversations",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                      id: "enableContentAnalysis",
                      checked: preferences.enableContentAnalysis || false,
                      onCheckedChange: toggleContentAnalysis,
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        children: [
          (0, jsx_runtime_1.jsx)(label_1.Label, {
            className: "flex items-center gap-2 mb-3",
            children: "Knowledge Areas to Prioritize",
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "grid grid-cols-2 gap-4",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-start space-x-2",
                children: [
                  (0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, {
                    id: "business",
                    checked: (preferences.knowledgeAreas || []).includes(
                      "business",
                    ),
                    onCheckedChange: function (checked) {
                      return toggleKnowledgeAreas("business", checked);
                    },
                  }),
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "grid gap-1.5 leading-none",
                    children: (0, jsx_runtime_1.jsx)(label_1.Label, {
                      htmlFor: "business",
                      className:
                        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                      children: "Business Strategy",
                    }),
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-start space-x-2",
                children: [
                  (0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, {
                    id: "technology",
                    checked: (preferences.knowledgeAreas || []).includes(
                      "technology",
                    ),
                    onCheckedChange: function (checked) {
                      return toggleKnowledgeAreas("technology", checked);
                    },
                  }),
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "grid gap-1.5 leading-none",
                    children: (0, jsx_runtime_1.jsx)(label_1.Label, {
                      htmlFor: "technology",
                      className:
                        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                      children: "Technology Trends",
                    }),
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-start space-x-2",
                children: [
                  (0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, {
                    id: "marketing",
                    checked: (preferences.knowledgeAreas || []).includes(
                      "marketing",
                    ),
                    onCheckedChange: function (checked) {
                      return toggleKnowledgeAreas("marketing", checked);
                    },
                  }),
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "grid gap-1.5 leading-none",
                    children: (0, jsx_runtime_1.jsx)(label_1.Label, {
                      htmlFor: "marketing",
                      className:
                        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                      children: "Marketing & Sales",
                    }),
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-start space-x-2",
                children: [
                  (0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, {
                    id: "innovation",
                    checked: (preferences.knowledgeAreas || []).includes(
                      "innovation",
                    ),
                    onCheckedChange: function (checked) {
                      return toggleKnowledgeAreas("innovation", checked);
                    },
                  }),
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "grid gap-1.5 leading-none",
                    children: (0, jsx_runtime_1.jsx)(label_1.Label, {
                      htmlFor: "innovation",
                      className:
                        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                      children: "Innovation Research",
                    }),
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-start space-x-2",
                children: [
                  (0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, {
                    id: "finance",
                    checked: (preferences.knowledgeAreas || []).includes(
                      "finance",
                    ),
                    onCheckedChange: function (checked) {
                      return toggleKnowledgeAreas("finance", checked);
                    },
                  }),
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "grid gap-1.5 leading-none",
                    children: (0, jsx_runtime_1.jsx)(label_1.Label, {
                      htmlFor: "finance",
                      className:
                        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                      children: "Finance & Investment",
                    }),
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-start space-x-2",
                children: [
                  (0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, {
                    id: "operations",
                    checked: (preferences.knowledgeAreas || []).includes(
                      "operations",
                    ),
                    onCheckedChange: function (checked) {
                      return toggleKnowledgeAreas("operations", checked);
                    },
                  }),
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "grid gap-1.5 leading-none",
                    children: (0, jsx_runtime_1.jsx)(label_1.Label, {
                      htmlFor: "operations",
                      className:
                        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                      children: "Operations & Logistics",
                    }),
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

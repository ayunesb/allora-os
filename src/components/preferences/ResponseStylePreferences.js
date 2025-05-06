"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ResponseStylePreferences;
var jsx_runtime_1 = require("react/jsx-runtime");
var label_1 = require("@/components/ui/label");
var radio_group_1 = require("@/components/ui/radio-group");
var switch_1 = require("@/components/ui/switch");
var select_1 = require("@/components/ui/select");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
function ResponseStylePreferences(_a) {
  var preferences = _a.preferences,
    updatePreference = _a.updatePreference;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        children: [
          (0, jsx_runtime_1.jsxs)(label_1.Label, {
            className: "flex items-center gap-2 mb-3",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.MessageSquare, {
                className: "h-4 w-4 text-blue-500",
              }),
              "Response Style",
            ],
          }),
          (0, jsx_runtime_1.jsxs)(radio_group_1.RadioGroup, {
            value: preferences.responseStyle || "balanced",
            onValueChange: function (value) {
              return updatePreference("responseStyle", value);
            },
            className: "space-y-3",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-start space-x-2",
                children: [
                  (0, jsx_runtime_1.jsx)(radio_group_1.RadioGroupItem, {
                    value: "concise",
                    id: "concise",
                    className: "mt-1",
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "grid gap-1.5",
                    children: [
                      (0, jsx_runtime_1.jsx)(label_1.Label, {
                        htmlFor: "concise",
                        className: "font-medium",
                        children: "Concise",
                      }),
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "text-sm text-muted-foreground",
                        children:
                          "Brief, to-the-point responses focusing on key information only",
                      }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-start space-x-2",
                children: [
                  (0, jsx_runtime_1.jsx)(radio_group_1.RadioGroupItem, {
                    value: "balanced",
                    id: "balanced",
                    className: "mt-1",
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "grid gap-1.5",
                    children: [
                      (0, jsx_runtime_1.jsx)(label_1.Label, {
                        htmlFor: "balanced",
                        className: "font-medium",
                        children: "Balanced",
                      }),
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "text-sm text-muted-foreground",
                        children:
                          "Moderate level of detail with a good mix of information and brevity",
                      }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-start space-x-2",
                children: [
                  (0, jsx_runtime_1.jsx)(radio_group_1.RadioGroupItem, {
                    value: "detailed",
                    id: "detailed",
                    className: "mt-1",
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "grid gap-1.5",
                    children: [
                      (0, jsx_runtime_1.jsx)(label_1.Label, {
                        htmlFor: "detailed",
                        className: "font-medium",
                        children: "Detailed",
                      }),
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "text-sm text-muted-foreground",
                        children:
                          "Comprehensive responses with thorough explanations and examples",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.Card, {
        className: "border-dashed",
        children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
          className: "pt-6 space-y-4",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsxs)(label_1.Label, {
                  htmlFor: "technicalLevel",
                  className: "flex items-center gap-2 mb-2",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Book, {
                      className: "h-4 w-4 text-purple-500",
                    }),
                    "Technical Level",
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(select_1.Select, {
                  value: preferences.technicalLevel || "intermediate",
                  onValueChange: function (value) {
                    return updatePreference("technicalLevel", value);
                  },
                  children: [
                    (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                      id: "technicalLevel",
                      children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                        placeholder: "Select technical level",
                      }),
                    }),
                    (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                      children: [
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "basic",
                          children: "Basic (Simplified Explanations)",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "intermediate",
                          children: "Intermediate (Balanced)",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "advanced",
                          children: "Advanced (Technical Details)",
                        }),
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-sm text-muted-foreground mt-1",
                  children:
                    "Choose how technical you want the AI to be in its responses",
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
                      htmlFor: "showSources",
                      className: "flex items-center gap-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.ListChecks, {
                          className: "h-4 w-4 text-green-500",
                        }),
                        "Show Sources & References",
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "text-sm text-muted-foreground",
                      children:
                        "Include citations and reference information in responses",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                  id: "showSources",
                  checked: preferences.showSources || false,
                  onCheckedChange: function (checked) {
                    return updatePreference("showSources", checked);
                  },
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsxs)(label_1.Label, {
                  htmlFor: "focusArea",
                  className: "flex items-center gap-2 mb-2",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Target, {
                      className: "h-4 w-4 text-red-500",
                    }),
                    "Focus Area",
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(select_1.Select, {
                  value: preferences.focusArea || "general",
                  onValueChange: function (value) {
                    return updatePreference("focusArea", value);
                  },
                  children: [
                    (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                      id: "focusArea",
                      children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                        placeholder: "Select focus area",
                      }),
                    }),
                    (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                      children: [
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "general",
                          children: "General Business",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "strategy",
                          children: "Strategy & Planning",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "marketing",
                          children: "Marketing & Sales",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "operations",
                          children: "Operations & Execution",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "technology",
                          children: "Technology & Innovation",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "finance",
                          children: "Finance & Investment",
                        }),
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-sm text-muted-foreground mt-1",
                  children:
                    "Prioritize which area executives should focus their expertise on",
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}

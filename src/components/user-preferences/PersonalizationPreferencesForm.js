"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalizationPreferencesForm = PersonalizationPreferencesForm;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var select_1 = require("@/components/ui/select");
var useUserPreferences_1 = require("@/hooks/useUserPreferences");
function PersonalizationPreferencesForm() {
  var _a = (0, useUserPreferences_1.useUserPreferences)(),
    preferences = _a.preferences,
    updatePreference = _a.updatePreference,
    isLoading = _a.isLoading;
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            children: "AI Personalization",
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children:
              "Customize how your AI executives communicate and make decisions",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        className: "space-y-4",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsx)("label", {
                className: "block text-sm font-medium mb-2",
                children: "Writing Style",
              }),
              (0, jsx_runtime_1.jsxs)(select_1.Select, {
                value: preferences.writingStyle || "Formal",
                onValueChange: function (value) {
                  return updatePreference("writingStyle", value);
                },
                disabled: isLoading,
                children: [
                  (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                    children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                      placeholder: "Select writing style",
                    }),
                  }),
                  (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                    children: [
                      (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                        value: "Casual",
                        children: "Casual",
                      }),
                      (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                        value: "Formal",
                        children: "Formal",
                      }),
                      (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                        value: "Visionary",
                        children: "Visionary",
                      }),
                      (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                        value: "Strategic",
                        children: "Strategic",
                      }),
                      (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                        value: "Aggressive",
                        children: "Aggressive",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsx)("label", {
                className: "block text-sm font-medium mb-2",
                children: "Tone",
              }),
              (0, jsx_runtime_1.jsxs)(select_1.Select, {
                value: preferences.tone || "Confident",
                onValueChange: function (value) {
                  return updatePreference("tone", value);
                },
                disabled: isLoading,
                children: [
                  (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                    children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                      placeholder: "Select tone",
                    }),
                  }),
                  (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                    children: [
                      (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                        value: "Friendly",
                        children: "Friendly",
                      }),
                      (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                        value: "Confident",
                        children: "Confident",
                      }),
                      (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                        value: "Direct",
                        children: "Direct",
                      }),
                      (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                        value: "Inspiring",
                        children: "Inspiring",
                      }),
                    ],
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

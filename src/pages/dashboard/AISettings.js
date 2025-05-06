"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AISettings;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var tabs_1 = require("@/components/ui/tabs");
var react_helmet_async_1 = require("react-helmet-async");
var AiPreferencesForm_1 = require("@/components/ai/AiPreferencesForm");
var AiBehaviorSettings_1 = require("@/components/ai/AiBehaviorSettings");
var ModelPreferences_1 = require("@/components/ai-settings/ModelPreferences");
var LearningSettings_1 = require("@/components/ai-settings/LearningSettings");
var lucide_react_1 = require("lucide-react");
var PageTitle_1 = require("@/components/PageTitle");
function AISettings() {
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto py-6 space-y-6",
    children: [
      (0, jsx_runtime_1.jsx)(react_helmet_async_1.Helmet, {
        children: (0, jsx_runtime_1.jsx)("title", {
          children: "AI Settings | Allora AI",
        }),
      }),
      (0, jsx_runtime_1.jsx)(PageTitle_1.PageTitle, {
        title: "AI Settings & Preferences",
        description:
          "Customize how the AI executive team behaves and makes decisions",
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "flex items-center space-x-2",
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.Settings, {
              className: "h-5 w-5 text-primary",
            }),
            (0, jsx_runtime_1.jsx)("span", { children: "AI Control Center" }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        className: "w-full",
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                children: "AI Executive Settings",
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children:
                  "Configure how your AI executives analyze and generate business strategies",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            children: (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
              defaultValue: "behavior",
              className: "w-full",
              children: [
                (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
                  className: "grid w-full grid-cols-2 md:grid-cols-4",
                  children: [
                    (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                      value: "behavior",
                      children: "Behavior",
                    }),
                    (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                      value: "preferences",
                      children: "Preferences",
                    }),
                    (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                      value: "models",
                      children: "AI Models",
                    }),
                    (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                      value: "learning",
                      children: "Learning",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                  value: "behavior",
                  className: "py-4",
                  children: (0, jsx_runtime_1.jsx)(
                    AiBehaviorSettings_1.AiBehaviorSettings,
                    {},
                  ),
                }),
                (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                  value: "preferences",
                  className: "py-4",
                  children: (0, jsx_runtime_1.jsx)(
                    AiPreferencesForm_1.AIPreferencesForm,
                    {},
                  ),
                }),
                (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                  value: "models",
                  className: "py-4",
                  children: (0, jsx_runtime_1.jsx)(
                    ModelPreferences_1.ModelPreferences,
                    {},
                  ),
                }),
                (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                  value: "learning",
                  className: "py-4",
                  children: (0, jsx_runtime_1.jsx)(
                    LearningSettings_1.LearningSettings,
                    {},
                  ),
                }),
              ],
            }),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            children: [
              (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                className: "flex items-center gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.BookOpen, {
                    className: "h-5 w-5",
                  }),
                  "AI Learning Documentation",
                ],
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children:
                  "Learn more about how the AI executives learn and adapt to your business needs",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "prose",
              children: [
                (0, jsx_runtime_1.jsx)("p", {
                  children:
                    "Our AI executives continually learn from your feedback and interactions. The more you engage with them, the better they'll understand your business needs and goals.",
                }),
                (0, jsx_runtime_1.jsx)("h4", {
                  children: "Key learning mechanisms:",
                }),
                (0, jsx_runtime_1.jsxs)("ul", {
                  children: [
                    (0, jsx_runtime_1.jsx)("li", {
                      children: "Direct feedback on recommendations",
                    }),
                    (0, jsx_runtime_1.jsx)("li", {
                      children: "Strategy implementation tracking",
                    }),
                    (0, jsx_runtime_1.jsx)("li", {
                      children: "Business outcome correlation",
                    }),
                    (0, jsx_runtime_1.jsx)("li", {
                      children: "Industry pattern recognition",
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
    ],
  });
}

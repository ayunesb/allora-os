"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var switch_1 = require("@/components/ui/switch");
var label_1 = require("@/components/ui/label");
var separator_1 = require("@/components/ui/separator");
var slider_1 = require("@/components/ui/slider");
var BotSettingsPanel = function (_a) {
  var botId = _a.botId,
    bot = _a.bot,
    onSettingChange = _a.onSettingChange;
  var settings = (bot === null || bot === void 0 ? void 0 : bot.settings) || {
    autoRespond: false,
    proactiveInsights: true,
    responseLength: 50,
    creativityLevel: 70,
  };
  var handleToggleChange = function (setting, checked) {
    if (onSettingChange) {
      onSettingChange(setting, checked);
    }
  };
  var handleSliderChange = function (setting, value) {
    if (onSettingChange) {
      onSettingChange(setting, value[0]);
    }
  };
  return (0, jsx_runtime_1.jsx)(card_1.Card, {
    className: "h-full",
    children: (0, jsx_runtime_1.jsx)(card_1.CardContent, {
      className: "pt-6 space-y-6",
      children: (0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-4",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex justify-between items-center",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-0.5",
                children: [
                  (0, jsx_runtime_1.jsx)(label_1.Label, {
                    htmlFor: "auto-respond",
                    children: "Automatic Responses",
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-sm text-muted-foreground",
                    children:
                      "Allow this bot to respond proactively to relevant discussions",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                id: "auto-respond",
                checked: settings.autoRespond,
                onCheckedChange: function (checked) {
                  return handleToggleChange("autoRespond", checked);
                },
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(separator_1.Separator, {}),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex justify-between items-center",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-0.5",
                children: [
                  (0, jsx_runtime_1.jsx)(label_1.Label, {
                    htmlFor: "proactive-insights",
                    children: "Proactive Insights",
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-sm text-muted-foreground",
                    children:
                      "Let the bot suggest ideas based on your company data",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                id: "proactive-insights",
                checked: settings.proactiveInsights,
                onCheckedChange: function (checked) {
                  return handleToggleChange("proactiveInsights", checked);
                },
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(separator_1.Separator, {}),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-4",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-1.5",
                children: [
                  (0, jsx_runtime_1.jsx)(label_1.Label, {
                    children: "Response Length",
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-sm text-muted-foreground",
                    children: "Controls how detailed the responses will be",
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "pt-2",
                    children: [
                      (0, jsx_runtime_1.jsx)(slider_1.Slider, {
                        defaultValue: [settings.responseLength || 50],
                        max: 100,
                        step: 10,
                        onValueChange: function (value) {
                          return handleSliderChange("responseLength", value);
                        },
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className:
                          "flex justify-between mt-1 text-xs text-muted-foreground",
                        children: [
                          (0, jsx_runtime_1.jsx)("span", {
                            children: "Concise",
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            children: "Detailed",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-1.5 pt-2",
                children: [
                  (0, jsx_runtime_1.jsx)(label_1.Label, {
                    children: "Creativity Level",
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-sm text-muted-foreground",
                    children:
                      "Controls how creative versus factual the responses will be",
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "pt-2",
                    children: [
                      (0, jsx_runtime_1.jsx)(slider_1.Slider, {
                        defaultValue: [settings.creativityLevel || 70],
                        max: 100,
                        step: 10,
                        onValueChange: function (value) {
                          return handleSliderChange("creativityLevel", value);
                        },
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className:
                          "flex justify-between mt-1 text-xs text-muted-foreground",
                        children: [
                          (0, jsx_runtime_1.jsx)("span", {
                            children: "Factual",
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            children: "Creative",
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
      }),
    }),
  });
};
exports.default = BotSettingsPanel;

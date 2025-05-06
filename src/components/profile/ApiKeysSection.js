"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var APIKeyInput_1 = require("@/components/admin/APIKeyInput");
var ApiKeysSection = function (_a) {
  var personalApiKeys = _a.personalApiKeys,
    handleApiKeyChange = _a.handleApiKeyChange;
  var _b = (0, react_1.useState)(false),
    showApiSection = _b[0],
    setShowApiSection = _b[1];
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-4",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex justify-between items-center",
        children: [
          (0, jsx_runtime_1.jsxs)("h3", {
            className: "text-lg font-medium flex items-center gap-2",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Key, {
                className: "h-5 w-5",
              }),
              "Personal API Keys",
            ],
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: function () {
              return setShowApiSection(!showApiSection);
            },
            children: [
              showApiSection
                ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.EyeOff, {
                        className: "h-4 w-4 mr-2",
                      }),
                      "Hide",
                    ],
                  })
                : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Eye, {
                        className: "h-4 w-4 mr-2",
                      }),
                      "Show",
                    ],
                  }),
              " API Keys",
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)("p", {
        className: "text-sm text-muted-foreground",
        children:
          "Add your personal API keys to use instead of company-wide keys. These keys will override company keys for your account only.",
      }),
      showApiSection &&
        (0, jsx_runtime_1.jsxs)("div", {
          className: "space-y-4 p-4 border rounded-md bg-muted/30",
          children: [
            (0, jsx_runtime_1.jsx)(APIKeyInput_1.default, {
              id: "stripe-key",
              label: "Stripe API Key",
              value: personalApiKeys.stripe,
              onChange: function (value) {
                return handleApiKeyChange("stripe", value);
              },
              placeholder: "Enter your Stripe API key",
            }),
            (0, jsx_runtime_1.jsx)(APIKeyInput_1.default, {
              id: "twilio-sid",
              label: "Twilio SID",
              value: personalApiKeys.twilio_sid,
              onChange: function (value) {
                return handleApiKeyChange("twilio_sid", value);
              },
              placeholder: "Enter your Twilio SID",
            }),
            (0, jsx_runtime_1.jsx)(APIKeyInput_1.default, {
              id: "twilio-token",
              label: "Twilio Auth Token",
              value: personalApiKeys.twilio_token,
              onChange: function (value) {
                return handleApiKeyChange("twilio_token", value);
              },
              placeholder: "Enter your Twilio auth token",
            }),
            (0, jsx_runtime_1.jsx)(APIKeyInput_1.default, {
              id: "heygen-key",
              label: "HeyGen API Key",
              value: personalApiKeys.heygen,
              onChange: function (value) {
                return handleApiKeyChange("heygen", value);
              },
              placeholder: "Enter your HeyGen API key",
            }),
            (0, jsx_runtime_1.jsx)("p", {
              className: "text-xs text-muted-foreground mt-2",
              children:
                "These keys are stored securely and used only for your account.",
            }),
          ],
        }),
    ],
  });
};
exports.default = ApiKeysSection;

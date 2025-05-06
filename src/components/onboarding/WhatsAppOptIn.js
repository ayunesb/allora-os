"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppOptIn = WhatsAppOptIn;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var checkbox_1 = require("@/components/ui/checkbox");
var label_1 = require("@/components/ui/label");
var lucide_react_1 = require("lucide-react");
function WhatsAppOptIn(_a) {
  var onOptInChange = _a.onOptInChange,
    _b = _a.initialValue,
    initialValue = _b === void 0 ? false : _b;
  var _c = (0, react_1.useState)(initialValue),
    optedIn = _c[0],
    setOptedIn = _c[1];
  var handleChange = function (checked) {
    setOptedIn(checked);
    onOptInChange(checked);
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "border shadow-sm",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            className: "text-lg",
            children: "WhatsApp Communication",
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children:
              "Receive AI-powered guidance and updates directly via WhatsApp",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "flex items-start space-x-4",
          children: [
            (0, jsx_runtime_1.jsx)("div", {
              className: "bg-primary/10 rounded-full p-2 mt-1",
              children: (0, jsx_runtime_1.jsx)(lucide_react_1.Info, {
                className: "h-5 w-5 text-primary",
              }),
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-3",
              children: [
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-sm",
                  children:
                    "Our AI executive team can send personalized business recommendations, marketing campaigns, and strategic advice directly to your WhatsApp. All messages are human-like and tailored to your business needs.",
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex items-center space-x-2",
                  children: [
                    (0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, {
                      id: "whatsapp-opt-in",
                      checked: optedIn,
                      onCheckedChange: handleChange,
                    }),
                    (0, jsx_runtime_1.jsx)(label_1.Label, {
                      htmlFor: "whatsapp-opt-in",
                      className: "text-sm font-medium",
                      children:
                        "Yes, I want to receive AI business guidance via WhatsApp",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("p", {
                  className: "text-xs text-muted-foreground",
                  children: [
                    "You can opt-out anytime by replying STOP to any message. We respect your privacy and comply with all WhatsApp Business messaging policies. See our ",
                    (0, jsx_runtime_1.jsx)("a", {
                      href: "#",
                      className: "text-primary hover:underline",
                      children: "Privacy Policy",
                    }),
                    " for details.",
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
        className: "bg-muted/50 px-6 py-3 text-xs text-muted-foreground",
        children:
          "Only pre-approved message templates will be used outside the 24-hour conversation window.",
      }),
    ],
  });
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NotificationsTab;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var switch_1 = require("@/components/ui/switch");
var separator_1 = require("@/components/ui/separator");
var sonner_1 = require("sonner");
var lucide_react_1 = require("lucide-react");
function NotificationsTab() {
  var handleNotificationToggle = function (type, value) {
    sonner_1.toast.success(
      "".concat(type, " notifications ").concat(value ? "enabled" : "disabled"),
    );
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            children: "Notification Preferences",
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children: "Manage how you receive notifications",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        className: "space-y-6",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex items-center justify-between py-3",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center space-x-4",
                children: [
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "p-2 bg-primary/10 rounded-full",
                    children: (0, jsx_runtime_1.jsx)(lucide_react_1.Mail, {
                      className: "h-5 w-5 text-primary",
                    }),
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    children: [
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "font-medium",
                        children: "Email Notifications",
                      }),
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "text-sm text-muted-foreground",
                        children: "Receive updates and alerts via email",
                      }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                onCheckedChange: function (checked) {
                  return handleNotificationToggle("Email", checked);
                },
                defaultChecked: true,
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(separator_1.Separator, {}),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex items-center justify-between py-3",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center space-x-4",
                children: [
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "p-2 bg-primary/10 rounded-full",
                    children: (0, jsx_runtime_1.jsx)(lucide_react_1.BellRing, {
                      className: "h-5 w-5 text-primary",
                    }),
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    children: [
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "font-medium",
                        children: "Push Notifications",
                      }),
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "text-sm text-muted-foreground",
                        children: "Receive in-app notifications",
                      }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                onCheckedChange: function (checked) {
                  return handleNotificationToggle("Push", checked);
                },
                defaultChecked: true,
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(separator_1.Separator, {}),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex items-center justify-between py-3",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center space-x-4",
                children: [
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "p-2 bg-primary/10 rounded-full",
                    children: (0, jsx_runtime_1.jsx)(lucide_react_1.Phone, {
                      className: "h-5 w-5 text-primary",
                    }),
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    children: [
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "font-medium",
                        children: "SMS Notifications",
                      }),
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "text-sm text-muted-foreground",
                        children: "Receive important alerts via text message",
                      }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                onCheckedChange: function (checked) {
                  return handleNotificationToggle("SMS", checked);
                },
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(separator_1.Separator, {}),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex items-center justify-between py-3",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center space-x-4",
                children: [
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "p-2 bg-primary/10 rounded-full",
                    children: (0, jsx_runtime_1.jsx)(
                      lucide_react_1.MessageSquare,
                      { className: "h-5 w-5 text-primary" },
                    ),
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    children: [
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "font-medium",
                        children: "Team Mentions",
                      }),
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "text-sm text-muted-foreground",
                        children: "Get notified when someone mentions you",
                      }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                onCheckedChange: function (checked) {
                  return handleNotificationToggle("Team Mentions", checked);
                },
                defaultChecked: true,
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(separator_1.Separator, {}),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex items-center justify-between py-3",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center space-x-4",
                children: [
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "p-2 bg-primary/10 rounded-full",
                    children: (0, jsx_runtime_1.jsx)(lucide_react_1.Globe, {
                      className: "h-5 w-5 text-primary",
                    }),
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    children: [
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "font-medium",
                        children: "Marketing Updates",
                      }),
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "text-sm text-muted-foreground",
                        children:
                          "Receive updates about new features and promotions",
                      }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                onCheckedChange: function (checked) {
                  return handleNotificationToggle("Marketing", checked);
                },
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
        children: (0, jsx_runtime_1.jsx)(button_1.Button, {
          className: "w-full",
          children: "Save Notification Preferences",
        }),
      }),
    ],
  });
}

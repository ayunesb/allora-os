"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var label_1 = require("@/components/ui/label");
var switch_1 = require("@/components/ui/switch");
var NotificationsTab = function () {
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            children: "Notification Preferences",
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children: "Configure system notifications",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        className: "space-y-6",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex items-center justify-between",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-0.5",
                children: [
                  (0, jsx_runtime_1.jsx)(label_1.Label, {
                    htmlFor: "email-notifications",
                    children: "Email Notifications",
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-sm text-muted-foreground",
                    children: "Send email for important system events",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                id: "email-notifications",
                defaultChecked: true,
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex items-center justify-between",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-0.5",
                children: [
                  (0, jsx_runtime_1.jsx)(label_1.Label, {
                    htmlFor: "sms-notifications",
                    children: "SMS Notifications",
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-sm text-muted-foreground",
                    children: "Send text messages for critical alerts",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                id: "sms-notifications",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            children: "Save Notification Settings",
          }),
        ],
      }),
    ],
  });
};
exports.default = NotificationsTab;

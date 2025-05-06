"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AdminSettings;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var typography_1 = require("@/components/ui/typography");
var tabs_1 = require("@/components/ui/tabs");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var switch_1 = require("@/components/ui/switch");
function AdminSettings() {
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto px-4 py-6 space-y-6",
    children: [
      (0, jsx_runtime_1.jsx)(typography_1.TypographyH1, {
        children: "Admin Settings",
      }),
      (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
        defaultValue: "general",
        className: "w-full",
        children: [
          (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
            className: "grid w-full max-w-md grid-cols-3 mb-4",
            children: [
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "general",
                children: "General",
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "security",
                children: "Security",
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "advanced",
                children: "Advanced",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "general",
            children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
              children: [
                (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                  children: [
                    (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                      children: "General Settings",
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                      children: "Manage general platform settings",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                  className: "space-y-4",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(label_1.Label, {
                          htmlFor: "platform-name",
                          children: "Platform Name",
                        }),
                        (0, jsx_runtime_1.jsx)(input_1.Input, {
                          id: "platform-name",
                          defaultValue: "Allora AI",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(label_1.Label, {
                          htmlFor: "contact-email",
                          children: "Support Email",
                        }),
                        (0, jsx_runtime_1.jsx)(input_1.Input, {
                          id: "contact-email",
                          type: "email",
                          defaultValue: "support@example.com",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center justify-between space-x-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(label_1.Label, {
                          htmlFor: "maintenance-mode",
                          children: "Maintenance Mode",
                        }),
                        (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                          id: "maintenance-mode",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(button_1.Button, {
                      className: "mt-2",
                      children: "Save Changes",
                    }),
                  ],
                }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "security",
            children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
              children: [
                (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                  children: [
                    (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                      children: "Security Settings",
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                      children: "Configure security options for the platform",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                  className: "space-y-4",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center justify-between space-x-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(label_1.Label, {
                          htmlFor: "enforce-2fa",
                          children: "Enforce 2FA for Admins",
                        }),
                        (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                          id: "enforce-2fa",
                          defaultChecked: true,
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center justify-between space-x-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(label_1.Label, {
                          htmlFor: "activity-logging",
                          children: "Advanced Activity Logging",
                        }),
                        (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                          id: "activity-logging",
                          defaultChecked: true,
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center justify-between space-x-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(label_1.Label, {
                          htmlFor: "ip-restriction",
                          children: "IP Restriction",
                        }),
                        (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                          id: "ip-restriction",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(button_1.Button, {
                      className: "mt-2",
                      children: "Save Security Settings",
                    }),
                  ],
                }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "advanced",
            children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
              children: [
                (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                  children: [
                    (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                      children: "Advanced Settings",
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                      children: "Advanced configuration options",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                  className: "space-y-4",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(label_1.Label, {
                          htmlFor: "api-rate-limit",
                          children: "API Rate Limit (requests/min)",
                        }),
                        (0, jsx_runtime_1.jsx)(input_1.Input, {
                          id: "api-rate-limit",
                          type: "number",
                          defaultValue: "60",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(label_1.Label, {
                          htmlFor: "session-timeout",
                          children: "Session Timeout (minutes)",
                        }),
                        (0, jsx_runtime_1.jsx)(input_1.Input, {
                          id: "session-timeout",
                          type: "number",
                          defaultValue: "30",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center justify-between space-x-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(label_1.Label, {
                          htmlFor: "debug-mode",
                          children: "Debug Mode",
                        }),
                        (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                          id: "debug-mode",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(button_1.Button, {
                      className: "mt-2",
                      children: "Save Advanced Settings",
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

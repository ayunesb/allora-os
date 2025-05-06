"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ApiConfig;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_helmet_async_1 = require("react-helmet-async");
var tabs_1 = require("@/components/ui/tabs");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var alert_1 = require("@/components/ui/alert");
var badge_1 = require("@/components/ui/badge");
var lucide_react_1 = require("lucide-react");
var APIKeysTab_1 = require("@/components/admin/APIKeysTab");
var separator_1 = require("@/components/ui/separator");
var switch_1 = require("@/components/ui/switch");
var textarea_1 = require("@/components/ui/textarea");
var toggle_1 = require("@/components/ui/toggle");
var react_router_dom_1 = require("react-router-dom");
var sonner_1 = require("sonner");
var GitHubWebhookConfigSection_1 = require("@/components/admin/webhooks/GitHubWebhookConfigSection");
function ApiConfig() {
  var navigate = (0, react_router_dom_1.useNavigate)();
  var _a = react_1.default.useState({
      stripe: true,
      openai: true,
      twilio: false,
      postmark: true,
      heygen: false,
    }),
    activeApiKeys = _a[0],
    setActiveApiKeys = _a[1];
  var _b = react_1.default.useState(false),
    isLoading = _b[0],
    setIsLoading = _b[1];
  var _c = react_1.default.useState(false),
    webhookDebugEnabled = _c[0],
    setWebhookDebugEnabled = _c[1];
  var _d = react_1.default.useState(true),
    apiLogging = _d[0],
    setApiLogging = _d[1];
  var _e = react_1.default.useState("company-123"),
    companyId = _e[0],
    setCompanyId = _e[1];
  var _f = react_1.default.useState({
      stripe: "sk_test_•••••••••••••••••••••••••",
      twilio_sid: "AC•••••••••••••••••••••••••",
      twilio_token: "••••••••••••••••••••••••••••••",
      heygen: "••••••••••••••••••••••••••••••",
      openai: "sk-•••••••••••••••••••••••••••••",
    }),
    apiKeys = _f[0],
    setApiKeys = _f[1];
  var toggleApiKey = function (key) {
    setActiveApiKeys(function (prev) {
      var _a;
      return __assign(
        __assign({}, prev),
        ((_a = {}), (_a[key] = !prev[key]), _a),
      );
    });
    sonner_1.toast.success(
      ""
        .concat(key.charAt(0).toUpperCase() + key.slice(1), " API ")
        .concat(!activeApiKeys[key] ? "enabled" : "disabled"),
    );
  };
  var testApiConnection = function () {
    setIsLoading(true);
    // Simulate API test
    setTimeout(function () {
      setIsLoading(false);
      sonner_1.toast.success("API connections tested successfully");
    }, 2000);
  };
  var handleConfigureWebhook = function (webhookType) {
    navigate("/admin/webhooks", {
      state: { activeTab: "config", selectedWebhook: webhookType },
    });
  };
  return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
    children: [
      (0, jsx_runtime_1.jsx)(react_helmet_async_1.Helmet, {
        children: (0, jsx_runtime_1.jsx)("title", {
          children: "API Configuration | Allora AI",
        }),
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-6",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsx)("h1", {
                className: "text-2xl font-bold",
                children: "API Configuration",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground mb-4",
                children: "Manage API keys and external service connections.",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
            defaultValue: "api-keys",
            className: "space-y-4",
            children: [
              (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
                children: [
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "api-keys",
                    children: "API Keys",
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "security",
                    children: "Security",
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "webhooks",
                    children: "Webhooks",
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "advanced",
                    children: "Advanced",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)(tabs_1.TabsContent, {
                value: "api-keys",
                className: "space-y-4",
                children: [
                  (0, jsx_runtime_1.jsx)(APIKeysTab_1.default, {
                    companyId: companyId,
                    initialApiKeys: apiKeys,
                    isLoading: isLoading,
                  }),
                  (0, jsx_runtime_1.jsxs)(card_1.Card, {
                    className: "mt-6",
                    children: [
                      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                        children: [
                          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                            className: "text-base",
                            children: "Active Integrations",
                          }),
                          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                            children:
                              "Enable or disable API integrations as needed",
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                        children: (0, jsx_runtime_1.jsx)("div", {
                          className: "grid gap-4",
                          children: Object.entries(activeApiKeys).map(
                            function (_a) {
                              var key = _a[0],
                                isActive = _a[1];
                              return (0, jsx_runtime_1.jsxs)(
                                "div",
                                {
                                  className:
                                    "flex items-center justify-between",
                                  children: [
                                    (0, jsx_runtime_1.jsxs)("div", {
                                      className: "flex items-center gap-2",
                                      children: [
                                        (0, jsx_runtime_1.jsx)(
                                          lucide_react_1.Key,
                                          {
                                            className:
                                              "h-4 w-4 text-muted-foreground",
                                          },
                                        ),
                                        (0, jsx_runtime_1.jsx)("span", {
                                          className: "font-medium",
                                          children:
                                            key.charAt(0).toUpperCase() +
                                            key.slice(1),
                                        }),
                                        isActive
                                          ? (0, jsx_runtime_1.jsx)(
                                              badge_1.Badge,
                                              {
                                                variant: "outline",
                                                className:
                                                  "bg-green-50 text-green-700 border-green-200",
                                                children: "Active",
                                              },
                                            )
                                          : (0, jsx_runtime_1.jsx)(
                                              badge_1.Badge,
                                              {
                                                variant: "outline",
                                                className:
                                                  "bg-gray-50 text-gray-500",
                                                children: "Inactive",
                                              },
                                            ),
                                      ],
                                    }),
                                    (0, jsx_runtime_1.jsxs)("div", {
                                      className: "flex items-center gap-2",
                                      children: [
                                        (0, jsx_runtime_1.jsx)(
                                          button_1.Button,
                                          {
                                            variant: "outline",
                                            size: "sm",
                                            onClick: function () {
                                              return navigate(
                                                "/admin/api-integrations?service=".concat(
                                                  key,
                                                ),
                                              );
                                            },
                                            children: "Configure",
                                          },
                                        ),
                                        (0, jsx_runtime_1.jsx)(
                                          switch_1.Switch,
                                          {
                                            checked: isActive,
                                            onCheckedChange: function () {
                                              return toggleApiKey(key);
                                            },
                                          },
                                        ),
                                      ],
                                    }),
                                  ],
                                },
                                key,
                              );
                            },
                          ),
                        }),
                      }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "security",
                children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
                  children: [
                    (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex items-center gap-2",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.ShieldAlert, {
                              className: "h-5 w-5 text-amber-500",
                            }),
                            (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                              children: "API Security Settings",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                          children:
                            "Configure security settings for API access",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                      className: "space-y-4",
                      children: (0, jsx_runtime_1.jsxs)("div", {
                        className: "space-y-4",
                        children: [
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "flex items-center justify-between",
                            children: [
                              (0, jsx_runtime_1.jsxs)("div", {
                                children: [
                                  (0, jsx_runtime_1.jsx)("h3", {
                                    className: "font-medium",
                                    children: "API Rate Limiting",
                                  }),
                                  (0, jsx_runtime_1.jsx)("p", {
                                    className: "text-sm text-muted-foreground",
                                    children:
                                      "Limit the number of API requests per minute",
                                  }),
                                ],
                              }),
                              (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                                defaultChecked: true,
                              }),
                            ],
                          }),
                          (0, jsx_runtime_1.jsx)(separator_1.Separator, {}),
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "flex items-center justify-between",
                            children: [
                              (0, jsx_runtime_1.jsxs)("div", {
                                children: [
                                  (0, jsx_runtime_1.jsx)("h3", {
                                    className: "font-medium",
                                    children: "IP Whitelisting",
                                  }),
                                  (0, jsx_runtime_1.jsx)("p", {
                                    className: "text-sm text-muted-foreground",
                                    children:
                                      "Restrict API access to specific IP addresses",
                                  }),
                                ],
                              }),
                              (0, jsx_runtime_1.jsx)(switch_1.Switch, {}),
                            ],
                          }),
                          (0, jsx_runtime_1.jsx)(separator_1.Separator, {}),
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "flex items-center justify-between",
                            children: [
                              (0, jsx_runtime_1.jsxs)("div", {
                                children: [
                                  (0, jsx_runtime_1.jsx)("h3", {
                                    className: "font-medium",
                                    children: "API Key Rotation",
                                  }),
                                  (0, jsx_runtime_1.jsx)("p", {
                                    className: "text-sm text-muted-foreground",
                                    children:
                                      "Automatically rotate API keys every 90 days",
                                  }),
                                ],
                              }),
                              (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                                defaultChecked: true,
                              }),
                            ],
                          }),
                          (0, jsx_runtime_1.jsx)(separator_1.Separator, {}),
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "flex items-center justify-between",
                            children: [
                              (0, jsx_runtime_1.jsxs)("div", {
                                children: [
                                  (0, jsx_runtime_1.jsx)("h3", {
                                    className: "font-medium",
                                    children: "Enhanced Logging",
                                  }),
                                  (0, jsx_runtime_1.jsx)("p", {
                                    className: "text-sm text-muted-foreground",
                                    children:
                                      "Enable detailed logging for API requests",
                                  }),
                                ],
                              }),
                              (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                                checked: apiLogging,
                                onCheckedChange: setApiLogging,
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "webhooks",
                children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
                  children: [
                    (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex items-center gap-2",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Link, {
                              className: "h-5 w-5 text-blue-500",
                            }),
                            (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                              children: "Webhook Configuration",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                          children: "Manage incoming and outgoing webhooks",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                      children: (0, jsx_runtime_1.jsxs)("div", {
                        className: "space-y-6",
                        children: [
                          (0, jsx_runtime_1.jsxs)(alert_1.Alert, {
                            children: [
                              (0, jsx_runtime_1.jsx)(
                                lucide_react_1.AlertCircle,
                                { className: "h-4 w-4" },
                              ),
                              (0, jsx_runtime_1.jsx)(alert_1.AlertTitle, {
                                children: "Testing Mode Active",
                              }),
                              (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, {
                                children:
                                  "Webhook testing mode is currently active. Events will be logged but not fully processed.",
                              }),
                            ],
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "space-y-4 mt-4",
                            children: [
                              (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex items-center justify-between",
                                children: [
                                  (0, jsx_runtime_1.jsxs)("div", {
                                    children: [
                                      (0, jsx_runtime_1.jsx)("h3", {
                                        className: "font-medium",
                                        children: "Webhook Debugging",
                                      }),
                                      (0, jsx_runtime_1.jsx)("p", {
                                        className:
                                          "text-sm text-muted-foreground",
                                        children:
                                          "Enable detailed logging for webhook events",
                                      }),
                                    ],
                                  }),
                                  (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                                    checked: webhookDebugEnabled,
                                    onCheckedChange: setWebhookDebugEnabled,
                                  }),
                                ],
                              }),
                              webhookDebugEnabled &&
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className: "space-y-2",
                                  children: [
                                    (0, jsx_runtime_1.jsx)("h4", {
                                      className: "text-sm font-medium",
                                      children: "Debug Webhook Response",
                                    }),
                                    (0, jsx_runtime_1.jsx)(
                                      textarea_1.Textarea,
                                      {
                                        placeholder:
                                          "Webhook responses will appear here",
                                        className: "font-mono text-xs h-32",
                                        readOnly: true,
                                        value:
                                          '{\n  "event": "webhook.test",\n  "status": "success",\n  "timestamp": "2025-04-14T10:23:45Z",\n  "data": {\n    "company": "Acme Corp",\n    "action": "user.created"\n  }\n}',
                                      },
                                    ),
                                  ],
                                }),
                              (0, jsx_runtime_1.jsxs)("div", {
                                className: "space-y-4 mt-6",
                                children: [
                                  (0, jsx_runtime_1.jsx)("h3", {
                                    className: "font-medium",
                                    children: "Webhook Endpoints",
                                  }),
                                  (0, jsx_runtime_1.jsxs)("div", {
                                    className:
                                      "flex justify-between items-center p-2 border rounded-md",
                                    children: [
                                      (0, jsx_runtime_1.jsxs)("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                          (0, jsx_runtime_1.jsx)(
                                            lucide_react_1.CheckCircle2,
                                            {
                                              className:
                                                "h-4 w-4 text-green-500",
                                            },
                                          ),
                                          (0, jsx_runtime_1.jsx)("span", {
                                            children: "Stripe Webhooks",
                                          }),
                                        ],
                                      }),
                                      (0, jsx_runtime_1.jsx)(button_1.Button, {
                                        variant: "outline",
                                        size: "sm",
                                        onClick: function () {
                                          return handleConfigureWebhook(
                                            "stripe",
                                          );
                                        },
                                        children: "Configure",
                                      }),
                                    ],
                                  }),
                                  (0, jsx_runtime_1.jsxs)("div", {
                                    className:
                                      "flex justify-between items-center p-2 border rounded-md",
                                    children: [
                                      (0, jsx_runtime_1.jsxs)("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                          (0, jsx_runtime_1.jsx)(
                                            lucide_react_1.CheckCircle2,
                                            {
                                              className:
                                                "h-4 w-4 text-green-500",
                                            },
                                          ),
                                          (0, jsx_runtime_1.jsx)("span", {
                                            children: "Zapier Integration",
                                          }),
                                        ],
                                      }),
                                      (0, jsx_runtime_1.jsx)(button_1.Button, {
                                        variant: "outline",
                                        size: "sm",
                                        onClick: function () {
                                          return handleConfigureWebhook(
                                            "zapier",
                                          );
                                        },
                                        children: "Configure",
                                      }),
                                    ],
                                  }),
                                  (0, jsx_runtime_1.jsx)(
                                    GitHubWebhookConfigSection_1.default,
                                    {
                                      onConfigureWebhook:
                                        handleConfigureWebhook,
                                    },
                                  ),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
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
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex items-center gap-2",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Settings, {
                              className: "h-5 w-5 text-slate-500",
                            }),
                            (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                              children: "Advanced API Settings",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                          children:
                            "Configure advanced options for API services",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                      children: (0, jsx_runtime_1.jsxs)("div", {
                        className: "space-y-4",
                        children: [
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "grid gap-4",
                            children: [
                              (0, jsx_runtime_1.jsxs)("div", {
                                children: [
                                  (0, jsx_runtime_1.jsx)("h3", {
                                    className: "font-medium mb-2",
                                    children: "API Timeout Settings",
                                  }),
                                  (0, jsx_runtime_1.jsxs)("div", {
                                    className: "flex space-x-2",
                                    children: [
                                      (0, jsx_runtime_1.jsx)(toggle_1.Toggle, {
                                        variant: "outline",
                                        "aria-label": "5 seconds",
                                        size: "sm",
                                        children: "5s",
                                      }),
                                      (0, jsx_runtime_1.jsx)(toggle_1.Toggle, {
                                        variant: "outline",
                                        "aria-label": "10 seconds",
                                        size: "sm",
                                        pressed: true,
                                        children: "10s",
                                      }),
                                      (0, jsx_runtime_1.jsx)(toggle_1.Toggle, {
                                        variant: "outline",
                                        "aria-label": "30 seconds",
                                        size: "sm",
                                        children: "30s",
                                      }),
                                      (0, jsx_runtime_1.jsx)(toggle_1.Toggle, {
                                        variant: "outline",
                                        "aria-label": "60 seconds",
                                        size: "sm",
                                        children: "60s",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, jsx_runtime_1.jsxs)("div", {
                                children: [
                                  (0, jsx_runtime_1.jsx)("h3", {
                                    className: "font-medium mb-2",
                                    children: "API Response Format",
                                  }),
                                  (0, jsx_runtime_1.jsxs)("div", {
                                    className: "flex space-x-2",
                                    children: [
                                      (0, jsx_runtime_1.jsx)(toggle_1.Toggle, {
                                        variant: "outline",
                                        "aria-label": "JSON",
                                        size: "sm",
                                        pressed: true,
                                        children: "JSON",
                                      }),
                                      (0, jsx_runtime_1.jsx)(toggle_1.Toggle, {
                                        variant: "outline",
                                        "aria-label": "XML",
                                        size: "sm",
                                        children: "XML",
                                      }),
                                      (0, jsx_runtime_1.jsx)(toggle_1.Toggle, {
                                        variant: "outline",
                                        "aria-label": "YAML",
                                        size: "sm",
                                        children: "YAML",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex items-center justify-between",
                                children: [
                                  (0, jsx_runtime_1.jsxs)("div", {
                                    children: [
                                      (0, jsx_runtime_1.jsx)("h3", {
                                        className: "font-medium",
                                        children: "Error Notification",
                                      }),
                                      (0, jsx_runtime_1.jsx)("p", {
                                        className:
                                          "text-sm text-muted-foreground",
                                        children:
                                          "Receive email alerts for API errors",
                                      }),
                                    ],
                                  }),
                                  (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                                    defaultChecked: true,
                                  }),
                                ],
                              }),
                              (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex items-center justify-between",
                                children: [
                                  (0, jsx_runtime_1.jsxs)("div", {
                                    children: [
                                      (0, jsx_runtime_1.jsx)("h3", {
                                        className: "font-medium",
                                        children: "Sandbox Mode",
                                      }),
                                      (0, jsx_runtime_1.jsx)("p", {
                                        className:
                                          "text-sm text-muted-foreground",
                                        children:
                                          "Use test environments for all API calls",
                                      }),
                                    ],
                                  }),
                                  (0, jsx_runtime_1.jsx)(switch_1.Switch, {}),
                                ],
                              }),
                            ],
                          }),
                          (0, jsx_runtime_1.jsx)("div", {
                            className: "mt-6",
                            children: (0, jsx_runtime_1.jsx)(button_1.Button, {
                              onClick: testApiConnection,
                              disabled: isLoading,
                              children: isLoading
                                ? (0, jsx_runtime_1.jsxs)(
                                    jsx_runtime_1.Fragment,
                                    {
                                      children: [
                                        (0, jsx_runtime_1.jsx)(
                                          lucide_react_1.AlertCircle,
                                          {
                                            className:
                                              "mr-2 h-4 w-4 animate-pulse",
                                          },
                                        ),
                                        "Testing Connections...",
                                      ],
                                    },
                                  )
                                : (0, jsx_runtime_1.jsxs)(
                                    jsx_runtime_1.Fragment,
                                    {
                                      children: [
                                        (0, jsx_runtime_1.jsx)(
                                          lucide_react_1.Link,
                                          { className: "mr-2 h-4 w-4" },
                                        ),
                                        "Test All API Connections",
                                      ],
                                    },
                                  ),
                            }),
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

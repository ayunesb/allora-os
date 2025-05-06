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
exports.default = Notifications;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_helmet_async_1 = require("react-helmet-async");
var PageErrorBoundary_1 = require("@/components/errorHandling/PageErrorBoundary");
var card_1 = require("@/components/ui/card");
var switch_1 = require("@/components/ui/switch");
var label_1 = require("@/components/ui/label");
var tabs_1 = require("@/components/ui/tabs");
var sonner_1 = require("sonner");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
function Notifications() {
  var _a = (0, react_1.useState)({
      marketingEmails: true,
      productUpdates: true,
      securityAlerts: true,
      recommendationAlerts: false,
      weeklyDigest: true,
    }),
    emailNotifications = _a[0],
    setEmailNotifications = _a[1];
  var _b = (0, react_1.useState)({
      newStrategies: true,
      newLeads: true,
      campaignUpdates: true,
      executiveDebates: false,
      systemAlerts: true,
    }),
    pushNotifications = _b[0],
    setPushNotifications = _b[1];
  var handleSaveSettings = function () {
    sonner_1.toast.success("Notification settings saved successfully");
  };
  return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
    children: [
      (0, jsx_runtime_1.jsx)(react_helmet_async_1.Helmet, {
        children: (0, jsx_runtime_1.jsx)("title", {
          children: "Notifications - Allora AI",
        }),
      }),
      (0, jsx_runtime_1.jsx)(PageErrorBoundary_1.PageErrorBoundary, {
        pageName: "Notifications",
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "container mx-auto px-4 py-6",
          children: [
            (0, jsx_runtime_1.jsx)("h1", {
              className: "text-2xl font-bold tracking-tight mb-6",
              children: "Notifications",
            }),
            (0, jsx_runtime_1.jsx)("p", {
              className: "text-muted-foreground mb-8",
              children:
                "Manage your notification preferences and view recent alerts",
            }),
            (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
              defaultValue: "settings",
              className: "space-y-4",
              children: [
                (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
                  children: [
                    (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                      value: "settings",
                      children: "Settings",
                    }),
                    (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                      value: "history",
                      children: "Notification History",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(tabs_1.TabsContent, {
                  value: "settings",
                  className: "space-y-4",
                  children: [
                    (0, jsx_runtime_1.jsxs)(card_1.Card, {
                      children: [
                        (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                          children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                            children: "Email Notifications",
                          }),
                        }),
                        (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                          className: "space-y-4",
                          children: [
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "flex items-center justify-between",
                              children: [
                                (0, jsx_runtime_1.jsxs)(label_1.Label, {
                                  htmlFor: "marketing",
                                  className: "flex flex-col space-y-1",
                                  children: [
                                    (0, jsx_runtime_1.jsx)("span", {
                                      children: "Marketing Emails",
                                    }),
                                    (0, jsx_runtime_1.jsx)("span", {
                                      className:
                                        "font-normal text-sm text-muted-foreground",
                                      children:
                                        "Receive updates about new features and promotions",
                                    }),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                                  id: "marketing",
                                  checked: emailNotifications.marketingEmails,
                                  onCheckedChange: function (checked) {
                                    return setEmailNotifications(
                                      function (prev) {
                                        return __assign(__assign({}, prev), {
                                          marketingEmails: checked,
                                        });
                                      },
                                    );
                                  },
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "flex items-center justify-between",
                              children: [
                                (0, jsx_runtime_1.jsxs)(label_1.Label, {
                                  htmlFor: "product-updates",
                                  className: "flex flex-col space-y-1",
                                  children: [
                                    (0, jsx_runtime_1.jsx)("span", {
                                      children: "Product Updates",
                                    }),
                                    (0, jsx_runtime_1.jsx)("span", {
                                      className:
                                        "font-normal text-sm text-muted-foreground",
                                      children:
                                        "Get notified about new platform features",
                                    }),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                                  id: "product-updates",
                                  checked: emailNotifications.productUpdates,
                                  onCheckedChange: function (checked) {
                                    return setEmailNotifications(
                                      function (prev) {
                                        return __assign(__assign({}, prev), {
                                          productUpdates: checked,
                                        });
                                      },
                                    );
                                  },
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "flex items-center justify-between",
                              children: [
                                (0, jsx_runtime_1.jsxs)(label_1.Label, {
                                  htmlFor: "security",
                                  className: "flex flex-col space-y-1",
                                  children: [
                                    (0, jsx_runtime_1.jsx)("span", {
                                      children: "Security Alerts",
                                    }),
                                    (0, jsx_runtime_1.jsx)("span", {
                                      className:
                                        "font-normal text-sm text-muted-foreground",
                                      children:
                                        "Important security related notifications",
                                    }),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                                  id: "security",
                                  checked: emailNotifications.securityAlerts,
                                  onCheckedChange: function (checked) {
                                    return setEmailNotifications(
                                      function (prev) {
                                        return __assign(__assign({}, prev), {
                                          securityAlerts: checked,
                                        });
                                      },
                                    );
                                  },
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "flex items-center justify-between",
                              children: [
                                (0, jsx_runtime_1.jsxs)(label_1.Label, {
                                  htmlFor: "recommendations",
                                  className: "flex flex-col space-y-1",
                                  children: [
                                    (0, jsx_runtime_1.jsx)("span", {
                                      children: "Recommendation Alerts",
                                    }),
                                    (0, jsx_runtime_1.jsx)("span", {
                                      className:
                                        "font-normal text-sm text-muted-foreground",
                                      children:
                                        "Get notified when new AI recommendations are available",
                                    }),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                                  id: "recommendations",
                                  checked:
                                    emailNotifications.recommendationAlerts,
                                  onCheckedChange: function (checked) {
                                    return setEmailNotifications(
                                      function (prev) {
                                        return __assign(__assign({}, prev), {
                                          recommendationAlerts: checked,
                                        });
                                      },
                                    );
                                  },
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "flex items-center justify-between",
                              children: [
                                (0, jsx_runtime_1.jsxs)(label_1.Label, {
                                  htmlFor: "digest",
                                  className: "flex flex-col space-y-1",
                                  children: [
                                    (0, jsx_runtime_1.jsx)("span", {
                                      children: "Weekly Digest",
                                    }),
                                    (0, jsx_runtime_1.jsx)("span", {
                                      className:
                                        "font-normal text-sm text-muted-foreground",
                                      children:
                                        "Weekly summary of activities and insights",
                                    }),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                                  id: "digest",
                                  checked: emailNotifications.weeklyDigest,
                                  onCheckedChange: function (checked) {
                                    return setEmailNotifications(
                                      function (prev) {
                                        return __assign(__assign({}, prev), {
                                          weeklyDigest: checked,
                                        });
                                      },
                                    );
                                  },
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)(card_1.Card, {
                      children: [
                        (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                          children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                            children: "Push Notifications",
                          }),
                        }),
                        (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                          className: "space-y-4",
                          children: [
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "flex items-center justify-between",
                              children: [
                                (0, jsx_runtime_1.jsxs)(label_1.Label, {
                                  htmlFor: "new-strategies",
                                  className: "flex flex-col space-y-1",
                                  children: [
                                    (0, jsx_runtime_1.jsx)("span", {
                                      children: "New Strategies",
                                    }),
                                    (0, jsx_runtime_1.jsx)("span", {
                                      className:
                                        "font-normal text-sm text-muted-foreground",
                                      children:
                                        "Get notified when new strategies are proposed",
                                    }),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                                  id: "new-strategies",
                                  checked: pushNotifications.newStrategies,
                                  onCheckedChange: function (checked) {
                                    return setPushNotifications(
                                      function (prev) {
                                        return __assign(__assign({}, prev), {
                                          newStrategies: checked,
                                        });
                                      },
                                    );
                                  },
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "flex items-center justify-between",
                              children: [
                                (0, jsx_runtime_1.jsxs)(label_1.Label, {
                                  htmlFor: "new-leads",
                                  className: "flex flex-col space-y-1",
                                  children: [
                                    (0, jsx_runtime_1.jsx)("span", {
                                      children: "New Leads",
                                    }),
                                    (0, jsx_runtime_1.jsx)("span", {
                                      className:
                                        "font-normal text-sm text-muted-foreground",
                                      children:
                                        "Get notified when new leads come in",
                                    }),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                                  id: "new-leads",
                                  checked: pushNotifications.newLeads,
                                  onCheckedChange: function (checked) {
                                    return setPushNotifications(
                                      function (prev) {
                                        return __assign(__assign({}, prev), {
                                          newLeads: checked,
                                        });
                                      },
                                    );
                                  },
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "flex items-center justify-between",
                              children: [
                                (0, jsx_runtime_1.jsxs)(label_1.Label, {
                                  htmlFor: "campaign-updates",
                                  className: "flex flex-col space-y-1",
                                  children: [
                                    (0, jsx_runtime_1.jsx)("span", {
                                      children: "Campaign Updates",
                                    }),
                                    (0, jsx_runtime_1.jsx)("span", {
                                      className:
                                        "font-normal text-sm text-muted-foreground",
                                      children:
                                        "Get notified about your campaign performance",
                                    }),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                                  id: "campaign-updates",
                                  checked: pushNotifications.campaignUpdates,
                                  onCheckedChange: function (checked) {
                                    return setPushNotifications(
                                      function (prev) {
                                        return __assign(__assign({}, prev), {
                                          campaignUpdates: checked,
                                        });
                                      },
                                    );
                                  },
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "flex items-center justify-between",
                              children: [
                                (0, jsx_runtime_1.jsxs)(label_1.Label, {
                                  htmlFor: "executive-debates",
                                  className: "flex flex-col space-y-1",
                                  children: [
                                    (0, jsx_runtime_1.jsx)("span", {
                                      children: "Executive Debates",
                                    }),
                                    (0, jsx_runtime_1.jsx)("span", {
                                      className:
                                        "font-normal text-sm text-muted-foreground",
                                      children:
                                        "Get notified when AI executives have new debates",
                                    }),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                                  id: "executive-debates",
                                  checked: pushNotifications.executiveDebates,
                                  onCheckedChange: function (checked) {
                                    return setPushNotifications(
                                      function (prev) {
                                        return __assign(__assign({}, prev), {
                                          executiveDebates: checked,
                                        });
                                      },
                                    );
                                  },
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "flex items-center justify-between",
                              children: [
                                (0, jsx_runtime_1.jsxs)(label_1.Label, {
                                  htmlFor: "system-alerts",
                                  className: "flex flex-col space-y-1",
                                  children: [
                                    (0, jsx_runtime_1.jsx)("span", {
                                      children: "System Alerts",
                                    }),
                                    (0, jsx_runtime_1.jsx)("span", {
                                      className:
                                        "font-normal text-sm text-muted-foreground",
                                      children:
                                        "Important system notifications",
                                    }),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                                  id: "system-alerts",
                                  checked: pushNotifications.systemAlerts,
                                  onCheckedChange: function (checked) {
                                    return setPushNotifications(
                                      function (prev) {
                                        return __assign(__assign({}, prev), {
                                          systemAlerts: checked,
                                        });
                                      },
                                    );
                                  },
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)("div", {
                      className: "flex justify-end",
                      children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
                        onClick: handleSaveSettings,
                        className: "gap-2",
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.Save, {
                            className: "h-4 w-4",
                          }),
                          "Save Settings",
                        ],
                      }),
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                  value: "history",
                  children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
                    children: [
                      (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                        children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                          children: "Notification History",
                        }),
                      }),
                      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                        children: (0, jsx_runtime_1.jsx)("p", {
                          className: "text-center text-muted-foreground py-8",
                          children:
                            "No notifications yet. They will appear here once you receive them.",
                        }),
                      }),
                    ],
                  }),
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}

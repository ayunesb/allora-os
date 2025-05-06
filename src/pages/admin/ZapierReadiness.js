"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ZapierReadiness;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var tabs_1 = require("@/components/ui/tabs");
var ZapierReadinessTest_1 = require("@/components/admin/webhooks/ZapierReadinessTest");
var react_helmet_async_1 = require("react-helmet-async");
var useAuth_1 = require("@/hooks/useAuth");
var input_1 = require("@/components/ui/input");
var button_1 = require("@/components/ui/button");
var sonner_1 = require("sonner");
var webhookValidation_1 = require("@/utils/webhookValidation");
function ZapierReadiness() {
  var profile = (0, useAuth_1.useAuth)().profile;
  var _a = (0, react_1.useState)("test"),
    activeTab = _a[0],
    setActiveTab = _a[1];
  var _b = (0, react_1.useState)(""),
    webhookUrl = _b[0],
    setWebhookUrl = _b[1];
  var _c = (0, react_1.useState)(false),
    isValid = _c[0],
    setIsValid = _c[1];
  var _d = (0, react_1.useState)(false),
    isSaving = _d[0],
    setIsSaving = _d[1];
  // Load webhook URL from localStorage on mount
  (0, react_1.useEffect)(function () {
    var savedWebhookUrl = localStorage.getItem("zapier_webhook_url");
    if (savedWebhookUrl) {
      setWebhookUrl(savedWebhookUrl);
      validateUrl(savedWebhookUrl);
    }
  }, []);
  var validateUrl = function (url) {
    if (!url) {
      setIsValid(false);
      return;
    }
    var validationResult = (0, webhookValidation_1.validateWebhookUrlFormat)(
      url,
    );
    setIsValid(validationResult);
  };
  var handleSave = function () {
    if (!webhookUrl) {
      sonner_1.toast.error("Please enter a webhook URL");
      return;
    }
    if (isValid !== true) {
      sonner_1.toast.error("Please enter a valid Zapier webhook URL");
      return;
    }
    setIsSaving(true);
    // Sanitize URL before saving
    var sanitizedUrl = webhookUrl.trim();
    // Save to localStorage
    localStorage.setItem("zapier_webhook_url", sanitizedUrl);
    setTimeout(function () {
      setIsSaving(false);
      sonner_1.toast.success("Zapier webhook URL saved successfully");
    }, 500);
  };
  return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
    children: [
      (0, jsx_runtime_1.jsx)(react_helmet_async_1.Helmet, {
        children: (0, jsx_runtime_1.jsx)("title", {
          children: "Zapier Integration Readiness | Allora AI",
        }),
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-6",
        children: [
          (0, jsx_runtime_1.jsx)("div", {
            className: "flex justify-between items-start",
            children: (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsx)("h1", {
                  className: "text-2xl font-bold",
                  children: "Zapier Integration Readiness",
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-muted-foreground",
                  children:
                    "Verify all Zapier webhooks are correctly configured and firing on business events",
                }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
            defaultValue: activeTab,
            onValueChange: setActiveTab,
            className: "w-full",
            children: [
              (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
                className: "grid w-full grid-cols-3",
                children: [
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "test",
                    children: "Webhook Tests",
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "config",
                    children: "Configure",
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "documentation",
                    children: "Documentation",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "test",
                className: "space-y-4 mt-6",
                children: (0, jsx_runtime_1.jsx)(
                  ZapierReadinessTest_1.default,
                  { webhookUrl: webhookUrl, isValid: isValid },
                ),
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "config",
                className: "space-y-4 mt-6",
                children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
                  className: "p-6",
                  children: [
                    (0, jsx_runtime_1.jsx)("h3", {
                      className: "text-lg font-medium mb-4",
                      children: "Configure Your Zapier Webhook",
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-4",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "space-y-2",
                          children: [
                            (0, jsx_runtime_1.jsx)("label", {
                              htmlFor: "webhookUrl",
                              className: "text-sm font-medium",
                              children: "Zapier Webhook URL",
                            }),
                            (0, jsx_runtime_1.jsx)(input_1.Input, {
                              id: "webhookUrl",
                              placeholder:
                                "https://hooks.zapier.com/hooks/catch/123456/abcdef/",
                              value: webhookUrl,
                              onChange: function (e) {
                                setWebhookUrl(e.target.value);
                                validateUrl(e.target.value);
                              },
                              className: "max-w-xl ".concat(
                                isValid === false ? "border-red-500" : "",
                              ),
                            }),
                            isValid === false &&
                              webhookUrl &&
                              (0, jsx_runtime_1.jsx)("p", {
                                className: "text-red-500 text-sm",
                                children:
                                  "Please enter a valid Zapier webhook URL",
                              }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)(button_1.Button, {
                          onClick: handleSave,
                          disabled: isSaving || isValid !== true,
                          className: "mt-2",
                          children: isSaving ? "Saving..." : "Save Webhook URL",
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "bg-muted p-4 rounded-md mt-6",
                          children: [
                            (0, jsx_runtime_1.jsx)("h4", {
                              className: "font-medium mb-2",
                              children: "How to get your Zapier webhook URL:",
                            }),
                            (0, jsx_runtime_1.jsxs)("ol", {
                              className: "list-decimal pl-5 space-y-2 text-sm",
                              children: [
                                (0, jsx_runtime_1.jsx)("li", {
                                  children: "Log in to your Zapier account",
                                }),
                                (0, jsx_runtime_1.jsx)("li", {
                                  children: "Create a new Zap",
                                }),
                                (0, jsx_runtime_1.jsx)("li", {
                                  children:
                                    'Select "Webhook" as the trigger app',
                                }),
                                (0, jsx_runtime_1.jsx)("li", {
                                  children:
                                    'Choose "Catch Hook" as the trigger event',
                                }),
                                (0, jsx_runtime_1.jsx)("li", {
                                  children:
                                    "Copy the webhook URL provided by Zapier",
                                }),
                                (0, jsx_runtime_1.jsx)("li", {
                                  children: "Paste it in the field above",
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
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "documentation",
                className: "space-y-4 mt-6",
                children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
                  className: "p-6",
                  children: [
                    (0, jsx_runtime_1.jsx)("h3", {
                      className: "text-lg font-medium mb-4",
                      children: "How to Configure Your Zapier Webhooks",
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-4",
                      children: [
                        (0, jsx_runtime_1.jsx)("p", {
                          children:
                            "Allora AI sends webhook events to Zapier for the following events:",
                        }),
                        (0, jsx_runtime_1.jsxs)("ul", {
                          className: "list-disc pl-6 space-y-2",
                          children: [
                            (0, jsx_runtime_1.jsxs)("li", {
                              children: [
                                (0, jsx_runtime_1.jsx)("strong", {
                                  children: "Campaign Launched",
                                }),
                                " - Fired when a new marketing campaign is launched",
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)("li", {
                              children: [
                                (0, jsx_runtime_1.jsx)("strong", {
                                  children: "Lead Added",
                                }),
                                " - Fired when a new lead is added to the system",
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)("li", {
                              children: [
                                (0, jsx_runtime_1.jsx)("strong", {
                                  children: "Strategy Approved",
                                }),
                                " - Fired when a business strategy is approved",
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)("li", {
                              children: [
                                (0, jsx_runtime_1.jsx)("strong", {
                                  children: "Lead Converted",
                                }),
                                " - Fired when a lead is converted to a customer",
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)("li", {
                              children: [
                                (0, jsx_runtime_1.jsx)("strong", {
                                  children: "Revenue Milestone",
                                }),
                                " - Fired when a revenue milestone is reached",
                              ],
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "mt-4",
                          children: "To set up a Zapier webhook:",
                        }),
                        (0, jsx_runtime_1.jsxs)("ol", {
                          className: "list-decimal pl-6 space-y-2",
                          children: [
                            (0, jsx_runtime_1.jsx)("li", {
                              children:
                                "Log in to your Zapier account and create a new Zap",
                            }),
                            (0, jsx_runtime_1.jsx)("li", {
                              children: 'Select "Webhook" as the trigger app',
                            }),
                            (0, jsx_runtime_1.jsx)("li", {
                              children:
                                'Choose "Catch Hook" as the trigger event',
                            }),
                            (0, jsx_runtime_1.jsx)("li", {
                              children:
                                "Copy the webhook URL provided by Zapier",
                            }),
                            (0, jsx_runtime_1.jsx)("li", {
                              children:
                                'Go to the "Configure" tab and paste the URL in the Zapier webhook field',
                            }),
                            (0, jsx_runtime_1.jsx)("li", {
                              children:
                                "Set up your desired action in Zapier (e.g., send an email, create a task)",
                            }),
                            (0, jsx_runtime_1.jsx)("li", {
                              children:
                                'Test the webhook using the tests on the "Webhook Tests" tab',
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "mt-4",
                          children:
                            "For company-specific configuration, please contact your account administrator.",
                        }),
                      ],
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

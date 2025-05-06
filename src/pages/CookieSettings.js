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
exports.default = CookieSettings;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var page_title_1 = require("@/components/ui/page-title");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var react_router_dom_1 = require("react-router-dom");
var switch_1 = require("@/components/ui/switch");
var label_1 = require("@/components/ui/label");
var sonner_1 = require("sonner");
function CookieSettings() {
  var navigate = (0, react_router_dom_1.useNavigate)();
  var _a = (0, react_1.useState)({
      necessary: true,
      analytics: false,
      preferences: false,
      marketing: false,
    }),
    settings = _a[0],
    setSettings = _a[1];
  // Load settings from localStorage on mount
  (0, react_1.useEffect)(function () {
    try {
      var savedSettings = localStorage.getItem("cookie-consent");
      if (savedSettings) {
        var parsedSettings = JSON.parse(savedSettings);
        setSettings({
          necessary: true, // Always true
          analytics: parsedSettings.analytics || false,
          preferences: parsedSettings.preferences || false,
          marketing: parsedSettings.marketing || false,
        });
      }
    } catch (error) {
      console.error("Error loading cookie settings:", error);
    }
  }, []);
  var handleToggle = function (category) {
    if (category === "necessary") return; // Can't toggle necessary cookies
    setSettings(function (prev) {
      var _a;
      return __assign(
        __assign({}, prev),
        ((_a = {}), (_a[category] = !prev[category]), _a),
      );
    });
  };
  var handleSave = function () {
    try {
      localStorage.setItem("cookie-consent", JSON.stringify(settings));
      sonner_1.toast.success("Cookie preferences saved");
    } catch (error) {
      console.error("Error saving cookie settings:", error);
      sonner_1.toast.error("Failed to save cookie preferences");
    }
  };
  var handleAcceptAll = function () {
    var allEnabled = {
      necessary: true,
      analytics: true,
      preferences: true,
      marketing: true,
    };
    setSettings(allEnabled);
    localStorage.setItem("cookie-consent", JSON.stringify(allEnabled));
    sonner_1.toast.success("All cookies accepted");
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container max-w-4xl py-8",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "mb-6 flex items-center",
        children: [
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            variant: "ghost",
            onClick: function () {
              return navigate(-1);
            },
            className: "mr-4",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowLeft, {
                className: "h-4 w-4 mr-2",
              }),
              "Back",
            ],
          }),
          (0, jsx_runtime_1.jsx)(page_title_1.PageTitle, {
            title: "Cookie Settings",
            children: "Cookie Settings",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        className: "mb-8",
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            className: "border-b border-border",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center mb-2",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Cookie, {
                    className: "mr-2 h-5 w-5 text-primary",
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                    children: "Cookie Settings",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children:
                  "Manage how we use cookies and similar technologies on our website",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            className: "pt-6",
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-6",
              children: [
                (0, jsx_runtime_1.jsx)("div", {
                  className: "rounded-lg bg-muted/50 p-4",
                  children: (0, jsx_runtime_1.jsx)("p", {
                    className: "text-sm text-muted-foreground mb-4",
                    children:
                      'We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.',
                  }),
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "space-y-4",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center justify-between",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          children: [
                            (0, jsx_runtime_1.jsx)(label_1.Label, {
                              htmlFor: "necessary",
                              className: "font-medium",
                              children: "Necessary Cookies",
                            }),
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-sm text-muted-foreground",
                              children:
                                "Essential for the website to function properly. Cannot be disabled.",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                          id: "necessary",
                          checked: true,
                          disabled: true,
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center justify-between",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          children: [
                            (0, jsx_runtime_1.jsx)(label_1.Label, {
                              htmlFor: "analytics",
                              className: "font-medium",
                              children: "Analytics Cookies",
                            }),
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-sm text-muted-foreground",
                              children:
                                "Help us understand how visitors interact with our website.",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                          id: "analytics",
                          checked: settings.analytics,
                          onCheckedChange: function () {
                            return handleToggle("analytics");
                          },
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center justify-between",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          children: [
                            (0, jsx_runtime_1.jsx)(label_1.Label, {
                              htmlFor: "preferences",
                              className: "font-medium",
                              children: "Preference Cookies",
                            }),
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-sm text-muted-foreground",
                              children:
                                "Allow the website to remember your preferences and settings.",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                          id: "preferences",
                          checked: settings.preferences,
                          onCheckedChange: function () {
                            return handleToggle("preferences");
                          },
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center justify-between",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          children: [
                            (0, jsx_runtime_1.jsx)(label_1.Label, {
                              htmlFor: "marketing",
                              className: "font-medium",
                              children: "Marketing Cookies",
                            }),
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-sm text-muted-foreground",
                              children:
                                "Used to track visitors across websites for displaying relevant advertisements.",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                          id: "marketing",
                          checked: settings.marketing,
                          onCheckedChange: function () {
                            return handleToggle("marketing");
                          },
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-center",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, {
                  className: "mr-2 h-5 w-5 text-primary",
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                  children: "Privacy Information",
                }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
            className: "space-y-4",
            children: [
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-sm",
                children:
                  "For more information about how we use cookies and your personal data, please check our:",
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex flex-col gap-2 sm:flex-row",
                children: [
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    variant: "outline",
                    asChild: true,
                    children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
                      to: "/privacy",
                      children: "Privacy Policy",
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    variant: "outline",
                    asChild: true,
                    children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
                      to: "/gdpr-compliance",
                      children: "GDPR Compliance",
                    }),
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex justify-end gap-2 mt-6",
        children: [
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            variant: "outline",
            onClick: function () {
              return navigate(-1);
            },
            children: "Cancel",
          }),
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            variant: "outline",
            onClick: handleAcceptAll,
            children: "Accept All",
          }),
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            onClick: handleSave,
            children: "Save Preferences",
          }),
        ],
      }),
    ],
  });
}

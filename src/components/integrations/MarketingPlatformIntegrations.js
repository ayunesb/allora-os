"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketingPlatformIntegrations = MarketingPlatformIntegrations;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var badge_1 = require("@/components/ui/badge");
var tooltip_1 = require("@/components/ui/tooltip");
var alert_1 = require("@/components/ui/alert");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
var PLATFORMS = [
  {
    id: "facebook",
    name: "Facebook",
    description:
      "Connect your Facebook Ad account to manage ads and track performance.",
    status: "connected",
    logo: "/lovable-uploads/9f3a977b-9b9d-47db-97ee-29ffab9ac662.png",
    category: "social",
  },
  {
    id: "instagram",
    name: "Instagram",
    description: "Connect Instagram to schedule posts and analyze engagement.",
    status: "connected",
    logo: "/lovable-uploads/9f3a977b-9b9d-47db-97ee-29ffab9ac662.png",
    category: "social",
  },
  {
    id: "google_ads",
    name: "Google Ads",
    description:
      "Connect your Google Ads account to create and manage ad campaigns.",
    status: "not_connected",
    logo: "/lovable-uploads/9f3a977b-9b9d-47db-97ee-29ffab9ac662.png",
    category: "advertising",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    description:
      "Connect LinkedIn to target professionals and business audiences.",
    status: "not_connected",
    logo: "/lovable-uploads/9f3a977b-9b9d-47db-97ee-29ffab9ac662.png",
    category: "social",
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    description: "Integrate email campaigns with your marketing dashboard.",
    status: "premium",
    logo: "/lovable-uploads/9f3a977b-9b9d-47db-97ee-29ffab9ac662.png",
    category: "email",
  },
  {
    id: "tiktok",
    name: "TikTok",
    description:
      "Connect to TikTok to reach younger demographics with video content.",
    status: "not_connected",
    logo: "/lovable-uploads/9f3a977b-9b9d-47db-97ee-29ffab9ac662.png",
    category: "social",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "Sync contacts, campaigns and analytics with your CRM.",
    status: "premium",
    logo: "/lovable-uploads/9f3a977b-9b9d-47db-97ee-29ffab9ac662.png",
    category: "crm",
  },
  {
    id: "pinterest",
    name: "Pinterest",
    description: "Connect Pinterest for visual discovery campaigns.",
    status: "coming_soon",
    logo: "/lovable-uploads/9f3a977b-9b9d-47db-97ee-29ffab9ac662.png",
    category: "social",
  },
  {
    id: "twitter",
    name: "Twitter",
    description: "Connect your Twitter account to schedule and analyze posts.",
    status: "coming_soon",
    logo: "/lovable-uploads/9f3a977b-9b9d-47db-97ee-29ffab9ac662.png",
    category: "social",
  },
  {
    id: "salesforce",
    name: "Salesforce",
    description: "Enterprise CRM integration for advanced lead tracking.",
    status: "premium",
    logo: "/lovable-uploads/9f3a977b-9b9d-47db-97ee-29ffab9ac662.png",
    category: "crm",
  },
  {
    id: "google_analytics",
    name: "Google Analytics",
    description:
      "Import website analytics for comprehensive campaign reporting.",
    status: "not_connected",
    logo: "/lovable-uploads/9f3a977b-9b9d-47db-97ee-29ffab9ac662.png",
    category: "analytics",
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Connect with thousands of apps through Zapier workflows.",
    status: "not_connected",
    logo: "/lovable-uploads/9f3a977b-9b9d-47db-97ee-29ffab9ac662.png",
    category: "other",
  },
];
function MarketingPlatformIntegrations() {
  var _a = (0, react_1.useState)("all"),
    activeCategory = _a[0],
    setActiveCategory = _a[1];
  var _b = (0, react_1.useState)(null),
    connectingPlatform = _b[0],
    setConnectingPlatform = _b[1];
  var categories = [
    { id: "all", label: "All Integrations" },
    { id: "social", label: "Social Media" },
    { id: "advertising", label: "Advertising" },
    { id: "email", label: "Email Marketing" },
    { id: "crm", label: "CRM & Sales" },
    { id: "analytics", label: "Analytics" },
    { id: "other", label: "Other" },
  ];
  var filteredPlatforms =
    activeCategory === "all"
      ? PLATFORMS
      : PLATFORMS.filter(function (platform) {
          return platform.category === activeCategory;
        });
  var handleConnect = function (platform) {
    if (platform.status === "premium") {
      sonner_1.toast.info("This integration requires a premium subscription");
      return;
    }
    if (platform.status === "coming_soon") {
      sonner_1.toast.info("This integration is coming soon");
      return;
    }
    if (platform.status === "connected") {
      sonner_1.toast.info("".concat(platform.name, " is already connected"));
      return;
    }
    setConnectingPlatform(platform.id);
    // Simulate API call
    setTimeout(function () {
      sonner_1.toast.success(
        "Connected to ".concat(platform.name, " successfully!"),
      );
      setConnectingPlatform(null);
    }, 2000);
  };
  var handleDisconnect = function (platform) {
    if (platform.status !== "connected") return;
    setConnectingPlatform(platform.id);
    // Simulate API call
    setTimeout(function () {
      sonner_1.toast.success("Disconnected from ".concat(platform.name));
      setConnectingPlatform(null);
    }, 1500);
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "w-full",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            children: "Marketing Platform Integrations",
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children:
              "Connect your marketing platforms to unify your campaigns and analytics",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        children: [
          (0, jsx_runtime_1.jsx)("div", {
            className: "flex gap-2 flex-wrap mb-6",
            children: categories.map(function (category) {
              return (0, jsx_runtime_1.jsx)(
                button_1.Button,
                {
                  variant:
                    activeCategory === category.id ? "default" : "outline",
                  size: "sm",
                  onClick: function () {
                    return setActiveCategory(category.id);
                  },
                  children: category.label,
                },
                category.id,
              );
            }),
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
            children: filteredPlatforms.map(function (platform) {
              return (0, jsx_runtime_1.jsxs)(
                card_1.Card,
                {
                  className: "overflow-hidden",
                  children: [
                    (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                      className:
                        "p-4 pb-0 flex flex-row items-center justify-between",
                      children: (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [
                          (0, jsx_runtime_1.jsx)("div", {
                            className:
                              "bg-muted p-1 rounded-md w-10 h-10 flex items-center justify-center",
                            children: (0, jsx_runtime_1.jsx)("img", {
                              src: "/lovable-uploads/9f3a977b-9b9d-47db-97ee-29ffab9ac662.png",
                              alt: platform.name,
                              className: "w-8 h-8 object-contain",
                            }),
                          }),
                          (0, jsx_runtime_1.jsx)("div", {
                            children: (0, jsx_runtime_1.jsxs)(
                              card_1.CardTitle,
                              {
                                className: "text-base flex items-center gap-2",
                                children: [
                                  platform.name,
                                  platform.status === "connected" &&
                                    (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                                      variant: "outline",
                                      className:
                                        "bg-green-500/10 text-green-600 text-xs",
                                      children: "Connected",
                                    }),
                                  platform.status === "premium" &&
                                    (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                                      variant: "outline",
                                      className:
                                        "bg-amber-500/10 text-amber-600 text-xs",
                                      children: "Premium",
                                    }),
                                  platform.status === "coming_soon" &&
                                    (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                                      variant: "outline",
                                      className:
                                        "bg-blue-500/10 text-blue-600 text-xs",
                                      children: "Coming Soon",
                                    }),
                                ],
                              },
                            ),
                          }),
                        ],
                      }),
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                      className: "p-4",
                      children: (0, jsx_runtime_1.jsx)("p", {
                        className: "text-sm text-muted-foreground",
                        children: platform.description,
                      }),
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
                      className: "p-4 pt-0 gap-2",
                      children:
                        platform.status === "connected"
                          ? (0, jsx_runtime_1.jsx)(tooltip_1.TooltipProvider, {
                              children: (0, jsx_runtime_1.jsxs)(
                                tooltip_1.Tooltip,
                                {
                                  children: [
                                    (0, jsx_runtime_1.jsx)(
                                      tooltip_1.TooltipTrigger,
                                      {
                                        asChild: true,
                                        children: (0, jsx_runtime_1.jsxs)(
                                          button_1.Button,
                                          {
                                            variant: "outline",
                                            size: "sm",
                                            className: "w-full",
                                            onClick: function () {
                                              return handleDisconnect(platform);
                                            },
                                            disabled:
                                              connectingPlatform ===
                                              platform.id,
                                            children: [
                                              connectingPlatform === platform.id
                                                ? (0, jsx_runtime_1.jsx)(
                                                    lucide_react_1.Loader2,
                                                    {
                                                      className:
                                                        "mr-2 h-4 w-4 animate-spin",
                                                    },
                                                  )
                                                : (0, jsx_runtime_1.jsx)(
                                                    lucide_react_1.Check,
                                                    {
                                                      className:
                                                        "mr-2 h-4 w-4 text-green-500",
                                                    },
                                                  ),
                                              "Manage Connection",
                                            ],
                                          },
                                        ),
                                      },
                                    ),
                                    (0, jsx_runtime_1.jsx)(
                                      tooltip_1.TooltipContent,
                                      {
                                        children: (0, jsx_runtime_1.jsx)("p", {
                                          children:
                                            "Configure settings or disconnect",
                                        }),
                                      },
                                    ),
                                  ],
                                },
                              ),
                            })
                          : platform.status === "premium"
                            ? (0, jsx_runtime_1.jsxs)(button_1.Button, {
                                variant: "outline",
                                size: "sm",
                                className: "w-full",
                                children: [
                                  (0, jsx_runtime_1.jsx)(lucide_react_1.Lock, {
                                    className: "mr-2 h-4 w-4",
                                  }),
                                  "Upgrade to Connect",
                                ],
                              })
                            : platform.status === "coming_soon"
                              ? (0, jsx_runtime_1.jsxs)(button_1.Button, {
                                  variant: "outline",
                                  size: "sm",
                                  className: "w-full",
                                  disabled: true,
                                  children: [
                                    (0, jsx_runtime_1.jsx)(
                                      lucide_react_1.AlertCircle,
                                      { className: "mr-2 h-4 w-4" },
                                    ),
                                    "Coming Soon",
                                  ],
                                })
                              : (0, jsx_runtime_1.jsxs)(button_1.Button, {
                                  variant: "default",
                                  size: "sm",
                                  className: "w-full",
                                  onClick: function () {
                                    return handleConnect(platform);
                                  },
                                  disabled: connectingPlatform === platform.id,
                                  children: [
                                    connectingPlatform === platform.id
                                      ? (0, jsx_runtime_1.jsx)(
                                          lucide_react_1.Loader2,
                                          {
                                            className:
                                              "mr-2 h-4 w-4 animate-spin",
                                          },
                                        )
                                      : (0, jsx_runtime_1.jsx)(
                                          lucide_react_1.ArrowRight,
                                          { className: "mr-2 h-4 w-4" },
                                        ),
                                    "Connect",
                                  ],
                                }),
                    }),
                  ],
                },
                platform.id,
              );
            }),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
        className: "border-t pt-6",
        children: (0, jsx_runtime_1.jsxs)(alert_1.Alert, {
          className: "bg-muted/50",
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
              className: "h-4 w-4",
            }),
            (0, jsx_runtime_1.jsx)(alert_1.AlertTitle, {
              children: "Need a different integration?",
            }),
            (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, {
              children: (0, jsx_runtime_1.jsxs)("p", {
                className: "text-sm text-muted-foreground",
                children: [
                  "Can't find the marketing platform you're looking for?",
                  (0, jsx_runtime_1.jsxs)(button_1.Button, {
                    variant: "link",
                    size: "sm",
                    className: "px-1.5",
                    children: [
                      "Request an integration",
                      (0, jsx_runtime_1.jsx)(lucide_react_1.ExternalLink, {
                        className: "ml-1 h-3 w-3",
                      }),
                    ],
                  }),
                ],
              }),
            }),
          ],
        }),
      }),
    ],
  });
}
exports.default = MarketingPlatformIntegrations;

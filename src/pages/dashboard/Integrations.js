"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create(
        (typeof Iterator === "function" ? Iterator : Object).prototype,
      );
    return (
      (g.next = verb(0)),
      (g["throw"] = verb(1)),
      (g["return"] = verb(2)),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Integrations;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var tabs_1 = require("@/components/ui/tabs");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
var badge_1 = require("@/components/ui/badge");
var dropdown_menu_1 = require("@/components/ui/dropdown-menu");
var DocumentGenerator_1 = require("@/components/integrations/DocumentGenerator");
function Integrations() {
  var _this = this;
  var _a = (0, react_1.useState)("crm"),
    activeTab = _a[0],
    setActiveTab = _a[1];
  var _b = (0, react_1.useState)(""),
    webhookUrl = _b[0],
    setWebhookUrl = _b[1];
  var _c = (0, react_1.useState)(false),
    isLoading = _c[0],
    setIsLoading = _c[1];
  var handleSaveWebhook = function () {
    setIsLoading(true);
    setTimeout(function () {
      sonner_1.toast.success("Webhook URL saved successfully");
      setIsLoading(false);
    }, 1000);
  };
  var handleConnect = function (platform) {
    sonner_1.toast.success("Initiating connection to ".concat(platform, "..."));
    // In a real implementation, this would redirect to the platform's OAuth flow
  };
  var handleZapierTrigger = function (e) {
    return __awaiter(_this, void 0, void 0, function () {
      var error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            e.preventDefault();
            if (!webhookUrl) {
              sonner_1.toast.error("Please enter your Zapier webhook URL");
              return [2 /*return*/];
            }
            setIsLoading(true);
            console.log("Triggering Zapier webhook:", webhookUrl);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            return [
              4 /*yield*/,
              fetch(webhookUrl, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                mode: "no-cors", // Handle CORS
                body: JSON.stringify({
                  timestamp: new Date().toISOString(),
                  triggered_from: window.location.origin,
                  event_type: "integration_test",
                }),
              }),
            ];
          case 2:
            _a.sent();
            sonner_1.toast.success(
              "Request sent to Zapier. Check your Zap's history to confirm it was triggered.",
            );
            return [3 /*break*/, 5];
          case 3:
            error_1 = _a.sent();
            console.error("Error triggering webhook:", error_1);
            sonner_1.toast.error(
              "Failed to trigger the Zapier webhook. Please check the URL and try again.",
            );
            return [3 /*break*/, 5];
          case 4:
            setIsLoading(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "animate-fadeIn space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex justify-between items-center",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsx)("h1", {
                className: "text-2xl font-bold tracking-tight",
                children: "Integrations",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground",
                children:
                  "Connect Allora AI with your favorite platforms and services",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            variant: "outline",
            className: "gap-1",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                className: "h-4 w-4",
              }),
              "Refresh Connections",
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
        defaultValue: "crm",
        value: activeTab,
        onValueChange: setActiveTab,
        className: "w-full",
        children: [
          (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
            className: "grid grid-cols-4 mb-6",
            children: [
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "crm",
                children: "CRM Systems",
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "marketing",
                children: "Marketing Platforms",
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "documents",
                children: "Document Generation",
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "webhooks",
                children: "Webhooks & APIs",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(tabs_1.TabsContent, {
            value: "crm",
            className: "space-y-6",
            children: [
              (0, jsx_runtime_1.jsx)("div", {
                className:
                  "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                children: [
                  {
                    name: "Salesforce",
                    status: "connected",
                    icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, {
                      className: "h-8 w-8 text-blue-600",
                    }),
                  },
                  {
                    name: "HubSpot",
                    status: "not-connected",
                    icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, {
                      className: "h-8 w-8 text-orange-500",
                    }),
                  },
                  {
                    name: "Zoho CRM",
                    status: "not-connected",
                    icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, {
                      className: "h-8 w-8 text-green-500",
                    }),
                  },
                  {
                    name: "Pipedrive",
                    status: "not-connected",
                    icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, {
                      className: "h-8 w-8 text-green-600",
                    }),
                  },
                  {
                    name: "Microsoft Dynamics",
                    status: "not-connected",
                    icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, {
                      className: "h-8 w-8 text-blue-500",
                    }),
                  },
                ].map(function (crm) {
                  return (0, jsx_runtime_1.jsxs)(
                    card_1.Card,
                    {
                      className: "relative overflow-hidden",
                      children: [
                        (0, jsx_runtime_1.jsx)("div", {
                          className: "absolute top-0 right-0 p-3",
                          children: (0, jsx_runtime_1.jsxs)(
                            dropdown_menu_1.DropdownMenu,
                            {
                              children: [
                                (0, jsx_runtime_1.jsx)(
                                  dropdown_menu_1.DropdownMenuTrigger,
                                  {
                                    asChild: true,
                                    children: (0, jsx_runtime_1.jsx)(
                                      button_1.Button,
                                      {
                                        variant: "ghost",
                                        size: "icon",
                                        className: "h-8 w-8",
                                        children: (0, jsx_runtime_1.jsx)(
                                          lucide_react_1.MoreHorizontal,
                                          { className: "h-4 w-4" },
                                        ),
                                      },
                                    ),
                                  },
                                ),
                                (0, jsx_runtime_1.jsxs)(
                                  dropdown_menu_1.DropdownMenuContent,
                                  {
                                    align: "end",
                                    children: [
                                      (0, jsx_runtime_1.jsx)(
                                        dropdown_menu_1.DropdownMenuLabel,
                                        { children: "Options" },
                                      ),
                                      (0, jsx_runtime_1.jsx)(
                                        dropdown_menu_1.DropdownMenuSeparator,
                                        {},
                                      ),
                                      (0, jsx_runtime_1.jsx)(
                                        dropdown_menu_1.DropdownMenuItem,
                                        { children: "View Connection Details" },
                                      ),
                                      (0, jsx_runtime_1.jsx)(
                                        dropdown_menu_1.DropdownMenuItem,
                                        { children: "Sync Data" },
                                      ),
                                      (0, jsx_runtime_1.jsx)(
                                        dropdown_menu_1.DropdownMenuItem,
                                        {
                                          className: "text-destructive",
                                          children: "Disconnect",
                                        },
                                      ),
                                    ],
                                  },
                                ),
                              ],
                            },
                          ),
                        }),
                        (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                          children: (0, jsx_runtime_1.jsxs)("div", {
                            className: "flex items-center space-x-3",
                            children: [
                              crm.icon,
                              (0, jsx_runtime_1.jsxs)("div", {
                                children: [
                                  (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                                    className: "text-base",
                                    children: crm.name,
                                  }),
                                  (0, jsx_runtime_1.jsx)(
                                    card_1.CardDescription,
                                    {
                                      children:
                                        crm.status === "connected"
                                          ? "Connected & Syncing"
                                          : "Not Connected",
                                    },
                                  ),
                                ],
                              }),
                            ],
                          }),
                        }),
                        (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                          children: (0, jsx_runtime_1.jsx)("div", {
                            className: "mt-2",
                            children:
                              crm.status === "connected"
                                ? (0, jsx_runtime_1.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                      (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
                                        className:
                                          "bg-green-100 text-green-800 hover:bg-green-100",
                                        children: [
                                          (0, jsx_runtime_1.jsx)(
                                            lucide_react_1.Check,
                                            { className: "mr-1 h-3 w-3" },
                                          ),
                                          " Connected",
                                        ],
                                      }),
                                      (0, jsx_runtime_1.jsx)("p", {
                                        className:
                                          "text-xs text-muted-foreground mt-2",
                                        children: "Last synced: 27 minutes ago",
                                      }),
                                      (0, jsx_runtime_1.jsxs)("div", {
                                        className: "flex mt-4 space-x-2",
                                        children: [
                                          (0, jsx_runtime_1.jsxs)(
                                            button_1.Button,
                                            {
                                              size: "sm",
                                              variant: "outline",
                                              className: "text-xs",
                                              children: [
                                                (0, jsx_runtime_1.jsx)(
                                                  lucide_react_1.RefreshCw,
                                                  { className: "mr-1 h-3 w-3" },
                                                ),
                                                " Sync Now",
                                              ],
                                            },
                                          ),
                                          (0, jsx_runtime_1.jsx)(
                                            button_1.Button,
                                            {
                                              size: "sm",
                                              variant: "outline",
                                              className: "text-xs",
                                              children: "Settings",
                                            },
                                          ),
                                        ],
                                      }),
                                    ],
                                  })
                                : (0, jsx_runtime_1.jsxs)(button_1.Button, {
                                    onClick: function () {
                                      return handleConnect(crm.name);
                                    },
                                    className: "w-full mt-2",
                                    children: [
                                      (0, jsx_runtime_1.jsx)(
                                        lucide_react_1.Plug,
                                        { className: "mr-2 h-4 w-4" },
                                      ),
                                      "Connect",
                                    ],
                                  }),
                          }),
                        }),
                      ],
                    },
                    crm.name,
                  );
                }),
              }),
              (0, jsx_runtime_1.jsxs)(card_1.Card, {
                children: [
                  (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                    children: [
                      (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                        children: "CRM Integration Benefits",
                      }),
                      (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                        children:
                          "Connecting your CRM system enables these powerful features",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                    children: (0, jsx_runtime_1.jsxs)("ul", {
                      className: "grid gap-2 md:grid-cols-2",
                      children: [
                        (0, jsx_runtime_1.jsxs)("li", {
                          className: "flex items-start",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Check, {
                              className: "mr-2 h-5 w-5 text-green-500 shrink-0",
                            }),
                            (0, jsx_runtime_1.jsx)("span", {
                              children:
                                "Automatic lead import and synchronization",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("li", {
                          className: "flex items-start",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Check, {
                              className: "mr-2 h-5 w-5 text-green-500 shrink-0",
                            }),
                            (0, jsx_runtime_1.jsx)("span", {
                              children:
                                "AI-enhanced lead scoring based on CRM data",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("li", {
                          className: "flex items-start",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Check, {
                              className: "mr-2 h-5 w-5 text-green-500 shrink-0",
                            }),
                            (0, jsx_runtime_1.jsx)("span", {
                              children: "Campaign performance tracking in CRM",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("li", {
                          className: "flex items-start",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Check, {
                              className: "mr-2 h-5 w-5 text-green-500 shrink-0",
                            }),
                            (0, jsx_runtime_1.jsx)("span", {
                              children:
                                "Smarter insights using historical CRM data",
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
          (0, jsx_runtime_1.jsxs)(tabs_1.TabsContent, {
            value: "marketing",
            className: "space-y-6",
            children: [
              (0, jsx_runtime_1.jsx)("div", {
                className:
                  "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                children: [
                  {
                    name: "Google Ads",
                    status: "connected",
                    icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, {
                      className: "h-8 w-8 text-blue-600",
                    }),
                  },
                  {
                    name: "Meta Ads",
                    status: "not-connected",
                    icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, {
                      className: "h-8 w-8 text-blue-500",
                    }),
                  },
                  {
                    name: "LinkedIn Ads",
                    status: "not-connected",
                    icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, {
                      className: "h-8 w-8 text-blue-700",
                    }),
                  },
                  {
                    name: "TikTok Ads",
                    status: "not-connected",
                    icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, {
                      className: "h-8 w-8 text-black",
                    }),
                  },
                  {
                    name: "Mailchimp",
                    status: "connected",
                    icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, {
                      className: "h-8 w-8 text-yellow-500",
                    }),
                  },
                ].map(function (platform) {
                  return (0, jsx_runtime_1.jsxs)(
                    card_1.Card,
                    {
                      className: "relative overflow-hidden",
                      children: [
                        (0, jsx_runtime_1.jsx)("div", {
                          className: "absolute top-0 right-0 p-3",
                          children: (0, jsx_runtime_1.jsxs)(
                            dropdown_menu_1.DropdownMenu,
                            {
                              children: [
                                (0, jsx_runtime_1.jsx)(
                                  dropdown_menu_1.DropdownMenuTrigger,
                                  {
                                    asChild: true,
                                    children: (0, jsx_runtime_1.jsx)(
                                      button_1.Button,
                                      {
                                        variant: "ghost",
                                        size: "icon",
                                        className: "h-8 w-8",
                                        children: (0, jsx_runtime_1.jsx)(
                                          lucide_react_1.MoreHorizontal,
                                          { className: "h-4 w-4" },
                                        ),
                                      },
                                    ),
                                  },
                                ),
                                (0, jsx_runtime_1.jsxs)(
                                  dropdown_menu_1.DropdownMenuContent,
                                  {
                                    align: "end",
                                    children: [
                                      (0, jsx_runtime_1.jsx)(
                                        dropdown_menu_1.DropdownMenuLabel,
                                        { children: "Options" },
                                      ),
                                      (0, jsx_runtime_1.jsx)(
                                        dropdown_menu_1.DropdownMenuSeparator,
                                        {},
                                      ),
                                      (0, jsx_runtime_1.jsx)(
                                        dropdown_menu_1.DropdownMenuItem,
                                        { children: "View Connection Details" },
                                      ),
                                      (0, jsx_runtime_1.jsx)(
                                        dropdown_menu_1.DropdownMenuItem,
                                        { children: "Sync Data" },
                                      ),
                                      (0, jsx_runtime_1.jsx)(
                                        dropdown_menu_1.DropdownMenuItem,
                                        {
                                          className: "text-destructive",
                                          children: "Disconnect",
                                        },
                                      ),
                                    ],
                                  },
                                ),
                              ],
                            },
                          ),
                        }),
                        (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                          children: (0, jsx_runtime_1.jsxs)("div", {
                            className: "flex items-center space-x-3",
                            children: [
                              platform.icon,
                              (0, jsx_runtime_1.jsxs)("div", {
                                children: [
                                  (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                                    className: "text-base",
                                    children: platform.name,
                                  }),
                                  (0, jsx_runtime_1.jsx)(
                                    card_1.CardDescription,
                                    {
                                      children:
                                        platform.status === "connected"
                                          ? "Connected & Active"
                                          : "Not Connected",
                                    },
                                  ),
                                ],
                              }),
                            ],
                          }),
                        }),
                        (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                          children: (0, jsx_runtime_1.jsx)("div", {
                            className: "mt-2",
                            children:
                              platform.status === "connected"
                                ? (0, jsx_runtime_1.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                      (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
                                        className:
                                          "bg-green-100 text-green-800 hover:bg-green-100",
                                        children: [
                                          (0, jsx_runtime_1.jsx)(
                                            lucide_react_1.Check,
                                            { className: "mr-1 h-3 w-3" },
                                          ),
                                          " Connected",
                                        ],
                                      }),
                                      (0, jsx_runtime_1.jsx)("p", {
                                        className:
                                          "text-xs text-muted-foreground mt-2",
                                        children: "Last synced: 2 hours ago",
                                      }),
                                      (0, jsx_runtime_1.jsxs)("div", {
                                        className: "flex mt-4 space-x-2",
                                        children: [
                                          (0, jsx_runtime_1.jsxs)(
                                            button_1.Button,
                                            {
                                              size: "sm",
                                              variant: "outline",
                                              className: "text-xs",
                                              children: [
                                                (0, jsx_runtime_1.jsx)(
                                                  lucide_react_1.RefreshCw,
                                                  { className: "mr-1 h-3 w-3" },
                                                ),
                                                " Sync Now",
                                              ],
                                            },
                                          ),
                                          (0, jsx_runtime_1.jsx)(
                                            button_1.Button,
                                            {
                                              size: "sm",
                                              variant: "outline",
                                              className: "text-xs",
                                              children: "Settings",
                                            },
                                          ),
                                        ],
                                      }),
                                    ],
                                  })
                                : (0, jsx_runtime_1.jsxs)(button_1.Button, {
                                    onClick: function () {
                                      return handleConnect(platform.name);
                                    },
                                    className: "w-full mt-2",
                                    children: [
                                      (0, jsx_runtime_1.jsx)(
                                        lucide_react_1.Plug,
                                        { className: "mr-2 h-4 w-4" },
                                      ),
                                      "Connect",
                                    ],
                                  }),
                          }),
                        }),
                      ],
                    },
                    platform.name,
                  );
                }),
              }),
              (0, jsx_runtime_1.jsxs)(card_1.Card, {
                children: [
                  (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                    children: [
                      (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                        children: "Marketing Platform Benefits",
                      }),
                      (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                        children:
                          "Connect your marketing platforms to enhance your campaigns",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                    children: (0, jsx_runtime_1.jsxs)("ul", {
                      className: "grid gap-2 md:grid-cols-2",
                      children: [
                        (0, jsx_runtime_1.jsxs)("li", {
                          className: "flex items-start",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Check, {
                              className: "mr-2 h-5 w-5 text-green-500 shrink-0",
                            }),
                            (0, jsx_runtime_1.jsx)("span", {
                              children:
                                "AI-optimized ad copy and creative suggestions",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("li", {
                          className: "flex items-start",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Check, {
                              className: "mr-2 h-5 w-5 text-green-500 shrink-0",
                            }),
                            (0, jsx_runtime_1.jsx)("span", {
                              children:
                                "Unified campaign performance analytics",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("li", {
                          className: "flex items-start",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Check, {
                              className: "mr-2 h-5 w-5 text-green-500 shrink-0",
                            }),
                            (0, jsx_runtime_1.jsx)("span", {
                              children: "Cross-platform audience optimization",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("li", {
                          className: "flex items-start",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Check, {
                              className: "mr-2 h-5 w-5 text-green-500 shrink-0",
                            }),
                            (0, jsx_runtime_1.jsx)("span", {
                              children: "Campaign budget recommendations",
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
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "documents",
            className: "space-y-6",
            children: (0, jsx_runtime_1.jsx)(
              DocumentGenerator_1.DocumentGenerator,
              {},
            ),
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "webhooks",
            className: "space-y-6",
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "grid grid-cols-1 md:grid-cols-2 gap-6",
              children: [
                (0, jsx_runtime_1.jsxs)(card_1.Card, {
                  children: [
                    (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                      children: [
                        (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                          className: "flex items-center",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Wrench, {
                              className: "mr-2 h-5 w-5",
                            }),
                            "Zapier Integration",
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                          children:
                            "Connect Allora AI to 3,000+ apps with Zapier",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                      className: "space-y-4",
                      children: [
                        (0, jsx_runtime_1.jsxs)("form", {
                          onSubmit: handleZapierTrigger,
                          className: "space-y-4",
                          children: [
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "space-y-2",
                              children: [
                                (0, jsx_runtime_1.jsx)(label_1.Label, {
                                  htmlFor: "webhook-url",
                                  children: "Zapier Webhook URL",
                                }),
                                (0, jsx_runtime_1.jsx)(input_1.Input, {
                                  id: "webhook-url",
                                  placeholder:
                                    "https://hooks.zapier.com/hooks/catch/...",
                                  value: webhookUrl,
                                  onChange: function (e) {
                                    return setWebhookUrl(e.target.value);
                                  },
                                }),
                                (0, jsx_runtime_1.jsx)("p", {
                                  className: "text-xs text-muted-foreground",
                                  children:
                                    'Create a "Webhook" trigger in Zapier and paste the URL here',
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "flex space-x-2",
                              children: [
                                (0, jsx_runtime_1.jsx)(button_1.Button, {
                                  type: "submit",
                                  disabled: isLoading || !webhookUrl,
                                  children: isLoading
                                    ? "Sending..."
                                    : "Test Webhook",
                                }),
                                (0, jsx_runtime_1.jsx)(button_1.Button, {
                                  type: "button",
                                  variant: "outline",
                                  onClick: handleSaveWebhook,
                                  disabled: isLoading,
                                  children: "Save",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "pt-4",
                          children: [
                            (0, jsx_runtime_1.jsx)("h4", {
                              className: "text-sm font-medium mb-2",
                              children: "Popular Zapier use cases:",
                            }),
                            (0, jsx_runtime_1.jsxs)("ul", {
                              className: "text-sm space-y-1",
                              children: [
                                (0, jsx_runtime_1.jsxs)("li", {
                                  className: "flex items-center",
                                  children: [
                                    (0, jsx_runtime_1.jsx)(
                                      lucide_react_1.Check,
                                      {
                                        className:
                                          "mr-2 h-4 w-4 text-green-500",
                                      },
                                    ),
                                    "Send new Allora AI strategies to Slack",
                                  ],
                                }),
                                (0, jsx_runtime_1.jsxs)("li", {
                                  className: "flex items-center",
                                  children: [
                                    (0, jsx_runtime_1.jsx)(
                                      lucide_react_1.Check,
                                      {
                                        className:
                                          "mr-2 h-4 w-4 text-green-500",
                                      },
                                    ),
                                    "Create tasks in Asana from AI recommendations",
                                  ],
                                }),
                                (0, jsx_runtime_1.jsxs)("li", {
                                  className: "flex items-center",
                                  children: [
                                    (0, jsx_runtime_1.jsx)(
                                      lucide_react_1.Check,
                                      {
                                        className:
                                          "mr-2 h-4 w-4 text-green-500",
                                      },
                                    ),
                                    "Add new leads to your email marketing platform",
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(card_1.Card, {
                  children: [
                    (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                      children: [
                        (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                          className: "flex items-center",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Link2, {
                              className: "mr-2 h-5 w-5",
                            }),
                            "API Access",
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                          children: "Access Allora AI via our RESTful API",
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
                              htmlFor: "api-key",
                              children: "Your API Key",
                            }),
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "flex",
                              children: [
                                (0, jsx_runtime_1.jsx)(input_1.Input, {
                                  id: "api-key",
                                  type: "password",
                                  value:
                                    "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
                                  readOnly: true,
                                  className: "rounded-r-none",
                                }),
                                (0, jsx_runtime_1.jsx)(button_1.Button, {
                                  className: "rounded-l-none",
                                  variant: "secondary",
                                  children: "Show",
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-xs text-muted-foreground",
                              children:
                                "Use this API key to authenticate requests to the Allora AI API",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "pt-2 space-y-2",
                          children: [
                            (0, jsx_runtime_1.jsx)("h4", {
                              className: "text-sm font-medium",
                              children: "API Documentation",
                            }),
                            (0, jsx_runtime_1.jsxs)(button_1.Button, {
                              variant: "outline",
                              className: "w-full text-sm",
                              children: [
                                (0, jsx_runtime_1.jsx)(
                                  lucide_react_1.FileText,
                                  { className: "mr-2 h-4 w-4" },
                                ),
                                "View API Documentation",
                              ],
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "pt-2",
                          children: [
                            (0, jsx_runtime_1.jsx)("h4", {
                              className: "text-sm font-medium mb-2",
                              children: "Available API Endpoints:",
                            }),
                            (0, jsx_runtime_1.jsxs)("ul", {
                              className: "text-sm space-y-1",
                              children: [
                                (0, jsx_runtime_1.jsx)("li", {
                                  children:
                                    "\u2022 /api/strategies - Get AI business strategies",
                                }),
                                (0, jsx_runtime_1.jsx)("li", {
                                  children:
                                    "\u2022 /api/leads - Manage your leads",
                                }),
                                (0, jsx_runtime_1.jsx)("li", {
                                  children:
                                    "\u2022 /api/analytics - Access business analytics",
                                }),
                                (0, jsx_runtime_1.jsx)("li", {
                                  children:
                                    "\u2022 /api/recommendations - Get AI recommendations",
                                }),
                              ],
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
        ],
      }),
    ],
  });
}

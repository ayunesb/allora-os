"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BotDetail;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var card_1 = require("@/components/ui/card");
var avatar_1 = require("@/components/ui/avatar");
var badge_1 = require("@/components/ui/badge");
var button_1 = require("@/components/ui/button");
var tabs_1 = require("@/components/ui/tabs");
var lucide_react_1 = require("lucide-react");
var BotChatPanel_1 = require("@/components/bot-chat/BotChatPanel");
var BotSettingsPanel_1 = require("@/components/bot-chat/BotSettingsPanel");
var BotInfoPanel_1 = require("@/components/bot-chat/BotInfoPanel");
var AuthContext_1 = require("@/context/AuthContext");
var authCompatibility_1 = require("@/utils/authCompatibility");
function BotDetail(_a) {
  var initialBot = _a.bot;
  var botId = (0, react_router_dom_1.useParams)().botId;
  var navigate = (0, react_router_dom_1.useNavigate)();
  var profile = (0, AuthContext_1.useAuth)().profile;
  var _b = (0, react_1.useState)("chat"),
    activeTab = _b[0],
    setActiveTab = _b[1];
  var normalizedProfile = (0, authCompatibility_1.normalizeUserObject)(profile);
  // If no bot was passed in props, use the botId from URL params to create a default bot
  var bot = initialBot || {
    id: botId,
    name: "AI Advisor",
    title: "Business Strategist",
    expertise: "Growth Strategies",
    description:
      "I help businesses identify growth opportunities and develop strategic plans to achieve their goals.",
    avatar: "/ai-advisors/business-strategist.png",
    industry:
      (normalizedProfile === null || normalizedProfile === void 0
        ? void 0
        : normalizedProfile.industry) || "General Business",
    specialties: ["Market Analysis", "Competitive Strategy", "Growth Planning"],
  };
  var handleBackClick = function () {
    navigate("/dashboard/ai-bots");
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto px-4 py-6 max-w-5xl",
    children: [
      (0, jsx_runtime_1.jsxs)(button_1.Button, {
        variant: "ghost",
        size: "sm",
        className: "mb-4",
        onClick: handleBackClick,
        children: [
          (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowLeft, {
            className: "mr-2 h-4 w-4",
          }),
          "Back to Advisors",
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        className: "border-primary/20",
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
            className: "pb-4",
            children: (0, jsx_runtime_1.jsxs)("div", {
              className:
                "flex flex-col sm:flex-row items-center sm:items-start gap-4",
              children: [
                (0, jsx_runtime_1.jsxs)(avatar_1.Avatar, {
                  className: "h-16 w-16 border-2 border-primary/20",
                  children: [
                    (0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, {
                      src: bot.avatar,
                      alt: bot.name,
                    }),
                    (0, jsx_runtime_1.jsx)(avatar_1.AvatarFallback, {
                      className: "bg-primary/10 text-lg",
                      children: bot.name.charAt(0),
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "space-y-1 text-center sm:text-left",
                  children: [
                    (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                      className: "text-xl",
                      children: bot.name,
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                      className: "text-base",
                      children: bot.title,
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className:
                        "flex flex-wrap gap-2 justify-center sm:justify-start mt-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                          variant: "outline",
                          className: "bg-primary/10",
                          children: bot.expertise,
                        }),
                        bot.industry &&
                          (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                            variant: "outline",
                            className: "bg-secondary/10",
                            children: bot.industry,
                          }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
            value: activeTab,
            onValueChange: setActiveTab,
            className: "w-full",
            children: [
              (0, jsx_runtime_1.jsx)("div", {
                className: "px-4 sm:px-6",
                children: (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
                  className: "grid grid-cols-3 w-full",
                  children: [
                    (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, {
                      value: "chat",
                      className: "flex items-center gap-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.MessageCircle, {
                          className: "h-4 w-4",
                        }),
                        (0, jsx_runtime_1.jsx)("span", {
                          className: "hidden sm:inline",
                          children: "Chat",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, {
                      value: "info",
                      className: "flex items-center gap-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.Info, {
                          className: "h-4 w-4",
                        }),
                        (0, jsx_runtime_1.jsx)("span", {
                          className: "hidden sm:inline",
                          children: "Info",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, {
                      value: "settings",
                      className: "flex items-center gap-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.Settings, {
                          className: "h-4 w-4",
                        }),
                        (0, jsx_runtime_1.jsx)("span", {
                          className: "hidden sm:inline",
                          children: "Settings",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                className: "pt-6",
                children: [
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                    value: "chat",
                    className: "mt-0",
                    children: (0, jsx_runtime_1.jsx)(BotChatPanel_1.default, {
                      botId: bot.id || "",
                      bot: bot,
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                    value: "info",
                    className: "mt-0",
                    children: (0, jsx_runtime_1.jsx)(BotInfoPanel_1.default, {
                      bot: bot,
                      description: bot.description,
                      specialties: bot.specialties,
                      expertise: bot.expertise,
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                    value: "settings",
                    className: "mt-0",
                    children: (0, jsx_runtime_1.jsx)(
                      BotSettingsPanel_1.default,
                      { botId: bot.id || "", bot: bot },
                    ),
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

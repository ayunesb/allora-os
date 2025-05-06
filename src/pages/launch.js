"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LaunchPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var useUser_1 = require("@/hooks/useUser");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var react_router_dom_1 = require("react-router-dom");
var react_1 = require("react");
var Launch = function (_a) {
  var title = _a.title,
    description = _a.description;
  return (0, jsx_runtime_1.jsxs)("div", {
    children: [
      (0, jsx_runtime_1.jsx)("h1", { children: title }),
      (0, jsx_runtime_1.jsx)("p", { children: description }),
    ],
  });
};
var features = [
  "AI CEO Strategy Generator",
  "Campaign Deployment: WhatsApp, TikTok, Meta, Email",
  "Plugin ROI Tracking",
  "Public Vault + Strategy Remix",
  "Agent Wins + Tweet Automation",
  "Visual Campaign Builder",
  "Conversational AI Shopping Assistant",
];
function LaunchPage() {
  var user = (0, useUser_1.useUser)().user;
  var _a = (0, react_1.useState)(null),
    stats = _a[0],
    setStats = _a[1];
  (0, react_1.useEffect)(
    function () {
      if (user) {
        fetch("/api/galaxy/usage") // 👈 Replace with real endpoint
          .then(function (res) {
            return res.json();
          })
          .then(function (data) {
            return setStats(data);
          });
      }
    },
    [user],
  );
  return (0, jsx_runtime_1.jsxs)("div", {
    className:
      "min-h-screen bg-gradient-to-b from-background via-black/60 to-background text-white px-6 py-12 flex flex-col items-center",
    children: [
      (0, jsx_runtime_1.jsx)(lucide_react_1.Rocket, {
        className: "h-12 w-12 text-primary mb-4 animate-pulse",
      }),
      (0, jsx_runtime_1.jsx)("h1", {
        className: "text-4xl font-bold tracking-tight text-center mb-2",
        children: "Allora OS Galaxy v2.5 is Live",
      }),
      (0, jsx_runtime_1.jsx)("p", {
        className: "text-lg text-muted-foreground text-center max-w-xl mb-6",
        children:
          "The 90% AI business operating system \u2014 strategy, execution, and analytics, all in one.",
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className:
          "aspect-video w-full max-w-3xl rounded-xl overflow-hidden shadow-xl mb-6",
        children: (0, jsx_runtime_1.jsx)("iframe", {
          width: "100%",
          height: "100%",
          src: "https://www.youtube.com/embed/YOUR_VIDEO_ID_HERE",
          title: "Allora OS Launch Video",
          allow:
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
          allowFullScreen: true,
        }),
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "mb-6 text-left space-y-2 w-full max-w-md",
        children: features.map(function (f) {
          return (0, jsx_runtime_1.jsxs)(
            "div",
            {
              className:
                "flex items-center gap-2 text-sm text-muted-foreground",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Check, {
                  className: "text-green-400 h-4 w-4",
                }),
                f,
              ],
            },
            f,
          );
        }),
      }),
      (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
        to: "/onboarding",
        children: (0, jsx_runtime_1.jsx)(button_1.Button, {
          size: "lg",
          className: "text-white text-lg px-6 py-4 font-semibold",
          children: "Get Started",
        }),
      }),
      user &&
        stats &&
        (0, jsx_runtime_1.jsxs)("div", {
          className:
            "mt-8 w-full max-w-2xl border border-white/10 bg-white/5 rounded-xl p-6 space-y-4",
          children: [
            (0, jsx_runtime_1.jsxs)("h3", {
              className: "text-xl font-semibold flex items-center gap-2",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.BarChart3, {
                  className: "w-5 h-5",
                }),
                " Galaxy Usage Stats",
              ],
            }),
            (0, jsx_runtime_1.jsxs)("ul", {
              className: "text-sm text-muted-foreground",
              children: [
                (0, jsx_runtime_1.jsxs)("li", {
                  children: [
                    "\uD83E\uDDE0 AI Strategies Run: ",
                    stats.totalStrategies,
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("li", {
                  children: [
                    "\uD83D\uDCE6 Plugins Installed: ",
                    stats.totalPlugins,
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("li", {
                  children: [
                    "\uD83D\uDE80 Campaigns Launched: ",
                    stats.totalCampaigns,
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("li", {
                  children: [
                    "\uD83C\uDFC6 Agent Wins Published: ",
                    stats.totalAgentWins,
                  ],
                }),
              ],
            }),
          ],
        }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "mt-10",
        children: [
          (0, jsx_runtime_1.jsx)("script", {
            async: true,
            defer: true,
            src: "https://buttons.github.io/buttons.tsx",
          }),
          (0, jsx_runtime_1.jsx)("iframe", {
            src: "https://www.producthunt.com/widgets/embed.tsx",
            width: "100%",
            height: "70",
            style: { border: "none", overflow: "hidden" },
            title: "Product Hunt Widget",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)("p", {
        className: "mt-10 text-xs text-muted-foreground text-center",
        children: "Built with Supabase, Vite, OpenAI, ShadCN, and pure vision.",
      }),
    ],
  });
}

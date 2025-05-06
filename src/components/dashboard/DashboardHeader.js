"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardHeader = DashboardHeader;
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var badge_1 = require("@/components/ui/badge");
var react_router_dom_1 = require("react-router-dom");
var HelpButton_1 = require("@/components/help/HelpButton");
var SessionRefreshBanner_1 = require("@/components/dashboard/SessionRefreshBanner");
function DashboardHeader(_a) {
  var pendingApprovals = _a.pendingApprovals;
  return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
    children: [
      (0, jsx_runtime_1.jsx)(SessionRefreshBanner_1.SessionRefreshBanner, {}),
      (0, jsx_runtime_1.jsxs)("div", {
        className:
          "flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center py-6",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "animate-fadeIn flex items-center",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Home, {
                className: "h-8 w-8 text-primary mr-3 hidden md:block",
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                children: [
                  (0, jsx_runtime_1.jsx)("h1", {
                    className:
                      "text-3xl font-bold tracking-tight gradient-text",
                    children: "Dashboard",
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-muted-foreground mt-1",
                    children:
                      "Get a snapshot of your business performance and AI recommendations",
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex items-center gap-3 animate-slideIn",
            style: { animationDelay: "0.2s" },
            children: [
              (0, jsx_runtime_1.jsx)(HelpButton_1.HelpButton, {
                contextId: "dashboard",
                variant: "text",
              }),
              pendingApprovals && pendingApprovals > 0
                ? (0, jsx_runtime_1.jsx)(button_1.Button, {
                    asChild: true,
                    variant: "outline",
                    className: "gap-2 hover-glow",
                    children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, {
                      to: "/dashboard/approvals",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.Bell, {
                          className: "h-4 w-4 text-primary",
                        }),
                        "Approvals",
                        (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                          variant: "destructive",
                          className: "ml-1 animate-pulse-slow",
                          children: pendingApprovals,
                        }),
                      ],
                    }),
                  })
                : null,
            ],
          }),
        ],
      }),
    ],
  });
}

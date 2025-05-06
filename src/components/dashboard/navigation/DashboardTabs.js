"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardTabs = DashboardTabs;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var lucide_react_1 = require("lucide-react");
var NavItem = function (_a) {
  var to = _a.to,
    icon = _a.icon,
    children = _a.children,
    end = _a.end;
  return (0, jsx_runtime_1.jsxs)(react_router_dom_1.NavLink, {
    to: to,
    end: end,
    className: function (_a) {
      var isActive = _a.isActive;
      return "flex items-center gap-2 px-3 py-2 rounded-md transition-colors ".concat(
        isActive ? "bg-primary text-primary-foreground" : "hover:bg-secondary",
      );
    },
    children: [icon, (0, jsx_runtime_1.jsx)("span", { children: children })],
  });
};
function DashboardTabs() {
  return (0, jsx_runtime_1.jsxs)("nav", {
    className: "flex-1 space-y-1",
    children: [
      (0, jsx_runtime_1.jsx)(NavItem, {
        to: "/dashboard",
        icon: (0, jsx_runtime_1.jsx)(lucide_react_1.LayoutDashboard, {
          className: "h-5 w-5",
        }),
        end: true,
        children: "Dashboard",
      }),
      (0, jsx_runtime_1.jsx)(NavItem, {
        to: "/dashboard/leads",
        icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Users, {
          className: "h-5 w-5",
        }),
        children: "Leads",
      }),
      (0, jsx_runtime_1.jsx)(NavItem, {
        to: "/dashboard/campaigns",
        icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Megaphone, {
          className: "h-5 w-5",
        }),
        children: "Campaigns",
      }),
      (0, jsx_runtime_1.jsx)(NavItem, {
        to: "/dashboard/strategies",
        icon: (0, jsx_runtime_1.jsx)(lucide_react_1.FileText, {
          className: "h-5 w-5",
        }),
        children: "Strategies",
      }),
      (0, jsx_runtime_1.jsx)(NavItem, {
        to: "/dashboard/calls",
        icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Phone, {
          className: "h-5 w-5",
        }),
        children: "Calls",
      }),
      (0, jsx_runtime_1.jsx)(NavItem, {
        to: "/dashboard/ai-bots",
        icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Bot, {
          className: "h-5 w-5",
        }),
        children: "AI Bots",
      }),
      (0, jsx_runtime_1.jsx)(NavItem, {
        to: "/dashboard/insights",
        icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Lightbulb, {
          className: "h-5 w-5",
        }),
        children: "Insights",
      }),
      (0, jsx_runtime_1.jsx)(NavItem, {
        to: "/dashboard/analytics",
        icon: (0, jsx_runtime_1.jsx)(lucide_react_1.BarChartHorizontal, {
          className: "h-5 w-5",
        }),
        children: "Analytics",
      }),
      (0, jsx_runtime_1.jsx)(NavItem, {
        to: "/galaxy/plugins/leaderboard",
        icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, {
          className: "h-5 w-5",
        }),
        children: "Plugin Leaderboard",
      }),
      (0, jsx_runtime_1.jsx)(NavItem, {
        to: "/academy",
        icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Trophy, {
          className: "h-5 w-5",
        }),
        children: "Academy",
      }),
      (0, jsx_runtime_1.jsx)(NavItem, {
        to: "/vault/templates",
        icon: (0, jsx_runtime_1.jsx)(lucide_react_1.File, {
          className: "h-5 w-5",
        }),
        children: "Strategy Templates",
      }),
      (0, jsx_runtime_1.jsx)(NavItem, {
        to: "/dashboard/profile",
        icon: (0, jsx_runtime_1.jsx)(lucide_react_1.UserCircle, {
          className: "h-5 w-5",
        }),
        children: "Profile",
      }),
      (0, jsx_runtime_1.jsx)(NavItem, {
        to: "/dashboard/settings",
        icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Settings, {
          className: "h-5 w-5",
        }),
        children: "Settings",
      }),
    ],
  });
}

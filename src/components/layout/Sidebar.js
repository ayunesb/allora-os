"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sidebar = Sidebar;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var utils_1 = require("@/lib/utils");
var navItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Campaigns", path: "/dashboard/campaigns" },
  { name: "Settings", path: "/dashboard/settings" },
  { name: "KPI Dashboard", path: "/dashboard/kpis" },
];
var navigation = [
  {
    title: "Main",
    links: [{ label: "Dashboard", href: "/dashboard", icon: "🏠" }],
  },
  {
    title: "Explore",
    links: [
      {
        label: "Galaxy",
        href: "/explore/galaxy",
        icon: "🌌",
      },
    ],
  },
];
function Sidebar() {
  return (0, jsx_runtime_1.jsxs)("aside", {
    className: "w-64 border-r bg-card shadow-md dark:bg-muted/20",
    children: [
      (0, jsx_runtime_1.jsx)("div", {
        className: "p-6 text-xl font-bold tracking-wide",
        children: "Allora OS",
      }),
      (0, jsx_runtime_1.jsx)("nav", {
        className: "flex flex-col space-y-2 px-4",
        children: navItems.map(function (item) {
          return (0, jsx_runtime_1.jsx)(
            react_router_dom_1.NavLink,
            {
              to: item.path,
              className: function (_a) {
                var isActive = _a.isActive;
                return (0, utils_1.cn)(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-muted text-accent-foreground"
                    : "text-muted-foreground hover:text-primary",
                );
              },
              children: item.name,
            },
            item.path,
          );
        }),
      }),
    ],
  });
}

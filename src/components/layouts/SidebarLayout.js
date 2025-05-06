"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SidebarLayout;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var theme_toggle_1 = require("@/components/theme-toggle");
var clsx_1 = require("clsx");
var navLinks = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "KPI Dashboard", path: "/dashboard/kpis" },
  { label: "Campaigns", path: "/dashboard/campaigns" },
  { label: "Executives", path: "/dashboard/executives" },
  { label: "AI Settings", path: "/dashboard/ai-settings" },
  { label: "Galaxy Explorer", path: "/explore/galaxy" },
];
function SidebarLayout() {
  var pathname = (0, react_router_dom_1.useLocation)().pathname;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "flex h-screen bg-background text-foreground",
    children: [
      (0, jsx_runtime_1.jsxs)("aside", {
        className: "w-60 bg-muted border-r border-border p-4 space-y-6",
        children: [
          (0, jsx_runtime_1.jsx)("div", {
            className: "text-lg font-bold tracking-wide",
            children: "Allora OS",
          }),
          (0, jsx_runtime_1.jsx)("nav", {
            className: "flex flex-col gap-2",
            children: navLinks.map(function (link) {
              return (0, jsx_runtime_1.jsx)(
                react_router_dom_1.Link,
                {
                  to: link.path,
                  className: (0, clsx_1.default)(
                    "text-sm px-3 py-2 rounded-md transition",
                    pathname.startsWith(link.path)
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-muted/70",
                  ),
                  children: link.label,
                },
                link.path,
              );
            }),
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "absolute bottom-4 left-4",
            children: (0, jsx_runtime_1.jsx)(theme_toggle_1.ThemeToggle, {}),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)("main", {
        className: "flex-1 p-6 overflow-y-auto",
        children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {}),
      }),
    ],
  });
}

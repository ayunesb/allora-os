"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sidebar = Sidebar;
var jsx_runtime_1 = require("react/jsx-runtime");
var utils_1 = require("@/lib/utils");
var react_router_dom_1 = require("react-router-dom");
var lucide_react_1 = require("lucide-react");
function Sidebar(_a) {
  var className = _a.className;
  var navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Home, {
        className: "h-5 w-5",
      }),
    },
    {
      name: "AI Executives",
      path: "/dashboard/ai-executives",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Users, {
        className: "h-5 w-5",
      }),
    },
    {
      name: "Strategy",
      path: "/dashboard/strategy",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Zap, {
        className: "h-5 w-5",
      }),
    },
    {
      name: "Marketing",
      path: "/dashboard/marketing",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.BarChart2, {
        className: "h-5 w-5",
      }),
    },
    {
      name: "Communication",
      path: "/dashboard/communication",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.MessageSquare, {
        className: "h-5 w-5",
      }),
    },
    {
      name: "Calendar",
      path: "/dashboard/calendar",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, {
        className: "h-5 w-5",
      }),
    },
    {
      name: "Documentation",
      path: "/dashboard/docs",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.FileText, {
        className: "h-5 w-5",
      }),
    },
    {
      name: "Launch",
      path: "/dashboard/launch",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Rocket, {
        className: "h-5 w-5",
      }),
    },
  ];
  var adminItems = [
    {
      name: "Admin Panel",
      path: "/admin",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.PanelRight, {
        className: "h-5 w-5",
      }),
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Settings, {
        className: "h-5 w-5",
      }),
    },
  ];
  return (0, jsx_runtime_1.jsxs)("div", {
    className: (0, utils_1.cn)(
      "flex flex-col h-screen bg-background",
      className,
    ),
    children: [
      (0, jsx_runtime_1.jsx)("div", {
        className: "px-4 py-6",
        children: (0, jsx_runtime_1.jsx)("div", {
          className: "flex items-center",
          children: (0, jsx_runtime_1.jsx)("h1", {
            className: "text-xl font-bold",
            children: "Allora AI",
          }),
        }),
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex-1 overflow-y-auto",
        children: [
          (0, jsx_runtime_1.jsx)("nav", {
            className: "px-2 space-y-1",
            children: navItems.map(function (item) {
              return (0, jsx_runtime_1.jsxs)(
                react_router_dom_1.NavLink,
                {
                  to: item.path,
                  className: function (_a) {
                    var isActive = _a.isActive;
                    return (0, utils_1.cn)(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted text-muted-foreground hover:text-foreground",
                    );
                  },
                  children: [item.icon, item.name],
                },
                item.path,
              );
            }),
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "mt-6 border-t pt-4",
            children: [
              (0, jsx_runtime_1.jsx)("div", {
                className: "px-2 mb-2 text-xs uppercase text-muted-foreground",
                children: "Administration",
              }),
              (0, jsx_runtime_1.jsx)("nav", {
                className: "px-2 space-y-1",
                children: adminItems.map(function (item) {
                  return (0, jsx_runtime_1.jsxs)(
                    react_router_dom_1.NavLink,
                    {
                      to: item.path,
                      className: function (_a) {
                        var isActive = _a.isActive;
                        return (0, utils_1.cn)(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted text-muted-foreground hover:text-foreground",
                        );
                      },
                      children: [item.icon, item.name],
                    },
                    item.path,
                  );
                }),
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "px-4 py-4 border-t",
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "flex items-center gap-3",
          children: [
            (0, jsx_runtime_1.jsx)("div", {
              className:
                "w-8 h-8 rounded-full bg-muted flex items-center justify-center",
              children: (0, jsx_runtime_1.jsx)(lucide_react_1.Users, {
                className: "h-4 w-4",
              }),
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex-1 min-w-0",
              children: [
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-sm font-medium truncate",
                  children: "Account",
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-xs text-muted-foreground truncate",
                  children: "Manage settings",
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}

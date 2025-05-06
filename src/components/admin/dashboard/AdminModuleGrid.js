"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModuleGrid = AdminModuleGrid;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var lucide_react_1 = require("lucide-react");
function AdminModuleGrid(_a) {
  var _b = _a === void 0 ? {} : _a,
    modules = _b.modules,
    isLoading = _b.isLoading;
  // If modules are provided, use them. Otherwise use the default ones.
  var gridModules = modules || [
    {
      title: "User Management",
      description: "Manage system users and permissions",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Users, {
        className: "h-5 w-5",
      }),
      href: "/admin/users",
      count: undefined,
    },
    {
      title: "Companies",
      description: "Manage company accounts and details",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Building2, {
        className: "h-5 w-5",
      }),
      href: "/admin/companies",
      count: undefined,
    },
    {
      title: "Webhooks",
      description: "Configure integrations with external services",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Webhook, {
        className: "h-5 w-5",
      }),
      href: "/admin/webhooks",
      count: undefined,
    },
    {
      title: "API Keys",
      description: "Manage API keys for external services",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Key, {
        className: "h-5 w-5",
      }),
      href: "/admin/api-config",
      count: undefined,
    },
    {
      title: "Database Verification",
      description: "Verify database structure and security",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Database, {
        className: "h-5 w-5",
      }),
      href: "/admin/database",
      count: undefined,
    },
    {
      title: "Launch Check",
      description: "Verify system readiness for production",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.RocketIcon, {
        className: "h-5 w-5",
      }),
      href: "/admin/launch-check",
      count: undefined,
    },
    {
      title: "Launch Preparation",
      description: "Prepare and deploy the application",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.RocketIcon, {
        className: "h-5 w-5",
      }),
      href: "/admin/launch-prep",
      highlight: true,
      count: undefined,
    },
    {
      title: "System Settings",
      description: "Configure global system preferences",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Settings, {
        className: "h-5 w-5",
      }),
      href: "/admin/settings",
      count: undefined,
    },
  ];
  return (0, jsx_runtime_1.jsx)("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6",
    children: gridModules.map(function (module, index) {
      return (0, jsx_runtime_1.jsx)(
        ModuleCard,
        {
          title: module.title,
          description: module.description,
          icon: module.icon,
          href: module.href,
          highlight: module.highlight,
          count: module.count,
        },
        index,
      );
    }),
  });
}
function ModuleCard(_a) {
  var title = _a.title,
    description = _a.description,
    icon = _a.icon,
    href = _a.href,
    count = _a.count,
    _b = _a.highlight,
    highlight = _b === void 0 ? false : _b;
  return (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, {
    to: href,
    className: "flex flex-col p-6 rounded-xl transition-all ".concat(
      highlight
        ? "bg-primary/10 border border-primary/20 hover:bg-primary/15"
        : "bg-card border border-border hover:bg-accent/50",
    ),
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex justify-between items-start",
        children: [
          (0, jsx_runtime_1.jsx)("div", {
            className: "p-2 rounded-full w-fit ".concat(
              highlight ? "bg-primary/20" : "bg-secondary",
            ),
            children: icon,
          }),
          count &&
            (0, jsx_runtime_1.jsx)("span", {
              className:
                "text-sm font-semibold bg-secondary/80 px-2 py-1 rounded",
              children: count,
            }),
        ],
      }),
      (0, jsx_runtime_1.jsx)("h3", {
        className: "text-lg font-medium mt-4 ".concat(
          highlight ? "text-primary" : "",
        ),
        children: title,
      }),
      (0, jsx_runtime_1.jsx)("p", {
        className: "text-muted-foreground text-sm mt-1",
        children: description,
      }),
    ],
  });
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminNav = AdminNav;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var lucide_react_1 = require("lucide-react");
var utils_1 = require("@/lib/utils");
var use_mobile_1 = require("@/hooks/use-mobile");
function AdminNav() {
  var breakpoint = (0, use_mobile_1.useBreakpoint)();
  var isMobileView = ["xs", "mobile"].includes(breakpoint);
  var location = (0, react_router_dom_1.useLocation)();
  // Check if we're on the entities page and which tab is active
  var isOnEntitiesPage = location.pathname.includes("/admin/entities");
  var entitiesTab = new URLSearchParams(location.search).get("tab") || "users";
  var navItems = [
    {
      href: "/admin",
      label: "Overview",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.LayoutDashboard, {
        size: isMobileView ? 16 : 20,
      }),
    },
    {
      href: "/admin/entities",
      label: "Entities",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Users, {
        size: isMobileView ? 16 : 20,
      }),
    },
    {
      href: "/admin/campaigns",
      label: "Campaigns",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.BarChart3, {
        size: isMobileView ? 16 : 20,
      }),
    },
    {
      href: "/admin/analytics",
      label: "Analytics",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.LineChart, {
        size: isMobileView ? 16 : 20,
      }),
    },
    {
      href: "/admin/settings",
      label: "Settings",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Settings, {
        size: isMobileView ? 16 : 20,
      }),
    },
    {
      href: "/admin/system-health",
      label: "System Health",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.ServerCrash, {
        size: isMobileView ? 16 : 20,
      }),
    },
    {
      href: "/admin/audit",
      label: "Security",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, {
        size: isMobileView ? 16 : 20,
      }),
    },
    {
      href: "/admin/launch-prep",
      label: "Launch Prep",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Rocket, {
        size: isMobileView ? 16 : 20,
      }),
    },
  ];
  return (0, jsx_runtime_1.jsx)("nav", {
    className: "space-y-1",
    children: navItems.map(function (item) {
      // Special handling for entities page to check active tab
      var isEntitiesActive =
        item.href === "/admin/entities" && isOnEntitiesPage;
      return (0, jsx_runtime_1.jsxs)(
        react_router_dom_1.NavLink,
        {
          to: item.href,
          end: item.href === "/admin",
          className: function (_a) {
            var isActive = _a.isActive;
            return (0, utils_1.cn)(
              "flex items-center py-2 px-3 text-sm font-medium rounded-md mb-1",
              // If it's the entities page, we check if we're on that page
              isActive || isEntitiesActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            );
          },
          children: [
            (0, jsx_runtime_1.jsx)("span", {
              className: "mr-3",
              children: item.icon,
            }),
            item.label,
          ],
        },
        item.href,
      );
    }),
  });
}

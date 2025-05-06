"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileNavDrawer = MobileNavDrawer;
var jsx_runtime_1 = require("react/jsx-runtime");
var drawer_1 = require("@/components/ui/drawer");
var react_router_dom_1 = require("react-router-dom");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
function MobileNavDrawer(_a) {
  var open = _a.open,
    onOpenChange = _a.onOpenChange,
    currentPath = _a.currentPath;
  var isActive = function (path) {
    // Special case for strategies/strategy route
    if (
      path === "/dashboard/strategies" &&
      (currentPath === "/dashboard/strategies" ||
        currentPath === "/dashboard/strategy")
    ) {
      return true;
    }
    return currentPath === path || currentPath.startsWith(path + "/");
  };
  var tabs = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Home, {
        className: "h-5 w-5",
      }),
      exact: true,
    },
    {
      name: "Leads",
      path: "/dashboard/leads",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Users, {
        className: "h-5 w-5",
      }),
    },
    {
      name: "Strategies",
      path: "/dashboard/strategies",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.GitBranch, {
        className: "h-5 w-5",
      }),
    },
    {
      name: "Calls",
      path: "/dashboard/calls",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Phone, {
        className: "h-5 w-5",
      }),
    },
    {
      name: "Campaigns",
      path: "/dashboard/campaigns",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.BarChart2, {
        className: "h-5 w-5",
      }),
    },
    {
      name: "Executives",
      path: "/dashboard/executives",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Bot, {
        className: "h-5 w-5",
      }),
    },
    {
      name: "Decisions",
      path: "/dashboard/decisions",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.ClipboardList, {
        className: "h-5 w-5",
      }),
    },
    {
      name: "Forecast",
      path: "/dashboard/forecast",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Activity, {
        className: "h-5 w-5",
      }),
    },
    {
      name: "Digital Twin",
      path: "/dashboard/digital-twin",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Globe, {
        className: "h-5 w-5",
      }),
    },
    {
      name: "AI Bots",
      path: "/dashboard/ai-bots",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Bot, {
        className: "h-5 w-5",
      }),
    },
    {
      name: "Debate",
      path: "/dashboard/debate",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.MessageSquare, {
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
  return (0, jsx_runtime_1.jsx)(drawer_1.Drawer, {
    open: open,
    onOpenChange: onOpenChange,
    children: (0, jsx_runtime_1.jsxs)(drawer_1.DrawerContent, {
      children: [
        (0, jsx_runtime_1.jsx)("div", {
          className: "p-4 flex justify-end",
          children: (0, jsx_runtime_1.jsx)(drawer_1.DrawerClose, {
            asChild: true,
            children: (0, jsx_runtime_1.jsx)(button_1.Button, {
              variant: "ghost",
              className: "hover:bg-accent rounded-full",
              children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, {
                className: "h-5 w-5",
              }),
            }),
          }),
        }),
        (0, jsx_runtime_1.jsx)("div", {
          className: "py-4 max-h-[70vh] overflow-y-auto",
          children: tabs.map(function (tab) {
            return (0, jsx_runtime_1.jsxs)(
              react_router_dom_1.Link,
              {
                to: tab.path,
                className:
                  "flex items-center space-x-2 p-3 hover:bg-accent rounded-md transition-colors ".concat(
                    isActive(tab.path) ? "font-medium" : "",
                  ),
                onClick: function () {
                  return onOpenChange(false);
                },
                children: [
                  tab.icon,
                  (0, jsx_runtime_1.jsx)("span", { children: tab.name }),
                ],
              },
              tab.name,
            );
          }),
        }),
      ],
    }),
  });
}

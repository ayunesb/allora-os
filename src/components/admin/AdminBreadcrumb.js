"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminBreadcrumb = AdminBreadcrumb;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var breadcrumb_1 = require("@/components/ui/breadcrumb");
var lucide_react_1 = require("lucide-react");
function AdminBreadcrumb() {
  var location = (0, react_router_dom_1.useLocation)();
  var pathnames = location.pathname.split("/").filter(function (x) {
    return x;
  });
  // Skip the "admin" part as it's always the first part
  var paths = pathnames.slice(1);
  var routes = {
    "": {
      path: "/admin",
      label: "Dashboard",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.LayoutDashboard, {
        className: "h-3.5 w-3.5",
      }),
    },
    dashboard: {
      path: "/admin/dashboard",
      label: "Dashboard",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.LayoutDashboard, {
        className: "h-3.5 w-3.5",
      }),
    },
    entities: {
      path: "/admin/entities",
      label: "Entities",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Users, {
        className: "h-3.5 w-3.5",
      }),
    },
    users: {
      path: "/admin/users",
      label: "Users",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Users, {
        className: "h-3.5 w-3.5",
      }),
    },
    companies: {
      path: "/admin/companies",
      label: "Companies",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Building2, {
        className: "h-3.5 w-3.5",
      }),
    },
    audit: {
      path: "/admin/audit",
      label: "Audit",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.ClipboardCheck, {
        className: "h-3.5 w-3.5",
      }),
    },
    "run-audit": {
      path: "/admin/run-audit",
      label: "Run Audit",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Play, {
        className: "h-3.5 w-3.5",
      }),
    },
    settings: {
      path: "/admin/settings",
      label: "Settings",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Settings, {
        className: "h-3.5 w-3.5",
      }),
    },
    "system-health": {
      path: "/admin/system-health",
      label: "System Health",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Activity, {
        className: "h-3.5 w-3.5",
      }),
    },
    "launch-prep": {
      path: "/admin/launch-prep",
      label: "Launch Prep",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Rocket, {
        className: "h-3.5 w-3.5",
      }),
    },
  };
  // If we're at the admin root, don't show breadcrumbs
  if (paths.length === 0) {
    return null;
  }
  return (0, jsx_runtime_1.jsx)(breadcrumb_1.Breadcrumb, {
    className: "mb-6",
    children: (0, jsx_runtime_1.jsxs)(breadcrumb_1.BreadcrumbList, {
      children: [
        (0, jsx_runtime_1.jsx)(breadcrumb_1.BreadcrumbItem, {
          children: (0, jsx_runtime_1.jsxs)(breadcrumb_1.BreadcrumbLink, {
            href: "/admin",
            className: "flex items-center gap-1",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.LayoutDashboard, {
                className: "h-3.5 w-3.5",
              }),
              (0, jsx_runtime_1.jsx)("span", { children: "Admin" }),
            ],
          }),
        }),
        paths.map(function (path, index) {
          var isLast = index === paths.length - 1;
          var route = routes[path] || {
            path: "/admin/".concat(path),
            label:
              path.charAt(0).toUpperCase() + path.slice(1).replace("-", " "),
          };
          return (0, jsx_runtime_1.jsxs)(
            react_1.default.Fragment,
            {
              children: [
                (0, jsx_runtime_1.jsx)(breadcrumb_1.BreadcrumbSeparator, {}),
                (0, jsx_runtime_1.jsx)(breadcrumb_1.BreadcrumbItem, {
                  children: isLast
                    ? (0, jsx_runtime_1.jsxs)(breadcrumb_1.BreadcrumbPage, {
                        className: "flex items-center gap-1",
                        children: [
                          route.icon,
                          (0, jsx_runtime_1.jsx)("span", {
                            children: route.label,
                          }),
                        ],
                      })
                    : (0, jsx_runtime_1.jsxs)(breadcrumb_1.BreadcrumbLink, {
                        href: route.path,
                        className: "flex items-center gap-1",
                        children: [
                          route.icon,
                          (0, jsx_runtime_1.jsx)("span", {
                            children: route.label,
                          }),
                        ],
                      }),
                }),
              ],
            },
            path,
          );
        }),
      ],
    }),
  });
}

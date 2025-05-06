"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ComplianceLayout;
var jsx_runtime_1 = require("react/jsx-runtime");
var Navbar_1 = require("@/components/Navbar");
var tabs_1 = require("@/components/ui/tabs");
var react_router_dom_1 = require("react-router-dom");
var lucide_react_1 = require("lucide-react");
var ErrorBoundary_1 = require("@/components/ErrorBoundary");
// Import a properly defined DashboardBreadcrumb
var dashboard_breadcrumb_1 = require("@/components/ui/dashboard-breadcrumb");
function ComplianceLayout(_a) {
  var children = _a.children;
  var location = (0, react_router_dom_1.useLocation)();
  var currentPath = location.pathname;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "min-h-screen flex flex-col",
    children: [
      (0, jsx_runtime_1.jsx)(Navbar_1.default, {}),
      (0, jsx_runtime_1.jsx)("div", {
        className: "flex-1 container mx-auto px-4 py-16",
        children: (0, jsx_runtime_1.jsxs)(ErrorBoundary_1.ErrorBoundary, {
          fallback: (0, jsx_runtime_1.jsxs)("div", {
            className: "text-center py-8",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
                className: "h-12 w-12 text-destructive mx-auto mb-4",
              }),
              (0, jsx_runtime_1.jsx)("h2", {
                className: "text-2xl font-bold mb-2",
                children: "Something went wrong",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground mb-4",
                children: "There was an error loading this compliance section",
              }),
              (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
                to: "/dashboard",
                className: "text-primary hover:underline",
                children: "Return to Dashboard",
              }),
            ],
          }),
          children: [
            (0, jsx_runtime_1.jsx)(dashboard_breadcrumb_1.DashboardBreadcrumb, {
              rootPath: "/compliance",
              rootLabel: "Compliance",
              rootIcon: (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, {
                className: "h-3.5 w-3.5",
              }),
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "mb-8",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex items-center gap-2 mb-2",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, {
                      className: "h-6 w-6 text-primary",
                    }),
                    (0, jsx_runtime_1.jsx)("h1", {
                      className: "text-3xl font-bold",
                      children: "Compliance Center",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-muted-foreground",
                  children:
                    "Manage regulatory compliance, data handling, and audit records",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)(tabs_1.Tabs, {
              value: currentPath,
              className: "mb-8",
              children: (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
                children: [
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "/compliance/overview",
                    asChild: true,
                    children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
                      to: "/compliance/overview",
                      children: "Overview",
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "/compliance/data-policies",
                    asChild: true,
                    children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
                      to: "/compliance/data-policies",
                      children: "Data Policies",
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "/compliance/audit-logs",
                    asChild: true,
                    children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
                      to: "/compliance/audit-logs",
                      children: "Audit Logs",
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "/compliance/reports",
                    asChild: true,
                    children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
                      to: "/compliance/reports",
                      children: "Compliance Reports",
                    }),
                  }),
                ],
              }),
            }),
            (0, jsx_runtime_1.jsx)("div", { children: children }),
          ],
        }),
      }),
    ],
  });
}

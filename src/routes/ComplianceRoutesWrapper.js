"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
// Lazy load compliance components
var ComplianceLayout = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("@/components/ComplianceLayout");
  });
});
var ComplianceOverview = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("@/pages/compliance/Overview");
  });
});
var AuditLogs = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("@/pages/compliance/AuditLogs");
  });
});
var ComplianceDataPolicies = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("@/pages/compliance/DataPolicies");
  });
});
var ComplianceReports = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("@/pages/compliance/Reports");
  });
});
var NotFound = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("@/pages/NotFound");
  });
});
// Loading fallback
var LoadingFallback = function () {
  return (0, jsx_runtime_1.jsx)("div", {
    className: "flex items-center justify-center min-h-screen",
    children: (0, jsx_runtime_1.jsxs)("div", {
      className: "flex flex-col items-center space-y-4",
      children: [
        (0, jsx_runtime_1.jsx)("div", {
          className:
            "h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin",
        }),
        (0, jsx_runtime_1.jsx)("p", {
          className: "text-muted-foreground",
          children: "Loading compliance section...",
        }),
      ],
    }),
  });
};
var ComplianceRoutesWrapper = function () {
  return (0, jsx_runtime_1.jsx)(react_1.Suspense, {
    fallback: (0, jsx_runtime_1.jsx)(LoadingFallback, {}),
    children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Routes, {
      children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Route, {
        path: "/",
        element: (0, jsx_runtime_1.jsx)(ComplianceLayout, {
          children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {}),
        }),
        children: [
          (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, {
            index: true,
            element: (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, {
              to: "overview",
              replace: true,
            }),
          }),
          (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, {
            path: "overview",
            element: (0, jsx_runtime_1.jsx)(ComplianceOverview, {}),
          }),
          (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, {
            path: "audit-logs",
            element: (0, jsx_runtime_1.jsx)(AuditLogs, {}),
          }),
          (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, {
            path: "data-policies",
            element: (0, jsx_runtime_1.jsx)(ComplianceDataPolicies, {}),
          }),
          (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, {
            path: "reports",
            element: (0, jsx_runtime_1.jsx)(ComplianceReports, {}),
          }),
          (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, {
            path: "*",
            element: (0, jsx_runtime_1.jsx)(NotFound, {}),
          }),
        ],
      }),
    }),
  });
};
exports.default = ComplianceRoutesWrapper;

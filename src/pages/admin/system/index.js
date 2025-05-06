"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SystemPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var tabs_1 = require("@/components/ui/tabs");
var react_router_dom_1 = require("react-router-dom");
var SystemHealthPage_1 = require("@/pages/admin/system-health/SystemHealthPage");
var ProductionDataPage_1 = require("./ProductionDataPage");
function SystemPage() {
  var navigate = (0, react_router_dom_1.useNavigate)();
  var location = (0, react_router_dom_1.useLocation)();
  var currentTab = location.hash ? location.hash.substring(1) : "health";
  var handleTabChange = function (value) {
    navigate({ hash: value });
  };
  return (0, jsx_runtime_1.jsx)("div", {
    className: "container py-6 max-w-7xl mx-auto",
    children: (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
      defaultValue: currentTab,
      onValueChange: handleTabChange,
      className: "w-full",
      children: [
        (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
          className: "mb-6",
          children: [
            (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
              value: "health",
              children: "System Health",
            }),
            (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
              value: "production",
              children: "Production Data",
            }),
            (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
              value: "security",
              children: "Security",
            }),
            (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
              value: "logs",
              children: "System Logs",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
          value: "health",
          className: "mt-0",
          children: (0, jsx_runtime_1.jsx)(SystemHealthPage_1.default, {}),
        }),
        (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
          value: "production",
          className: "mt-0",
          children: (0, jsx_runtime_1.jsx)(ProductionDataPage_1.default, {}),
        }),
        (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
          value: "security",
          className: "mt-0",
          children: (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-4",
            children: [
              (0, jsx_runtime_1.jsx)("h2", {
                className: "text-3xl font-bold tracking-tight",
                children: "Security Settings",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground",
                children: "This page is under construction",
              }),
            ],
          }),
        }),
        (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
          value: "logs",
          className: "mt-0",
          children: (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-4",
            children: [
              (0, jsx_runtime_1.jsx)("h2", {
                className: "text-3xl font-bold tracking-tight",
                children: "System Logs",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground",
                children: "This page is under construction",
              }),
            ],
          }),
        }),
      ],
    }),
  });
}

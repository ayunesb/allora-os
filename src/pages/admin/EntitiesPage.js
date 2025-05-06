"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EntitiesPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_helmet_async_1 = require("react-helmet-async");
var react_router_dom_1 = require("react-router-dom");
var tabs_1 = require("@/components/ui/tabs");
var PageErrorBoundary_1 = require("@/components/errorHandling/PageErrorBoundary");
var AdminUsers_1 = require("./AdminUsers");
var AdminCompanies_1 = require("./AdminCompanies");
var AdminBreadcrumb_1 = require("@/components/admin/AdminBreadcrumb");
var help_button_1 = require("@/components/ui/help-button");
var helpContent_1 = require("@/utils/help/helpContent");
function EntitiesPage() {
  var _a = (0, react_router_dom_1.useSearchParams)(),
    searchParams = _a[0],
    setSearchParams = _a[1];
  var tabFromUrl = searchParams.get("tab");
  var _b = (0, react_1.useState)(
      tabFromUrl === "companies" ? "companies" : "users",
    ),
    activeTab = _b[0],
    setActiveTab = _b[1];
  // Update the URL when the tab changes
  (0, react_1.useEffect)(
    function () {
      if (tabFromUrl !== activeTab) {
        setSearchParams({ tab: activeTab });
      }
    },
    [activeTab, setSearchParams, tabFromUrl],
  );
  // Handle URL parameter changes
  (0, react_1.useEffect)(
    function () {
      if (tabFromUrl === "companies" || tabFromUrl === "users") {
        setActiveTab(tabFromUrl);
      }
    },
    [tabFromUrl],
  );
  // Get help content for the entities page
  var entitiesHelp = (0, helpContent_1.getHelpContent)("admin.entities") || {
    id: "admin.entities",
    title: "Entities Management",
    description: "Manage users and companies within the Allora AI platform",
  };
  return (0, jsx_runtime_1.jsxs)(PageErrorBoundary_1.PageErrorBoundary, {
    pageName: "Entities Management",
    children: [
      (0, jsx_runtime_1.jsx)(react_helmet_async_1.Helmet, {
        children: (0, jsx_runtime_1.jsx)("title", {
          children: "Entities Management | Allora AI",
        }),
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-6 animate-in fade-in duration-500",
        children: [
          (0, jsx_runtime_1.jsx)(AdminBreadcrumb_1.AdminBreadcrumb, {}),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "pb-2 flex justify-between items-start",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                children: [
                  (0, jsx_runtime_1.jsx)("h1", {
                    className: "text-3xl font-bold tracking-tight",
                    children: "Entities Management",
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-muted-foreground mt-2",
                    children:
                      "Manage users and companies within the Allora AI platform",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(help_button_1.HelpButton, {
                helpContent: entitiesHelp,
                variant: "outline",
                size: "sm",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
            defaultValue: "users",
            value: activeTab,
            onValueChange: setActiveTab,
            className: "space-y-4",
            children: [
              (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
                children: [
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "users",
                    children: "Users",
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "companies",
                    children: "Companies",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "users",
                className: "space-y-4",
                children: (0, jsx_runtime_1.jsx)(AdminUsers_1.default, {}),
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "companies",
                className: "space-y-4",
                children: (0, jsx_runtime_1.jsx)(AdminCompanies_1.default, {}),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

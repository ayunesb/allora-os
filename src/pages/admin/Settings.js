"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AdminSettings;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var tabs_1 = require("@/components/ui/tabs");
var Navbar_1 = require("@/components/Navbar"); // Changed from { Navbar } to default import
var AdminSettingsProvider_1 = require("@/components/admin/settings/AdminSettingsProvider");
var APIKeysTab_1 = require("@/components/admin/APIKeysTab");
var WebhooksTab_1 = require("@/components/admin/WebhooksTab");
var security_1 = require("@/components/admin/security");
var NotificationsTab_1 = require("@/components/admin/NotificationsTab");
var use_mobile_1 = require("@/hooks/use-mobile");
function AdminSettings() {
  var _a = (0, react_1.useState)("api-keys"),
    activeTab = _a[0],
    setActiveTab = _a[1];
  var breakpoint = (0, use_mobile_1.useBreakpoint)();
  var isMobileView = ["xs", "mobile"].includes(breakpoint);
  var isTabletView = breakpoint === "tablet";
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "min-h-screen bg-background",
    children: [
      (0, jsx_runtime_1.jsx)(Navbar_1.default, {}),
      " ",
      (0, jsx_runtime_1.jsxs)("div", {
        className: "container mx-auto px-4 pt-24 pb-12",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "mb-8",
            children: [
              (0, jsx_runtime_1.jsx)("h1", {
                className: "text-3xl font-bold",
                children: "System Settings",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground mt-2",
                children: "Configure the Allora AI platform",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(AdminSettingsProvider_1.default, {
            children: function (_a) {
              var companyId = _a.companyId,
                isLoading = _a.isLoading,
                apiKeys = _a.apiKeys,
                securitySettings = _a.securitySettings;
              return (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
                defaultValue: "api-keys",
                value: activeTab,
                onValueChange: setActiveTab,
                children: [
                  (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
                    className: "mb-6 ".concat(
                      isMobileView
                        ? "w-full tabs-scrollable flex"
                        : isTabletView
                          ? "tabs-flex-wrap"
                          : "",
                    ),
                    children: [
                      (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                        value: "api-keys",
                        className: isMobileView
                          ? "text-xs flex-1 tab-compact"
                          : isTabletView
                            ? "text-sm"
                            : "",
                        children: "API Keys",
                      }),
                      (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                        value: "webhooks",
                        className: isMobileView
                          ? "text-xs flex-1 tab-compact"
                          : isTabletView
                            ? "text-sm"
                            : "",
                        children: "Webhooks",
                      }),
                      (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                        value: "security",
                        className: isMobileView
                          ? "text-xs flex-1 tab-compact"
                          : isTabletView
                            ? "text-sm"
                            : "",
                        children: "Security",
                      }),
                      (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                        value: "notifications",
                        className: isMobileView
                          ? "text-xs flex-1 tab-compact"
                          : isTabletView
                            ? "text-sm"
                            : "",
                        children: "Notifications",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                    value: "api-keys",
                    children: (0, jsx_runtime_1.jsx)(APIKeysTab_1.default, {
                      companyId: companyId,
                      initialApiKeys: apiKeys,
                      isLoading: isLoading,
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                    value: "webhooks",
                    children: (0, jsx_runtime_1.jsx)(WebhooksTab_1.default, {}),
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                    value: "security",
                    children: (0, jsx_runtime_1.jsx)(security_1.SecurityTab, {
                      initialSettings: securitySettings,
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                    value: "notifications",
                    children: (0, jsx_runtime_1.jsx)(
                      NotificationsTab_1.default,
                      {},
                    ),
                  }),
                ],
              });
            },
          }),
        ],
      }),
    ],
  });
}

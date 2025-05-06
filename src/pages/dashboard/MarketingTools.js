"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MarketingTools;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var tabs_1 = require("@/components/ui/tabs");
var AIContentGenerator_1 = require("@/components/content-generation/AIContentGenerator");
var MarketingPlatformIntegrations_1 = require("@/components/integrations/MarketingPlatformIntegrations");
var CustomerJourneyMapper_1 = require("@/components/customer-journey/CustomerJourneyMapper");
function MarketingTools() {
  var _a = (0, react_1.useState)("content-generation"),
    activeTab = _a[0],
    setActiveTab = _a[1];
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto px-4 py-8",
    children: [
      (0, jsx_runtime_1.jsx)("h1", {
        className: "text-3xl font-bold mb-2",
        children: "Marketing Tools",
      }),
      (0, jsx_runtime_1.jsx)("p", {
        className: "text-muted-foreground mb-6",
        children: "Advanced tools to enhance your marketing capabilities",
      }),
      (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
        value: activeTab,
        onValueChange: setActiveTab,
        className: "space-y-4",
        children: [
          (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
            className: "grid w-full grid-cols-3",
            children: [
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "content-generation",
                children: "Content Generation",
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "platform-integrations",
                children: "Platform Integrations",
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "customer-journey",
                children: "Customer Journey",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "content-generation",
            className: "space-y-4",
            children: (0, jsx_runtime_1.jsx)(
              AIContentGenerator_1.AIContentGenerator,
              {},
            ),
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "platform-integrations",
            className: "space-y-4",
            children: (0, jsx_runtime_1.jsx)(
              MarketingPlatformIntegrations_1.MarketingPlatformIntegrations,
              {},
            ),
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "customer-journey",
            className: "space-y-4",
            children: (0, jsx_runtime_1.jsx)(
              CustomerJourneyMapper_1.CustomerJourneyMapper,
              {},
            ),
          }),
        ],
      }),
    ],
  });
}

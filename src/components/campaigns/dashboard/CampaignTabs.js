"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignTabs = CampaignTabs;
var jsx_runtime_1 = require("react/jsx-runtime");
var tabs_1 = require("@/components/ui/tabs");
function CampaignTabs(_a) {
  var activeTab = _a.activeTab,
    onTabChange = _a.onTabChange;
  return (0, jsx_runtime_1.jsx)(tabs_1.Tabs, {
    defaultValue: activeTab,
    className: "mb-8",
    onValueChange: onTabChange,
    children: (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
      children: [
        (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
          value: "all",
          children: "All Campaigns",
        }),
        (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
          value: "active",
          children: "Active",
        }),
        (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
          value: "pending",
          children: "Pending",
        }),
        (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
          value: "meta",
          children: "Meta",
        }),
        (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
          value: "tiktok",
          children: "TikTok",
        }),
      ],
    }),
  });
}

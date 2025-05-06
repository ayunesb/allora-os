"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImplementationTabs = ImplementationTabs;
var jsx_runtime_1 = require("react/jsx-runtime");
var tabs_1 = require("@/components/ui/tabs");
function ImplementationTabs(_a) {
  var activeTab = _a.activeTab,
    onTabChange = _a.onTabChange;
  return (0, jsx_runtime_1.jsx)(tabs_1.Tabs, {
    value: activeTab,
    onValueChange: onTabChange,
    className: "w-full",
    children: (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
      className: "grid grid-cols-4 mb-4",
      children: [
        (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
          value: "overview",
          children: "Overview",
        }),
        (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
          value: "tasks",
          children: "Tasks",
        }),
        (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
          value: "milestones",
          children: "Milestones",
        }),
        (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
          value: "metrics",
          children: "Metrics",
        }),
      ],
    }),
  });
}

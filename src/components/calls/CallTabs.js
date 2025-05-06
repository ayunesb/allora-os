"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CallTabs;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var scrollable_tabs_1 = require("@/components/ui/scrollable-tabs");
var HelpTooltip_1 = require("@/components/help/HelpTooltip");
var HelpButton_1 = require("@/components/help/HelpButton");
function CallTabs(_a) {
  var activeTab = _a.activeTab,
    onTabChange = _a.onTabChange,
    _b = _a.isLoading,
    isLoading = _b === void 0 ? false : _b;
  var tabs = [
    {
      id: "timeline",
      label: "Timeline",
      icon: lucide_react_1.Clock,
      tooltip: "View all communications in chronological order",
    },
    {
      id: "upcoming",
      label: "Upcoming",
      icon: lucide_react_1.Calendar,
      tooltip: "View scheduled calls and meetings",
    },
    {
      id: "history",
      label: "History",
      icon: lucide_react_1.History,
      tooltip: "View past calls and communication history",
    },
    {
      id: "scripts",
      label: "Call Scripts",
      shortLabel: "Scripts",
      icon: lucide_react_1.Phone,
      tooltip: "AI-generated call scripts for different scenarios",
    },
    {
      id: "messages",
      label: "Message Templates",
      shortLabel: "Messages",
      icon: lucide_react_1.MessageSquare,
      tooltip: "Templates for follow-up messages and emails",
    },
    {
      id: "zoom",
      label: "Zoom Tools",
      shortLabel: "Zoom",
      icon: lucide_react_1.VideoIcon,
      tooltip: "Schedule and manage Zoom meetings",
    },
    {
      id: "ai-assistant",
      label: "AI Assistant",
      shortLabel: "Assistant",
      icon: lucide_react_1.Sparkles,
      tooltip: "Get AI assistance during calls and meetings",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: lucide_react_1.BarChart,
      tooltip: "View call analytics and performance metrics",
    },
  ];
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-2",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex justify-between items-center px-2",
        children: [
          (0, jsx_runtime_1.jsx)(HelpTooltip_1.HelpTooltip, {
            content: "Navigate between different call management features",
            children: (0, jsx_runtime_1.jsx)("span", {
              className: "text-sm font-medium",
              children: "Call Management",
            }),
          }),
          (0, jsx_runtime_1.jsx)(HelpButton_1.HelpButton, {
            contextId: "admin.calls",
            variant: "icon",
            tooltipText: "Learn more about call features",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(scrollable_tabs_1.default, {
        tabs: tabs,
        activeTab: activeTab,
        onTabChange: onTabChange,
        isLoading: isLoading,
        className: "w-full",
      }),
    ],
  });
}

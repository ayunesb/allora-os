"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiBotsTabsList = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var scrollable_tabs_1 = require("@/components/ui/scrollable-tabs");
var tabs_1 = require("@/components/ui/tabs");
var framer_motion_1 = require("framer-motion");
var AiBotsTabsList = function (_a) {
  var propsMobileView = _a.isMobileView,
    activeTab = _a.activeTab,
    onTabChange = _a.onTabChange,
    _b = _a.tabIcons,
    tabIcons = _b === void 0 ? {} : _b;
  var tabs = [
    {
      id: "boardroom",
      label: "Executive Boardroom",
      shortLabel: "Boardroom",
      icon: tabIcons.boardroom || lucide_react_1.BrainCircuit,
    },
    {
      id: "debate",
      label: "Start Debate",
      shortLabel: "Debate",
      icon: tabIcons.debate || lucide_react_1.MessageSquare,
    },
    {
      id: "bots",
      label: "Executive Advisors",
      shortLabel: "Advisors",
      icon: tabIcons.bots || lucide_react_1.Bot,
    },
    {
      id: "insights",
      label: "AI Insights",
      shortLabel: "Insights",
      icon: tabIcons.insights || lucide_react_1.Lightbulb,
    },
    {
      id: "chat",
      label: "AI Chat",
      shortLabel: "Chat",
      icon: tabIcons.chat || lucide_react_1.MessageSquare,
    },
    {
      id: "roster",
      label: "Full Roster",
      shortLabel: "Roster",
      icon: tabIcons.roster || lucide_react_1.Users,
    },
    {
      id: "history",
      label: "Consultation History",
      shortLabel: "History",
      icon: tabIcons.history || lucide_react_1.GanttChart,
    },
  ];
  // Use TabsList directly if ScrollableTabs component has issues
  if (!scrollable_tabs_1.default) {
    return (0, jsx_runtime_1.jsx)(tabs_1.TabsList, {
      className:
        "w-full mb-6 py-2 overflow-x-auto bg-black/30 border border-white/10 backdrop-blur-md rounded-lg",
      children: tabs.map(function (tab) {
        return (0, jsx_runtime_1.jsxs)(
          tabs_1.TabsTrigger,
          {
            value: tab.id,
            onClick: function () {
              return onTabChange && onTabChange(tab.id);
            },
            className:
              "\n              relative overflow-hidden flex items-center group\n              ".concat(
                activeTab === tab.id
                  ? "data-[state=active]:bg-primary/30 data-[state=active]:text-white"
                  : "hover:bg-primary/10",
                "\n            ",
              ),
            children: [
              activeTab === tab.id &&
                (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, {
                  layoutId: "active-tab-background",
                  className: "absolute inset-0 bg-primary/10 rounded-sm -z-10",
                  initial: false,
                  transition: { type: "spring", duration: 0.5 },
                }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center gap-2",
                children: [
                  tab.icon &&
                    react_1.default.createElement(tab.icon, {
                      className: "h-4 w-4 ".concat(
                        activeTab === tab.id
                          ? "text-primary"
                          : "text-gray-400 group-hover:text-primary/80",
                        " transition-colors",
                      ),
                    }),
                  (0, jsx_runtime_1.jsx)("span", {
                    children: propsMobileView
                      ? tab.shortLabel || tab.label
                      : tab.label,
                  }),
                ],
              }),
            ],
          },
          tab.id,
        );
      }),
    });
  }
  return (0, jsx_runtime_1.jsx)("div", {
    className: "w-full max-w-full overflow-hidden",
    children: (0, jsx_runtime_1.jsx)(scrollable_tabs_1.default, {
      tabs: tabs,
      activeTab: activeTab || tabs[0].id,
      onTabChange: onTabChange || function () {},
      className:
        "mb-6 py-2 bg-black/30 border border-white/10 backdrop-blur-md rounded-lg",
      variant: "default",
    }),
  });
};
exports.AiBotsTabsList = AiBotsTabsList;

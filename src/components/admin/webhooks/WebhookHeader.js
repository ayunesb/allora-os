"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var card_1 = require("@/components/ui/card");
var tabs_1 = require("@/components/ui/tabs");
var use_mobile_1 = require("@/hooks/use-mobile");
var WebhookHeader = function (_a) {
  var activeTab = _a.activeTab,
    onTabChange = _a.onTabChange;
  var breakpoint = (0, use_mobile_1.useBreakpoint)();
  var isMobileView = ["xs", "sm", "mobile"].includes(breakpoint);
  return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
        className: "flex items-center gap-2",
        children: [
          (0, jsx_runtime_1.jsx)(lucide_react_1.Webhook, {
            className: "h-5 w-5",
          }),
          "Webhooks",
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
        children:
          "Configure and monitor webhook endpoints for service integrations",
      }),
      (0, jsx_runtime_1.jsx)(tabs_1.Tabs, {
        defaultValue: "config",
        value: activeTab,
        onValueChange: onTabChange,
        className: "w-full",
        children: (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
          className: "".concat(
            isMobileView
              ? "w-full mt-2 overflow-x-auto scrollbar-thin"
              : "w-auto",
          ),
          children: [
            (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
              value: "config",
              className: isMobileView ? "flex-1 text-sm px-3" : "",
              children: isMobileView ? "Config" : "Configuration",
            }),
            (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
              value: "history",
              className: isMobileView ? "flex-1 text-sm px-3" : "",
              children: isMobileView ? "History" : "Event History",
            }),
          ],
        }),
      }),
    ],
  });
};
exports.default = WebhookHeader;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZapierWebhookDemoTabs = ZapierWebhookDemoTabs;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var tabs_1 = require("@/components/ui/tabs");
var ManualTriggerContent_1 = require("./ManualTriggerContent");
var BusinessEventContent_1 = require("./BusinessEventContent");
var use_mobile_1 = require("@/hooks/use-mobile");
function ZapierWebhookDemoTabs(_a) {
  var webhookUrl = _a.webhookUrl,
    isTriggering = _a.isTriggering,
    triggerSample = _a.triggerSample,
    triggerBusinessSample = _a.triggerBusinessSample;
  var _b = react_1.default.useState("business"),
    activeTab = _b[0],
    setActiveTab = _b[1];
  var breakpoint = (0, use_mobile_1.useBreakpoint)();
  var isMobileView = ["xs", "mobile"].includes(breakpoint);
  return (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
    defaultValue: "business",
    value: activeTab,
    onValueChange: setActiveTab,
    children: [
      (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
        className: "mb-4 ".concat(
          isMobileView ? "w-full overflow-x-auto scrollbar-thin" : "",
        ),
        children: [
          (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
            value: "business",
            className: isMobileView
              ? "flex-1 text-sm px-3 whitespace-nowrap"
              : "",
            children: "Business Events",
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
            value: "manual",
            className: isMobileView
              ? "flex-1 text-sm px-3 whitespace-nowrap"
              : "",
            children: "Manual Triggers",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
        value: "business",
        className: "mt-0",
        children: (0, jsx_runtime_1.jsx)(BusinessEventContent_1.default, {
          webhookUrl: webhookUrl,
          onTrigger: triggerBusinessSample,
          isLoading: false,
          isTriggering: isTriggering,
        }),
      }),
      (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
        value: "manual",
        className: "mt-0",
        children: (0, jsx_runtime_1.jsx)(ManualTriggerContent_1.default, {
          webhookUrl: webhookUrl,
          onTrigger: function () {
            return triggerSample("manual", { test: true });
          },
          isLoading: false,
          isTriggering: isTriggering,
        }),
      }),
    ],
  });
}
exports.default = ZapierWebhookDemoTabs;

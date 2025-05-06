"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var label_1 = require("@/components/ui/label");
var select_1 = require("@/components/ui/select");
var BusinessEventContent = function (_a) {
  var webhookUrl = _a.webhookUrl,
    onTrigger = _a.onTrigger,
    isLoading = _a.isLoading,
    isTriggering = _a.isTriggering;
  var _b = (0, react_1.useState)("campaign_created"),
    selectedEvent = _b[0],
    setSelectedEvent = _b[1];
  var getEventPayload = function (eventType) {
    var basePayload = {
      id: "test-".concat(Date.now().toString(36)),
      timestamp: new Date().toISOString(),
      tenant_id: "demo-tenant",
    };
    switch (eventType) {
      case "campaign_created":
        return __assign(__assign({}, basePayload), {
          campaign: {
            name: "Test Campaign",
            budget: 5000,
            start_date: new Date().toISOString(),
          },
        });
      case "strategy_approved":
        return __assign(__assign({}, basePayload), {
          strategy: {
            id: "strategy-".concat(Date.now().toString(36)),
            title: "Market Expansion Strategy",
            approved_by: "CEO",
          },
        });
      case "lead_converted":
        return __assign(__assign({}, basePayload), {
          lead: {
            email: "test@example.com",
            name: "John Doe",
            converted_at: new Date().toISOString(),
          },
          deal_value: 2500,
        });
      case "revenue_milestone":
        return __assign(__assign({}, basePayload), {
          milestone: "1M ARR",
          previous_value: 950000,
          current_value: 1000000,
        });
      case "user_onboarded":
        return __assign(__assign({}, basePayload), {
          user: {
            email: "new-user@example.com",
            name: "Jane Smith",
            completed_steps: ["profile", "company", "goals"],
          },
        });
      default:
        return basePayload;
    }
  };
  var handleTrigger = function () {
    var payload = getEventPayload(selectedEvent);
    onTrigger(selectedEvent, payload);
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-4",
    children: [
      (0, jsx_runtime_1.jsx)("p", {
        className: "text-sm text-muted-foreground mb-4",
        children:
          "Send test business events to your Zapier webhook. This will help you test specific event handling in your Zaps.",
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-2",
        children: [
          (0, jsx_runtime_1.jsx)(label_1.Label, {
            htmlFor: "event-type",
            children: "Event Type",
          }),
          (0, jsx_runtime_1.jsxs)(select_1.Select, {
            value: selectedEvent,
            onValueChange: function (value) {
              return setSelectedEvent(value);
            },
            children: [
              (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                id: "event-type",
                children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                  placeholder: "Select an event type",
                }),
              }),
              (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                children: [
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "campaign_created",
                    children: "Campaign Created",
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "strategy_approved",
                    children: "Strategy Approved",
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "lead_converted",
                    children: "Lead Converted",
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "revenue_milestone",
                    children: "Revenue Milestone",
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "user_onboarded",
                    children: "User Onboarded",
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                    value: "test_webhook",
                    children: "Test Webhook",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(button_1.Button, {
        onClick: handleTrigger,
        disabled: !webhookUrl || isLoading || !!isTriggering,
        className: "w-full",
        children: isLoading || !!isTriggering ? "Sending..." : "Send Event",
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "bg-muted p-4 rounded-md mt-4",
        children: [
          (0, jsx_runtime_1.jsx)("h4", {
            className: "font-medium text-sm mb-2",
            children: "Event Payload",
          }),
          (0, jsx_runtime_1.jsx)("pre", {
            className: "text-xs overflow-auto bg-background p-2 rounded",
            children: JSON.stringify(getEventPayload(selectedEvent), null, 2),
          }),
        ],
      }),
    ],
  });
};
exports.default = BusinessEventContent;

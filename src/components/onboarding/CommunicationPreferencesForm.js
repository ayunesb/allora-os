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
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicationPreferencesForm = CommunicationPreferencesForm;
var jsx_runtime_1 = require("react/jsx-runtime");
var checkbox_1 = require("@/components/ui/checkbox");
var label_1 = require("@/components/ui/label");
var select_1 = require("@/components/ui/select");
var sonner_1 = require("sonner");
var AccessibilityContext_1 = require("@/context/AccessibilityContext");
// Sales style preferences
var salesStyles = [
  { value: "consultative", label: "Consultative" },
  { value: "hard_selling", label: "Hard Selling" },
  { value: "inbound_focused", label: "Inbound Focused" },
  { value: "product_led", label: "Product-Led Growth" },
  { value: "relationship_based", label: "Relationship-Based Selling" },
];
// Communication channels options
var communicationChannels = [
  { id: "email", label: "Email", key: "emailEnabled" },
  { id: "whatsapp", label: "WhatsApp", key: "whatsAppEnabled" },
  { id: "phone", label: "Phone Calls", key: "phoneEnabled" },
  { id: "zoom", label: "Zoom Meetings", key: "zoomEnabled" },
];
function CommunicationPreferencesForm(_a) {
  var companyDetails = _a.companyDetails,
    updateCompanyDetails = _a.updateCompanyDetails;
  var _b = (0, AccessibilityContext_1.useAccessibility)(),
    highContrast = _b.highContrast,
    screenReaderFriendly = _b.screenReaderFriendly;
  // Handle toggling communication channels
  var toggleChannel = function (channelKey) {
    var _a;
    updateCompanyDetails(
      __assign(
        __assign({}, companyDetails),
        ((_a = {}), (_a[channelKey] = !companyDetails[channelKey]), _a),
      ),
    );
    // Also update the channels array to keep both in sync
    var channels = companyDetails.communicationChannels || [];
    var channelId = channelKey.replace("Enabled", "").toLowerCase();
    if (!companyDetails[channelKey]) {
      updateCompanyDetails({
        communicationChannels: __spreadArray(
          __spreadArray([], channels, true),
          [channelId],
          false,
        ),
      });
      sonner_1.toast.success(
        "".concat(
          channelId.charAt(0).toUpperCase() + channelId.slice(1),
          " channel enabled",
        ),
      );
    } else {
      updateCompanyDetails({
        communicationChannels: channels.filter(function (c) {
          return c !== channelId;
        }),
      });
      sonner_1.toast.info(
        "".concat(
          channelId.charAt(0).toUpperCase() + channelId.slice(1),
          " channel disabled",
        ),
      );
    }
  };
  // Handle changing sales style
  var handleSalesStyleChange = function (value) {
    updateCompanyDetails(
      __assign(__assign({}, companyDetails), { salesStylePreference: value }),
    );
    // Show success toast
    var selectedStyle = salesStyles.find(function (style) {
      return style.value === value;
    });
    if (selectedStyle) {
      sonner_1.toast.success(
        "Sales style updated to: ".concat(selectedStyle.label),
      );
    }
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        children: [
          (0, jsx_runtime_1.jsx)("h3", {
            className: "text-lg font-medium",
            children: "Communication Preferences",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-sm text-muted-foreground mt-1",
            children:
              "Tell us how you prefer to communicate with your customers and partners.",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-4",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-sm font-medium mb-3",
                children: "Preferred Communication Channels",
              }),
              (0, jsx_runtime_1.jsx)("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-3",
                role: screenReaderFriendly ? "group" : undefined,
                "aria-label": screenReaderFriendly
                  ? "Communication channel options"
                  : undefined,
                children: communicationChannels.map(function (channel) {
                  return (0, jsx_runtime_1.jsxs)(
                    "div",
                    {
                      className: "flex items-center space-x-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, {
                          id: channel.id,
                          checked: !!companyDetails[channel.key],
                          onCheckedChange: function () {
                            return toggleChannel(channel.key);
                          },
                          "aria-label": "Enable ".concat(channel.label),
                        }),
                        (0, jsx_runtime_1.jsx)("label", {
                          htmlFor: channel.id,
                          className:
                            "text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ".concat(
                              highContrast ? "text-foreground" : "",
                            ),
                          children: channel.label,
                        }),
                      ],
                    },
                    channel.id,
                  );
                }),
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2 pt-2",
            children: [
              (0, jsx_runtime_1.jsx)(label_1.Label, {
                htmlFor: "sales-style",
                children: "Sales Style Preference",
              }),
              (0, jsx_runtime_1.jsxs)(select_1.Select, {
                value: companyDetails.salesStylePreference || "",
                onValueChange: handleSalesStyleChange,
                "aria-label": "Select your sales style preference",
                children: [
                  (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                    id: "sales-style",
                    children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                      placeholder: "Select sales style",
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectContent, {
                    children: salesStyles.map(function (style) {
                      return (0, jsx_runtime_1.jsx)(
                        select_1.SelectItem,
                        { value: style.value, children: style.label },
                        style.value,
                      );
                    }),
                  }),
                ],
              }),
              !companyDetails.salesStylePreference &&
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-xs text-amber-500 mt-1",
                  children:
                    "Please select a sales style preference to continue",
                }),
            ],
          }),
        ],
      }),
    ],
  });
}

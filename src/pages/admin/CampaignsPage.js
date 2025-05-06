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
exports.default = CampaignsPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var campaigns_1 = require("@/components/admin/campaigns");
function CampaignsPage() {
  var _a = (0, react_1.useState)([
      {
        id: "1",
        name: "Summer Sale",
        status: "active",
        budget: 5000,
        platform: "meta",
        startDate: "2025-06-01",
      },
      {
        id: "2",
        name: "Product Launch",
        status: "draft",
        budget: 10000,
        platform: "tiktok",
        startDate: "2025-07-15",
      },
      {
        id: "3",
        name: "Holiday Special",
        status: "draft",
        budget: 7500,
        platform: "email",
        startDate: "2025-01-01",
      },
    ]),
    campaigns = _a[0],
    setCampaigns = _a[1];
  var _b = (0, react_1.useState)(false),
    isLoading = _b[0],
    setIsLoading = _b[1];
  var handleCreateCampaign = function (campaign) {
    setCampaigns(function (prev) {
      return __spreadArray(
        __spreadArray([], prev, true),
        [
          __assign(
            {
              id: "".concat(prev.length + 1),
              startDate: new Date().toISOString(),
            },
            campaign,
          ),
        ],
        false,
      );
    });
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsx)(campaigns_1.CampaignHeader, {
        onCreateClick: function () {},
        onCreateCampaign: handleCreateCampaign,
      }),
      (0, jsx_runtime_1.jsx)(campaigns_1.CampaignTable, {
        campaigns: campaigns,
        isLoading: isLoading,
        error: null,
      }),
    ],
  });
}

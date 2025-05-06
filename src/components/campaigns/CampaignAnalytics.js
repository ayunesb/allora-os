"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignAnalytics = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var CampaignAnalytics = function (_a) {
  var campaign = _a.campaign;
  // Format ROI as a percentage string
  var formatRoi = function (roi) {
    if (roi === undefined) return "N/A";
    // Convert number to percentage string
    return "".concat((roi * 100).toFixed(1), "%");
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsx)("h2", {
        className: "text-2xl font-bold",
        children: "Campaign Analytics",
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "grid grid-cols-1 md:grid-cols-3 gap-4",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "bg-white rounded-lg shadow p-4",
            children: [
              (0, jsx_runtime_1.jsx)("h3", {
                className: "text-sm text-gray-500",
                children: "ROI",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-2xl font-bold",
                children: formatRoi(campaign.roi),
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "bg-white rounded-lg shadow p-4",
            children: [
              (0, jsx_runtime_1.jsx)("h3", {
                className: "text-sm text-gray-500",
                children: "Budget",
              }),
              (0, jsx_runtime_1.jsxs)("p", {
                className: "text-2xl font-bold",
                children: ["$", campaign.budget.toLocaleString()],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "bg-white rounded-lg shadow p-4",
            children: [
              (0, jsx_runtime_1.jsx)("h3", {
                className: "text-sm text-gray-500",
                children: "Health Score",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-2xl font-bold",
                children: campaign.healthScore || "N/A",
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
exports.CampaignAnalytics = CampaignAnalytics;
exports.default = exports.CampaignAnalytics;

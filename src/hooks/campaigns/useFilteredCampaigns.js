"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFilteredCampaigns = useFilteredCampaigns;
var react_1 = require("react");
function useFilteredCampaigns(campaigns, activeTab) {
  return (0, react_1.useMemo)(
    function () {
      if (activeTab === "all") {
        return campaigns;
      }
      if (activeTab === "active") {
        return campaigns.filter(function (c) {
          return (
            (c.deployment_status === "deployed" &&
              c.payment_status === "paid") ||
            (c.status && c.status === "active")
          );
        });
      }
      if (activeTab === "pending") {
        return campaigns.filter(function (c) {
          return (
            c.deployment_status === "pending" ||
            c.deployment_status === "ready" ||
            c.payment_status !== "paid" ||
            (c.status && c.status === "draft")
          );
        });
      }
      if (activeTab === "meta") {
        return campaigns.filter(function (c) {
          return c.ad_platform === "meta" || c.platform === "meta";
        });
      }
      if (activeTab === "tiktok") {
        return campaigns.filter(function (c) {
          return c.ad_platform === "tiktok" || c.platform === "tiktok";
        });
      }
      // Filter by status (ensuring case insensitivity)
      var normalizedTab = activeTab.toLowerCase();
      return campaigns.filter(function (c) {
        return c.status && c.status === normalizedTab;
      });
    },
    [campaigns, activeTab],
  );
}

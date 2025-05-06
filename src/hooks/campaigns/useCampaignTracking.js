"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCampaignTracking = useCampaignTracking;
var react_1 = require("react");
var useSelfLearning_1 = require("@/hooks/useSelfLearning");
function useCampaignTracking() {
  var trackAction = (0, useSelfLearning_1.useSelfLearning)().trackAction;
  var trackCampaignView = (0, react_1.useCallback)(
    function (campaignId, campaignName) {
      trackAction("view_campaign", "campaign_view", campaignId, "campaign", {
        campaignId: campaignId,
        name: campaignName,
      });
    },
    [trackAction],
  );
  var trackCampaignApprove = (0, react_1.useCallback)(
    function (campaignId, campaignName, executiveName) {
      trackAction(
        "approve_campaign",
        "campaign_feedback",
        campaignId,
        "campaign",
        {
          campaignId: campaignId,
          name: campaignName,
          executiveName: executiveName,
        },
      );
    },
    [trackAction],
  );
  return {
    trackCampaignView: trackCampaignView,
    trackCampaignApprove: trackCampaignApprove,
  };
}

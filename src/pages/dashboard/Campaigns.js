"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Campaigns;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var useCampaigns_1 = require("@/hooks/campaigns/useCampaigns");
var useCampaignTracking_1 = require("@/hooks/campaigns/useCampaignTracking");
var useSelfLearning_1 = require("@/hooks/useSelfLearning");
var sonner_1 = require("sonner");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var tabs_1 = require("@/components/ui/tabs");
var skeleton_1 = require("@/components/ui/skeleton");
// Lazy load components for better performance
var CampaignsList = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("@/components/campaigns/CampaignsList");
  });
});
var CampaignHeader = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("@/components/campaigns/CampaignHeader");
  });
});
var CampaignWizard = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("@/components/campaigns/CampaignWizard");
  });
});
var CampaignAnalytics_1 = require("@/components/campaigns/CampaignAnalytics");
function Campaigns() {
  var _a = (0, react_1.useState)(null),
    editingCampaignId = _a[0],
    setEditingCampaignId = _a[1];
  var _b = (0, react_1.useState)(false),
    isDialogOpen = _b[0],
    setIsDialogOpen = _b[1];
  var _c = (0, useCampaigns_1.useCampaigns)(),
    campaigns = _c.campaigns,
    isLoading = _c.isLoading,
    createCampaign = _c.createCampaign,
    isCreating = _c.isCreating,
    updateCampaign = _c.updateCampaign,
    isUpdating = _c.isUpdating,
    deleteCampaign = _c.deleteCampaign,
    isDeleting = _c.isDeleting,
    refetch = _c.refetch;
  var _d = (0, useCampaignTracking_1.useCampaignTracking)(),
    trackCampaignView = _d.trackCampaignView,
    trackCampaignApprove = _d.trackCampaignApprove;
  var trackAction = (0, useSelfLearning_1.useSelfLearning)().trackAction;
  (0, react_1.useEffect)(
    function () {
      // Track page view
      trackAction("view_page", "page_view", "campaigns", "page", {
        page: "campaigns",
      });
    },
    [trackAction],
  );
  var onSubmit = function (data) {
    if (editingCampaignId) {
      updateCampaign({
        id: editingCampaignId,
        name: data.name,
        platform: data.platform,
        budget: data.budget,
        status: "Active",
        executiveBot: data.executiveBot,
        justification: "This "
          .concat(data.platform, " campaign will help you reach your ")
          .concat(
            data.goal,
            " goals. The target audience matches your business perfectly.",
          ),
        roi: "Expected ROI: ".concat(
          Math.floor(Math.random() * 300 + 100),
          "%",
        ),
      });
    } else {
      var allExecs = Object.values(executiveBots).flat();
      // Use the provided executiveBot name if available, otherwise get random exec name
      var randomExec =
        data.executiveBot ||
        allExecs[Math.floor(Math.random() * allExecs.length)];
      createCampaign({
        name: data.name,
        platform: data.platform,
        budget: data.budget,
        status: "Active",
        executiveBot: randomExec,
        justification: "This "
          .concat(data.platform, " campaign targets your ideal audience for ")
          .concat(data.goal, ". Based on your budget of ")
          .concat(data.budget, ", I expect strong returns."),
        roi: "Expected ROI: ".concat(
          Math.floor(Math.random() * 300 + 100),
          "%",
        ),
      });
      trackAction(
        "create_campaign",
        "campaign_management",
        "new-campaign",
        "campaign",
        {
          name: data.name,
          platform: data.platform,
          executiveBot: randomExec,
        },
      );
    }
    setIsDialogOpen(false);
    setEditingCampaignId(null);
  };
  var handleEditCampaign = function (campaignId) {
    var campaign = campaigns.find(function (c) {
      return c.id === campaignId;
    });
    if (campaign) {
      setEditingCampaignId(campaignId);
      setIsDialogOpen(true);
      trackCampaignView(campaignId, campaign.name);
    }
  };
  var handleNewCampaign = function () {
    setEditingCampaignId(null);
    setIsDialogOpen(true);
  };
  var handleApproveCampaign = function (campaignId) {
    var _a;
    var campaign = campaigns.find(function (c) {
      return c.id === campaignId;
    });
    if (campaign) {
      // Extract string name from executiveBot if it's an object
      var execBotName =
        typeof campaign.executiveBot === "string"
          ? campaign.executiveBot
          : ((_a = campaign.executiveBot) === null || _a === void 0
              ? void 0
              : _a.name) || "";
      trackCampaignApprove(campaignId, campaign.name, execBotName);
      sonner_1.toast.success(
        "Feedback for ".concat(execBotName, "'s recommendation recorded"),
      );
      setTimeout(function () {
        return refetch();
      }, 1000);
    }
  };
  var handleExportCampaign = function (campaignId, format) {
    var _a;
    var campaign = campaigns.find(function (c) {
      return c.id === campaignId;
    });
    if (!campaign) return;
    sonner_1.toast.success(
      "Exporting "
        .concat(campaign.name, " as ")
        .concat(format.toUpperCase(), "..."),
    );
    setTimeout(function () {
      sonner_1.toast.success(
        "".concat(format.toUpperCase(), " export complete"),
      );
    }, 1500);
    // Extract string name from executiveBot if it's an object
    var execBotName =
      typeof campaign.executiveBot === "string"
        ? campaign.executiveBot
        : ((_a = campaign.executiveBot) === null || _a === void 0
            ? void 0
            : _a.name) || "";
    trackAction(
      "export_campaign",
      "campaign_management",
      campaignId,
      "campaign",
      {
        name: campaign.name,
        format: format,
        executiveBot: execBotName,
      },
    );
  };
  var getWizardDefaultValues = function () {
    if (editingCampaignId) {
      var campaign = campaigns.find(function (c) {
        return c.id === editingCampaignId;
      });
      if (campaign) {
        var execName = undefined;
        if (campaign.executiveBot) {
          execName =
            typeof campaign.executiveBot === "string"
              ? campaign.executiveBot
              : campaign.executiveBot.name;
        }
        return {
          name: campaign.name,
          platform: campaign.platform,
          budget: campaign.budget || 1000,
          executiveBot: execName,
          adCopy: campaign.justification || "",
          goal: "leads",
          audience: "Professionals aged 25-45 interested in business growth",
          startDate: new Date().toISOString().split("T")[0],
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
        };
      }
    }
    return {
      name: "",
      platform: "Google",
      budget: 1000,
      goal: "leads",
      audience: "",
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      adCopy: "",
    };
  };
  // Define executives for selection
  var executiveBots = {
    ceo: ["Elon Musk", "Jeff Bezos", "Tim Cook", "Satya Nadella"],
    cmo: ["Seth Godin", "Neil Patel", "Gary Vaynerchuk"],
    cfo: ["Warren Buffett", "Charlie Munger"],
    sales_business_development: ["Jill Konrath", "Grant Cardone"],
    marketing: ["Mari Smith", "Ryan Deiss", "Amy Porterfield"],
  };
  return (0, jsx_runtime_1.jsx)(tabs_1.Tabs, {
    defaultValue: "main",
    children: (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
      value: "main",
      children: (0, jsx_runtime_1.jsxs)("div", {
        className: "container mx-auto px-4 py-8",
        children: [
          (0, jsx_runtime_1.jsx)(react_1.Suspense, {
            fallback: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
              className: "h-16 w-full mb-4",
            }),
            children: (0, jsx_runtime_1.jsx)(CampaignHeader, {
              onNewCampaign: handleNewCampaign,
            }),
          }),
          (0, jsx_runtime_1.jsx)(CampaignAnalytics_1.CampaignAnalytics, {
            campaignName: "All Campaigns Overview",
            isComparison: false,
            campaigns: campaigns,
            isLoading: isLoading,
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex justify-between items-center mb-4",
            children: [
              (0, jsx_runtime_1.jsx)("h2", {
                className: "text-xl font-semibold",
                children: "All Campaigns",
              }),
              campaigns.length > 0 &&
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex space-x-2",
                  children: [
                    (0, jsx_runtime_1.jsxs)(button_1.Button, {
                      variant: "outline",
                      size: "sm",
                      onClick: function () {
                        return handleExportCampaign("all", "csv");
                      },
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.DownloadIcon, {
                          className: "mr-2 h-4 w-4",
                        }),
                        "Export All (CSV)",
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)(button_1.Button, {
                      variant: "outline",
                      size: "sm",
                      onClick: function () {
                        return handleExportCampaign("all", "pdf");
                      },
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.DownloadIcon, {
                          className: "mr-2 h-4 w-4",
                        }),
                        "Export All (PDF)",
                      ],
                    }),
                  ],
                }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(react_1.Suspense, {
            fallback: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
              className: "h-96 w-full",
            }),
            children: (0, jsx_runtime_1.jsx)(CampaignsList, {
              campaigns: campaigns,
              isLoading: isLoading,
              handleEditCampaign: handleEditCampaign,
              deleteCampaign: deleteCampaign,
              onCreateCampaign: handleNewCampaign,
              onApproveCampaign: handleApproveCampaign,
              onExportCampaign: handleExportCampaign,
            }),
          }),
          (0, jsx_runtime_1.jsx)(react_1.Suspense, {
            fallback: null,
            children: (0, jsx_runtime_1.jsx)(CampaignWizard, {
              open: isDialogOpen,
              onOpenChange: setIsDialogOpen,
              onSubmit: onSubmit,
              defaultValues: getWizardDefaultValues(),
              isSubmitting: isCreating || isUpdating,
              isEditing: !!editingCampaignId,
            }),
          }),
        ],
      }),
    }),
  });
}

"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create(
        (typeof Iterator === "function" ? Iterator : Object).prototype,
      );
    return (
      (g.next = verb(0)),
      (g["throw"] = verb(1)),
      (g["return"] = verb(2)),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CampaignDashboard;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var campaigns_1 = require("@/hooks/campaigns");
var useFilteredCampaigns_1 = require("@/hooks/campaigns/useFilteredCampaigns");
var useAdPlatformConnections_1 = require("@/hooks/campaigns/useAdPlatformConnections");
var CampaignRefresh_1 = require("@/components/campaigns/dashboard/CampaignRefresh");
var sonner_1 = require("sonner");
var dataRefresh_1 = require("@/utils/shared/dataRefresh");
// Component imports
var CampaignHeader_1 = require("@/components/campaigns/dashboard/CampaignHeader");
var CampaignStats_1 = require("@/components/campaigns/dashboard/CampaignStats");
var CampaignTabs_1 = require("@/components/campaigns/dashboard/CampaignTabs");
var CampaignList_1 = require("@/components/campaigns/dashboard/CampaignList");
var LoadingState_1 = require("@/components/campaigns/LoadingState");
/**
 * CampaignDashboard Component
 *
 * Provides a centralized view for managing all marketing campaigns
 * with filtering, refresh capabilities, and creation workflow.
 */
function CampaignDashboard() {
  var _this = this;
  var navigate = (0, react_router_dom_1.useNavigate)();
  var _a = (0, campaigns_1.useCampaigns)(),
    campaigns = _a.campaigns,
    isLoading = _a.isLoading,
    refetch = _a.refetch;
  var _b = (0, react_1.useState)(false),
    isRefreshing = _b[0],
    setIsRefreshing = _b[1];
  var _c = (0, react_1.useState)("all"),
    activeTab = _c[0],
    setActiveTab = _c[1];
  var hasAdPlatformConnections = (0,
  useAdPlatformConnections_1.useAdPlatformConnections)()
    .hasAdPlatformConnections;
  // Get filtered campaigns based on active tab
  var filteredCampaigns = (0, useFilteredCampaigns_1.useFilteredCampaigns)(
    campaigns,
    activeTab,
  );
  /**
   * Navigates to campaign creation or ad account connection page
   * based on whether the user has connected ad platforms
   */
  var handleCreateCampaign = function () {
    if (hasAdPlatformConnections) {
      navigate("/dashboard/campaigns/create");
    } else {
      navigate("/dashboard/ad-accounts");
    }
  };
  /**
   * Refreshes campaign data from ad platforms
   * Returns a Promise to match the expected type in CampaignHeader
   */
  var handleRefreshData = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var _this = this;
      return __generator(this, function (_a) {
        try {
          // Use the shared refreshData utility for consistent refresh behavior
          return [
            2 /*return*/,
            (0, dataRefresh_1.refreshData)({
              fetchFn: function () {
                return __awaiter(_this, void 0, void 0, function () {
                  var _this = this;
                  return __generator(this, function (_a) {
                    switch (_a.label) {
                      case 0:
                        // Call the specific campaign refresh function
                        return [
                          4 /*yield*/,
                          (0, CampaignRefresh_1.refreshCampaignData)({
                            campaigns: campaigns,
                            onComplete: function () {
                              return __awaiter(
                                _this,
                                void 0,
                                void 0,
                                function () {
                                  return __generator(this, function (_a) {
                                    switch (_a.label) {
                                      case 0:
                                        return [4 /*yield*/, refetch()];
                                      case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                    }
                                  });
                                },
                              );
                            },
                            setIsRefreshing: setIsRefreshing,
                          }),
                        ];
                      case 1:
                        // Call the specific campaign refresh function
                        _a.sent();
                        return [2 /*return*/];
                    }
                  });
                });
              },
              onComplete: function () {
                return __awaiter(_this, void 0, void 0, function () {
                  return __generator(this, function (_a) {
                    switch (_a.label) {
                      case 0:
                        return [4 /*yield*/, refetch()];
                      case 1:
                        _a.sent();
                        return [2 /*return*/];
                    }
                  });
                });
              },
              setIsRefreshing: setIsRefreshing,
              successMessage: "Campaign data refreshed successfully",
              errorMessage: "Failed to refresh campaign data",
            }),
          ];
        } catch (error) {
          console.error("Error refreshing campaigns:", error);
          sonner_1.toast.error("Failed to refresh campaign data");
          setIsRefreshing(false);
          return [2 /*return*/, Promise.resolve()];
        }
        return [2 /*return*/];
      });
    });
  };
  if (isLoading) {
    return (0, jsx_runtime_1.jsx)(LoadingState_1.CampaignLoadingState, {});
  }
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto px-4 py-8",
    children: [
      (0, jsx_runtime_1.jsx)(CampaignHeader_1.CampaignHeader, {
        onRefresh: handleRefreshData,
        onCreateCampaign: handleCreateCampaign,
        isRefreshing: isRefreshing,
      }),
      (0, jsx_runtime_1.jsx)(CampaignStats_1.CampaignStats, {
        campaigns: campaigns,
      }),
      (0, jsx_runtime_1.jsx)(CampaignTabs_1.CampaignTabs, {
        activeTab: activeTab,
        onTabChange: setActiveTab,
      }),
      (0, jsx_runtime_1.jsx)(CampaignList_1.CampaignList, {
        campaigns: campaigns,
        filteredCampaigns: filteredCampaigns,
        onCreateCampaign: handleCreateCampaign,
      }),
    ],
  });
}

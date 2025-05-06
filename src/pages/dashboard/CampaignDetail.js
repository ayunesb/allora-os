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
exports.default = CampaignDetail;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var card_1 = require("@/components/ui/card");
var sonner_1 = require("sonner");
var campaignService_1 = require("@/services/campaignService");
var CampaignMetrics_1 = require("@/components/campaigns/CampaignMetrics");
// Import refactored components
var CampaignDetailHeader_1 = require("@/components/campaigns/detail/CampaignDetailHeader");
var CampaignMetricCards_1 = require("@/components/campaigns/detail/CampaignMetricCards");
var CampaignDetails_1 = require("@/components/campaigns/detail/CampaignDetails");
var CampaignLoadingState_1 = require("@/components/campaigns/detail/CampaignLoadingState");
var CampaignNotFound_1 = require("@/components/campaigns/detail/CampaignNotFound");
function CampaignDetail() {
  var _this = this;
  var id = (0, react_router_dom_1.useParams)().id;
  var navigate = (0, react_router_dom_1.useNavigate)();
  var _a = (0, react_1.useState)(null),
    campaign = _a[0],
    setCampaign = _a[1];
  var _b = (0, react_1.useState)(true),
    isLoading = _b[0],
    setIsLoading = _b[1];
  var _c = (0, react_1.useState)(false),
    isRefreshing = _c[0],
    setIsRefreshing = _c[1];
  var _d = (0, react_1.useState)(false),
    isDeploying = _d[0],
    setIsDeploying = _d[1];
  (0, react_1.useEffect)(
    function () {
      var fetchCampaign = function () {
        return __awaiter(_this, void 0, void 0, function () {
          var campaignData, error_1;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                if (!id) return [2 /*return*/];
                setIsLoading(true);
                _a.label = 1;
              case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4 /*yield*/, (0, campaignService_1.getCampaign)(id)];
              case 2:
                campaignData = _a.sent();
                setCampaign(campaignData);
                return [3 /*break*/, 5];
              case 3:
                error_1 = _a.sent();
                console.error("Error fetching campaign:", error_1);
                sonner_1.toast.error("Failed to load campaign details");
                return [3 /*break*/, 5];
              case 4:
                setIsLoading(false);
                return [7 /*endfinally*/];
              case 5:
                return [2 /*return*/];
            }
          });
        });
      };
      fetchCampaign();
    },
    [id],
  );
  var handleRefreshData = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var result, updatedCampaign, error_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!campaign) return [2 /*return*/];
            setIsRefreshing(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 6, 7, 8]);
            return [
              4 /*yield*/,
              (0, campaignService_1.syncCampaignData)(campaign.id),
            ];
          case 2:
            result = _a.sent();
            if (!result.success) return [3 /*break*/, 4];
            return [
              4 /*yield*/,
              (0, campaignService_1.getCampaign)(campaign.id),
            ];
          case 3:
            updatedCampaign = _a.sent();
            setCampaign(updatedCampaign);
            sonner_1.toast.success("Campaign data refreshed");
            return [3 /*break*/, 5];
          case 4:
            throw new Error(result.error);
          case 5:
            return [3 /*break*/, 8];
          case 6:
            error_2 = _a.sent();
            console.error("Error refreshing campaign data:", error_2);
            sonner_1.toast.error(
              "Failed to refresh data: ".concat(error_2.message),
            );
            return [3 /*break*/, 8];
          case 7:
            setIsRefreshing(false);
            return [7 /*endfinally*/];
          case 8:
            return [2 /*return*/];
        }
      });
    });
  };
  var handleDeployCampaign = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var result, updatedCampaign, error_3;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!campaign) return [2 /*return*/];
            setIsDeploying(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 6, 7, 8]);
            return [
              4 /*yield*/,
              (0, campaignService_1.deployCampaign)(campaign.id),
            ];
          case 2:
            result = _a.sent();
            if (!result.success) return [3 /*break*/, 4];
            return [
              4 /*yield*/,
              (0, campaignService_1.getCampaign)(campaign.id),
            ];
          case 3:
            updatedCampaign = _a.sent();
            setCampaign(updatedCampaign);
            sonner_1.toast.success("Campaign deployed successfully!");
            return [3 /*break*/, 5];
          case 4:
            throw new Error(result.error);
          case 5:
            return [3 /*break*/, 8];
          case 6:
            error_3 = _a.sent();
            console.error("Error deploying campaign:", error_3);
            sonner_1.toast.error(
              "Failed to deploy campaign: ".concat(error_3.message),
            );
            return [3 /*break*/, 8];
          case 7:
            setIsDeploying(false);
            return [7 /*endfinally*/];
          case 8:
            return [2 /*return*/];
        }
      });
    });
  };
  if (isLoading) {
    return (0, jsx_runtime_1.jsx)(
      CampaignLoadingState_1.CampaignDetailLoadingState,
      {},
    );
  }
  if (!campaign) {
    return (0, jsx_runtime_1.jsx)(CampaignNotFound_1.CampaignNotFound, {
      onBack: function () {
        return navigate("/dashboard/campaigns");
      },
    });
  }
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto px-4 py-12",
    children: [
      (0, jsx_runtime_1.jsx)(CampaignDetailHeader_1.CampaignDetailHeader, {
        campaign: campaign,
        onBack: function () {
          return navigate("/dashboard/campaigns");
        },
        onDeploy: handleDeployCampaign,
        isDeploying: isDeploying,
      }),
      (0, jsx_runtime_1.jsx)(CampaignMetricCards_1.CampaignMetricCards, {
        campaign: campaign,
      }),
      campaign.payment_status === "paid" &&
        campaign.deployment_status === "deployed" &&
        (0, jsx_runtime_1.jsx)(card_1.Card, {
          className: "mb-8",
          children: (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            className: "pt-6",
            children: (0, jsx_runtime_1.jsx)(CampaignMetrics_1.default, {
              campaign: campaign,
              onRefresh: handleRefreshData,
              isRefreshing: isRefreshing,
            }),
          }),
        }),
      (0, jsx_runtime_1.jsx)(CampaignDetails_1.CampaignDetails, {
        campaign: campaign,
      }),
    ],
  });
}

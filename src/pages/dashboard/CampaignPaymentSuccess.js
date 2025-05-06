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
exports.default = CampaignPaymentSuccess;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
var campaignService_1 = require("@/services/campaignService");
var sonner_1 = require("sonner");
var client_1 = require("@/integrations/supabase/client");
function CampaignPaymentSuccess() {
  var _this = this;
  var searchParams = (0, react_router_dom_1.useSearchParams)()[0];
  var navigate = (0, react_router_dom_1.useNavigate)();
  var _a = (0, react_1.useState)(true),
    isLoading = _a[0],
    setIsLoading = _a[1];
  var _b = (0, react_1.useState)(null),
    campaign = _b[0],
    setCampaign = _b[1];
  var _c = (0, react_1.useState)(false),
    isDeploying = _c[0],
    setIsDeploying = _c[1];
  var _d = (0, react_1.useState)("pending"),
    deploymentStatus = _d[0],
    setDeploymentStatus = _d[1];
  var sessionId = searchParams.get("session_id");
  (0, react_1.useEffect)(
    function () {
      var verifyPayment = function () {
        return __awaiter(_this, void 0, void 0, function () {
          var _a,
            campaigns,
            error,
            campaignId_1,
            paymentStatus,
            campaignData,
            interval_1,
            campaignData,
            error_1;
          var _this = this;
          return __generator(this, function (_b) {
            switch (_b.label) {
              case 0:
                if (!sessionId) {
                  navigate("/dashboard/campaigns");
                  return [2 /*return*/];
                }
                _b.label = 1;
              case 1:
                _b.trys.push([1, 8, , 9]);
                return [
                  4 /*yield*/,
                  client_1.supabase
                    .from("campaigns")
                    .select("*")
                    .eq("stripe_payment_id", sessionId)
                    .limit(1),
                ];
              case 2:
                (_a = _b.sent()), (campaigns = _a.data), (error = _a.error);
                if (error) throw error;
                if (!campaigns || campaigns.length === 0) {
                  sonner_1.toast.error("Campaign not found");
                  navigate("/dashboard/campaigns");
                  return [2 /*return*/];
                }
                campaignId_1 = campaigns[0].id;
                return [
                  4 /*yield*/,
                  (0, campaignService_1.checkCampaignPaymentStatus)(
                    campaignId_1,
                  ),
                ];
              case 3:
                paymentStatus = _b.sent();
                if (!paymentStatus.success) {
                  sonner_1.toast.error("Failed to verify payment");
                  navigate("/dashboard/campaigns");
                  return [2 /*return*/];
                }
                if (!(paymentStatus.status !== "paid")) return [3 /*break*/, 5];
                return [
                  4 /*yield*/,
                  (0, campaignService_1.getCampaign)(campaignId_1),
                ];
              case 4:
                campaignData = _b.sent();
                setCampaign(campaignData);
                setIsLoading(false);
                interval_1 = setInterval(function () {
                  return __awaiter(_this, void 0, void 0, function () {
                    var status, updatedCampaign;
                    return __generator(this, function (_a) {
                      switch (_a.label) {
                        case 0:
                          return [
                            4 /*yield*/,
                            (0, campaignService_1.checkCampaignPaymentStatus)(
                              campaignId_1,
                            ),
                          ];
                        case 1:
                          status = _a.sent();
                          if (!(status.status === "paid"))
                            return [3 /*break*/, 3];
                          clearInterval(interval_1);
                          return [
                            4 /*yield*/,
                            (0, campaignService_1.getCampaign)(campaignId_1),
                          ];
                        case 2:
                          updatedCampaign = _a.sent();
                          setCampaign(updatedCampaign);
                          _a.label = 3;
                        case 3:
                          return [2 /*return*/];
                      }
                    });
                  });
                }, 2000);
                return [
                  2 /*return*/,
                  function () {
                    return clearInterval(interval_1);
                  },
                ];
              case 5:
                return [
                  4 /*yield*/,
                  (0, campaignService_1.getCampaign)(campaignId_1),
                ];
              case 6:
                campaignData = _b.sent();
                setCampaign(campaignData);
                setIsLoading(false);
                _b.label = 7;
              case 7:
                return [3 /*break*/, 9];
              case 8:
                error_1 = _b.sent();
                console.error("Error verifying payment:", error_1);
                sonner_1.toast.error("Failed to verify payment");
                navigate("/dashboard/campaigns");
                return [3 /*break*/, 9];
              case 9:
                return [2 /*return*/];
            }
          });
        });
      };
      verifyPayment();
    },
    [sessionId, navigate],
  );
  var handleDeployCampaign = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var result, updatedCampaign, error_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!campaign) return [2 /*return*/];
            setIsDeploying(true);
            setDeploymentStatus("deploying");
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
            setDeploymentStatus("deployed");
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
            setDeploymentStatus("failed");
            sonner_1.toast.error("Failed to deploy campaign");
            _a.label = 5;
          case 5:
            return [3 /*break*/, 8];
          case 6:
            error_2 = _a.sent();
            console.error("Error deploying campaign:", error_2);
            setDeploymentStatus("failed");
            sonner_1.toast.error("Failed to deploy campaign");
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
  var handleViewCampaigns = function () {
    navigate("/dashboard/campaigns");
  };
  if (isLoading) {
    return (0, jsx_runtime_1.jsx)("div", {
      className: "container mx-auto px-4 py-12 flex justify-center",
      children: (0, jsx_runtime_1.jsx)(card_1.Card, {
        className: "w-full max-w-md",
        children: (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
          className: "text-center",
          children: [
            (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
              className: "flex justify-center",
              children: (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCcw, {
                className: "h-6 w-6 animate-spin",
              }),
            }),
            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
              children: "Verifying payment...",
            }),
          ],
        }),
      }),
    });
  }
  return (0, jsx_runtime_1.jsx)("div", {
    className: "container mx-auto px-4 py-12",
    children: (0, jsx_runtime_1.jsx)("div", {
      className: "flex flex-col items-center",
      children: (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5 },
        children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
          className: "w-full max-w-md",
          children: [
            (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
              className: "text-center",
              children: [
                (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                  className: "flex flex-col items-center gap-2",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, {
                      className: "h-16 w-16 text-green-500",
                    }),
                    (0, jsx_runtime_1.jsx)("span", {
                      children: "Payment Successful!",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                  children: "Your payment has been processed successfully.",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)(card_1.CardContent, {
              children: (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-4",
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "bg-muted p-4 rounded-md space-y-2",
                    children: [
                      (0, jsx_runtime_1.jsx)("h3", {
                        className: "font-medium",
                        children: "Campaign Details",
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "grid grid-cols-2 gap-2 text-sm",
                        children: [
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "text-muted-foreground",
                            children: "Campaign:",
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            children:
                              campaign === null || campaign === void 0
                                ? void 0
                                : campaign.name,
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "text-muted-foreground",
                            children: "Platform:",
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            children:
                              (campaign === null || campaign === void 0
                                ? void 0
                                : campaign.ad_platform) === "meta"
                                ? "Meta (Facebook/Instagram)"
                                : "TikTok",
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "text-muted-foreground",
                            children: "Budget:",
                          }),
                          (0, jsx_runtime_1.jsxs)("span", {
                            children: [
                              "$",
                              campaign === null || campaign === void 0
                                ? void 0
                                : campaign.budget,
                            ],
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "text-muted-foreground",
                            children: "Management Fee:",
                          }),
                          (0, jsx_runtime_1.jsxs)("span", {
                            children: [
                              "$",
                              campaign === null || campaign === void 0
                                ? void 0
                                : campaign.management_fee,
                            ],
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "text-muted-foreground",
                            children: "Total Amount:",
                          }),
                          (0, jsx_runtime_1.jsxs)("span", {
                            children: [
                              "$",
                              campaign === null || campaign === void 0
                                ? void 0
                                : campaign.total_amount,
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className:
                      "bg-green-50 dark:bg-green-950 p-4 rounded-md border border-green-200 dark:border-green-800",
                    children: [
                      (0, jsx_runtime_1.jsx)("h3", {
                        className:
                          "font-medium text-green-700 dark:text-green-300 mb-2",
                        children: "Next Steps",
                      }),
                      (0, jsx_runtime_1.jsxs)("p", {
                        className: "text-sm text-green-600 dark:text-green-400",
                        children: [
                          "Your campaign is ready for deployment. Click the button below to automatically deploy it to ",
                          (campaign === null || campaign === void 0
                            ? void 0
                            : campaign.ad_platform) === "meta"
                            ? "Meta Ads"
                            : "TikTok Ads",
                          ".",
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
            (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
              className: "flex flex-col gap-3",
              children: [
                deploymentStatus === "deployed"
                  ? (0, jsx_runtime_1.jsxs)(button_1.Button, {
                      className: "w-full",
                      onClick: handleViewCampaigns,
                      children: [
                        "View Campaign Dashboard",
                        (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, {
                          className: "ml-2 h-4 w-4",
                        }),
                      ],
                    })
                  : (0, jsx_runtime_1.jsx)(button_1.Button, {
                      className: "w-full",
                      onClick: handleDeployCampaign,
                      disabled:
                        isDeploying ||
                        (campaign === null || campaign === void 0
                          ? void 0
                          : campaign.deployment_status) === "deployed",
                      children: isDeploying
                        ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                            children: [
                              (0, jsx_runtime_1.jsx)(
                                lucide_react_1.RefreshCcw,
                                { className: "mr-2 h-4 w-4 animate-spin" },
                              ),
                              "Deploying Campaign...",
                            ],
                          })
                        : deploymentStatus === "failed"
                          ? "Retry Deployment"
                          : (campaign === null || campaign === void 0
                                ? void 0
                                : campaign.deployment_status) === "deployed"
                            ? "Campaign Already Deployed"
                            : "Deploy Campaign Now",
                    }),
                (0, jsx_runtime_1.jsx)(button_1.Button, {
                  variant: "outline",
                  className: "w-full",
                  onClick: handleViewCampaigns,
                  children: "View All Campaigns",
                }),
              ],
            }),
          ],
        }),
      }),
    }),
  });
}

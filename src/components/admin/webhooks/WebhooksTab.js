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
exports.default = WebhooksTab;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var WebhookHeader_1 = require("@/components/admin/webhooks/WebhookHeader");
var useWebhookHistory_1 = require("@/hooks/useWebhookHistory");
var WebhookHistoryTab_1 = require("@/components/admin/webhooks/WebhookHistoryTab");
var WebhookConfigTab_1 = require("@/components/admin/webhooks/config/WebhookConfigTab");
/**
 * Main component for managing webhooks in the admin section
 */
function WebhooksTab() {
  var _this = this;
  var _a = (0, react_1.useState)("config"),
    activeTab = _a[0],
    setActiveTab = _a[1];
  var _b = (0, useWebhookHistory_1.useWebhookHistory)(),
    events = _b.events,
    isLoading = _b.isLoading,
    error = _b.error,
    // Handle the missing refreshEvents by providing a fallback
    currentPage = _b.currentPage,
    setCurrentPage = _b.setCurrentPage,
    searchTerm = _b.searchTerm,
    setSearchTerm = _b.setSearchTerm,
    statusFilter = _b.statusFilter,
    setStatusFilter = _b.setStatusFilter,
    typeFilter = _b.typeFilter,
    setTypeFilter = _b.setTypeFilter;
  // Create a refreshEvents function if it doesn't exist
  var refreshEvents = function () {
    // This is a simple fallback that resets filters which will trigger a re-fetch
    setSearchTerm("");
    setStatusFilter("all");
    setTypeFilter("all");
    setCurrentPage(1);
  };
  // Handle tab changes
  var handleTabChange = function (value) {
    setActiveTab(value);
    // Refresh events when switching to history tab
    if (value === "history") {
      refreshEvents();
    }
  };
  // Configuration state for webhook validity
  var _c = (0, react_1.useState)({
      stripeConfigValid: false,
      zapierConfigValid: false,
      githubConfigValid: false,
      slackConfigValid: false,
      customConfigValid: false,
    }),
    webhookConfig = _c[0],
    setWebhookConfig = _c[1];
  // Update webhook configuration validity
  var handleConfigUpdate = function () {
    // This function signature needs to be updated in the real implementation
    // to match any parameters expected by calling code
  };
  // Set up initial validation
  (0, react_1.useEffect)(function () {
    // Validate configured webhooks on mount
    var validateWebhookConfigs = function () {
      return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          try {
            // Simulate validation (replace with actual validation logic)
            setWebhookConfig({
              stripeConfigValid: true,
              zapierConfigValid: false,
              githubConfigValid: false,
              slackConfigValid: true,
              customConfigValid: false,
            });
          } catch (error) {
            console.error("Error validating webhook configurations:", error);
          }
          return [2 /*return*/];
        });
      });
    };
    validateWebhookConfigs();
  }, []);
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "border-none shadow-none",
    children: [
      (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
        className: "px-0 pt-0",
        children: (0, jsx_runtime_1.jsx)(WebhookHeader_1.default, {
          activeTab: activeTab,
          onTabChange: handleTabChange,
        }),
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        className: "px-0 pb-0",
        children:
          activeTab === "config"
            ? (0, jsx_runtime_1.jsx)(WebhookConfigTab_1.default, {
                stripeWebhookId: "whsec_1234567890",
                stripeEndpointSecret:
                  "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
                zapierWebhookUrl:
                  "https://hooks.zapier.com/hooks/catch/123456/abcdef/",
                githubWebhookUrl:
                  "https://api.github.com/repos/username/repo/hooks",
                githubSecret:
                  "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
                slackWebhookUrl:
                  "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX",
                customWebhookUrl: "",
                stripeValid: webhookConfig.stripeConfigValid,
                zapierValid: webhookConfig.zapierConfigValid,
                githubValid: webhookConfig.githubConfigValid,
                slackValid: webhookConfig.slackConfigValid,
                customValid: webhookConfig.customConfigValid,
                onSave: function () {
                  console.log("Saved webhook config");
                  handleConfigUpdate();
                },
                onDelete: function () {
                  console.log("Deleted webhook config");
                },
                onTest: function () {
                  console.log("Testing webhook");
                },
                onTypeChange: function () {
                  // Handle type change
                },
              })
            : (0, jsx_runtime_1.jsx)(WebhookHistoryTab_1.default, {
                isLoading: isLoading,
                events: events,
                onRefresh: refreshEvents,
              }),
      }),
    ],
  });
}

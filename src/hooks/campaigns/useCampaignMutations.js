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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCampaignMutations = useCampaignMutations;
var react_1 = require("react");
var sonner_1 = require("sonner");
var campaignHelpers_1 = require("@/utils/campaignHelpers");
function useCampaignMutations(companyId) {
  var _this = this;
  var _a = (0, react_1.useState)(false),
    isCreating = _a[0],
    setIsCreating = _a[1];
  var _b = (0, react_1.useState)(false),
    isUpdating = _b[0],
    setIsUpdating = _b[1];
  var _c = (0, react_1.useState)(false),
    isDeleting = _c[0],
    setIsDeleting = _c[1];
  var createCampaign = function (campaign) {
    return __awaiter(_this, void 0, void 0, function () {
      var platformValue, normalizedPlatform, newCampaign, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!companyId) {
              sonner_1.toast.error(
                "Company ID is required to create a campaign",
              );
              return [2 /*return*/, null];
            }
            setIsCreating(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            platformValue = campaign.platform || "meta";
            normalizedPlatform =
              typeof platformValue === "string"
                ? platformValue.toLowerCase()
                : "meta";
            return [
              4 /*yield*/,
              (0, campaignHelpers_1.createCampaign)(
                companyId,
                campaign.name || "Unnamed Campaign",
                normalizedPlatform,
                campaign.budget || 1000,
              ),
            ];
          case 2:
            newCampaign = _a.sent();
            if (newCampaign) {
              sonner_1.toast.success("Campaign created successfully");
              return [2 /*return*/, newCampaign];
            } else {
              throw new Error("Failed to create campaign");
            }
            return [3 /*break*/, 5];
          case 3:
            error_1 = _a.sent();
            sonner_1.toast.error(
              "Failed to create campaign: ".concat(error_1.message),
            );
            return [2 /*return*/, null];
          case 4:
            setIsCreating(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  var updateCampaign = function (campaign) {
    return __awaiter(_this, void 0, void 0, function () {
      var id, updates, success, error_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setIsUpdating(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            (id = campaign.id), (updates = __rest(campaign, ["id"]));
            return [
              4 /*yield*/,
              (0, campaignHelpers_1.updateCampaign)(id, updates),
            ];
          case 2:
            success = _a.sent();
            if (success) {
              sonner_1.toast.success("Campaign updated successfully");
              return [2 /*return*/, campaign];
            } else {
              throw new Error("Failed to update campaign");
            }
            return [3 /*break*/, 5];
          case 3:
            error_2 = _a.sent();
            sonner_1.toast.error(
              "Failed to update campaign: ".concat(error_2.message),
            );
            return [2 /*return*/, null];
          case 4:
            setIsUpdating(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  var deleteCampaign = function (id) {
    return __awaiter(_this, void 0, void 0, function () {
      var success, error_3;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setIsDeleting(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            return [4 /*yield*/, (0, campaignHelpers_1.deleteCampaign)(id)];
          case 2:
            success = _a.sent();
            if (success) {
              sonner_1.toast.success("Campaign deleted successfully");
              return [2 /*return*/, true];
            } else {
              throw new Error("Failed to delete campaign");
            }
            return [3 /*break*/, 5];
          case 3:
            error_3 = _a.sent();
            sonner_1.toast.error(
              "Failed to delete campaign: ".concat(error_3.message),
            );
            return [2 /*return*/, false];
          case 4:
            setIsDeleting(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  return {
    createCampaign: createCampaign,
    isCreating: isCreating,
    updateCampaign: updateCampaign,
    isUpdating: isUpdating,
    deleteCampaign: deleteCampaign,
    isDeleting: isDeleting,
  };
}

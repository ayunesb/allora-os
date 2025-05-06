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
exports.useCampaigns = useCampaigns;
var react_1 = require("react");
var enhancedApiClient_1 = require("@/utils/api/enhancedApiClient");
var sonner_1 = require("sonner");
function useCampaigns() {
  var _this = this;
  var _a = (0, react_1.useState)([]),
    campaigns = _a[0],
    setCampaigns = _a[1];
  var _b = (0, react_1.useState)(false),
    isLoading = _b[0],
    setIsLoading = _b[1];
  var _c = (0, react_1.useState)(false),
    isCreating = _c[0],
    setIsCreating = _c[1];
  var _d = (0, react_1.useState)(false),
    isUpdating = _d[0],
    setIsUpdating = _d[1];
  var _e = (0, react_1.useState)(false),
    isDeleting = _e[0],
    setIsDeleting = _e[1];
  var _f = (0, react_1.useState)(null),
    error = _f[0],
    setError = _f[1];
  var execute = (0, enhancedApiClient_1.useApiClient)().execute;
  var fetchCampaigns = (0, react_1.useCallback)(
    function () {
      return __awaiter(_this, void 0, void 0, function () {
        var result, err_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              setIsLoading(true);
              setError(null);
              _a.label = 1;
            case 1:
              _a.trys.push([1, 3, 4, 5]);
              return [4 /*yield*/, execute("/api/campaigns", "GET")];
            case 2:
              result = _a.sent();
              setCampaigns(result);
              return [2 /*return*/, result];
            case 3:
              err_1 = _a.sent();
              setError(err_1.message || "Failed to fetch campaigns");
              sonner_1.toast.error(
                err_1.message || "Failed to fetch campaigns",
              );
              throw err_1;
            case 4:
              setIsLoading(false);
              return [7 /*endfinally*/];
            case 5:
              return [2 /*return*/];
          }
        });
      });
    },
    [execute],
  );
  var fetchCampaignById = (0, react_1.useCallback)(
    function (campaignId) {
      return __awaiter(_this, void 0, void 0, function () {
        var err_2;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              setIsLoading(true);
              setError(null);
              _a.label = 1;
            case 1:
              _a.trys.push([1, 3, 4, 5]);
              return [
                4 /*yield*/,
                execute("/api/campaigns/".concat(campaignId), "GET"),
              ];
            case 2:
              return [2 /*return*/, _a.sent()];
            case 3:
              err_2 = _a.sent();
              setError(err_2.message || "Failed to fetch campaign");
              sonner_1.toast.error(err_2.message || "Failed to fetch campaign");
              throw err_2;
            case 4:
              setIsLoading(false);
              return [7 /*endfinally*/];
            case 5:
              return [2 /*return*/];
          }
        });
      });
    },
    [execute],
  );
  var createCampaign = (0, react_1.useCallback)(
    function (params) {
      return __awaiter(_this, void 0, void 0, function () {
        var result_1, err_3;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              setIsCreating(true);
              setError(null);
              _a.label = 1;
            case 1:
              _a.trys.push([1, 3, 4, 5]);
              return [4 /*yield*/, execute("/api/campaigns", "POST", params)];
            case 2:
              result_1 = _a.sent();
              setCampaigns(function (prev) {
                return __spreadArray(
                  __spreadArray([], prev, true),
                  [result_1],
                  false,
                );
              });
              sonner_1.toast.success("Campaign created successfully");
              return [2 /*return*/, result_1];
            case 3:
              err_3 = _a.sent();
              setError(err_3.message || "Failed to create campaign");
              sonner_1.toast.error(
                err_3.message || "Failed to create campaign",
              );
              throw err_3;
            case 4:
              setIsCreating(false);
              return [7 /*endfinally*/];
            case 5:
              return [2 /*return*/];
          }
        });
      });
    },
    [execute],
  );
  var updateCampaign = (0, react_1.useCallback)(
    function (params) {
      return __awaiter(_this, void 0, void 0, function () {
        var id_1, updateData, result_2, err_4;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              setIsUpdating(true);
              setError(null);
              _a.label = 1;
            case 1:
              _a.trys.push([1, 3, 4, 5]);
              (id_1 = params.id), (updateData = __rest(params, ["id"]));
              return [
                4 /*yield*/,
                execute("/api/campaigns/".concat(id_1), "PUT", updateData),
              ];
            case 2:
              result_2 = _a.sent();
              setCampaigns(function (prev) {
                return prev.map(function (campaign) {
                  return campaign.id === id_1 ? result_2 : campaign;
                });
              });
              sonner_1.toast.success("Campaign updated successfully");
              return [2 /*return*/, result_2];
            case 3:
              err_4 = _a.sent();
              setError(err_4.message || "Failed to update campaign");
              sonner_1.toast.error(
                err_4.message || "Failed to update campaign",
              );
              throw err_4;
            case 4:
              setIsUpdating(false);
              return [7 /*endfinally*/];
            case 5:
              return [2 /*return*/];
          }
        });
      });
    },
    [execute],
  );
  var deleteCampaign = (0, react_1.useCallback)(
    function (campaignId) {
      return __awaiter(_this, void 0, void 0, function () {
        var err_5;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              setIsDeleting(true);
              setError(null);
              _a.label = 1;
            case 1:
              _a.trys.push([1, 3, 4, 5]);
              return [
                4 /*yield*/,
                execute("/api/campaigns/".concat(campaignId), "DELETE"),
              ];
            case 2:
              _a.sent();
              setCampaigns(function (prev) {
                return prev.filter(function (campaign) {
                  return campaign.id !== campaignId;
                });
              });
              sonner_1.toast.success("Campaign deleted successfully");
              return [3 /*break*/, 5];
            case 3:
              err_5 = _a.sent();
              setError(err_5.message || "Failed to delete campaign");
              sonner_1.toast.error(
                err_5.message || "Failed to delete campaign",
              );
              throw err_5;
            case 4:
              setIsDeleting(false);
              return [7 /*endfinally*/];
            case 5:
              return [2 /*return*/];
          }
        });
      });
    },
    [execute],
  );
  // Add refetch as an alias for fetchCampaigns for compatibility
  var refetch = fetchCampaigns;
  return {
    campaigns: campaigns,
    isLoading: isLoading,
    isCreating: isCreating,
    isUpdating: isUpdating,
    isDeleting: isDeleting,
    error: error,
    fetchCampaigns: fetchCampaigns,
    fetchCampaignById: fetchCampaignById,
    createCampaign: createCampaign,
    updateCampaign: updateCampaign,
    deleteCampaign: deleteCampaign,
    refetch: refetch,
  };
}

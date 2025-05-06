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
exports.usePostActions = usePostActions;
var react_1 = require("react");
var socialMediaService_1 = require("@/services/socialMediaService");
var errorHandling_1 = require("@/utils/api/errorHandling");
var sonner_1 = require("sonner");
var loggingService_1 = require("@/utils/loggingService");
/**
 * Hook for social media post actions like scheduling and approving
 */
function usePostActions(refreshPosts) {
  var _this = this;
  var _a = (0, react_1.useState)(null),
    actionLoading = _a[0],
    setActionLoading = _a[1];
  // Schedule a post
  var schedule = (0, react_1.useCallback)(
    function (postId) {
      return __awaiter(_this, void 0, void 0, function () {
        var result, err_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              setActionLoading(postId);
              loggingService_1.logger.info("Scheduling post", {
                postId: postId,
              });
              _a.label = 1;
            case 1:
              _a.trys.push([1, 3, 4, 5]);
              return [
                4 /*yield*/,
                (0, socialMediaService_1.schedulePost)(postId),
              ];
            case 2:
              result = _a.sent();
              if (result.success) {
                sonner_1.toast.success("Post scheduled successfully");
                loggingService_1.logger.info("Post scheduled successfully", {
                  postId: postId,
                });
                refreshPosts(); // Refresh posts after scheduling
                return [2 /*return*/, result];
              } else {
                sonner_1.toast.error(result.error || "Failed to schedule post");
                loggingService_1.logger.warn("Failed to schedule post", {
                  postId: postId,
                  error: result.error,
                });
                return [2 /*return*/, result];
              }
              return [3 /*break*/, 5];
            case 3:
              err_1 = _a.sent();
              (0, errorHandling_1.handleApiError)(err_1, {
                customMessage: "Failed to schedule post",
                showToast: true,
                logError: true,
              });
              return [2 /*return*/, { success: false, error: err_1.message }];
            case 4:
              setActionLoading(null);
              return [7 /*endfinally*/];
            case 5:
              return [2 /*return*/];
          }
        });
      });
    },
    [refreshPosts],
  );
  // Approve a post
  var approve = (0, react_1.useCallback)(
    function (postId, notes) {
      return __awaiter(_this, void 0, void 0, function () {
        var result, err_2;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              setActionLoading(postId);
              loggingService_1.logger.info("Approving post", {
                postId: postId,
                notes: notes,
              });
              _a.label = 1;
            case 1:
              _a.trys.push([1, 3, 4, 5]);
              return [
                4 /*yield*/,
                (0, socialMediaService_1.approvePost)(postId, notes),
              ];
            case 2:
              result = _a.sent();
              if (result.success) {
                sonner_1.toast.success("Post approved successfully");
                loggingService_1.logger.info("Post approved successfully", {
                  postId: postId,
                });
                refreshPosts(); // Refresh posts after approval
                return [2 /*return*/, result];
              } else {
                sonner_1.toast.error(result.error || "Failed to approve post");
                loggingService_1.logger.warn("Failed to approve post", {
                  postId: postId,
                  error: result.error,
                });
                return [2 /*return*/, result];
              }
              return [3 /*break*/, 5];
            case 3:
              err_2 = _a.sent();
              (0, errorHandling_1.handleApiError)(err_2, {
                customMessage: "Failed to approve post",
                showToast: true,
                logError: true,
              });
              return [2 /*return*/, { success: false, error: err_2.message }];
            case 4:
              setActionLoading(null);
              return [7 /*endfinally*/];
            case 5:
              return [2 /*return*/];
          }
        });
      });
    },
    [refreshPosts],
  );
  return {
    schedule: schedule,
    approve: approve,
    actionLoading: actionLoading,
  };
}

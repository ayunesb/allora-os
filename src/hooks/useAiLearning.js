"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
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
exports.useAiLearning = useAiLearning;
var react_1 = require("react");
var client_1 = require("@/integrations/supabase/client");
var AuthContext_1 = require("@/context/AuthContext");
function useAiLearning() {
  var _this = this;
  var user = (0, AuthContext_1.useAuth)().user;
  var _a = (0, react_1.useState)(false),
    isSubmitting = _a[0],
    setIsSubmitting = _a[1];
  var _b = (0, react_1.useState)(false),
    isLoading = _b[0],
    setIsLoading = _b[1];
  // Submit feedback for a bot response
  var submitFeedback = (0, react_1.useCallback)(
    function (
      botName,
      botRole,
      isPositive,
      interactionId,
      messageId,
      comment,
      topics,
    ) {
      return __awaiter(_this, void 0, void 0, function () {
        var error, error_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (!(user === null || user === void 0 ? void 0 : user.id))
                return [2 /*return*/, false];
              setIsSubmitting(true);
              _a.label = 1;
            case 1:
              _a.trys.push([1, 4, 5, 6]);
              return [
                4 /*yield*/,
                client_1.supabase.from("user_feedback").insert([
                  {
                    user_id: user.id,
                    bot_name: botName,
                    bot_role: botRole,
                    is_positive: isPositive,
                    interaction_id: interactionId,
                    message_id: messageId,
                    comment: comment,
                    metadata: {
                      topics: topics,
                      timestamp: new Date().toISOString(),
                    },
                  },
                ]),
              ];
            case 2:
              error = _a.sent().error;
              if (error) throw error;
              // Update the learning model
              return [
                4 /*yield*/,
                updateLearningModel(
                  botName,
                  botRole,
                  isPositive ? "positive" : "negative",
                  topics,
                ),
              ];
            case 3:
              // Update the learning model
              _a.sent();
              return [2 /*return*/, true];
            case 4:
              error_1 = _a.sent();
              console.error("Error submitting feedback:", error_1);
              return [2 /*return*/, false];
            case 5:
              setIsSubmitting(false);
              return [7 /*endfinally*/];
            case 6:
              return [2 /*return*/];
          }
        });
      });
    },
    [user],
  );
  // Update the learning model for a bot
  var updateLearningModel = (0, react_1.useCallback)(function (
    botName,
    botRole,
    feedbackType,
    topics,
  ) {
    return __awaiter(_this, void 0, void 0, function () {
      var _a, data, error, counters, topicsObj_1, error_2;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _b.trys.push([0, 6, , 7]);
            return [
              4 /*yield*/,
              client_1.supabase
                .from("learning_models")
                .select("*")
                .eq("bot_name", botName)
                .eq("bot_role", botRole)
                .single(),
            ];
          case 1:
            (_a = _b.sent()), (data = _a.data), (error = _a.error);
            if (error && error.code !== "PGRST116") {
              // Not found
              throw error;
            }
            counters =
              feedbackType === "positive"
                ? {
                    positive_feedback_count:
                      ((data === null || data === void 0
                        ? void 0
                        : data.positive_feedback_count) || 0) + 1,
                  }
                : {
                    negative_feedback_count:
                      ((data === null || data === void 0
                        ? void 0
                        : data.negative_feedback_count) || 0) + 1,
                  };
            topicsObj_1 =
              (data === null || data === void 0 ? void 0 : data.topics) || {};
            if (topics && topics.length > 0) {
              topics.forEach(function (topic) {
                if (!topicsObj_1[topic]) {
                  topicsObj_1[topic] = { positive: 0, negative: 0 };
                }
                if (feedbackType === "positive") {
                  topicsObj_1[topic].positive += 1;
                } else {
                  topicsObj_1[topic].negative += 1;
                }
              });
            }
            if (!data) return [3 /*break*/, 3];
            return [
              4 /*yield*/,
              client_1.supabase
                .from("learning_models")
                .update(
                  __assign(__assign({}, counters), {
                    topics: topicsObj_1,
                    updated_at: new Date().toISOString(),
                  }),
                )
                .eq("id", data.id),
            ];
          case 2:
            _b.sent();
            return [3 /*break*/, 5];
          case 3:
            // Create a new model
            return [
              4 /*yield*/,
              client_1.supabase.from("learning_models").insert([
                {
                  bot_name: botName,
                  bot_role: botRole,
                  positive_feedback_count: feedbackType === "positive" ? 1 : 0,
                  negative_feedback_count: feedbackType === "negative" ? 1 : 0,
                  topics: topicsObj_1,
                },
              ]),
            ];
          case 4:
            // Create a new model
            _b.sent();
            _b.label = 5;
          case 5:
            return [2 /*return*/, true];
          case 6:
            error_2 = _b.sent();
            console.error("Error updating learning model:", error_2);
            return [2 /*return*/, false];
          case 7:
            return [2 /*return*/];
        }
      });
    });
  }, []);
  // Get the learning model for a bot
  var getLearningModel = (0, react_1.useCallback)(function (botName, botRole) {
    return __awaiter(_this, void 0, void 0, function () {
      var _a, data, error, error_3;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _b.trys.push([0, 2, , 3]);
            return [
              4 /*yield*/,
              client_1.supabase
                .from("learning_models")
                .select("*")
                .eq("bot_name", botName)
                .eq("bot_role", botRole)
                .single(),
            ];
          case 1:
            (_a = _b.sent()), (data = _a.data), (error = _a.error);
            if (error) {
              if (error.code === "PGRST116") {
                // Not found
                return [2 /*return*/, null];
              }
              throw error;
            }
            return [2 /*return*/, data];
          case 2:
            error_3 = _b.sent();
            console.error("Error retrieving learning model:", error_3);
            return [2 /*return*/, null];
          case 3:
            return [2 /*return*/];
        }
      });
    });
  }, []);
  // Get feedback history for a bot
  var getFeedbackHistory = (0, react_1.useCallback)(
    function (botName_1, botRole_1) {
      var args_1 = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        args_1[_i - 2] = arguments[_i];
      }
      return __awaiter(
        _this,
        __spreadArray([botName_1, botRole_1], args_1, true),
        void 0,
        function (botName, botRole, limit) {
          var query, _a, data, error, error_4;
          if (limit === void 0) {
            limit = 10;
          }
          return __generator(this, function (_b) {
            switch (_b.label) {
              case 0:
                if (!(user === null || user === void 0 ? void 0 : user.id))
                  return [2 /*return*/, []];
                _b.label = 1;
              case 1:
                _b.trys.push([1, 3, , 4]);
                query = client_1.supabase
                  .from("user_feedback")
                  .select("*")
                  .eq("user_id", user.id)
                  .eq("bot_name", botName)
                  .order("created_at", { ascending: false })
                  .limit(limit);
                if (botRole) {
                  query = query.eq("bot_role", botRole);
                }
                return [4 /*yield*/, query];
              case 2:
                (_a = _b.sent()), (data = _a.data), (error = _a.error);
                if (error) throw error;
                return [2 /*return*/, data || []];
              case 3:
                error_4 = _b.sent();
                console.error("Error retrieving feedback history:", error_4);
                return [2 /*return*/, []];
              case 4:
                return [2 /*return*/];
            }
          });
        },
      );
    },
    [user],
  );
  // Track feedback - alias for submitFeedback to match the component's expected API
  var trackFeedback = (0, react_1.useCallback)(
    function (
      interactionId,
      messageId,
      botName,
      botRole,
      isPositive,
      comment,
      metadata,
    ) {
      return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          return [
            2 /*return*/,
            submitFeedback(
              botName,
              botRole,
              isPositive,
              interactionId,
              messageId,
              comment,
              (
                metadata === null || metadata === void 0
                  ? void 0
                  : metadata.topic
              )
                ? [metadata.topic]
                : undefined,
            ),
          ];
        });
      });
    },
    [submitFeedback],
  );
  return {
    isSubmitting: isSubmitting,
    isLoading: isLoading,
    submitFeedback: submitFeedback,
    getLearningModel: getLearningModel,
    getFeedbackHistory: getFeedbackHistory,
    trackFeedback: trackFeedback,
  };
}

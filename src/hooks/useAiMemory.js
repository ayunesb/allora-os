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
exports.useAiMemory = useAiMemory;
var react_1 = require("react");
var client_1 = require("@/integrations/supabase/client");
var AuthContext_1 = require("@/context/AuthContext");
function useAiMemory() {
  var _this = this;
  var user = (0, AuthContext_1.useAuth)().user;
  var _a = (0, react_1.useState)(false),
    isProcessing = _a[0],
    setIsProcessing = _a[1];
  var _b = (0, react_1.useState)([]),
    recentMemories = _b[0],
    setRecentMemories = _b[1];
  // Store an interaction in the database for future reference
  var storeInteraction = (0, react_1.useCallback)(
    function (botName_1, botRole_1, userMessage_1, botResponse_1) {
      var args_1 = [];
      for (var _i = 4; _i < arguments.length; _i++) {
        args_1[_i - 4] = arguments[_i];
      }
      return __awaiter(
        _this,
        __spreadArray(
          [botName_1, botRole_1, userMessage_1, botResponse_1],
          args_1,
          true,
        ),
        void 0,
        function (botName, botRole, userMessage, botResponse, metadata) {
          var error, error_1;
          if (metadata === void 0) {
            metadata = {};
          }
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                if (!(user === null || user === void 0 ? void 0 : user.id))
                  return [2 /*return*/, false];
                setIsProcessing(true);
                _a.label = 1;
              case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [
                  4 /*yield*/,
                  client_1.supabase.from("bot_interactions").insert([
                    {
                      user_id: user.id,
                      bot_name: botName,
                      bot_role: botRole,
                      user_message: userMessage,
                      bot_response: botResponse,
                      metadata: metadata,
                    },
                  ]),
                ];
              case 2:
                error = _a.sent().error;
                if (error) throw error;
                return [2 /*return*/, true];
              case 3:
                error_1 = _a.sent();
                console.error("Error storing interaction:", error_1);
                return [2 /*return*/, false];
              case 4:
                setIsProcessing(false);
                return [7 /*endfinally*/];
              case 5:
                return [2 /*return*/];
            }
          });
        },
      );
    },
    [user],
  );
  // Get relevant memories based on semantic search
  var getRelevantMemories = (0, react_1.useCallback)(
    function (userMessage_1, botName_1, botRole_1) {
      var args_1 = [];
      for (var _i = 3; _i < arguments.length; _i++) {
        args_1[_i - 3] = arguments[_i];
      }
      return __awaiter(
        _this,
        __spreadArray([userMessage_1, botName_1, botRole_1], args_1, true),
        void 0,
        function (userMessage, botName, botRole, limit) {
          var _a, embedding, embeddingError, query, _b, data, error, error_2;
          if (limit === void 0) {
            limit = 5;
          }
          return __generator(this, function (_c) {
            switch (_c.label) {
              case 0:
                if (!(user === null || user === void 0 ? void 0 : user.id))
                  return [2 /*return*/, []];
                _c.label = 1;
              case 1:
                _c.trys.push([1, 4, , 5]);
                return [
                  4 /*yield*/,
                  client_1.supabase.functions.invoke("get-embedding", {
                    body: { text: userMessage },
                  }),
                ];
              case 2:
                (_a = _c.sent()),
                  (embedding = _a.data),
                  (embeddingError = _a.error);
                if (embeddingError) throw embeddingError;
                query = client_1.supabase
                  .from("bot_interactions")
                  .select("*")
                  .eq("user_id", user.id)
                  .order("created_at", { ascending: false });
                // Add bot filters if provided
                if (botName) {
                  query = query.eq("bot_name", botName);
                }
                if (botRole) {
                  query = query.eq("bot_role", botRole);
                }
                return [4 /*yield*/, query.limit(limit)];
              case 3:
                (_b = _c.sent()), (data = _b.data), (error = _b.error);
                if (error) throw error;
                // For now, just return the most recent interactions
                return [2 /*return*/, data || []];
              case 4:
                error_2 = _c.sent();
                console.error("Error retrieving relevant memories:", error_2);
                return [2 /*return*/, []];
              case 5:
                return [2 /*return*/];
            }
          });
        },
      );
    },
    [user],
  );
  // Get all interactions with a specific bot
  var getBotInteractions = (0, react_1.useCallback)(
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
          var query, _a, data, error, error_3;
          if (limit === void 0) {
            limit = 20;
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
                  .from("bot_interactions")
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
                error_3 = _b.sent();
                console.error("Error retrieving bot interactions:", error_3);
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
  // Clear all stored interactions with a specific bot
  var clearBotMemory = (0, react_1.useCallback)(
    function (botName, botRole) {
      return __awaiter(_this, void 0, void 0, function () {
        var query, error, error_4;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (!(user === null || user === void 0 ? void 0 : user.id))
                return [2 /*return*/, false];
              _a.label = 1;
            case 1:
              _a.trys.push([1, 3, , 4]);
              query = client_1.supabase
                .from("bot_interactions")
                .delete()
                .eq("user_id", user.id)
                .eq("bot_name", botName);
              if (botRole) {
                query = query.eq("bot_role", botRole);
              }
              return [4 /*yield*/, query];
            case 2:
              error = _a.sent().error;
              if (error) throw error;
              return [2 /*return*/, true];
            case 3:
              error_4 = _a.sent();
              console.error("Error clearing bot memory:", error_4);
              return [2 /*return*/, false];
            case 4:
              return [2 /*return*/];
          }
        });
      });
    },
    [user],
  );
  // Get learning insights from stored interactions
  var getLearningInsights = (0, react_1.useCallback)(
    function () {
      return __awaiter(_this, void 0, void 0, function () {
        var _a, data, error, error_5;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              if (!(user === null || user === void 0 ? void 0 : user.id))
                return [2 /*return*/, null];
              _b.label = 1;
            case 1:
              _b.trys.push([1, 3, , 4]);
              return [
                4 /*yield*/,
                client_1.supabase.functions.invoke("memory", {
                  body: {
                    action: "get_learning_insights",
                    userId: user.id,
                  },
                }),
              ];
            case 2:
              (_a = _b.sent()), (data = _a.data), (error = _a.error);
              if (error) throw error;
              return [2 /*return*/, data.insightsSummary || null];
            case 3:
              error_5 = _b.sent();
              console.error("Error getting learning insights:", error_5);
              return [2 /*return*/, null];
            case 4:
              return [2 /*return*/];
          }
        });
      });
    },
    [user],
  );
  return {
    isProcessing: isProcessing,
    recentMemories: recentMemories,
    storeInteraction: storeInteraction,
    getRelevantMemories: getRelevantMemories,
    getBotInteractions: getBotInteractions,
    clearBotMemory: clearBotMemory,
    getLearningInsights: getLearningInsights,
  };
}

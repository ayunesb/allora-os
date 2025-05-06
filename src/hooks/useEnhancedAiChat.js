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
exports.useEnhancedAiChat = useEnhancedAiChat;
var react_1 = require("react");
var supabase_1 = require("@/backend/supabase");
var AuthContext_1 = require("@/context/AuthContext");
var sonner_1 = require("sonner");
var useAiMemory_1 = require("./useAiMemory");
var useAiLearning_1 = require("./useAiLearning");
var useUserPreferences_1 = require("./useUserPreferences");
var useAiModelPreferences_1 = require("./useAiModelPreferences");
function useEnhancedAiChat() {
  var _this = this;
  var user = (0, AuthContext_1.useAuth)().user;
  var _a = (0, react_1.useState)(false),
    isLoading = _a[0],
    setIsLoading = _a[1];
  var _b = (0, react_1.useState)([]),
    messages = _b[0],
    setMessages = _b[1];
  var preferences = (0, useUserPreferences_1.useUserPreferences)().preferences;
  var modelPreferences = (0, useAiModelPreferences_1.useAiModelPreferences)()
    .preferences;
  var _c = (0, useAiMemory_1.useAiMemory)(),
    storeInteraction = _c.storeInteraction,
    getRelevantMemories = _c.getRelevantMemories;
  var getLearningModel = (0, useAiLearning_1.useAiLearning)().getLearningModel;
  // Generate an AI response with memory and learning
  var generateResponse = (0, react_1.useCallback)(
    function (botName_1, botRole_1, userMessage_1) {
      var args_1 = [];
      for (var _i = 3; _i < arguments.length; _i++) {
        args_1[_i - 3] = arguments[_i];
      }
      return __awaiter(
        _this,
        __spreadArray([botName_1, botRole_1, userMessage_1], args_1, true),
        void 0,
        function (
          botName,
          botRole,
          userMessage,
          includeRelevantMemory,
          includeLearningContext,
          modelOverride,
        ) {
          var userMsg_1,
            memoryContext,
            relevantMemories,
            learningFeedback,
            model,
            topics,
            relevantTopic,
            topic,
            feedback,
            isPositive,
            modelToUse,
            _a,
            data,
            error,
            botMsg_1,
            error_1;
          if (includeRelevantMemory === void 0) {
            includeRelevantMemory = true;
          }
          if (includeLearningContext === void 0) {
            includeLearningContext = true;
          }
          return __generator(this, function (_b) {
            switch (_b.label) {
              case 0:
                if (!userMessage.trim()) return [2 /*return*/, null];
                setIsLoading(true);
                _b.label = 1;
              case 1:
                _b.trys.push([1, 9, 10, 11]);
                userMsg_1 = {
                  id: "user-".concat(Date.now()),
                  content: userMessage,
                  type: "user",
                  timestamp: new Date().toISOString(),
                };
                setMessages(function (prev) {
                  return __spreadArray(
                    __spreadArray([], prev, true),
                    [userMsg_1],
                    false,
                  );
                });
                memoryContext = null;
                if (
                  !(
                    includeRelevantMemory &&
                    (user === null || user === void 0 ? void 0 : user.id) &&
                    modelPreferences.enableVectorSearch
                  )
                )
                  return [3 /*break*/, 3];
                return [
                  4 /*yield*/,
                  getRelevantMemories(userMessage, botName, botRole, 3),
                ];
              case 2:
                relevantMemories = _b.sent();
                if (relevantMemories.length > 0) {
                  memoryContext = {
                    previousInteractions: relevantMemories.map(function (m) {
                      return "USER: "
                        .concat(m.user_message, "\n")
                        .concat(botName, ": ")
                        .concat(m.bot_response);
                    }),
                    userPreferences: preferences,
                  };
                }
                _b.label = 3;
              case 3:
                learningFeedback = null;
                if (
                  !(includeLearningContext && modelPreferences.enableLearning)
                )
                  return [3 /*break*/, 5];
                return [4 /*yield*/, getLearningModel(botName, botRole)];
              case 4:
                model = _b.sent();
                if (model) {
                  topics = model.topics || {};
                  relevantTopic = Object.entries(topics)
                    .sort(function (a, b) {
                      var aFeedback = a[1];
                      var bFeedback = b[1];
                      return (
                        bFeedback.positive +
                        bFeedback.negative -
                        (aFeedback.positive + aFeedback.negative)
                      );
                    })
                    .shift();
                  if (relevantTopic) {
                    (topic = relevantTopic[0]), (feedback = relevantTopic[1]);
                    isPositive = feedback.positive > feedback.negative;
                    learningFeedback = {
                      topic: topic,
                      positive: isPositive,
                    };
                  }
                }
                _b.label = 5;
              case 5:
                modelToUse = modelOverride || modelPreferences.modelPreference;
                return [
                  4 /*yield*/,
                  supabase_1.supabase.functions.invoke("multi-model-ai", {
                    body: {
                      botName: botName,
                      botRole: botRole,
                      prompt: userMessage,
                      messages: __spreadArray(
                        __spreadArray([], messages, true),
                        [userMsg_1],
                        false,
                      ),
                      preferences: preferences,
                      memoryContext: memoryContext,
                      learningFeedback: learningFeedback,
                      modelPreference: modelToUse,
                    },
                  }),
                ];
              case 6:
                (_a = _b.sent()), (data = _a.data), (error = _a.error);
                if (error) throw error;
                botMsg_1 = {
                  id: "bot-".concat(Date.now()),
                  content: data.content,
                  model: data.model,
                  type: "assistant",
                  sender: botName,
                  timestamp: new Date().toISOString(),
                };
                setMessages(function (prev) {
                  return __spreadArray(
                    __spreadArray([], prev, true),
                    [botMsg_1],
                    false,
                  );
                });
                if (!(user === null || user === void 0 ? void 0 : user.id))
                  return [3 /*break*/, 8];
                return [
                  4 /*yield*/,
                  storeInteraction(
                    botName,
                    botRole,
                    userMessage,
                    data.content,
                    { timestamp: new Date().toISOString(), model: data.model },
                  ),
                ];
              case 7:
                _b.sent();
                _b.label = 8;
              case 8:
                return [2 /*return*/, data.content];
              case 9:
                error_1 = _b.sent();
                console.error("Error generating AI response:", error_1);
                sonner_1.toast.error("Failed to generate AI response");
                return [2 /*return*/, null];
              case 10:
                setIsLoading(false);
                return [7 /*endfinally*/];
              case 11:
                return [2 /*return*/];
            }
          });
        },
      );
    },
    [
      user,
      messages,
      preferences,
      modelPreferences,
      storeInteraction,
      getRelevantMemories,
      getLearningModel,
    ],
  );
  // Clear the conversation
  var clearConversation = (0, react_1.useCallback)(function () {
    setMessages([]);
  }, []);
  return {
    isLoading: isLoading,
    messages: messages,
    generateResponse: generateResponse,
    clearConversation: clearConversation,
  };
}

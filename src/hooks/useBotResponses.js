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
exports.useBotResponses = useBotResponses;
var react_1 = require("react");
var botResponseGenerator_1 = require("@/backend/debate/botResponseGenerator");
var sonner_1 = require("sonner");
function useBotResponses(addMessage, setIsLoading) {
  var _this = this;
  var simulateBotResponses = (0, react_1.useCallback)(
    function (participants_1, topic_1) {
      var args_1 = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        args_1[_i - 2] = arguments[_i];
      }
      return __awaiter(
        _this,
        __spreadArray([participants_1, topic_1], args_1, true),
        void 0,
        function (
          participants,
          topic,
          riskAppetite,
          businessPriority,
          preferences,
        ) {
          var systemMessage,
            _a,
            participants_2,
            participant,
            content,
            finalContent,
            message,
            error_1,
            fallbackMessage,
            error_2;
          if (riskAppetite === void 0) {
            riskAppetite = "medium";
          }
          if (businessPriority === void 0) {
            businessPriority = "growth";
          }
          return __generator(this, function (_b) {
            switch (_b.label) {
              case 0:
                if (!participants.length || !topic) return [2 /*return*/];
                setIsLoading(true);
                _b.label = 1;
              case 1:
                _b.trys.push([1, 10, 11, 12]);
                systemMessage = {
                  id: "system-".concat(Date.now()),
                  sender: "System",
                  senderId: "system",
                  content: "Debate started: "
                    .concat(
                      topic,
                      " Discussion\nObjective: Evaluate and decide on the best approach for ",
                    )
                    .concat(topic, "\nTopic: ")
                    .concat(topic, "\nRisk Appetite: ")
                    .concat(riskAppetite, "\nBusiness Priority: ")
                    .concat(businessPriority),
                  timestamp: new Date(),
                  isUser: false,
                  votes: 0,
                  isFavorite: false,
                };
                addMessage(systemMessage);
                (_a = 0), (participants_2 = participants);
                _b.label = 2;
              case 2:
                if (!(_a < participants_2.length)) return [3 /*break*/, 9];
                participant = participants_2[_a];
                _b.label = 3;
              case 3:
                _b.trys.push([3, 6, , 8]);
                return [
                  4 /*yield*/,
                  (0, botResponseGenerator_1.generateBotResponse)(
                    participant,
                    topic,
                    riskAppetite,
                    businessPriority,
                  ),
                ];
              case 4:
                content = _b.sent();
                finalContent = content;
                // If rationale isn't already included but was requested
                if (
                  (preferences === null || preferences === void 0
                    ? void 0
                    : preferences.showSources) &&
                  !finalContent.includes("Rationale:")
                ) {
                  finalContent += "\n\nRationale: Based on my experience as "
                    .concat(
                      participant.name,
                      ", I believe this approach aligns with the ",
                    )
                    .concat(riskAppetite, " risk profile and prioritizes ")
                    .concat(businessPriority, ".");
                }
                message = {
                  id: "msg-".concat(Date.now(), "-").concat(participant.id),
                  sender: participant.name,
                  senderId: participant.id,
                  content: finalContent,
                  timestamp: new Date(),
                  isUser: false,
                  votes: 0,
                  isFavorite: false,
                };
                addMessage(message);
                // Add a delay between responses to make it feel more natural
                return [
                  4 /*yield*/,
                  new Promise(function (resolve) {
                    return setTimeout(resolve, 800 + Math.random() * 700);
                  }),
                ];
              case 5:
                // Add a delay between responses to make it feel more natural
                _b.sent();
                return [3 /*break*/, 8];
              case 6:
                error_1 = _b.sent();
                console.error(
                  "Error generating response for ".concat(
                    participant.name,
                    ":",
                  ),
                  error_1,
                );
                fallbackMessage = {
                  id: "msg-".concat(Date.now(), "-").concat(participant.id),
                  sender: participant.name,
                  senderId: participant.id,
                  content: "I need more context about "
                    .concat(
                      topic,
                      " before providing a detailed response. However, I would approach this with a ",
                    )
                    .concat(
                      riskAppetite,
                      " risk profile, focusing primarily on ",
                    )
                    .concat(businessPriority, "."),
                  timestamp: new Date(),
                  isUser: false,
                  votes: 0,
                  isFavorite: false,
                };
                addMessage(fallbackMessage);
                return [
                  4 /*yield*/,
                  new Promise(function (resolve) {
                    return setTimeout(resolve, 500);
                  }),
                ];
              case 7:
                _b.sent();
                return [3 /*break*/, 8];
              case 8:
                _a++;
                return [3 /*break*/, 2];
              case 9:
                return [3 /*break*/, 12];
              case 10:
                error_2 = _b.sent();
                console.error("Error in simulateBotResponses:", error_2);
                sonner_1.toast.error("Error generating executive responses");
                return [3 /*break*/, 12];
              case 11:
                setIsLoading(false);
                return [7 /*endfinally*/];
              case 12:
                return [2 /*return*/];
            }
          });
        },
      );
    },
    [addMessage, setIsLoading],
  );
  return {
    simulateBotResponses: simulateBotResponses,
  };
}

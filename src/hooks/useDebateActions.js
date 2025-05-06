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
exports.default = useDebateActions;
var react_1 = require("react");
var debate_1 = require("@/backend/debate");
var sonner_1 = require("sonner");
function useDebateActions(options) {
  var _this = this;
  var sessionId = options.sessionId,
    setSessionId = options.setSessionId,
    profile = options.profile,
    participants = options.participants,
    selectedTopic = options.selectedTopic,
    messages = options.messages,
    debateTitle = options.debateTitle,
    debateObjective = options.debateObjective,
    debateDuration = options.debateDuration,
    riskAppetite = options.riskAppetite,
    businessPriority = options.businessPriority,
    addSystemMessage = options.addSystemMessage,
    setIsLoading = options.setIsLoading,
    setIsDebateActive = options.setIsDebateActive,
    setMessages = options.setMessages,
    simulateBotResponses = options.simulateBotResponses,
    getSelectedTopicDetails = options.getSelectedTopicDetails;
  var startDebate = (0, react_1.useCallback)(
    function () {
      return __awaiter(_this, void 0, void 0, function () {
        var selectedTopicDetails, initialMessage, sessionData, id;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (!selectedTopic || !debateTitle || !debateObjective) {
                sonner_1.toast.error("Please complete all debate setup fields");
                return [2 /*return*/];
              }
              setIsLoading(true);
              setIsDebateActive(true);
              setMessages([]);
              selectedTopicDetails = getSelectedTopicDetails();
              initialMessage = addSystemMessage(
                "Debate started: "
                  .concat(debateTitle, "\n\nObjective: ")
                  .concat(debateObjective, "\n\nTopic: ")
                  .concat(
                    (selectedTopicDetails === null ||
                    selectedTopicDetails === void 0
                      ? void 0
                      : selectedTopicDetails.topic) || selectedTopic,
                    "\n\nRisk Appetite: ",
                  )
                  .concat(riskAppetite, "\n\nBusiness Priority: ")
                  .concat(businessPriority),
              );
              sessionData = {
                title: debateTitle,
                objective: debateObjective,
                topic: selectedTopicDetails || {
                  id: selectedTopic,
                  topic: selectedTopic,
                  description: "",
                },
                participants: participants,
                messages: [initialMessage],
                duration: parseInt(debateDuration, 10),
                company_id:
                  (profile === null || profile === void 0
                    ? void 0
                    : profile.company_id) || "unknown",
                riskAppetite: riskAppetite,
                businessPriority: businessPriority,
              };
              return [
                4 /*yield*/,
                (0, debate_1.saveDebateSession)(sessionData),
              ];
            case 1:
              id = _a.sent();
              setSessionId(id);
              setIsLoading(false);
              // Schedule first round of bot responses
              simulateBotResponses(
                participants,
                (selectedTopicDetails === null ||
                selectedTopicDetails === void 0
                  ? void 0
                  : selectedTopicDetails.topic) || selectedTopic,
                riskAppetite,
                businessPriority,
              );
              return [2 /*return*/];
          }
        });
      });
    },
    [
      selectedTopic,
      debateTitle,
      debateObjective,
      debateDuration,
      participants,
      profile,
      riskAppetite,
      businessPriority,
      setIsLoading,
      setIsDebateActive,
      setMessages,
      addSystemMessage,
      simulateBotResponses,
      getSelectedTopicDetails,
    ],
  );
  var sendUserMessage = (0, react_1.useCallback)(
    function (
      content,
      participants,
      topic,
      riskAppetite,
      businessPriority,
      sendMessage,
    ) {
      var topicDetails = getSelectedTopicDetails();
      var topicName =
        (topicDetails === null || topicDetails === void 0
          ? void 0
          : topicDetails.topic) || topic;
      sendMessage(
        content,
        participants,
        topicName,
        riskAppetite,
        businessPriority,
      );
    },
    [getSelectedTopicDetails],
  );
  return {
    startDebate: startDebate,
    sendUserMessage: sendUserMessage,
  };
}

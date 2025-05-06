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
exports.useExecutiveDebate = useExecutiveDebate;
var react_1 = require("react");
var sonner_1 = require("sonner");
var useAuthState_1 = require("@/hooks/useAuthState");
var errorHandling_1 = require("@/utils/api/errorHandling");
function useExecutiveDebate() {
  var _this = this;
  var _a = (0, react_1.useState)(null),
    debate = _a[0],
    setDebate = _a[1];
  var _b = (0, react_1.useState)(false),
    isGeneratingDebate = _b[0],
    setIsGeneratingDebate = _b[1];
  var _c = (0, react_1.useState)([]),
    debateMessages = _c[0],
    setDebateMessages = _c[1];
  var _d = (0, react_1.useState)(null),
    debateSummary = _d[0],
    setDebateSummary = _d[1];
  var _e = (0, react_1.useState)(true),
    isLoading = _e[0],
    setIsLoading = _e[1];
  var user = (0, useAuthState_1.useAuthState)().user;
  var generateDebate = (0, react_1.useCallback)(function (strategy) {
    return __awaiter(_this, void 0, void 0, function () {
      var mockDebateSession, mockMessages, mockSummary, err_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!strategy) {
              sonner_1.toast.error("No strategy selected for debate");
              return [2 /*return*/];
            }
            setIsGeneratingDebate(true);
            setIsLoading(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            // In a real implementation, this would call an API to generate the debate
            // For now, we'll simulate a delay and return mock data
            return [
              4 /*yield*/,
              new Promise(function (resolve) {
                return setTimeout(resolve, 1500);
              }),
            ];
          case 2:
            // In a real implementation, this would call an API to generate the debate
            // For now, we'll simulate a delay and return mock data
            _a.sent();
            mockDebateSession = {
              id: "debate-".concat(Date.now()),
              strategyId: strategy.id,
              messages: [],
              consensus: "",
            };
            mockMessages = [
              {
                id: "1",
                sender: "Elon Musk",
                content: 'I think the "'.concat(
                  strategy.title,
                  '" strategy has significant potential, especially if we approach it with an innovative mindset. We should be willing to disrupt the existing market paradigms.',
                ),
                timestamp: new Date(Date.now() - 300000),
                executive: {
                  name: "Elon Musk",
                  role: "ceo",
                  avatar: "/avatars/elon-musk.png",
                },
                sentiment: "positive",
              },
              {
                id: "2",
                sender: "Warren Buffett",
                content:
                  "I appreciate the enthusiasm, but I'm concerned about the ".concat(
                    strategy.risk || "medium",
                    " risk profile. We should consider ways to mitigate potential downside while preserving upside potential.",
                  ),
                timestamp: new Date(Date.now() - 240000),
                executive: {
                  name: "Warren Buffett",
                  role: "cfo",
                  avatar: "/avatars/warren-buffett.png",
                },
                sentiment: "negative",
              },
              {
                id: "3",
                sender: "Satya Nadella",
                content:
                  "We need to consider how this fits into our digital transformation goals. I suggest we build in quarterly reassessment points to ensure we're adapting to market changes.",
                timestamp: new Date(Date.now() - 180000),
                executive: {
                  name: "Satya Nadella",
                  role: "strategy",
                  avatar: "/avatars/satya-nadella.png",
                },
                sentiment: "neutral",
              },
              {
                id: "4",
                sender: "Elon Musk",
                content:
                  "Good point. Perhaps we should take a phased approach - start with a smaller pilot to validate our assumptions before full implementation.",
                timestamp: new Date(Date.now() - 120000),
                executive: {
                  name: "Elon Musk",
                  role: "ceo",
                  avatar: "/avatars/elon-musk.png",
                },
                sentiment: "positive",
              },
            ];
            mockSummary = {
              keyFindings: [
                "The strategy has strong market potential with proper execution",
                "A phased implementation approach reduces initial risk exposure",
                "Regular reassessment will be critical to long-term success",
                "Digital transformation components should be prioritized",
              ],
              agreedPoints: [
                "A pilot phase should precede full implementation",
                "Market disruption opportunity exists in this space",
                "Digital components are essential to success",
              ],
              disagreedPoints: [
                "Level of initial investment required",
                "Timeline for expected ROI",
                "Risk appetite for more innovative elements",
              ],
              finalDecision:
                'After thorough discussion, the executive team recommends proceeding with the "'.concat(
                  strategy.title,
                  '" strategy using a phased implementation approach, starting with a focused pilot program to validate key assumptions before scaling.',
                ),
            };
            setDebate(mockDebateSession);
            setDebateMessages(mockMessages);
            setDebateSummary(mockSummary);
            return [3 /*break*/, 5];
          case 3:
            err_1 = _a.sent();
            console.error("Error generating debate:", err_1);
            (0, errorHandling_1.handleApiError)(err_1, {
              customMessage: "Failed to generate executive debate",
            });
            return [3 /*break*/, 5];
          case 4:
            setIsGeneratingDebate(false);
            setIsLoading(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  }, []);
  return {
    debate: debate,
    isGeneratingDebate: isGeneratingDebate,
    generateDebate: generateDebate,
    debateMessages: debateMessages,
    debateSummary: debateSummary,
    isLoading: isLoading,
  };
}

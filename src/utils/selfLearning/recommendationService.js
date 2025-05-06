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
exports.getPersonalizedRecommendations = getPersonalizedRecommendations;
var executiveBots_1 = require("@/backend/executiveBots");
/**
 * Get personalized recommendations based on user behavior
 */
function getPersonalizedRecommendations(userId) {
  return __awaiter(this, void 0, void 0, function () {
    var executives, strategies, topics;
    return __generator(this, function (_a) {
      try {
        executives = Object.entries(executiveBots_1.executiveBots)
          .flatMap(function (_a) {
            var role = _a[0],
              botNames = _a[1];
            return botNames.map(function (name) {
              return {
                name: name,
                role: role,
                weight: Math.random(), // In real app, this would be calculated based on user preferences
              };
            });
          })
          .sort(function (a, b) {
            return b.weight - a.weight;
          })
          .slice(0, 5);
        strategies = [
          {
            id: "strat-1",
            title: "Market Expansion Strategy",
            description:
              "Expand into adjacent markets with existing product offerings",
            executiveBot: executives[0],
            confidence: 0.87,
          },
          {
            id: "strat-2",
            title: "Innovation Pipeline",
            description: "Develop a systematic approach to innovation",
            executiveBot: executives[1],
            confidence: 0.82,
          },
          {
            id: "strat-3",
            title: "Operational Efficiency",
            description:
              "Streamline operations by identifying and eliminating inefficiencies",
            executiveBot: executives[2],
            confidence: 0.79,
          },
        ];
        topics = [
          {
            id: "topic-1",
            title: "Digital Transformation",
            relevance: 0.89,
            executiveBot: executives[0],
          },
          {
            id: "topic-2",
            title: "Customer Experience",
            relevance: 0.85,
            executiveBot: executives[1],
          },
          {
            id: "topic-3",
            title: "Sustainable Growth",
            relevance: 0.81,
            executiveBot: executives[2],
          },
        ];
        return [
          2 /*return*/,
          {
            strategies: strategies,
            executives: executives,
            topics: topics,
          },
        ];
      } catch (error) {
        console.error("Error getting personalized recommendations:", error);
        return [
          2 /*return*/,
          {
            strategies: [],
            executives: [],
            topics: [],
          },
        ];
      }
      return [2 /*return*/];
    });
  });
}

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
exports.getUserConsultationHistory = getUserConsultationHistory;
exports.startNewConsultation = startNewConsultation;
var sonner_1 = require("sonner");
function getUserConsultationHistory() {
  return __awaiter(this, void 0, void 0, function () {
    var sampleConsultations;
    return __generator(this, function (_a) {
      try {
        sampleConsultations = [
          {
            id: "1",
            botName: "Elon Musk",
            botRole: "ceo",
            messages: [
              {
                type: "user",
                content: "How can I scale my business faster?",
                timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
              },
              {
                type: "bot",
                content:
                  "As Elon Musk, I would recommend focusing on your unit economics first before scaling. Make sure each transaction is profitable.",
                timestamp: new Date(Date.now() - 86300000).toISOString(),
              },
            ],
          },
          {
            id: "2",
            botName: "Ruth Porat",
            botRole: "cfo",
            messages: [
              {
                type: "user",
                content: "Should I invest in marketing or product development?",
                timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
              },
              {
                type: "bot",
                content:
                  "As Ruth Porat, I'd recommend calculating the ROI of both options. Typically, investing in product enhancements that increase customer lifetime value yields better long-term results.",
                timestamp: new Date(Date.now() - 172700000).toISOString(),
              },
            ],
          },
        ];
        return [2 /*return*/, sampleConsultations];
      } catch (error) {
        console.error("Error fetching consultation history:", error.message);
        return [2 /*return*/, []];
      }
      return [2 /*return*/];
    });
  });
}
function startNewConsultation(botName, botRole) {
  return __awaiter(this, void 0, void 0, function () {
    var consultationId;
    return __generator(this, function (_a) {
      try {
        // Mock implementation since we don't have the actual tables
        // In a real implementation, this would save to a database
        console.log(
          "Starting new consultation with",
          botName,
          "in role",
          botRole,
        );
        consultationId = Math.random().toString(36).substring(2, 15);
        return [2 /*return*/, consultationId];
      } catch (error) {
        console.error("Error starting new consultation:", error.message);
        sonner_1.toast.error("Failed to start consultation");
        return [2 /*return*/, null];
      }
      return [2 /*return*/];
    });
  });
}

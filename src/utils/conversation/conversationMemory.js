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
exports.storeConversationMemory = storeConversationMemory;
exports.getConversationMemory = getConversationMemory;
exports.storeUserPreferences = storeUserPreferences;
exports.storeCompanyData = storeCompanyData;
var supabase_1 = require("@/backend/supabase");
// Store a conversation interaction in memory
function storeConversationMemory(userId, botId, userMessage, botResponse) {
  return __awaiter(this, void 0, void 0, function () {
    var existingMemory,
      memoryId,
      previousInteractions,
      updatedInteractions,
      error,
      error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 3, , 4]);
          return [4 /*yield*/, getConversationMemory(userId, botId)];
        case 1:
          existingMemory = _a.sent();
          memoryId =
            (existingMemory === null || existingMemory === void 0
              ? void 0
              : existingMemory.id) ||
            "memory-".concat(userId, "-").concat(botId);
          previousInteractions =
            (existingMemory === null || existingMemory === void 0
              ? void 0
              : existingMemory.memoryContext.previousInteractions) || [];
          updatedInteractions = __spreadArray(
            __spreadArray([], previousInteractions, true),
            [
              "User: ".concat(userMessage),
              "".concat(botId, ": ").concat(botResponse),
            ],
            false,
          ).slice(-10);
          return [
            4 /*yield*/,
            supabase_1.supabase.from("conversation_memories").upsert({
              id: memoryId,
              user_id: userId,
              bot_id: botId,
              memory_context: {
                previousInteractions: updatedInteractions,
                userPreferences:
                  (existingMemory === null || existingMemory === void 0
                    ? void 0
                    : existingMemory.memoryContext.userPreferences) || {},
                companyData:
                  (existingMemory === null || existingMemory === void 0
                    ? void 0
                    : existingMemory.memoryContext.companyData) || {},
              },
              last_updated: new Date().toISOString(),
            }),
          ];
        case 2:
          error = _a.sent().error;
          if (error) {
            console.error("Error storing conversation memory:", error);
            return [2 /*return*/, false];
          }
          return [2 /*return*/, true];
        case 3:
          error_1 = _a.sent();
          console.error("Failed to store conversation memory:", error_1);
          return [2 /*return*/, false];
        case 4:
          return [2 /*return*/];
      }
    });
  });
}
// Retrieve conversation memory for a specific user and bot
function getConversationMemory(userId, botId) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error, error_2;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            supabase_1.supabase
              .from("conversation_memories")
              .select("*")
              .eq("user_id", userId)
              .eq("bot_id", botId)
              .single(),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error || !data) {
            if (error && error.code !== "PGRST116") {
              // Not "no rows returned" error
              console.error("Error retrieving conversation memory:", error);
            }
            return [2 /*return*/, null];
          }
          return [
            2 /*return*/,
            {
              id: data.id,
              userId: data.user_id,
              botId: data.bot_id,
              memoryContext: data.memory_context,
              lastUpdated: new Date(data.last_updated),
            },
          ];
        case 2:
          error_2 = _b.sent();
          console.error("Failed to retrieve conversation memory:", error_2);
          return [2 /*return*/, null];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
// Store user preferences in memory context
function storeUserPreferences(userId, botId, preferences) {
  return __awaiter(this, void 0, void 0, function () {
    var existingMemory, memoryId, memoryContext, error, error_3;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 3, , 4]);
          return [4 /*yield*/, getConversationMemory(userId, botId)];
        case 1:
          existingMemory = _a.sent();
          memoryId =
            (existingMemory === null || existingMemory === void 0
              ? void 0
              : existingMemory.id) ||
            "memory-".concat(userId, "-").concat(botId);
          memoryContext = (existingMemory === null || existingMemory === void 0
            ? void 0
            : existingMemory.memoryContext) || { previousInteractions: [] };
          return [
            4 /*yield*/,
            supabase_1.supabase.from("conversation_memories").upsert({
              id: memoryId,
              user_id: userId,
              bot_id: botId,
              memory_context: __assign(__assign({}, memoryContext), {
                userPreferences: __assign(
                  __assign({}, memoryContext.userPreferences),
                  preferences,
                ),
              }),
              last_updated: new Date().toISOString(),
            }),
          ];
        case 2:
          error = _a.sent().error;
          if (error) {
            console.error("Error storing user preferences:", error);
            return [2 /*return*/, false];
          }
          return [2 /*return*/, true];
        case 3:
          error_3 = _a.sent();
          console.error("Failed to store user preferences:", error_3);
          return [2 /*return*/, false];
        case 4:
          return [2 /*return*/];
      }
    });
  });
}
// Store company data in memory context
function storeCompanyData(userId, botId, companyData) {
  return __awaiter(this, void 0, void 0, function () {
    var existingMemory, memoryId, memoryContext, error, error_4;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 3, , 4]);
          return [4 /*yield*/, getConversationMemory(userId, botId)];
        case 1:
          existingMemory = _a.sent();
          memoryId =
            (existingMemory === null || existingMemory === void 0
              ? void 0
              : existingMemory.id) ||
            "memory-".concat(userId, "-").concat(botId);
          memoryContext = (existingMemory === null || existingMemory === void 0
            ? void 0
            : existingMemory.memoryContext) || { previousInteractions: [] };
          return [
            4 /*yield*/,
            supabase_1.supabase.from("conversation_memories").upsert({
              id: memoryId,
              user_id: userId,
              bot_id: botId,
              memory_context: __assign(__assign({}, memoryContext), {
                companyData: __assign(
                  __assign({}, memoryContext.companyData),
                  companyData,
                ),
              }),
              last_updated: new Date().toISOString(),
            }),
          ];
        case 2:
          error = _a.sent().error;
          if (error) {
            console.error("Error storing company data:", error);
            return [2 /*return*/, false];
          }
          return [2 /*return*/, true];
        case 3:
          error_4 = _a.sent();
          console.error("Failed to store company data:", error_4);
          return [2 /*return*/, false];
        case 4:
          return [2 /*return*/];
      }
    });
  });
}

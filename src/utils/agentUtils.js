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
exports.XP_THRESHOLDS = void 0;
exports.getDecisionStyle = getDecisionStyle;
exports.getPersonality = getPersonality;
exports.applyAgentVote = applyAgentVote;
var supabaseClient_1 = require("@/supabaseClient");
/**
 * Utilities for formatting and standardizing agent personalities and decision styles
 */
exports.XP_THRESHOLDS = {
  v1: 100,
  v2: 250,
  v3: 500,
};
/**
 * Get a formatted decision style string based on the executive's style
 */
function getDecisionStyle(style) {
  switch (style === null || style === void 0 ? void 0 : style.toLowerCase()) {
    case "analytical":
      return "You make decisions based on careful analysis of data and logical reasoning. You prefer quantitative evidence over qualitative inputs.";
    case "intuitive":
      return "You make decisions based on gut feelings and intuition. You trust your experience and instincts over pure data.";
    case "decisive":
      return "You make decisions quickly and confidently. You believe in fast execution and adapting along the way.";
    case "cautious":
      return "You make decisions carefully and methodically. You prefer to have all information possible before proceeding.";
    case "innovative":
      return "You make decisions that challenge the status quo. You look for creative, unconventional solutions.";
    case "collaborative":
      return "You make decisions through consensus building. You value input from diverse perspectives.";
    default:
      return "You make balanced decisions considering both data and intuition. You weigh risks carefully but are willing to pursue opportunities.";
  }
}
/**
 * Get a formatted personality string based on the executive's personality
 */
function getPersonality(personality) {
  switch (
    personality === null || personality === void 0
      ? void 0
      : personality.toLowerCase()
  ) {
    case "visionary":
      return "You are forward-thinking and optimistic about the future. You tend to focus on big ideas and long-term possibilities.";
    case "pragmatic":
      return "You are practical and focused on what works. You prefer concrete solutions over abstract theories.";
    case "challenger":
      return "You are direct and questioning. You challenge assumptions and push others to think differently.";
    case "diplomat":
      return "You are tactful and relationship-oriented. You focus on building consensus and maintaining harmony.";
    case "driver":
      return "You are results-oriented and focused on outcomes. You value efficiency, speed, and decisive action.";
    case "analytical":
      return "You are detail-oriented and thorough. You prefer working with data and facts rather than emotions or intuition.";
    default:
      return "You have a balanced personality that adapts to different situations appropriately.";
  }
}
function applyAgentVote(agentId, vote) {
  return __awaiter(this, void 0, void 0, function () {
    var delta,
      _a,
      agent,
      error,
      updatedXP,
      newVersion,
      _i,
      _b,
      _c,
      version,
      threshold,
      updateError;
    return __generator(this, function (_d) {
      switch (_d.label) {
        case 0:
          delta = vote === "up" ? 10 : -5;
          return [
            4 /*yield*/,
            supabaseClient_1.supabase
              .from("agents")
              .select("*")
              .eq("id", agentId)
              .single(),
          ];
        case 1:
          (_a = _d.sent()), (agent = _a.data), (error = _a.error);
          if (error || !agent) {
            console.error("Error fetching agent:", error);
            return [2 /*return*/];
          }
          updatedXP = Math.max(0, agent.xp + delta);
          newVersion = agent.version;
          for (
            _i = 0, _b = Object.entries(exports.XP_THRESHOLDS);
            _i < _b.length;
            _i++
          ) {
            (_c = _b[_i]), (version = _c[0]), (threshold = _c[1]);
            if (updatedXP >= threshold) newVersion = version;
          }
          return [
            4 /*yield*/,
            supabaseClient_1.supabase
              .from("agents")
              .update({ xp: updatedXP, version: newVersion })
              .eq("id", agentId),
          ];
        case 2:
          updateError = _d.sent().error;
          if (updateError) {
            console.error("Error updating agent:", updateError);
          }
          return [2 /*return*/];
      }
    });
  });
}

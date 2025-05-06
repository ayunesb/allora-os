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
exports.getUserPreferences = getUserPreferences;
var supabase_1 = require("@/backend/supabase");
var sonner_1 = require("sonner");
/**
 * Gets the preferences for a specific user
 * @param userId The ID of the user to fetch preferences for
 * @returns The user's preferences or default preferences if none found
 */
function getUserPreferences(userId) {
  return __awaiter(this, void 0, void 0, function () {
    var defaultPreferences,
      _a,
      data,
      error,
      preferredExecs,
      favTopics,
      dashboardPrefs,
      error_1;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          defaultPreferences = {
            responseStyle: "balanced",
            technicalLevel: "intermediate",
            showSources: false,
            focusArea: "general",
            riskAppetite: "medium",
            preferredExecutives: [],
            favoriteTopics: [],
            modelPreference: "auto",
            enableDebate: false,
            maxDebateParticipants: 3,
            enableVectorSearch: false,
            enableLearning: false,
          };
          return [
            4 /*yield*/,
            supabase_1.supabase
              .from("user_preferences")
              .select("*")
              .eq("user_id", userId)
              .single(),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            // If no preferences are found, don't treat it as an error
            if (error.code === "PGRST116") {
              console.log(
                "No preferences found for user ".concat(
                  userId,
                  ", using defaults",
                ),
              );
              return [2 /*return*/, defaultPreferences];
            }
            // Otherwise log the error
            console.error("Error fetching user preferences:", error);
            throw error;
          }
          if (!data) {
            return [2 /*return*/, defaultPreferences];
          }
          preferredExecs = Array.isArray(data.preferred_executives)
            ? data.preferred_executives
            : [];
          favTopics = Array.isArray(data.favorite_topics)
            ? data.favorite_topics
            : [];
          dashboardPrefs = data.dashboard_preferences || {};
          return [
            2 /*return*/,
            {
              responseStyle:
                data.communication_style || defaultPreferences.responseStyle,
              technicalLevel: defaultPreferences.technicalLevel,
              showSources: defaultPreferences.showSources,
              focusArea: defaultPreferences.focusArea,
              riskAppetite:
                data.risk_appetite || defaultPreferences.riskAppetite,
              preferredExecutives: preferredExecs,
              favoriteTopics: favTopics,
              modelPreference:
                dashboardPrefs.modelPreference ||
                defaultPreferences.modelPreference,
              enableDebate:
                dashboardPrefs.enableDebate || defaultPreferences.enableDebate,
              maxDebateParticipants:
                dashboardPrefs.maxDebateParticipants ||
                defaultPreferences.maxDebateParticipants,
              enableVectorSearch:
                dashboardPrefs.enableVectorSearch ||
                defaultPreferences.enableVectorSearch,
              enableLearning:
                dashboardPrefs.enableLearning ||
                defaultPreferences.enableLearning,
            },
          ];
        case 2:
          error_1 = _b.sent();
          console.error("Failed to get user preferences:", error_1);
          sonner_1.toast.error("Failed to load user preferences");
          // Return default preferences as a fallback
          return [
            2 /*return*/,
            {
              responseStyle: "balanced",
              technicalLevel: "intermediate",
              showSources: false,
              focusArea: "general",
              riskAppetite: "medium",
              preferredExecutives: [],
              favoriteTopics: [],
              modelPreference: "auto",
              enableDebate: false,
              maxDebateParticipants: 3,
              enableVectorSearch: false,
              enableLearning: false,
            },
          ];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}

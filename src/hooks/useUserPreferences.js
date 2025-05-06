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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUserPreferences = useUserPreferences;
var react_1 = require("react");
var client_1 = require("@/integrations/supabase/client");
var sonner_1 = require("sonner");
var useAuthState_1 = require("./useAuthState");
var defaultPreferences = {
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
  // Add default values for new fields
  writingStyle: "Formal",
  tone: "Confident",
};
function useUserPreferences() {
  var _this = this;
  var user = (0, useAuthState_1.useAuthState)().user;
  var _a = (0, react_1.useState)(defaultPreferences),
    preferences = _a[0],
    setPreferences = _a[1];
  var _b = (0, react_1.useState)(false),
    isLoading = _b[0],
    setIsLoading = _b[1];
  var _c = (0, react_1.useState)(null),
    lastSyncTime = _c[0],
    setLastSyncTime = _c[1];
  (0, react_1.useEffect)(
    function () {
      var loadPreferences = function () {
        return __awaiter(_this, void 0, void 0, function () {
          var _a,
            data,
            error,
            preferredExecs,
            favTopics,
            savedPreferences,
            error_1,
            savedPreferences;
          return __generator(this, function (_b) {
            switch (_b.label) {
              case 0:
                setIsLoading(true);
                _b.label = 1;
              case 1:
                _b.trys.push([1, 4, 5, 6]);
                if (!(user === null || user === void 0 ? void 0 : user.id))
                  return [3 /*break*/, 3];
                return [
                  4 /*yield*/,
                  client_1.supabase
                    .from("user_preferences")
                    .select("*")
                    .eq("user_id", user.id)
                    .single(),
                ];
              case 2:
                (_a = _b.sent()), (data = _a.data), (error = _a.error);
                if (error) {
                  throw error;
                }
                if (data) {
                  preferredExecs = Array.isArray(data.preferred_executives)
                    ? data.preferred_executives.map(function (item) {
                        return String(item);
                      })
                    : [];
                  favTopics = Array.isArray(data.favorite_topics)
                    ? data.favorite_topics.map(function (item) {
                        return String(item);
                      })
                    : [];
                  setPreferences({
                    responseStyle:
                      data.communication_style ||
                      defaultPreferences.responseStyle,
                    technicalLevel: defaultPreferences.technicalLevel,
                    showSources: defaultPreferences.showSources,
                    focusArea: defaultPreferences.focusArea,
                    riskAppetite:
                      data.risk_appetite || defaultPreferences.riskAppetite,
                    preferredExecutives: preferredExecs,
                    favoriteTopics: favTopics,
                    modelPreference: defaultPreferences.modelPreference,
                    enableDebate: defaultPreferences.enableDebate,
                    maxDebateParticipants:
                      defaultPreferences.maxDebateParticipants,
                    enableVectorSearch: defaultPreferences.enableVectorSearch,
                    enableLearning: defaultPreferences.enableLearning,
                  });
                  setLastSyncTime(new Date());
                  return [2 /*return*/];
                }
                _b.label = 3;
              case 3:
                savedPreferences = localStorage.getItem("userPreferences");
                if (savedPreferences) {
                  setPreferences(JSON.parse(savedPreferences));
                  setLastSyncTime(new Date());
                }
                return [3 /*break*/, 6];
              case 4:
                error_1 = _b.sent();
                console.error("Error loading preferences:", error_1);
                savedPreferences = localStorage.getItem("userPreferences");
                if (savedPreferences) {
                  setPreferences(JSON.parse(savedPreferences));
                }
                return [3 /*break*/, 6];
              case 5:
                setIsLoading(false);
                return [7 /*endfinally*/];
              case 6:
                return [2 /*return*/];
            }
          });
        });
      };
      loadPreferences();
    },
    [user === null || user === void 0 ? void 0 : user.id],
  );
  var savePreferences = function (newPreferences) {
    return __awaiter(_this, void 0, void 0, function () {
      var error, error_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setIsLoading(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 4, 5, 6]);
            setPreferences(newPreferences);
            localStorage.setItem(
              "userPreferences",
              JSON.stringify(newPreferences),
            );
            if (!(user === null || user === void 0 ? void 0 : user.id))
              return [3 /*break*/, 3];
            return [
              4 /*yield*/,
              client_1.supabase.from("user_preferences").upsert(
                {
                  user_id: user.id,
                  communication_style: newPreferences.responseStyle,
                  risk_appetite: newPreferences.riskAppetite,
                  preferred_executives: newPreferences.preferredExecutives,
                  favorite_topics: newPreferences.favoriteTopics,
                  dashboard_preferences: {
                    modelPreference: newPreferences.modelPreference,
                    enableDebate: newPreferences.enableDebate,
                    maxDebateParticipants: newPreferences.maxDebateParticipants,
                    enableVectorSearch: newPreferences.enableVectorSearch,
                    enableLearning: newPreferences.enableLearning,
                    // Add new fields to dashboard preferences
                    writingStyle: newPreferences.writingStyle,
                    tone: newPreferences.tone,
                  },
                  last_updated: new Date().toISOString(),
                },
                {
                  onConflict: "user_id",
                },
              ),
            ];
          case 2:
            error = _a.sent().error;
            if (error) {
              throw error;
            }
            _a.label = 3;
          case 3:
            setLastSyncTime(new Date());
            sonner_1.toast.success("Preferences saved successfully");
            return [3 /*break*/, 6];
          case 4:
            error_2 = _a.sent();
            console.error("Error saving preferences:", error_2);
            sonner_1.toast.error("Failed to save preferences");
            return [3 /*break*/, 6];
          case 5:
            setIsLoading(false);
            return [7 /*endfinally*/];
          case 6:
            return [2 /*return*/];
        }
      });
    });
  };
  var updatePreference = (0, react_1.useCallback)(
    function (key, value) {
      return __awaiter(_this, void 0, void 0, function () {
        var newPreferences, error_3;
        var _a;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              _b.trys.push([0, 2, , 3]);
              newPreferences = __assign(
                __assign({}, preferences),
                ((_a = {}), (_a[key] = value), _a),
              );
              return [4 /*yield*/, savePreferences(newPreferences)];
            case 1:
              _b.sent();
              return [3 /*break*/, 3];
            case 2:
              error_3 = _b.sent();
              console.error(
                "Error updating preference ".concat(key, ":"),
                error_3,
              );
              sonner_1.toast.error("Failed to update ".concat(key));
              return [3 /*break*/, 3];
            case 3:
              return [2 /*return*/];
          }
        });
      });
    },
    [preferences, savePreferences],
  );
  var resetPreferences = (0, react_1.useCallback)(
    function () {
      return __awaiter(_this, void 0, void 0, function () {
        var error_4;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 2, , 3]);
              return [4 /*yield*/, savePreferences(defaultPreferences)];
            case 1:
              _a.sent();
              sonner_1.toast.success("Preferences reset to defaults");
              return [3 /*break*/, 3];
            case 2:
              error_4 = _a.sent();
              console.error("Error resetting preferences:", error_4);
              sonner_1.toast.error("Failed to reset preferences");
              return [3 /*break*/, 3];
            case 3:
              return [2 /*return*/];
          }
        });
      });
    },
    [savePreferences],
  );
  return {
    preferences: preferences,
    isLoading: isLoading,
    savePreferences: savePreferences,
    updatePreference: updatePreference,
    resetPreferences: resetPreferences,
    lastSyncTime: lastSyncTime,
  };
}

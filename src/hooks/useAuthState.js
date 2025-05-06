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
exports.useAuthState = useAuthState;
var react_1 = require("react");
var client_1 = require("@/integrations/supabase/client");
function useAuthState() {
  var _this = this;
  var _a = (0, react_1.useState)(null),
    user = _a[0],
    setUser = _a[1];
  var _b = (0, react_1.useState)(null),
    session = _b[0],
    setSession = _b[1];
  var _c = (0, react_1.useState)(null),
    profile = _c[0],
    setProfile = _c[1];
  var _d = (0, react_1.useState)(true),
    isLoading = _d[0],
    setIsLoading = _d[1];
  var _e = (0, react_1.useState)(true),
    isProfileLoading = _e[0],
    setIsProfileLoading = _e[1];
  var _f = (0, react_1.useState)(null),
    authError = _f[0],
    setAuthError = _f[1];
  var _g = (0, react_1.useState)(false),
    hasInitialized = _g[0],
    setHasInitialized = _g[1];
  // Check if email is verified
  var isEmailVerified =
    (user === null || user === void 0 ? void 0 : user.email_confirmed_at) !=
      null || false;
  // Refresh session
  var refreshSession = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var _a, data, error, error_1;
      var _b, _c, _d;
      return __generator(this, function (_e) {
        switch (_e.label) {
          case 0:
            _e.trys.push([0, 2, , 3]);
            return [4 /*yield*/, client_1.supabase.auth.refreshSession()];
          case 1:
            (_a = _e.sent()), (data = _a.data), (error = _a.error);
            if (error) throw error;
            setSession(data.session);
            setUser(
              (_c =
                (_b = data.session) === null || _b === void 0
                  ? void 0
                  : _b.user) !== null && _c !== void 0
                ? _c
                : null,
            );
            console.log(
              "Session refreshed, user:",
              (_d = data.session) === null || _d === void 0 ? void 0 : _d.user,
            );
            return [2 /*return*/, true];
          case 2:
            error_1 = _e.sent();
            console.error("Error refreshing session:", error_1);
            setAuthError("Failed to refresh session");
            return [2 /*return*/, false];
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  // Load user profile
  var loadUserProfile = function (userId) {
    return __awaiter(_this, void 0, void 0, function () {
      var _a, data, error, enhancedProfile, error_2;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            if (!userId) return [2 /*return*/];
            setIsProfileLoading(true);
            _b.label = 1;
          case 1:
            _b.trys.push([1, 3, 4, 5]);
            console.log("Loading profile for user ID:", userId);
            return [
              4 /*yield*/,
              client_1.supabase
                .from("profiles")
                .select("*")
                .eq("id", userId)
                .single(),
            ];
          case 2:
            (_a = _b.sent()), (data = _a.data), (error = _a.error);
            if (error) {
              console.error("Profile loading error:", error);
              throw error;
            }
            if (data) {
              console.log("Profile loaded successfully:", data);
              enhancedProfile = __assign(__assign({}, data), {
                // Add email from auth user if not present in the profile
                email:
                  data.email ||
                  (user === null || user === void 0 ? void 0 : user.email) ||
                  null,
              });
              setProfile(enhancedProfile);
            } else {
              console.log("No profile data found");
              setProfile(null);
            }
            return [3 /*break*/, 5];
          case 3:
            error_2 = _b.sent();
            console.error("Error loading user profile:", error_2);
            return [3 /*break*/, 5];
          case 4:
            setIsProfileLoading(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  // Update last activity
  var updateLastActivity = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var now_1, error, error_3;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (
              !(user === null || user === void 0 ? void 0 : user.id) ||
              !(profile === null || profile === void 0 ? void 0 : profile.id)
            )
              return [2 /*return*/];
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, , 4]);
            now_1 = new Date().toISOString();
            return [
              4 /*yield*/,
              client_1.supabase
                .from("profiles")
                .update({ last_activity: now_1 })
                .eq("id", user.id),
            ];
          case 2:
            error = _a.sent().error;
            if (error) throw error;
            setProfile(function (prev) {
              return prev
                ? __assign(__assign({}, prev), { last_activity: now_1 })
                : null;
            });
            return [3 /*break*/, 4];
          case 3:
            error_3 = _a.sent();
            console.error("Error updating last activity:", error_3);
            return [3 /*break*/, 4];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  // Auth state listener
  (0, react_1.useEffect)(function () {
    setIsLoading(true);
    // Set up auth state listener
    var subscription = client_1.supabase.auth.onAuthStateChange(
      function (event, session) {
        var _a, _b;
        // Handle auth state changes
        console.log(
          "Auth state changed:",
          event,
          "User:",
          (_a =
            session === null || session === void 0 ? void 0 : session.user) ===
            null || _a === void 0
            ? void 0
            : _a.email,
        );
        setSession(session);
        setUser(
          (_b =
            session === null || session === void 0 ? void 0 : session.user) !==
            null && _b !== void 0
            ? _b
            : null,
        );
        if (session === null || session === void 0 ? void 0 : session.user) {
          // Load user profile on auth change
          setTimeout(function () {
            loadUserProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
      },
    ).data.subscription;
    // Initial session check
    client_1.supabase.auth.getSession().then(function (_a) {
      var _b, _c;
      var session = _a.data.session;
      console.log(
        "Initial session check:",
        (_b =
          session === null || session === void 0 ? void 0 : session.user) ===
          null || _b === void 0
          ? void 0
          : _b.email,
      );
      setSession(session);
      setUser(
        (_c =
          session === null || session === void 0 ? void 0 : session.user) !==
          null && _c !== void 0
          ? _c
          : null,
      );
      if (session === null || session === void 0 ? void 0 : session.user) {
        loadUserProfile(session.user.id);
      }
      setIsLoading(false);
      setHasInitialized(true);
    });
    // Cleanup
    return function () {
      subscription.unsubscribe();
    };
  }, []);
  return {
    user: user,
    session: session,
    profile: profile,
    isLoading: isLoading,
    isProfileLoading: isProfileLoading,
    isEmailVerified: isEmailVerified,
    authError: authError,
    loadUserProfile: loadUserProfile,
    refreshSession: refreshSession,
    updateLastActivity: updateLastActivity,
    setProfile: setProfile,
    hasInitialized: hasInitialized,
  };
}

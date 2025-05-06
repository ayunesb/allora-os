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
exports.useAuth = exports.AuthProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var supabase_js_1 = require("@supabase/supabase-js");
var appConfig_1 = require("@/config/appConfig");
var authCompatibility_1 = require("@/utils/authCompatibility");
// Define the auth context with proper types
var AuthContext = (0, react_1.createContext)(undefined);
// Use values from config or fallback to environment variables
var supabaseUrl = appConfig_1.SUPABASE_CONFIG.url;
var supabaseKey = appConfig_1.SUPABASE_CONFIG.anonKey;
// Create the Supabase client with explicit URL and key
var supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: typeof window !== "undefined" ? window.localStorage : undefined,
  },
});
var AuthProvider = function (_a) {
  var children = _a.children;
  var _b = (0, react_1.useState)(null),
    user = _b[0],
    setUser = _b[1];
  var _c = (0, react_1.useState)(null),
    session = _c[0],
    setSession = _c[1];
  var _d = (0, react_1.useState)(true),
    loading = _d[0],
    setLoading = _d[1];
  var _e = (0, react_1.useState)(null),
    authError = _e[0],
    setAuthError = _e[1];
  var _f = (0, react_1.useState)(false),
    hasInitialized = _f[0],
    setHasInitialized = _f[1];
  var _g = (0, react_1.useState)(true),
    isEmailVerified = _g[0],
    setIsEmailVerified = _g[1]; // Default to true for now
  var _h = (0, react_1.useState)(false),
    isSessionExpired = _h[0],
    setIsSessionExpired = _h[1];
  (0, react_1.useEffect)(function () {
    var getSession = function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var session;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4 /*yield*/, supabase.auth.getSession()];
            case 1:
              session = _a.sent().data.session;
              setSession(session);
              return [2 /*return*/];
          }
        });
      });
    };
    getSession();
    supabase.auth.onAuthStateChange(function (_event, session) {
      return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              setSession(session);
              if (
                !(session === null || session === void 0
                  ? void 0
                  : session.user)
              )
                return [3 /*break*/, 2];
              return [4 /*yield*/, refreshUserData(session.user.id)];
            case 1:
              _a.sent();
              return [3 /*break*/, 3];
            case 2:
              setUser(null);
              _a.label = 3;
            case 3:
              return [2 /*return*/];
          }
        });
      });
    });
  }, []);
  (0, react_1.useEffect)(
    function () {
      if (session === null || session === void 0 ? void 0 : session.user) {
        refreshUserData(session.user.id);
      } else {
        setUser(null);
      }
      setLoading(false);
      setHasInitialized(true);
    },
    [session],
  );
  var login = function (email, password) {
    return __awaiter(void 0, void 0, void 0, function () {
      var _a, data, error, normalizedUser, err_1;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            setLoading(true);
            _b.label = 1;
          case 1:
            _b.trys.push([1, 3, , 4]);
            return [
              4 /*yield*/,
              supabase.auth.signInWithPassword({
                email: email,
                password: password,
              }),
            ];
          case 2:
            (_a = _b.sent()), (data = _a.data), (error = _a.error);
            if (error) {
              setAuthError(error.message);
              setLoading(false);
              return [2 /*return*/, { success: false, error: error.message }];
            }
            if (data.user) {
              normalizedUser = (0, authCompatibility_1.normalizeUserObject)(
                data.user,
              );
              setUser(normalizedUser);
              setAuthError(null);
              setLoading(false);
              return [2 /*return*/, { success: true, user: normalizedUser }];
            }
            setLoading(false);
            return [2 /*return*/, { success: false, error: "Login failed" }];
          case 3:
            err_1 = _b.sent();
            setLoading(false);
            return [
              2 /*return*/,
              {
                success: false,
                error: err_1.message || "Unexpected login error",
              },
            ];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  var signOut = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            return [4 /*yield*/, supabase.auth.signOut()];
          case 1:
            _a.sent();
            setUser(null);
            return [2 /*return*/, Promise.resolve()];
          case 2:
            error_1 = _a.sent();
            console.error("Sign-out error:", error_1.message);
            return [2 /*return*/, Promise.resolve()];
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  var refreshUserData = function (userId) {
    return __awaiter(void 0, void 0, void 0, function () {
      var _a, data, error, userProfile, err_2;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _b.trys.push([0, 2, , 3]);
            return [
              4 /*yield*/,
              supabase
                .from("profiles")
                .select(
                  "\n          id,\n          email,\n          firstName,\n          lastName,\n          avatar,\n          role,\n          company,\n          company_id,\n          industry\n        ",
                )
                .eq("id", userId)
                .single(),
            ];
          case 1:
            (_a = _b.sent()), (data = _a.data), (error = _a.error);
            if (error) {
              console.error("Profile fetch error:", error.message);
              return [2 /*return*/];
            }
            if (data) {
              userProfile = {
                id: data.id,
                email: data.email || "",
                firstName: data.firstName || "",
                lastName: data.lastName || "",
                name: ""
                  .concat(data.firstName || "", " ")
                  .concat(data.lastName || "")
                  .trim(),
                avatar: data.avatar || "",
                avatar_url: data.avatar || "",
                role: data.role || "user",
                company_id: data.company_id || "",
                company: data.company || "",
                industry: data.industry || "",
                app_metadata: { is_admin: data.role === "admin" },
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              };
              setUser(userProfile);
            }
            return [3 /*break*/, 3];
          case 2:
            err_2 = _b.sent();
            console.error("Refresh user error:", err_2);
            return [3 /*break*/, 3];
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  var refreshSession = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var session_1, error_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            return [4 /*yield*/, supabase.auth.getSession()];
          case 1:
            session_1 = _a.sent().data.session;
            setSession(session_1);
            return [2 /*return*/, true];
          case 2:
            error_2 = _a.sent();
            console.error("Error refreshing session:", error_2);
            return [2 /*return*/, false];
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  var refreshProfile = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var _a;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            if (
              !((_a =
                session === null || session === void 0
                  ? void 0
                  : session.user) === null || _a === void 0
                ? void 0
                : _a.id)
            )
              return [3 /*break*/, 2];
            return [4 /*yield*/, refreshUserData(session.user.id)];
          case 1:
            _b.sent();
            _b.label = 2;
          case 2:
            return [2 /*return*/];
        }
      });
    });
  };
  var value = {
    user: user,
    profile: user,
    loading: loading,
    isLoading: loading,
    hasInitialized: hasInitialized,
    isEmailVerified: isEmailVerified,
    isSessionExpired: isSessionExpired,
    authError: authError,
    session: session,
    isAuthenticated: !!user,
    refreshProfile: refreshProfile,
    refreshSession: refreshSession,
    signOut: signOut,
    login: login,
    signIn: login,
    logout: signOut,
  };
  return (0, jsx_runtime_1.jsx)(AuthContext.Provider, {
    value: value,
    children: children,
  });
};
exports.AuthProvider = AuthProvider;
var useAuth = function () {
  var context = (0, react_1.useContext)(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
exports.useAuth = useAuth;

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
exports.useSession = useSession;
var react_1 = require("react");
var client_1 = require("@/integrations/supabase/client");
var sonner_1 = require("sonner");
function useSession() {
  var _this = this;
  var _a = (0, react_1.useState)(null),
    session = _a[0],
    setSession = _a[1];
  var _b = (0, react_1.useState)(false),
    isSessionExpired = _b[0],
    setIsSessionExpired = _b[1];
  var _c = (0, react_1.useState)(new Date()),
    lastActivity = _c[0],
    setLastActivity = _c[1];
  var _d = (0, react_1.useState)(true),
    isLoading = _d[0],
    setIsLoading = _d[1];
  var refreshTimeoutRef = (0, react_1.useRef)(null);
  var updateLastActivity = (0, react_1.useCallback)(function () {
    setLastActivity(new Date());
    setIsSessionExpired(false);
  }, []);
  var refreshSession = (0, react_1.useCallback)(function () {
    return __awaiter(_this, void 0, void 0, function () {
      var _a, data, error, error_1;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _b.trys.push([0, 2, , 3]);
            console.log("Manually refreshing session...");
            return [4 /*yield*/, client_1.supabase.auth.refreshSession()];
          case 1:
            (_a = _b.sent()), (data = _a.data), (error = _a.error);
            if (error) {
              console.error("Error refreshing session:", error);
              return [2 /*return*/, false];
            }
            if (data.session) {
              console.log("Session refreshed successfully");
              setSession(data.session);
              setIsSessionExpired(false);
              // Set up the next refresh
              scheduleRefresh(data.session);
              return [2 /*return*/, true];
            }
            return [2 /*return*/, false];
          case 2:
            error_1 = _b.sent();
            console.error("Error in manual session refresh:", error_1);
            return [2 /*return*/, false];
          case 3:
            return [2 /*return*/];
        }
      });
    });
  }, []);
  // Helper function to schedule session refresh
  var scheduleRefresh = (0, react_1.useCallback)(
    function (currentSession) {
      if (!currentSession) return;
      // Clear any existing timeout
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
      var expiresAt = currentSession.expires_at;
      if (!expiresAt) return;
      var expiryTime = new Date(expiresAt * 1000);
      var now = new Date();
      var timeToExpiry = expiryTime.getTime() - now.getTime();
      // If session is about to expire in the next 5 minutes, refresh it soon
      if (timeToExpiry < 5 * 60 * 1000 && timeToExpiry > 0) {
        refreshTimeoutRef.current = setTimeout(function () {
          refreshSession();
        }, 10000); // Refresh in 10 seconds
      }
      // Otherwise schedule refresh for 5 minutes before expiry
      else if (timeToExpiry > 5 * 60 * 1000) {
        var refreshTime = timeToExpiry - 5 * 60 * 1000;
        refreshTimeoutRef.current = setTimeout(function () {
          refreshSession();
        }, refreshTime);
      }
      // If session is expired, set flag
      else if (timeToExpiry <= 0) {
        console.log("Session expired");
        setIsSessionExpired(true);
        sonner_1.toast.error("Your session has expired. Please log in again.");
      }
    },
    [refreshSession],
  );
  // Monitor user activity to prevent session timeouts
  (0, react_1.useEffect)(
    function () {
      var events = ["mousedown", "keydown", "scroll", "touchstart"];
      var handleActivity = function () {
        updateLastActivity();
      };
      events.forEach(function (event) {
        window.addEventListener(event, handleActivity);
      });
      return function () {
        events.forEach(function (event) {
          window.removeEventListener(event, handleActivity);
        });
      };
    },
    [updateLastActivity],
  );
  // Set up auth state change listener and initialize auth
  (0, react_1.useEffect)(function () {
    // Clean up function to clear any timeouts on unmount
    return function () {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, []);
  // Initialize auth state and set up listener
  (0, react_1.useEffect)(
    function () {
      setIsLoading(true);
      // Set up auth state change listener first
      var subscription = client_1.supabase.auth.onAuthStateChange(
        function (event, newSession) {
          console.log("Auth state change:", event);
          // Update session state immediately
          setSession(newSession);
          // Schedule session refresh if needed
          scheduleRefresh(newSession);
          // Set session expired flag appropriately
          if (event === "SIGNED_OUT") {
            setIsSessionExpired(false);
          } else if (newSession) {
            setIsSessionExpired(false);
          }
        },
      ).data.subscription;
      // Then check for existing session
      var initializeAuth = function () {
        return __awaiter(_this, void 0, void 0, function () {
          var _a, currentSession, sessionError, error_2;
          return __generator(this, function (_b) {
            switch (_b.label) {
              case 0:
                _b.trys.push([0, 2, 3, 4]);
                return [4 /*yield*/, client_1.supabase.auth.getSession()];
              case 1:
                (_a = _b.sent()),
                  (currentSession = _a.data.session),
                  (sessionError = _a.error);
                if (sessionError) {
                  throw sessionError;
                }
                setSession(currentSession);
                scheduleRefresh(currentSession);
                return [3 /*break*/, 4];
              case 2:
                error_2 = _b.sent();
                console.error("Error loading auth:", error_2);
                return [3 /*break*/, 4];
              case 3:
                setIsLoading(false);
                return [7 /*endfinally*/];
              case 4:
                return [2 /*return*/];
            }
          });
        });
      };
      initializeAuth();
      return function () {
        subscription.unsubscribe();
      };
    },
    [scheduleRefresh],
  );
  return {
    session: session,
    setSession: setSession,
    isSessionExpired: isSessionExpired,
    isLoading: isLoading,
    setIsLoading: setIsLoading,
    refreshSession: refreshSession,
    updateLastActivity: updateLastActivity,
  };
}

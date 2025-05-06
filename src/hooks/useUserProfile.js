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
exports.useUserProfile = useUserProfile;
var react_1 = require("react");
var supabase_1 = require("@/backend/supabase");
function useUserProfile() {
  var _this = this;
  var _a = (0, react_1.useState)(null),
    user = _a[0],
    setUser = _a[1];
  var _b = (0, react_1.useState)(null),
    profile = _b[0],
    setProfile = _b[1];
  var _c = (0, react_1.useState)(false),
    isProfileLoading = _c[0],
    setIsProfileLoading = _c[1];
  var _d = (0, react_1.useState)(false),
    isEmailVerified = _d[0],
    setIsEmailVerified = _d[1];
  var _e = (0, react_1.useState)(null),
    authError = _e[0],
    setAuthError = _e[1];
  var updateEmailVerification = (0, react_1.useCallback)(function (user) {
    if (
      (user === null || user === void 0 ? void 0 : user.email_confirmed_at) ||
      (user === null || user === void 0 ? void 0 : user.confirmed_at)
    ) {
      setIsEmailVerified(true);
    } else {
      setIsEmailVerified(false);
    }
  }, []);
  var loadUserProfile = (0, react_1.useCallback)(function (userId) {
    return __awaiter(_this, void 0, void 0, function () {
      var _a, data, error, error_1;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            if (!userId) return [2 /*return*/];
            setIsProfileLoading(true);
            _b.label = 1;
          case 1:
            _b.trys.push([1, 3, 4, 5]);
            return [
              4 /*yield*/,
              supabase_1.supabase
                .from("profiles")
                .select("*")
                .eq("id", userId)
                .single(),
            ];
          case 2:
            (_a = _b.sent()), (data = _a.data), (error = _a.error);
            if (error) {
              console.error("Error loading user profile:", error);
              return [2 /*return*/];
            }
            if (data) {
              setProfile(data);
            }
            return [3 /*break*/, 5];
          case 3:
            error_1 = _b.sent();
            console.error("Unexpected error loading profile:", error_1);
            return [3 /*break*/, 5];
          case 4:
            setIsProfileLoading(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  }, []);
  return {
    user: user,
    setUser: setUser,
    profile: profile,
    setProfile: setProfile,
    isProfileLoading: isProfileLoading,
    isEmailVerified: isEmailVerified,
    authError: authError,
    setAuthError: setAuthError,
    loadUserProfile: loadUserProfile,
    updateEmailVerification: updateEmailVerification,
  };
}

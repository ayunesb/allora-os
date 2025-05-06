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
exports.resetPassword = resetPassword;
exports.updatePassword = updatePassword;
exports.verifyOtp = verifyOtp;
exports.resendVerificationEmail = resendVerificationEmail;
var supabase_1 = require("@/backend/supabase");
function resetPassword(email) {
  return __awaiter(this, void 0, void 0, function () {
    var origin_1, redirectTo, error, error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          origin_1 = window.location.origin;
          redirectTo = "".concat(origin_1, "/update-password");
          console.log("Sending password reset to:", email);
          console.log("Redirect URL:", redirectTo);
          return [
            4 /*yield*/,
            supabase_1.supabase.auth.resetPasswordForEmail(email, {
              redirectTo: redirectTo,
            }),
          ];
        case 1:
          error = _a.sent().error;
          if (error) {
            console.error("Password reset error:", error);
            throw error;
          }
          return [2 /*return*/, { success: true }];
        case 2:
          error_1 = _a.sent();
          console.error("Reset password error details:", error_1);
          return [
            2 /*return*/,
            {
              success: false,
              error: error_1.message || "Failed to send reset instructions",
            },
          ];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
function updatePassword(newPassword) {
  return __awaiter(this, void 0, void 0, function () {
    var error, error_2;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            supabase_1.supabase.auth.updateUser({
              password: newPassword,
            }),
          ];
        case 1:
          error = _a.sent().error;
          if (error) {
            throw error;
          }
          return [2 /*return*/, { success: true }];
        case 2:
          error_2 = _a.sent();
          return [
            2 /*return*/,
            {
              success: false,
              error: error_2.message || "Failed to update password",
            },
          ];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
function verifyOtp(email, token) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error, error_3;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            supabase_1.supabase.auth.verifyOtp({
              email: email,
              token: token,
              type: "recovery",
            }),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            throw error;
          }
          return [2 /*return*/, { success: true }];
        case 2:
          error_3 = _b.sent();
          return [
            2 /*return*/,
            {
              success: false,
              error: error_3.message || "Failed to verify OTP",
            },
          ];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
function resendVerificationEmail(email) {
  return __awaiter(this, void 0, void 0, function () {
    var origin_2, redirectTo, error, error_4;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          origin_2 = window.location.origin;
          redirectTo = "".concat(origin_2, "/login");
          return [
            4 /*yield*/,
            supabase_1.supabase.auth.resend({
              type: "signup",
              email: email,
              options: {
                emailRedirectTo: redirectTo,
              },
            }),
          ];
        case 1:
          error = _a.sent().error;
          if (error) {
            throw error;
          }
          return [2 /*return*/, { success: true }];
        case 2:
          error_4 = _a.sent();
          return [
            2 /*return*/,
            {
              success: false,
              error: error_4.message || "Failed to resend verification email",
            },
          ];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}

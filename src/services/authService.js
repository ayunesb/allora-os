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
exports.handleSignIn = handleSignIn;
exports.handleSignUp = handleSignUp;
exports.handleSignOut = handleSignOut;
exports.refreshSession = refreshSession;
exports.sendPasswordResetEmail = sendPasswordResetEmail;
exports.verifyOtpCode = verifyOtpCode;
exports.updateUserPassword = updateUserPassword;
var client_1 = require("@/integrations/supabase/client");
function handleSignIn(email_1, password_1) {
  return __awaiter(
    this,
    arguments,
    void 0,
    function (email, password, rememberMe) {
      var _a, data, error, error_1;
      var _b;
      if (rememberMe === void 0) {
        rememberMe = false;
      }
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _c.trys.push([0, 2, , 3]);
            console.log("Signing in with email:", email);
            return [
              4 /*yield*/,
              client_1.supabase.auth.signInWithPassword({
                email: email,
                password: password,
                options: {
                  // If rememberMe is true, session will be kept until explicitly signed out
                  // Otherwise, session expires after browser close (default behavior)
                },
              }),
            ];
          case 1:
            (_a = _c.sent()), (data = _a.data), (error = _a.error);
            if (error) {
              console.error("Sign in error:", error);
              throw error;
            }
            console.log(
              "Sign in successful, user:",
              (_b = data.user) === null || _b === void 0 ? void 0 : _b.email,
            );
            // Store user preference for "remember me" in local storage
            if (rememberMe) {
              localStorage.setItem("rememberMe", "true");
            } else {
              localStorage.removeItem("rememberMe");
            }
            return [
              2 /*return*/,
              {
                success: true,
                user: data.user,
              },
            ];
          case 2:
            error_1 = _c.sent();
            if (error_1 instanceof Error) {
              console.error(error_1.message); // Safely access 'message' property
            } else {
              console.error("An unknown error occurred.");
            }
            return [
              2 /*return*/,
              {
                success: false,
                error: error_1.message || "Failed to sign in",
              },
            ];
          case 3:
            return [2 /*return*/];
        }
      });
    },
  );
}
function handleSignUp(email, password) {
  return __awaiter(this, void 0, void 0, function () {
    var origin_1, redirectTo, _a, data, error, error_2;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          origin_1 = window.location.origin;
          redirectTo = "".concat(origin_1, "/login");
          return [
            4 /*yield*/,
            client_1.supabase.auth.signUp({
              email: email,
              password: password,
              options: {
                emailRedirectTo: redirectTo,
              },
            }),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            throw error;
          }
          return [
            2 /*return*/,
            {
              success: true,
              user: data.user,
            },
          ];
        case 2:
          error_2 = _b.sent();
          if (error_2 instanceof Error) {
            console.error(error_2.message); // Safely access 'message' property
          } else {
            console.error("An unknown error occurred.");
          }
          return [
            2 /*return*/,
            {
              success: false,
              error: error_2.message || "Failed to sign up",
            },
          ];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
function handleSignOut() {
  return __awaiter(this, void 0, void 0, function () {
    var error, error_3;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          return [4 /*yield*/, client_1.supabase.auth.signOut()];
        case 1:
          error = _a.sent().error;
          if (error) throw error;
          // Clear any auth related items from storage
          localStorage.removeItem("rememberMe");
          return [2 /*return*/, { success: true }];
        case 2:
          error_3 = _a.sent();
          if (error_3 instanceof Error) {
            console.error(error_3.message); // Safely access 'message' property
          } else {
            console.error("An unknown error occurred.");
          }
          return [2 /*return*/, { success: false, error: error_3.message }];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
function refreshSession() {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error, error_4;
    var _b, _c;
    return __generator(this, function (_d) {
      switch (_d.label) {
        case 0:
          _d.trys.push([0, 2, , 3]);
          return [4 /*yield*/, client_1.supabase.auth.refreshSession()];
        case 1:
          (_a = _d.sent()), (data = _a.data), (error = _a.error);
          if (error) throw error;
          return [
            2 /*return*/,
            {
              session: data.session,
              user:
                (_c =
                  (_b = data.session) === null || _b === void 0
                    ? void 0
                    : _b.user) !== null && _c !== void 0
                  ? _c
                  : null,
            },
          ];
        case 2:
          error_4 = _d.sent();
          if (error_4 instanceof Error) {
            console.error(error_4.message); // Safely access 'message' property
          } else {
            console.error("An unknown error occurred.");
          }
          throw error_4;
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
function sendPasswordResetEmail(email) {
  return __awaiter(this, void 0, void 0, function () {
    var origin_2, redirectTo, error, error_5;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          origin_2 = window.location.origin;
          redirectTo = "".concat(origin_2, "/update-password");
          return [
            4 /*yield*/,
            client_1.supabase.auth.resetPasswordForEmail(email, {
              redirectTo: redirectTo,
            }),
          ];
        case 1:
          error = _a.sent().error;
          if (error) {
            throw error;
          }
          return [2 /*return*/, { success: true }];
        case 2:
          error_5 = _a.sent();
          if (error_5 instanceof Error) {
            console.error(error_5.message); // Safely access 'message' property
          } else {
            console.error("An unknown error occurred.");
          }
          return [
            2 /*return*/,
            {
              success: false,
              error: error_5.message || "Failed to send reset instructions",
            },
          ];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
function verifyOtpCode(email, token) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error, error_6;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            client_1.supabase.auth.verifyOtp({
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
          return [2 /*return*/, { success: true, session: data.session }];
        case 2:
          error_6 = _b.sent();
          if (error_6 instanceof Error) {
            console.error(error_6.message); // Safely access 'message' property
          } else {
            console.error("An unknown error occurred.");
          }
          return [
            2 /*return*/,
            {
              success: false,
              error: error_6.message || "Failed to verify reset code",
            },
          ];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
function updateUserPassword(password) {
  return __awaiter(this, void 0, void 0, function () {
    var error, error_7;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            client_1.supabase.auth.updateUser({
              password: password,
            }),
          ];
        case 1:
          error = _a.sent().error;
          if (error) {
            throw error;
          }
          return [2 /*return*/, { success: true }];
        case 2:
          error_7 = _a.sent();
          if (error_7 instanceof Error) {
            console.error(error_7.message); // Safely access 'message' property
          } else {
            console.error("An unknown error occurred.");
          }
          return [
            2 /*return*/,
            {
              success: false,
              error: error_7.message || "Failed to update password",
            },
          ];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}

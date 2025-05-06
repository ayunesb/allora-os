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
exports.createAuthCompatibilityLayer = createAuthCompatibilityLayer;
exports.normalizeUserObject = normalizeUserObject;
exports.getUserDisplayName = getUserDisplayName;
exports.getUserAvatar = getUserAvatar;
exports.normalizeWebhookEvent = normalizeWebhookEvent;
exports.normalizeExecutiveMessage = normalizeExecutiveMessage;
/**
 * Creates a compatibility layer for authentication context
 * This ensures backwards compatibility with different auth implementations
 */
function createAuthCompatibilityLayer(authContext) {
  var _this = this;
  if (!authContext)
    return {
      user: null,
      profile: null,
      isLoading: false,
      loading: false,
      hasInitialized: false,
      isEmailVerified: false,
      isSessionExpired: false,
      authError: null,
      isAuthenticated: false,
      refreshProfile: function () {
        return __awaiter(_this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            return [2 /*return*/];
          });
        });
      },
      refreshSession: function () {
        return __awaiter(_this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            return [2 /*return*/, Promise.resolve(true)];
          });
        });
      },
      signOut: function () {
        return __awaiter(_this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            return [2 /*return*/];
          });
        });
      },
      login: function () {
        return __awaiter(_this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            return [
              2 /*return*/,
              { success: false, error: "Auth context not available" },
            ];
          });
        });
      },
      signIn: function () {
        return __awaiter(_this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            return [
              2 /*return*/,
              { success: false, error: "Auth context not available" },
            ];
          });
        });
      },
      logout: function () {
        return __awaiter(_this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            return [2 /*return*/, Promise.resolve()];
          });
        });
      },
      session: null,
    };
  // Extract user from different possible auth context structures
  var user = normalizeUserObject(authContext.user || authContext.profile);
  return {
    user: user,
    profile: normalizeUserObject(authContext.profile) || user,
    isLoading: authContext.loading || authContext.isLoading || false,
    loading: authContext.loading || authContext.isLoading || false, // Include both loading properties
    hasInitialized: authContext.hasInitialized || true,
    isEmailVerified: authContext.isEmailVerified || true,
    isSessionExpired: authContext.isSessionExpired || false,
    authError: authContext.authError || null,
    isAuthenticated: !!user,
    session: authContext.session || null,
    refreshProfile:
      authContext.refreshProfile ||
      function () {
        return __awaiter(_this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            return [2 /*return*/, Promise.resolve()];
          });
        });
      },
    refreshSession:
      authContext.refreshSession ||
      function () {
        return __awaiter(_this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            return [2 /*return*/, Promise.resolve(true)];
          });
        });
      },
    signOut:
      authContext.signOut ||
      authContext.logout ||
      function () {
        return __awaiter(_this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            return [2 /*return*/, Promise.resolve()];
          });
        });
      },
    login:
      authContext.login ||
      authContext.signIn ||
      function () {
        return __awaiter(_this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            return [2 /*return*/, { success: false, error: "Not implemented" }];
          });
        });
      },
    signIn:
      authContext.signIn ||
      authContext.login ||
      function () {
        return __awaiter(_this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            return [2 /*return*/, { success: false, error: "Not implemented" }];
          });
        });
      },
    logout:
      authContext.logout ||
      authContext.signOut ||
      function () {
        return __awaiter(_this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            return [2 /*return*/, Promise.resolve()];
          });
        });
      },
  };
}
/**
 * Normalizes a user object from various potential sources to ensure it matches
 * the User interface required by the application.
 */
function normalizeUserObject(userObject) {
  var _a, _b;
  if (!userObject) return null;
  // Extract user metadata from various potential sources
  var userMetadata =
    userObject.user_metadata ||
    ((_a = userObject.metadata) === null || _a === void 0 ? void 0 : _a.user) ||
    {};
  var appMetadata =
    userObject.app_metadata ||
    ((_b = userObject.metadata) === null || _b === void 0 ? void 0 : _b.app) ||
    {};
  // Build consistent user object
  var normalizedUser = {
    id: userObject.id || "",
    email: userObject.email || "",
    name:
      userObject.name ||
      (userMetadata === null || userMetadata === void 0
        ? void 0
        : userMetadata.name) ||
      ""
        .concat(
          userObject.firstName ||
            (userMetadata === null || userMetadata === void 0
              ? void 0
              : userMetadata.firstName) ||
            "",
          " ",
        )
        .concat(
          userObject.lastName ||
            (userMetadata === null || userMetadata === void 0
              ? void 0
              : userMetadata.lastName) ||
            "",
        )
        .trim(),
    firstName:
      userObject.firstName ||
      (userMetadata === null || userMetadata === void 0
        ? void 0
        : userMetadata.firstName) ||
      "",
    lastName:
      userObject.lastName ||
      (userMetadata === null || userMetadata === void 0
        ? void 0
        : userMetadata.lastName) ||
      "",
    role:
      userObject.role ||
      ((
        appMetadata === null || appMetadata === void 0
          ? void 0
          : appMetadata.is_admin
      )
        ? "admin"
        : "user"),
    created_at: userObject.created_at || new Date().toISOString(),
    avatar: userObject.avatar,
    avatar_url: userObject.avatar_url || userObject.avatar,
    company:
      userObject.company ||
      (userMetadata === null || userMetadata === void 0
        ? void 0
        : userMetadata.company) ||
      "",
    company_id:
      userObject.company_id ||
      (userMetadata === null || userMetadata === void 0
        ? void 0
        : userMetadata.company_id) ||
      "",
    industry:
      userObject.industry ||
      (userMetadata === null || userMetadata === void 0
        ? void 0
        : userMetadata.industry) ||
      "",
    app_metadata: appMetadata,
    user_metadata: userMetadata,
    tenant_id: "",
  };
  return normalizedUser;
}
/**
 * Gets the display name for a user
 */
function getUserDisplayName(user) {
  if (!user) return "Guest";
  if (user.name) return user.name;
  if (user.firstName || user.lastName) {
    return ""
      .concat(user.firstName || "", " ")
      .concat(user.lastName || "")
      .trim();
  }
  return user.email.split("@")[0];
}
/**
 * Gets the avatar URL for a user
 */
function getUserAvatar(user) {
  if (!user) return "";
  return (
    user.avatar_url ||
    user.avatar ||
    "https://ui-avatars.com/api/?name=".concat(
      encodeURIComponent(getUserDisplayName(user)),
      "&background=random",
    )
  );
}
/**
 * Normalizes a webhook event from different potential sources
 */
function normalizeWebhookEvent(event) {
  if (!event) return null;
  return {
    id: event.id || "",
    webhook_id: event.webhook_id || event.webhookId || "",
    event_type: event.event_type || event.eventType || "",
    status: event.status || "pending",
    created_at: event.created_at || event.timestamp || new Date().toISOString(),
    targetUrl: event.targetUrl || event.url || "",
    webhook_type: event.webhook_type || event.webhookType || event.type || "",
    response: event.response || {},
    payload: event.payload || {},
    timestamp: event.timestamp || event.created_at || new Date().toISOString(),
    source: event.source || "",
    duration: event.duration || 0,
  };
}
/**
 * Normalizes an executive message from different potential sources
 */
function normalizeExecutiveMessage(message) {
  if (!message) return null;
  return {
    id: message.id || "",
    content: message.content || message.message_content || "",
    message_content: message.message_content || message.content || "",
    created_at:
      message.created_at || message.timestamp || new Date().toISOString(),
    from_executive: message.from_executive || false,
    to_executive: message.to_executive || false,
    status: message.status || "pending",
  };
}

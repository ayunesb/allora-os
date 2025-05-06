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
exports.initiateMetaAuth = initiateMetaAuth;
exports.initiateTikTokAuth = initiateTikTokAuth;
exports.getAdPlatformConnections = getAdPlatformConnections;
exports.disconnectAdPlatform = disconnectAdPlatform;
var client_1 = require("@/integrations/supabase/client");
var sonner_1 = require("sonner");
var errorHandling_1 = require("@/utils/api/errorHandling");
/**
 * Initiate Meta auth flow
 */
function initiateMetaAuth() {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error, error_1;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            client_1.supabase.functions.invoke("meta-auth", {
              body: { action: "authorize" },
            }),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) throw error;
          if (data.url) {
            window.location.href = data.url;
            return [2 /*return*/, { success: true }];
          } else {
            throw new Error("Failed to get authorization URL");
          }
          return [3 /*break*/, 3];
        case 2:
          error_1 = _b.sent();
          (0, errorHandling_1.handleApiError)(error_1, {
            customMessage: "Meta authorization failed",
            showToast: true,
          });
          return [2 /*return*/, { success: false, error: error_1.message }];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Initiate TikTok auth flow
 */
function initiateTikTokAuth() {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error, error_2;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            client_1.supabase.functions.invoke("tiktok-auth", {
              body: { action: "authorize" },
            }),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            throw error;
          }
          if (data === null || data === void 0 ? void 0 : data.url) {
            window.location.href = data.url;
            return [2 /*return*/, { success: true }];
          } else {
            console.error("TikTok auth response:", data);
            throw new Error("Failed to get TikTok authorization URL");
          }
          return [3 /*break*/, 3];
        case 2:
          error_2 = _b.sent();
          console.error("TikTok auth error:", error_2);
          sonner_1.toast.error(
            "TikTok authorization failed: ".concat(
              error_2.message || "Unknown error",
            ),
          );
          return [2 /*return*/, { success: false, error: error_2.message }];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Get all ad platform connections for the company
 */
function getAdPlatformConnections() {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error, error_3;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            client_1.supabase
              .from("ad_platform_connections")
              .select("*")
              .eq("is_active", true)
              .order("created_at", { ascending: false }),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) throw error;
          return [2 /*return*/, data || []];
        case 2:
          error_3 = _b.sent();
          console.error("Error fetching ad platform connections:", error_3);
          return [2 /*return*/, []];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Disconnect an ad platform
 */
function disconnectAdPlatform(platform) {
  return __awaiter(this, void 0, void 0, function () {
    var endpoint, _a, data, error, error_4;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          endpoint = platform === "meta" ? "meta-auth" : "tiktok-auth";
          return [
            4 /*yield*/,
            client_1.supabase.functions.invoke(endpoint, {
              body: { action: "revoke" },
            }),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) throw error;
          if (data.success) {
            sonner_1.toast.success(
              "".concat(
                platform === "meta" ? "Meta" : "TikTok",
                " account disconnected successfully",
              ),
            );
            return [2 /*return*/, { success: true }];
          } else {
            throw new Error(data.error || "Failed to disconnect account");
          }
          return [3 /*break*/, 3];
        case 2:
          error_4 = _b.sent();
          (0, errorHandling_1.handleApiError)(error_4, {
            customMessage: "Failed to disconnect ".concat(platform, " account"),
            showToast: true,
          });
          return [2 /*return*/, { success: false, error: error_4.message }];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}

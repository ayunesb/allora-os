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
exports.listVoices =
  exports.listAvatars =
  exports.getVideoStatus =
  exports.generateVideo =
    void 0;
var client_1 = require("@/integrations/supabase/client");
/**
 * Generates an AI video using Heygen API with company metadata
 * @param text The text content for the video
 * @param avatarId The Heygen avatar ID to use
 * @param voiceId The Heygen voice ID to use
 * @param companyName The company name for tracking
 * @param campaignId Optional campaign ID to associate the video with
 * @param strategyId Optional strategy ID to associate the video with
 * @returns A promise with the result of the operation
 */
var generateVideo = function (
  text,
  avatarId,
  voiceId,
  companyName,
  campaignId,
  strategyId,
) {
  return __awaiter(void 0, void 0, void 0, function () {
    var session, _a, data, error, error_1;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 3, , 4]);
          return [4 /*yield*/, client_1.supabase.auth.getSession()];
        case 1:
          session = _b.sent().data.session;
          if (!session) {
            throw new Error("Authentication required to generate video");
          }
          return [
            4 /*yield*/,
            client_1.supabase.functions.invoke("heygen", {
              body: {
                action: "generate-video",
                text: text,
                avatarId: avatarId,
                voiceId: voiceId,
                campaignId: campaignId,
                strategyId: strategyId,
                companyName: companyName, // Add company metadata
              },
            }),
          ];
        case 2:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            console.error("Error generating video:", error);
            return [
              2 /*return*/,
              {
                success: false,
                message: error.message,
              },
            ];
          }
          return [
            2 /*return*/,
            {
              success: true,
              videoId: data.videoId,
              status: data.status,
              dbRecordId: data.dbRecordId,
            },
          ];
        case 3:
          error_1 = _b.sent();
          console.error("Failed to generate video:", error_1);
          return [
            2 /*return*/,
            {
              success: false,
              message:
                error_1 instanceof Error
                  ? error_1.message
                  : "Unknown error generating video",
            },
          ];
        case 4:
          return [2 /*return*/];
      }
    });
  });
};
exports.generateVideo = generateVideo;
/**
 * Checks the status of a generated video
 * @param videoId The Heygen video ID to check
 * @returns A promise with the status information
 */
var getVideoStatus = function (videoId) {
  return __awaiter(void 0, void 0, void 0, function () {
    var _a, data, error, error_2;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            client_1.supabase.functions.invoke("heygen", {
              body: {
                action: "get-video-status",
                text: videoId, // The parameter is named 'text' in the edge function
              },
            }),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            console.error("Error checking video status:", error);
            return [
              2 /*return*/,
              {
                success: false,
                message: error.message,
              },
            ];
          }
          return [
            2 /*return*/,
            {
              success: true,
              status: data.status,
              videoUrl: data.videoUrl,
            },
          ];
        case 2:
          error_2 = _b.sent();
          console.error("Failed to check video status:", error_2);
          return [
            2 /*return*/,
            {
              success: false,
              message:
                error_2 instanceof Error
                  ? error_2.message
                  : "Unknown error checking video status",
            },
          ];
        case 3:
          return [2 /*return*/];
      }
    });
  });
};
exports.getVideoStatus = getVideoStatus;
/**
 * Lists available avatars from Heygen
 * @returns A promise with the list of avatars
 */
var listAvatars = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var _a, data, error, error_3;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            client_1.supabase.functions.invoke("heygen", {
              body: {
                action: "list-avatars",
              },
            }),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            console.error("Error listing avatars:", error);
            throw error;
          }
          return [2 /*return*/, data.avatars || []];
        case 2:
          error_3 = _b.sent();
          console.error("Failed to list avatars:", error_3);
          return [2 /*return*/, []];
        case 3:
          return [2 /*return*/];
      }
    });
  });
};
exports.listAvatars = listAvatars;
/**
 * Lists available voices from Heygen
 * @returns A promise with the list of voices
 */
var listVoices = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var _a, data, error, error_4;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            client_1.supabase.functions.invoke("heygen", {
              body: {
                action: "list-voices",
              },
            }),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            console.error("Error listing voices:", error);
            throw error;
          }
          return [2 /*return*/, data.voices || []];
        case 2:
          error_4 = _b.sent();
          console.error("Failed to list voices:", error_4);
          return [2 /*return*/, []];
        case 3:
          return [2 /*return*/];
      }
    });
  });
};
exports.listVoices = listVoices;

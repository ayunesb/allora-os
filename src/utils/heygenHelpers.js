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
exports.generateVideo = generateVideo;
exports.getVideoStatus = getVideoStatus;
exports.pollVideoStatus = pollVideoStatus;
exports.listHeygenAvatars = listHeygenAvatars;
exports.listHeygenVoices = listHeygenVoices;
var client_1 = require("@/integrations/supabase/client");
// Maximum number of retries for API calls
var MAX_RETRIES = 3;
/**
 * Generates a video using the Heygen API with retry capability
 */
function generateVideo(
  text_1,
  avatarId_1,
  voiceId_1,
  companyName_1,
  campaignId_1,
  strategyId_1,
) {
  return __awaiter(
    this,
    arguments,
    void 0,
    function (
      text,
      avatarId,
      voiceId,
      companyName,
      campaignId,
      strategyId,
      retryCount,
    ) {
      var _a, data, error, error_1;
      if (retryCount === void 0) {
        retryCount = 0;
      }
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _b.trys.push([0, 2, , 5]);
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
                  companyName: companyName,
                },
              }),
            ];
          case 1:
            (_a = _b.sent()), (data = _a.data), (error = _a.error);
            if (error) throw error;
            if (data && data.videoId) {
              return [
                2 /*return*/,
                {
                  success: true,
                  videoId: data.videoId,
                  status: data.status || "processing",
                  dbRecordId: data.dbRecordId,
                },
              ];
            } else {
              throw new Error(
                (data === null || data === void 0 ? void 0 : data.error) ||
                  "Failed to generate video",
              );
            }
            return [3 /*break*/, 5];
          case 2:
            error_1 = _b.sent();
            console.error(
              "Video generation error (attempt ".concat(retryCount + 1, "):"),
              error_1.message,
            );
            if (!(retryCount < MAX_RETRIES)) return [3 /*break*/, 4];
            // Exponential backoff: wait longer between each retry
            return [
              4 /*yield*/,
              new Promise(function (resolve) {
                return setTimeout(resolve, 1000 * Math.pow(2, retryCount));
              }),
            ];
          case 3:
            // Exponential backoff: wait longer between each retry
            _b.sent();
            return [
              2 /*return*/,
              generateVideo(
                text,
                avatarId,
                voiceId,
                companyName,
                campaignId,
                strategyId,
                retryCount + 1,
              ),
            ];
          case 4:
            return [
              2 /*return*/,
              {
                success: false,
                error: error_1.message,
              },
            ];
          case 5:
            return [2 /*return*/];
        }
      });
    },
  );
}
function getVideoStatus(videoId_1) {
  return __awaiter(this, arguments, void 0, function (videoId, retryCount) {
    var _a, data, error, error_2;
    if (retryCount === void 0) {
      retryCount = 0;
    }
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 5]);
          return [
            4 /*yield*/,
            client_1.supabase.functions.invoke("heygen", {
              body: { action: "get-video-status", text: videoId },
            }),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) throw error;
          if (data) {
            return [
              2 /*return*/,
              {
                success: true,
                status: data.status,
                videoUrl: data.videoUrl,
              },
            ];
          } else {
            throw new Error("Failed to get video status");
          }
          return [3 /*break*/, 5];
        case 2:
          error_2 = _b.sent();
          console.error(
            "Video status error (attempt ".concat(retryCount + 1, "):"),
            error_2.message,
          );
          if (!(retryCount < MAX_RETRIES)) return [3 /*break*/, 4];
          if (
            !(
              error_2.message.includes("network") ||
              error_2.message.includes("timeout")
            )
          )
            return [3 /*break*/, 4];
          // Exponential backoff: wait longer between each retry
          return [
            4 /*yield*/,
            new Promise(function (resolve) {
              return setTimeout(resolve, 1000 * Math.pow(2, retryCount));
            }),
          ];
        case 3:
          // Exponential backoff: wait longer between each retry
          _b.sent();
          return [2 /*return*/, getVideoStatus(videoId, retryCount + 1)];
        case 4:
          return [
            2 /*return*/,
            {
              success: false,
              error: error_2.message,
            },
          ];
        case 5:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Polls the video status until it's completed or fails
 */
function pollVideoStatus(videoId, onStatusChange) {
  return __awaiter(this, void 0, void 0, function () {
    var attempts, maxAttempts, poll;
    var _this = this;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          attempts = 0;
          maxAttempts = 60;
          poll = function () {
            return __awaiter(_this, void 0, void 0, function () {
              var result;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    if (attempts >= maxAttempts) {
                      onStatusChange === null || onStatusChange === void 0
                        ? void 0
                        : onStatusChange("timeout", undefined);
                      return [2 /*return*/];
                    }
                    attempts++;
                    return [4 /*yield*/, getVideoStatus(videoId)];
                  case 1:
                    result = _a.sent();
                    if (!result.success) {
                      // If there was an error, wait a bit longer before retrying
                      onStatusChange === null || onStatusChange === void 0
                        ? void 0
                        : onStatusChange("error", undefined);
                      setTimeout(poll, 10000); // 10 seconds
                      return [2 /*return*/];
                    }
                    onStatusChange === null || onStatusChange === void 0
                      ? void 0
                      : onStatusChange(
                          result.status || "unknown",
                          result.videoUrl,
                        );
                    if (result.status === "completed") {
                      return [2 /*return*/];
                    }
                    // Continue polling
                    setTimeout(poll, 5000); // 5 seconds
                    return [2 /*return*/];
                }
              });
            });
          };
          // Start polling
          return [4 /*yield*/, poll()];
        case 1:
          // Start polling
          _a.sent();
          return [2 /*return*/];
      }
    });
  });
}
function listHeygenAvatars() {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error, error_3;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            client_1.supabase.functions.invoke("heygen", {
              body: { action: "list-avatars" },
            }),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) throw error;
          if (data) {
            return [2 /*return*/, data.avatars || []];
          } else {
            throw new Error("Failed to list avatars");
          }
          return [3 /*break*/, 3];
        case 2:
          error_3 = _b.sent();
          console.error("Error listing avatars:", error_3.message);
          return [2 /*return*/, []];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
function listHeygenVoices() {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error, error_4;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            client_1.supabase.functions.invoke("heygen", {
              body: { action: "list-voices" },
            }),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) throw error;
          if (data) {
            return [2 /*return*/, data.voices || []];
          } else {
            throw new Error("Failed to list voices");
          }
          return [3 /*break*/, 3];
        case 2:
          error_4 = _b.sent();
          console.error("Error listing voices:", error_4.message);
          return [2 /*return*/, []];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}

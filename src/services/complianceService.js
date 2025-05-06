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
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocumentVersionHistory =
  exports.enableAutoUpdatesForDocument =
  exports.scheduleRegularComplianceCheck =
  exports.setupAutomaticUpdates =
  exports.applyDocumentUpdate =
  exports.checkForDocumentUpdates =
  exports.documentIdToName =
    void 0;
var sonner_1 = require("sonner");
var auditLogger_1 = require("@/utils/auditLogger");
// Map of document IDs to their display names
exports.documentIdToName = {
  "privacy-policy": "Privacy Policy",
  "terms-of-service": "Terms of Service",
  "data-processing": "Data Processing Agreement",
  "breach-notification": "Breach Notification Policy",
  cookies: "Cookie Policy",
  "acceptable-use": "Acceptable Use Policy",
  refund: "Refund and Cancellation Policy",
  disclaimer: "Disclaimer",
  copyright: "Copyright & IP Policy",
  security: "Security Policy",
  "ai-ethics": "AI Ethics and Fair Use Statement",
};
// This would typically connect to a backend API
var checkForDocumentUpdates = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      console.log("Checking for document updates from compliance service...");
      // In a real implementation, this would be an API call
      // Simulating an API response for demonstration
      return [
        2 /*return*/,
        new Promise(function (resolve) {
          setTimeout(function () {
            resolve({
              documentsNeedingUpdate: [
                "terms-of-service",
                "data-processing",
                "privacy-policy",
                "cookies",
              ],
              latestVersions: {
                "privacy-policy": "v2.4",
                "terms-of-service": "v2.0",
                "data-processing": "v1.3",
                "breach-notification": "v1.0",
                cookies: "v1.1",
                "acceptable-use": "v1.0",
                refund: "v1.0",
                disclaimer: "v1.0",
                copyright: "v1.0",
                security: "v1.1",
                "ai-ethics": "v1.0",
              },
              regulatoryChanges: {
                "terms-of-service": [
                  "GDPR Article 13 update",
                  "California Privacy Rights Act",
                ],
                "data-processing": ["EU SCCs update"],
                "privacy-policy": ["California Consumer Privacy Act updates"],
                cookies: ["ePrivacy Directive compliance update"],
              },
            });
          }, 1000);
        }),
      ];
    });
  });
};
exports.checkForDocumentUpdates = checkForDocumentUpdates;
var applyDocumentUpdate = function (documentId) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      console.log("Applying update for document: ".concat(documentId));
      // Simulate API call
      return [
        2 /*return*/,
        new Promise(function (resolve) {
          setTimeout(function () {
            // Log the compliance change
            (0, auditLogger_1.logComplianceChange)(
              "admin", // In a real app, this would be the actual user ID
              "Updated document: ".concat(documentId, " to latest version"),
              { documentId: documentId, updateType: "manual" },
            );
            var documentName =
              exports.documentIdToName[documentId] || documentId;
            sonner_1.toast.success(
              "".concat(documentName, " updated successfully"),
              {
                description:
                  "The document has been updated to the latest version.",
              },
            );
            resolve(true);
          }, 1500);
        }),
      ];
    });
  });
};
exports.applyDocumentUpdate = applyDocumentUpdate;
var setupAutomaticUpdates = function (onUpdateAvailable) {
  // Initial check
  (0, exports.checkForDocumentUpdates)().then(function (result) {
    if (result.documentsNeedingUpdate.length > 0) {
      onUpdateAvailable(result.documentsNeedingUpdate);
    }
  });
  // Set up periodic checks (every hour in this example)
  var interval = setInterval(function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var result;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, (0, exports.checkForDocumentUpdates)()];
          case 1:
            result = _a.sent();
            if (result.documentsNeedingUpdate.length > 0) {
              onUpdateAvailable(result.documentsNeedingUpdate);
            }
            return [2 /*return*/];
        }
      });
    });
  }, 3600000); // 1 hour
  // Return cleanup function
  return function () {
    return clearInterval(interval);
  };
};
exports.setupAutomaticUpdates = setupAutomaticUpdates;
// New function to schedule regular compliance checks (every X days)
var scheduleRegularComplianceCheck = function () {
  var args_1 = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args_1[_i] = arguments[_i];
  }
  return __awaiter(
    void 0,
    __spreadArray([], args_1, true),
    void 0,
    function (intervalDays, onUpdateAvailable) {
      var intervalMs, result, error_1, intervalId;
      if (intervalDays === void 0) {
        intervalDays = 5;
      }
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            console.log(
              "Scheduling regular compliance check every ".concat(
                intervalDays,
                " days",
              ),
            );
            intervalMs = intervalDays * 24 * 60 * 60 * 1000;
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, , 4]);
            return [4 /*yield*/, (0, exports.checkForDocumentUpdates)()];
          case 2:
            result = _a.sent();
            if (result.documentsNeedingUpdate.length > 0) {
              onUpdateAvailable(result.documentsNeedingUpdate);
              // Log that we found regulatory updates through automatic check
              (0, auditLogger_1.logComplianceChange)(
                "system",
                "Scheduled compliance check found ".concat(
                  result.documentsNeedingUpdate.length,
                  " documents needing updates",
                ),
                {
                  documents: result.documentsNeedingUpdate,
                  checkInterval: "".concat(intervalDays, " days"),
                },
              );
            }
            return [3 /*break*/, 4];
          case 3:
            error_1 = _a.sent();
            console.error("Error in initial compliance check:", error_1);
            return [3 /*break*/, 4];
          case 4:
            intervalId = setInterval(function () {
              return __awaiter(void 0, void 0, void 0, function () {
                var result, error_2;
                return __generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      _a.trys.push([0, 2, , 3]);
                      console.log(
                        "Running scheduled compliance check (every ".concat(
                          intervalDays,
                          " days)",
                        ),
                      );
                      return [
                        4 /*yield*/,
                        (0, exports.checkForDocumentUpdates)(),
                      ];
                    case 1:
                      result = _a.sent();
                      if (result.documentsNeedingUpdate.length > 0) {
                        onUpdateAvailable(result.documentsNeedingUpdate);
                        // Log that we found regulatory updates through automatic check
                        (0, auditLogger_1.logComplianceChange)(
                          "system",
                          "Scheduled compliance check found ".concat(
                            result.documentsNeedingUpdate.length,
                            " documents needing updates",
                          ),
                          {
                            documents: result.documentsNeedingUpdate,
                            checkInterval: "".concat(intervalDays, " days"),
                          },
                        );
                      }
                      return [3 /*break*/, 3];
                    case 2:
                      error_2 = _a.sent();
                      console.error(
                        "Error in scheduled compliance check:",
                        error_2,
                      );
                      return [3 /*break*/, 3];
                    case 3:
                      return [2 /*return*/];
                  }
                });
              });
            }, intervalMs);
            // Store interval ID in localStorage to persist across sessions
            localStorage.setItem("complianceCheckInterval", String(intervalId));
            localStorage.setItem(
              "complianceCheckIntervalDays",
              String(intervalDays),
            );
            return [2 /*return*/, Promise.resolve()];
        }
      });
    },
  );
};
exports.scheduleRegularComplianceCheck = scheduleRegularComplianceCheck;
var enableAutoUpdatesForDocument = function (documentId, enabled) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      console.log(
        "Setting auto-update for ".concat(documentId, " to ").concat(enabled),
      );
      // This would be an API call in a real implementation
      return [
        2 /*return*/,
        new Promise(function (resolve) {
          setTimeout(function () {
            // Log the change
            (0, auditLogger_1.logComplianceChange)(
              "admin",
              ""
                .concat(
                  enabled ? "Enabled" : "Disabled",
                  " auto-updates for document: ",
                )
                .concat(documentId),
              { documentId: documentId, autoUpdate: enabled },
            );
            sonner_1.toast.success(
              "Auto-updates ".concat(enabled ? "enabled" : "disabled"),
              {
                description: "Document will ".concat(
                  enabled ? "now" : "no longer",
                  " update automatically when new versions are available.",
                ),
              },
            );
            resolve(true);
          }, 500);
        }),
      ];
    });
  });
};
exports.enableAutoUpdatesForDocument = enableAutoUpdatesForDocument;
// Track document versions and changes
var getDocumentVersionHistory = function (documentId) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      // This would typically be an API call to fetch version history
      return [
        2 /*return*/,
        new Promise(function (resolve) {
          setTimeout(function () {
            resolve([
              {
                version: "v2.3",
                date: "2025-03-15",
                changes: [
                  "Updated GDPR compliance sections",
                  "Added California compliance",
                ],
              },
              {
                version: "v2.2",
                date: "2024-12-05",
                changes: ["Fixed typographical errors"],
              },
              {
                version: "v2.1",
                date: "2024-09-20",
                changes: ["Updated cookie policy"],
              },
              {
                version: "v2.0",
                date: "2024-06-10",
                changes: ["Major revision", "Restructured all sections"],
              },
              {
                version: "v1.0",
                date: "2024-01-15",
                changes: ["Initial document"],
              },
            ]);
          }, 800);
        }),
      ];
    });
  });
};
exports.getDocumentVersionHistory = getDocumentVersionHistory;

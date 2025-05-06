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
exports.useCompliance =
  exports.ComplianceProvider =
  exports.ComplianceContext =
    void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var sonner_1 = require("sonner");
// Create context with default values
exports.ComplianceContext = (0, react_1.createContext)({
  // Core properties
  isLoaded: false,
  error: null,
  // Auto-update functionality
  checkForUpdates: function () {},
  setAutoUpdate: function () {},
  isCheckingUpdates: false,
  lastChecked: null,
  autoUpdate: false,
  updatePreference: function () {},
  // Pending updates management
  pendingUpdates: [],
  isApplyingUpdate: false,
  applyUpdate: function () {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2 /*return*/];
      });
    });
  },
  applyAllUpdates: function () {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2 /*return*/];
      });
    });
  },
  scheduleComplianceCheck: function () {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2 /*return*/];
      });
    });
  },
  enableAutoUpdates: function () {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2 /*return*/, false];
      });
    });
  },
  // Mode toggles and settings
  isCompliantMode: false,
  toggleCompliantMode: function () {},
  hasAcknowledgedTerms: false,
  acknowledgeTerms: function () {},
  // Data retention settings
  privacyLevel: "standard",
  setPrivacyLevel: function () {},
  dataRetentionDays: 90,
  setDataRetentionDays: function () {},
  // Document management
  loadCompliance: function () {},
  saveCompliance: function () {},
  resetCompliance: function () {},
});
var ComplianceProvider = function (_a) {
  var children = _a.children;
  var _b = (0, react_1.useState)(false),
    isLoaded = _b[0],
    setIsLoaded = _b[1];
  var _c = (0, react_1.useState)(null),
    error = _c[0],
    setError = _c[1];
  var _d = (0, react_1.useState)(false),
    isCheckingUpdates = _d[0],
    setIsCheckingUpdates = _d[1];
  var _e = (0, react_1.useState)(null),
    lastChecked = _e[0],
    setLastChecked = _e[1];
  var _f = (0, react_1.useState)([]),
    pendingUpdates = _f[0],
    setPendingUpdates = _f[1];
  var _g = (0, react_1.useState)(false),
    isApplyingUpdate = _g[0],
    setIsApplyingUpdate = _g[1];
  var _h = (0, react_1.useState)(false),
    autoUpdate = _h[0],
    setAutoUpdateState = _h[1];
  // Mode toggles and settings
  var _j = (0, react_1.useState)(false),
    isCompliantMode = _j[0],
    setIsCompliantMode = _j[1];
  var _k = (0, react_1.useState)(false),
    hasAcknowledgedTerms = _k[0],
    setHasAcknowledgedTerms = _k[1];
  var _l = (0, react_1.useState)("standard"),
    privacyLevel = _l[0],
    setPrivacyLevel = _l[1];
  var _m = (0, react_1.useState)(90),
    dataRetentionDays = _m[0],
    setDataRetentionDays = _m[1];
  // Check for updates
  var checkForUpdates = function () {
    setIsCheckingUpdates(true);
    // Simulate API call
    setTimeout(function () {
      setLastChecked(new Date().toISOString());
      setPendingUpdates(["gdpr-update", "ccpa-update"]);
      setIsCheckingUpdates(false);
      sonner_1.toast.info("Compliance updates found");
    }, 1500);
  };
  // Set auto-update preference
  var setAutoUpdate = function (value) {
    setAutoUpdateState(value);
    // Simulate API call
    sonner_1.toast.success(
      value ? "Auto-updates enabled" : "Auto-updates disabled",
    );
  };
  // Apply a specific update
  var applyUpdate = function (documentId) {
    return __awaiter(void 0, void 0, void 0, function () {
      var err_1, errorMessage;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setIsApplyingUpdate(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            // Simulate API call
            return [
              4 /*yield*/,
              new Promise(function (resolve) {
                return setTimeout(resolve, 2000);
              }),
            ];
          case 2:
            // Simulate API call
            _a.sent();
            // Remove from pending updates
            setPendingUpdates(
              pendingUpdates.filter(function (id) {
                return id !== documentId;
              }),
            );
            sonner_1.toast.success(
              "Update ".concat(documentId, " applied successfully"),
            );
            return [3 /*break*/, 5];
          case 3:
            err_1 = _a.sent();
            errorMessage =
              err_1 instanceof Error ? err_1.message : "Unknown error";
            setError(errorMessage);
            sonner_1.toast.error("Failed to apply update ".concat(documentId));
            return [3 /*break*/, 5];
          case 4:
            setIsApplyingUpdate(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  // Apply all updates
  var applyAllUpdates = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var err_2, errorMessage;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setIsApplyingUpdate(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            // Simulate API call
            return [
              4 /*yield*/,
              new Promise(function (resolve) {
                return setTimeout(resolve, 3000);
              }),
            ];
          case 2:
            // Simulate API call
            _a.sent();
            // Clear pending updates
            setPendingUpdates([]);
            sonner_1.toast.success("All updates applied successfully");
            return [3 /*break*/, 5];
          case 3:
            err_2 = _a.sent();
            errorMessage =
              err_2 instanceof Error ? err_2.message : "Unknown error";
            setError(errorMessage);
            sonner_1.toast.error("Failed to apply updates");
            return [3 /*break*/, 5];
          case 4:
            setIsApplyingUpdate(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  // Schedule compliance check
  var scheduleComplianceCheck = function () {
    var args_1 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args_1[_i] = arguments[_i];
    }
    return __awaiter(
      void 0,
      __spreadArray([], args_1, true),
      void 0,
      function (intervalDays) {
        var err_3, errorMessage;
        if (intervalDays === void 0) {
          intervalDays = 30;
        }
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 2, , 3]);
              // Simulate API call
              return [
                4 /*yield*/,
                new Promise(function (resolve) {
                  return setTimeout(resolve, 1000);
                }),
              ];
            case 1:
              // Simulate API call
              _a.sent();
              sonner_1.toast.success(
                "Compliance check scheduled every ".concat(
                  intervalDays,
                  " days",
                ),
              );
              return [3 /*break*/, 3];
            case 2:
              err_3 = _a.sent();
              errorMessage =
                err_3 instanceof Error ? err_3.message : "Unknown error";
              setError(errorMessage);
              sonner_1.toast.error("Failed to schedule compliance check");
              return [3 /*break*/, 3];
            case 3:
              return [2 /*return*/];
          }
        });
      },
    );
  };
  // Enable auto-updates for a document
  var enableAutoUpdates = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var err_4;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            // Simulate API call
            return [
              4 /*yield*/,
              new Promise(function (resolve) {
                return setTimeout(resolve, 1000);
              }),
            ];
          case 1:
            // Simulate API call
            _a.sent();
            sonner_1.toast.success("Auto-updates enabled");
            return [2 /*return*/, true];
          case 2:
            err_4 = _a.sent();
            sonner_1.toast.error(
              "Failed to enable auto-updates: ".concat(
                err_4 instanceof Error ? err_4.message : "Unknown error",
              ),
            );
            return [2 /*return*/, false];
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  // Update preference wrapper - ensures type safety for privacy level
  var updatePreference = function (key, value) {
    if (key === "autoUpdate") {
      setAutoUpdate(value);
    } else if (key === "privacyLevel") {
      // Ensure privacy level is one of the allowed values
      if (value === "standard" || value === "strict" || value === "custom") {
        setPrivacyLevel(value);
      }
    }
  };
  // Toggle compliant mode
  var toggleCompliantMode = function () {
    setIsCompliantMode(function (prev) {
      return !prev;
    });
  };
  // Acknowledge terms
  var acknowledgeTerms = function () {
    setHasAcknowledgedTerms(true);
  };
  // Load compliance data
  var loadCompliance = function () {
    // Implementation would load compliance settings from storage/API
    sonner_1.toast.info("Compliance settings loaded");
  };
  // Save compliance settings
  var saveCompliance = function () {
    // Implementation would save to storage/API
    sonner_1.toast.success("Compliance settings saved");
  };
  // Reset compliance settings
  var resetCompliance = function () {
    setIsCompliantMode(false);
    setHasAcknowledgedTerms(false);
    setPrivacyLevel("standard");
    setDataRetentionDays(90);
    sonner_1.toast.info("Compliance settings reset to defaults");
  };
  // On mount, simulate loading data
  react_1.default.useEffect(function () {
    var loadData = function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var err_5, errorMessage;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 2, , 3]);
              // Simulate API call
              return [
                4 /*yield*/,
                new Promise(function (resolve) {
                  return setTimeout(resolve, 1500);
                }),
              ];
            case 1:
              // Simulate API call
              _a.sent();
              setIsLoaded(true);
              return [3 /*break*/, 3];
            case 2:
              err_5 = _a.sent();
              errorMessage =
                err_5 instanceof Error ? err_5.message : "Unknown error";
              setError(errorMessage);
              return [3 /*break*/, 3];
            case 3:
              return [2 /*return*/];
          }
        });
      });
    };
    loadData();
  }, []);
  return (0, jsx_runtime_1.jsx)(exports.ComplianceContext.Provider, {
    value: {
      // Core properties
      isLoaded: isLoaded,
      error: error,
      // Auto-update functionality
      checkForUpdates: checkForUpdates,
      setAutoUpdate: setAutoUpdate,
      isCheckingUpdates: isCheckingUpdates,
      lastChecked: lastChecked,
      autoUpdate: autoUpdate,
      updatePreference: updatePreference,
      // Pending updates management
      pendingUpdates: pendingUpdates,
      isApplyingUpdate: isApplyingUpdate,
      applyUpdate: applyUpdate,
      applyAllUpdates: applyAllUpdates,
      scheduleComplianceCheck: scheduleComplianceCheck,
      enableAutoUpdates: enableAutoUpdates,
      // Mode toggles
      isCompliantMode: isCompliantMode,
      toggleCompliantMode: toggleCompliantMode,
      hasAcknowledgedTerms: hasAcknowledgedTerms,
      acknowledgeTerms: acknowledgeTerms,
      // Data retention
      privacyLevel: privacyLevel,
      setPrivacyLevel: setPrivacyLevel,
      dataRetentionDays: dataRetentionDays,
      setDataRetentionDays: setDataRetentionDays,
      // Document management
      loadCompliance: loadCompliance,
      saveCompliance: saveCompliance,
      resetCompliance: resetCompliance,
    },
    children: children,
  });
};
exports.ComplianceProvider = ComplianceProvider;
// Create a hook for easy access to the compliance context
var useCompliance = function () {
  return (0, react_1.useContext)(exports.ComplianceContext);
};
exports.useCompliance = useCompliance;

"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
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
exports.useCompliance = void 0;
var react_1 = require("react");
var ComplianceContext_1 = require("@/context/ComplianceContext");
var useCompliance = function () {
  var context = (0, react_1.useContext)(ComplianceContext_1.ComplianceContext);
  if (!context) {
    throw new Error("useCompliance must be used within a ComplianceProvider");
  }
  // Provide default implementations for missing functions
  var extendedContext = __assign(__assign({}, context), {
    // Add missing properties with default implementations
    isLoaded: context.isLoaded !== undefined ? context.isLoaded : true,
    error: context.error || null,
    checkForUpdates:
      context.checkForUpdates ||
      function () {
        return console.warn("checkForUpdates not implemented");
      },
    setAutoUpdate:
      context.setAutoUpdate ||
      function (v) {
        return console.warn("setAutoUpdate not implemented", v);
      },
    isCheckingUpdates: context.isCheckingUpdates || false,
    lastChecked: context.lastChecked || null,
    autoUpdate: context.autoUpdate || false,
    updatePreference:
      context.updatePreference ||
      function (key, value) {
        return console.warn("updatePreference not implemented", key, value);
      },
    pendingUpdates: context.pendingUpdates || [],
    isApplyingUpdate: context.isApplyingUpdate || false,
    applyUpdate:
      context.applyUpdate ||
      function (id) {
        return __awaiter(void 0, void 0, void 0, function () {
          return __generator(this, function (_a) {
            return [2 /*return*/];
          });
        });
      },
    applyAllUpdates:
      context.applyAllUpdates ||
      function () {
        return __awaiter(void 0, void 0, void 0, function () {
          return __generator(this, function (_a) {
            return [2 /*return*/];
          });
        });
      },
    scheduleComplianceCheck:
      context.scheduleComplianceCheck ||
      function () {
        return __awaiter(void 0, void 0, void 0, function () {
          return __generator(this, function (_a) {
            return [2 /*return*/];
          });
        });
      },
    enableAutoUpdates:
      context.enableAutoUpdates ||
      function () {
        return __awaiter(void 0, void 0, void 0, function () {
          return __generator(this, function (_a) {
            return [2 /*return*/, false];
          });
        });
      },
    isCompliantMode: context.isCompliantMode || false,
    toggleCompliantMode: context.toggleCompliantMode || function () {},
    hasAcknowledgedTerms: context.hasAcknowledgedTerms || false,
    acknowledgeTerms: context.acknowledgeTerms || function () {},
    privacyLevel: context.privacyLevel || "standard",
    setPrivacyLevel: context.setPrivacyLevel || function () {},
    dataRetentionDays: context.dataRetentionDays || 90,
    setDataRetentionDays: context.setDataRetentionDays || function () {},
    loadCompliance: context.loadCompliance || function () {},
    saveCompliance: context.saveCompliance || function () {},
    resetCompliance: context.resetCompliance || function () {},
  });
  return extendedContext;
};
exports.useCompliance = useCompliance;
exports.default = exports.useCompliance;

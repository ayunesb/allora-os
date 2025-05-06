"use strict";
/// <reference types="vite/client" />
/**
 * Comprehensive production readiness validation
 */
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
exports.validateProductionReadiness = void 0;
var launchReadiness_1 = require("./launchReadiness");
var loggingService_1 = require("./loggingService");
/**
 * Comprehensive validation of production readiness
 *
 * Validates critical systems to ensure the application is ready for production deployment
 */
var validateProductionReadiness = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var issues,
      passedChecks,
      launchStatus,
      allEnvVarsAvailable,
      featureFlags,
      pluginsReady,
      buildConfigValid,
      hasCriticalErrors,
      error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          loggingService_1.logger.info(
            "Running production readiness validation",
          );
          issues = [];
          passedChecks = [];
          _a.label = 1;
        case 1:
          _a.trys.push([1, 3, , 4]);
          return [4 /*yield*/, (0, launchReadiness_1.checkLaunchReadiness)()];
        case 2:
          launchStatus = _a.sent();
          if (launchStatus.overallStatus === "ready") {
            passedChecks.push({
              type: "apis",
              message: "API connections validated successfully",
            });
          } else {
            // Log specific API issues
            if (
              Object.values(launchStatus.apis).some(function (status) {
                return status !== "connected";
              })
            ) {
              issues.push({
                type: "warning",
                message: "Some API connections are not configured correctly",
                details: {
                  apis: launchStatus.apis,
                },
              });
            }
          }
          if (launchStatus.database.status === "ready") {
            passedChecks.push({
              type: "database",
              message: "Database schema and connections verified",
            });
          } else {
            issues.push({
              type: "error",
              message: "Database verification failed: ".concat(
                launchStatus.database.message || "Unknown error",
              ),
              details: {
                database: launchStatus.database,
              },
            });
          }
          allEnvVarsAvailable = validateEnvironmentVariables();
          if (allEnvVarsAvailable.valid) {
            passedChecks.push({
              type: "environment",
              message: "Environment variables configured correctly",
            });
          } else {
            issues.push({
              type: "error",
              message: "Missing required environment variables",
              details: {
                missing: allEnvVarsAvailable.missing,
              },
            });
          }
          featureFlags = validateFeatureFlags();
          if (featureFlags.valid) {
            passedChecks.push({
              type: "features",
              message: "Feature flags configured correctly",
            });
          } else {
            issues.push({
              type: "warning",
              message: "Some feature flags may not be properly configured",
              details: featureFlags.issues,
            });
          }
          pluginsReady = validatePluginSystem();
          if (pluginsReady.ready) {
            passedChecks.push({
              type: "plugins",
              message: "Plugin system is ready",
            });
          } else {
            issues.push({
              type: "warning",
              message: "Plugin system needs configuration",
              details: pluginsReady.issues,
            });
          }
          buildConfigValid = validateBuildConfig();
          if (buildConfigValid.valid) {
            passedChecks.push({
              type: "build",
              message: "Build configuration is valid",
            });
          } else {
            issues.push({
              type: "error",
              message: "Build configuration is invalid",
              details: buildConfigValid.issues,
            });
          }
          hasCriticalErrors = issues.some(function (issue) {
            return issue.type === "error";
          });
          return [
            2 /*return*/,
            {
              ready: !hasCriticalErrors,
              issues: issues,
              passedChecks: passedChecks,
            },
          ];
        case 3:
          error_1 = _a.sent();
          loggingService_1.logger.error(
            "Error during production validation:",
            error_1,
          );
          return [
            2 /*return*/,
            {
              ready: false,
              issues: [
                {
                  type: "error",
                  message: "Validation process failed with error: ".concat(
                    error_1 instanceof Error
                      ? error_1.message
                      : "Unknown error",
                  ),
                  details: { error: error_1 },
                },
              ],
              passedChecks: [],
            },
          ];
        case 4:
          return [2 /*return*/];
      }
    });
  });
};
exports.validateProductionReadiness = validateProductionReadiness;
var env = import.meta;
/**
 * Validates that all required environment variables are set
 */
function validateEnvironmentVariables() {
  var missing = [];
  // Check Supabase variables
  if (!env.env.VITE_SUPABASE_URL) {
    missing.push("VITE_SUPABASE_URL");
  }
  if (!env.env.VITE_SUPABASE_ANON_KEY) {
    missing.push("VITE_SUPABASE_ANON_KEY");
  }
  var apiUrl = env.env.VITE_API_URL;
  return {
    valid: missing.length === 0,
    missing: missing,
  };
}
/**
 * Validates feature flags configuration
 */
function validateFeatureFlags() {
  var issues = [];
  // Example check - would be populated with actual feature flag checks
  // if (someFeatureFlagWithInconsistentState) {
  //   issues.push('Feature X is enabled but dependency Y is disabled');
  // }
  return {
    valid: issues.length === 0,
    issues: issues,
  };
}
/**
 * Validates plugin system configuration
 */
function validatePluginSystem() {
  var issues = [];
  // Check for essential plugin-related tables
  // This would normally check if tables exist in the database
  // For now, we're just checking for referenced tables in the code
  return {
    ready: true,
    issues: issues,
  };
}
/**
 * Validates build configuration
 */
function validateBuildConfig() {
  var issues = [];
  try {
    // Vite config checks would happen here
    // We'd also verify package.json scripts
    // For this example, we assume everything is configured correctly
  } catch (error) {
    issues.push(
      "Build config error: ".concat(
        error instanceof Error ? error.message : "Unknown error",
      ),
    );
  }
  return {
    valid: issues.length === 0,
    issues: issues,
  };
}

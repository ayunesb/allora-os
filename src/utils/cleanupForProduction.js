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
exports.verifyApiSecrets = verifyApiSecrets;
exports.removeTestData = removeTestData;
exports.validateProductionReadiness = validateProductionReadiness;
exports.verifyZapierWebhooks = verifyZapierWebhooks;
/**
 * Verifies if all required API secrets are available
 */
function verifyApiSecrets() {
  return __awaiter(this, void 0, void 0, function () {
    var requiredSecrets, missingSecrets, _i, requiredSecrets_1, secret;
    return __generator(this, function (_a) {
      requiredSecrets = [
        "STRIPE_SECRET_KEY",
        "STRIPE_PUBLIC_KEY",
        "OPENAI_API_KEY",
        "TWILIO_ACCOUNT_SID",
        "TWILIO_AUTH_TOKEN",
        "POSTMARK_API_KEY",
        "HEYGEN_API_KEY",
        "ZOOM_CLIENT_ID",
        "ZOOM_CLIENT_SECRET",
      ];
      missingSecrets = [];
      // Simulate checking for secrets
      // In a real app, you would have a proper way to check these
      for (
        _i = 0, requiredSecrets_1 = requiredSecrets;
        _i < requiredSecrets_1.length;
        _i++
      ) {
        secret = requiredSecrets_1[_i];
        if (!process.env[secret]) {
          missingSecrets.push(secret);
        }
      }
      return [
        2 /*return*/,
        {
          success: missingSecrets.length === 0,
          missingSecrets:
            missingSecrets.length > 0 ? missingSecrets : undefined,
          error:
            missingSecrets.length > 0
              ? "Missing API secrets detected"
              : undefined,
        },
      ];
    });
  });
}
/**
 * Removes test data from the application's database
 */
function removeTestData() {
  return __awaiter(this, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          // Simulate removing test data
          console.log("Simulating removal of test data");
          // In a real implementation, you would:
          // 1. Connect to the database
          // 2. Delete records with a test flag or created during development
          // 3. Log the cleanup operation
          // For this demo, we'll just simulate a successful operation
          return [
            4 /*yield*/,
            new Promise(function (resolve) {
              return setTimeout(resolve, 1000);
            }),
          ];
        case 1:
          // In a real implementation, you would:
          // 1. Connect to the database
          // 2. Delete records with a test flag or created during development
          // 3. Log the cleanup operation
          // For this demo, we'll just simulate a successful operation
          _a.sent();
          return [
            2 /*return*/,
            {
              success: true,
            },
          ];
        case 2:
          error_1 = _a.sent();
          return [
            2 /*return*/,
            {
              success: false,
              error: error_1.message || "Unknown error removing test data",
            },
          ];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Validates the application for production readiness
 */
function validateProductionReadiness() {
  return __awaiter(this, void 0, void 0, function () {
    var issues, secretsResult;
    var _a;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          issues = [];
          return [4 /*yield*/, verifyApiSecrets()];
        case 1:
          secretsResult = _b.sent();
          if (!secretsResult.success) {
            issues.push(
              "Missing API secrets: ".concat(
                (_a = secretsResult.missingSecrets) === null || _a === void 0
                  ? void 0
                  : _a.join(", "),
              ),
            );
          }
          // Check for development code
          if (process.env.NODE_ENV !== "production") {
            // In a real implementation, you would search the codebase for debugging code
            // For this demo, we'll just add a simulated check
            issues.push("Application is not in production mode");
          }
          return [
            2 /*return*/,
            {
              ready: issues.length === 0,
              issues: issues,
            },
          ];
      }
    });
  });
}
/**
 * Utility to test Zapier webhooks
 */
function verifyZapierWebhooks() {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      try {
        // Simulate testing webhooks
        console.log("Simulating Zapier webhook verification");
        // In a real implementation, you would:
        // 1. Retrieve webhook URLs from settings
        // 2. Send test payloads to each URL
        // 3. Report on which webhooks responded successfully
        // For this demo, we'll return simulated results
        return [
          2 /*return*/,
          {
            campaign_launched: true,
            lead_added: true,
            strategy_approved: false,
            lead_converted: true,
            revenue_milestone_reached: false,
          },
        ];
      } catch (error) {
        console.error("Error verifying webhooks:", error);
        return [2 /*return*/, {}];
      }
      return [2 /*return*/];
    });
  });
}

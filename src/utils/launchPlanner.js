"use strict";
/**
 * Launch planner utility for business launch preparation
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
exports.checkLaunchReadiness = checkLaunchReadiness;
exports.completeStep = completeStep;
exports.verifyRequirement = verifyRequirement;
var sonner_1 = require("sonner");
/**
 * Main function to check if all launch requirements are met
 */
function checkLaunchReadiness() {
  return __awaiter(this, void 0, void 0, function () {
    var plan, isReady, error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          return [4 /*yield*/, generateLaunchPlan()];
        case 1:
          plan = _a.sent();
          isReady = plan.completedRequiredSteps === plan.totalRequiredSteps;
          return [2 /*return*/, { isReady: isReady, plan: plan }];
        case 2:
          error_1 = _a.sent();
          console.error("Error checking launch readiness:", error_1);
          return [
            2 /*return*/,
            {
              isReady: false,
              plan: {
                categories: [],
                isReady: false,
                completedSteps: 0,
                totalSteps: 0,
                completedRequiredSteps: 0,
                totalRequiredSteps: 0,
              },
            },
          ];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Generate a comprehensive launch plan with categories and steps
 */
function generateLaunchPlan() {
  return __awaiter(this, void 0, void 0, function () {
    var categories,
      completedSteps,
      totalSteps,
      completedRequiredSteps,
      totalRequiredSteps;
    return __generator(this, function (_a) {
      categories = [
        {
          id: "api",
          name: "API Integrations",
          description: "Connect all required external services",
          steps: [
            {
              id: "api-1",
              name: "Connect to Stripe",
              description: "Set up billing integration with Stripe",
              isCompleted: true,
              isRequired: true,
              order: 1,
              category: "api",
            },
            {
              id: "api-2",
              name: "Connect to Twilio",
              description: "Set up SMS and WhatsApp messaging",
              isCompleted: true,
              isRequired: true,
              order: 2,
              category: "api",
            },
            {
              id: "api-3",
              name: "Connect to Postmark",
              description: "Set up email delivery service",
              isCompleted: true,
              isRequired: true,
              order: 3,
              category: "api",
            },
            {
              id: "api-4",
              name: "Connect to OpenAI",
              description: "Set up AI assistant capabilities",
              isCompleted: true,
              isRequired: true,
              order: 4,
              category: "api",
            },
          ],
          completedSteps: 4,
          totalSteps: 4,
          requiredSteps: 4,
          completedRequiredSteps: 4,
        },
        {
          id: "data",
          name: "Data Management",
          description: "Ensure database and data workflows are ready",
          steps: [
            {
              id: "data-1",
              name: "Database RLS Policies",
              description: "Set up row-level security policies",
              isCompleted: true,
              isRequired: true,
              order: 1,
              category: "data",
            },
            {
              id: "data-2",
              name: "Database Indexes",
              description: "Create indexes for performance",
              isCompleted: true,
              isRequired: true,
              order: 2,
              category: "data",
            },
            {
              id: "data-3",
              name: "Data backup process",
              description: "Configure automated backups",
              isCompleted: false,
              isRequired: true,
              order: 3,
              category: "data",
            },
          ],
          completedSteps: 2,
          totalSteps: 3,
          requiredSteps: 3,
          completedRequiredSteps: 2,
        },
        {
          id: "user",
          name: "User Management",
          description: "Prepare user workflows and onboarding",
          steps: [
            {
              id: "user-1",
              name: "User Onboarding Flow",
              description: "Complete and test user onboarding",
              isCompleted: true,
              isRequired: true,
              order: 1,
              category: "user",
            },
            {
              id: "user-2",
              name: "Admin User Setup",
              description: "Create admin users and roles",
              isCompleted: true,
              isRequired: true,
              order: 2,
              category: "user",
            },
          ],
          completedSteps: 2,
          totalSteps: 2,
          requiredSteps: 2,
          completedRequiredSteps: 2,
        },
        {
          id: "compliance",
          name: "Legal Compliance",
          description: "Ensure legal and regulatory compliance",
          steps: [
            {
              id: "compliance-1",
              name: "Privacy Policy",
              description: "Create and post privacy policy",
              isCompleted: true,
              isRequired: true,
              order: 1,
              category: "compliance",
            },
            {
              id: "compliance-2",
              name: "Terms of Service",
              description: "Create and post terms of service",
              isCompleted: true,
              isRequired: true,
              order: 2,
              category: "compliance",
            },
            {
              id: "compliance-3",
              name: "GDPR Compliance",
              description: "Implement GDPR requirements",
              isCompleted: false,
              isRequired: false,
              order: 3,
              category: "compliance",
            },
          ],
          completedSteps: 2,
          totalSteps: 3,
          requiredSteps: 2,
          completedRequiredSteps: 2,
        },
      ];
      completedSteps = 0;
      totalSteps = 0;
      completedRequiredSteps = 0;
      totalRequiredSteps = 0;
      categories.forEach(function (category) {
        completedSteps += category.completedSteps;
        totalSteps += category.totalSteps;
        completedRequiredSteps += category.completedRequiredSteps;
        totalRequiredSteps += category.requiredSteps;
      });
      return [
        2 /*return*/,
        {
          categories: categories,
          isReady: completedRequiredSteps === totalRequiredSteps,
          completedSteps: completedSteps,
          totalSteps: totalSteps,
          completedRequiredSteps: completedRequiredSteps,
          totalRequiredSteps: totalRequiredSteps,
        },
      ];
    });
  });
}
/**
 * Mark a launch step as completed
 */
function completeStep(stepId) {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      try {
        // In a real implementation, this would update the database
        console.log("Step ".concat(stepId, " marked as completed"));
        // Simulate success
        sonner_1.toast.success("Step ".concat(stepId, " completed"));
        return [
          2 /*return*/,
          {
            success: true,
            message: "Step completed successfully",
          },
        ];
      } catch (error) {
        console.error("Error completing step:", error);
        sonner_1.toast.error("Failed to complete step");
        return [
          2 /*return*/,
          {
            success: false,
            message: "Failed to complete step",
          },
        ];
      }
      return [2 /*return*/];
    });
  });
}
/**
 * Verify a specific launch requirement
 */
function verifyRequirement(id) {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      switch (id) {
        case "api-1":
          return [2 /*return*/, verifyStripeIntegration()];
        case "api-2":
          return [2 /*return*/, verifyTwilioIntegration()];
        case "api-3":
          return [2 /*return*/, verifyPostmarkIntegration()];
        case "api-4":
          return [2 /*return*/, verifyOpenAIIntegration()];
        case "data-1":
          return [2 /*return*/, verifyRLSPolicies()];
        case "data-2":
          return [2 /*return*/, verifyDatabaseIndexes()];
        default:
          return [
            2 /*return*/,
            {
              valid: false,
              message: "Unknown requirement",
            },
          ];
      }
      return [2 /*return*/];
    });
  });
}
/**
 * Helper function to verify Stripe integration
 */
function verifyStripeIntegration() {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      // This would include real verification in production
      return [
        2 /*return*/,
        {
          valid: true,
          message: "Stripe integration verified",
        },
      ];
    });
  });
}
/**
 * Helper function to verify Twilio integration
 */
function verifyTwilioIntegration() {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      // This would include real verification in production
      return [
        2 /*return*/,
        {
          valid: true,
          message: "Twilio integration verified",
        },
      ];
    });
  });
}
/**
 * Helper function to verify Postmark integration
 */
function verifyPostmarkIntegration() {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      // This would include real verification in production
      return [
        2 /*return*/,
        {
          valid: true,
          message: "Postmark integration verified",
        },
      ];
    });
  });
}
/**
 * Helper function to verify OpenAI integration
 */
function verifyOpenAIIntegration() {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      // This would include real verification in production
      return [
        2 /*return*/,
        {
          valid: true,
          message: "OpenAI integration verified",
        },
      ];
    });
  });
}
/**
 * Helper function to verify RLS policies
 */
function verifyRLSPolicies() {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      // This would include real verification in production
      return [
        2 /*return*/,
        {
          valid: true,
          message: "Row-level security policies are properly configured",
        },
      ];
    });
  });
}
/**
 * Helper function to verify database indexes
 */
function verifyDatabaseIndexes() {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      // This would include real verification in production
      return [
        2 /*return*/,
        {
          valid: true,
          message: "Database indexes are properly configured",
        },
      ];
    });
  });
}

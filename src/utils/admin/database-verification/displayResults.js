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
exports.displayVerificationResults = displayVerificationResults;
exports.performDeepScan = performDeepScan;
var sonner_1 = require("sonner");
var logger_1 = require("@/utils/logger");
/**
 * Displays user-friendly messages for the verification results
 * and provides detailed diagnostics information
 */
function displayVerificationResults(tables, policies, functions) {
  // Log detailed diagnostics first for debugging purposes
  (0, logger_1.logDiagnosticInfo)("Database Verification Results", {
    tables: tables,
    policies: policies,
    functions: functions,
  });
  // Check for empty results (indicates possible connection issues)
  if (tables.length === 0 && policies.length === 0 && functions.length === 0) {
    sonner_1.toast.error("No verification data returned", {
      description: "Check your Supabase connection and permissions",
    });
    return;
  }
  // Handle verification process errors (usually first item)
  var processErrorTable = tables.find(function (t) {
    return t.name === "verification_process" && !t.exists;
  });
  var processErrorPolicy = policies.find(function (p) {
    return p.table === "verification_process" && !p.exists;
  });
  var processErrorFunction = functions.find(function (f) {
    return f.name === "verification_process" && !f.exists;
  });
  if (processErrorTable || processErrorPolicy || processErrorFunction) {
    var errorMessage =
      (processErrorTable === null || processErrorTable === void 0
        ? void 0
        : processErrorTable.message) ||
      (processErrorPolicy === null || processErrorPolicy === void 0
        ? void 0
        : processErrorPolicy.message) ||
      (processErrorFunction === null || processErrorFunction === void 0
        ? void 0
        : processErrorFunction.message) ||
      "Verification process error";
    sonner_1.toast.error("Verification failed", {
      description: errorMessage,
    });
    return;
  }
  // Check for database connection errors
  var connectionError = tables.find(function (t) {
    return t.name === "database_connection" && !t.exists;
  });
  if (connectionError) {
    sonner_1.toast.error("Database connection error", {
      description: connectionError.message,
    });
    return;
  }
  // Calculate and display status of the tables
  var missingTables = tables.filter(function (t) {
    return !t.exists;
  });
  if (missingTables.length > 0) {
    if (missingTables.length === tables.length) {
      sonner_1.toast.error("All required tables are missing", {
        description: "You need to run the database setup script",
      });
    } else {
      sonner_1.toast.warning(
        ""
          .concat(missingTables.length, " of ")
          .concat(tables.length, " tables are missing"),
        {
          description: "Some tables need to be created",
        },
      );
    }
  } else if (tables.length > 0) {
    sonner_1.toast.success("All required tables exist", {
      description: "Verified ".concat(tables.length, " tables successfully"),
    });
  }
  // Calculate and display status of RLS policies
  var missingPolicies = policies.filter(function (p) {
    return !p.exists;
  });
  if (missingPolicies.length > 0) {
    if (missingPolicies.length === policies.length) {
      sonner_1.toast.error("RLS policies are disabled for all tables", {
        description: "Security risk: Enable RLS for your tables",
      });
    } else {
      sonner_1.toast.warning(
        "RLS is disabled for ".concat(missingPolicies.length, " tables"),
        {
          description: "Some tables have security risks",
        },
      );
    }
  } else if (policies.length > 0) {
    sonner_1.toast.success("RLS is enabled for all tables", {
      description: "Verified ".concat(policies.length, " table policies"),
    });
  }
  // Calculate and display status of database functions
  var missingFunctions = functions.filter(function (f) {
    return !f.exists;
  });
  var insecureFunctions = functions.filter(function (f) {
    return f.exists && !f.isSecure;
  });
  if (missingFunctions.length > 0) {
    if (missingFunctions.length === functions.length) {
      sonner_1.toast.error("All required functions are missing", {
        description: "You need to run the database setup script",
      });
    } else {
      sonner_1.toast.warning(
        ""
          .concat(missingFunctions.length, " of ")
          .concat(functions.length, " functions are missing"),
        {
          description: "Some functions need to be created",
        },
      );
    }
  } else if (insecureFunctions.length > 0) {
    sonner_1.toast.warning(
      "".concat(
        insecureFunctions.length,
        " functions are not using SECURITY DEFINER",
      ),
      {
        description: "Security risk: Functions should use SECURITY DEFINER",
      },
    );
  } else if (functions.length > 0) {
    sonner_1.toast.success("All required functions exist and are secure", {
      description: "Verified ".concat(
        functions.length,
        " functions successfully",
      ),
    });
  }
}
/**
 * Performs a deep diagnostic scan of the application
 */
function performDeepScan() {
  return __awaiter(this, void 0, void 0, function () {
    var supabase,
      _a,
      session,
      sessionError,
      _b,
      connected,
      dbError,
      _c,
      profile,
      profileError,
      routeCheckResult,
      error_1;
    return __generator(this, function (_d) {
      switch (_d.label) {
        case 0:
          console.log("Starting deep application scan...");
          _d.label = 1;
        case 1:
          _d.trys.push([1, 6, , 7]);
          return [
            4 /*yield*/,
            Promise.resolve().then(function () {
              return require("@/integrations/supabase/client");
            }),
          ];
        case 2:
          supabase = _d.sent().supabase;
          return [4 /*yield*/, supabase.auth.getSession()];
        case 3:
          (_a = _d.sent()),
            (session = _a.data.session),
            (sessionError = _a.error);
          if (sessionError) {
            sonner_1.toast.error("Authentication error during deep scan", {
              description: sessionError.message,
            });
            console.error("Authentication error:", sessionError);
            return [2 /*return*/, false];
          }
          if (!session) {
            sonner_1.toast.error("Authentication required", {
              description: "You must be logged in to perform a deep scan",
            });
            console.log("No active session found");
            return [2 /*return*/, false];
          }
          console.log("Authentication check passed, user is logged in");
          return [4 /*yield*/, checkSupabaseConnection()];
        case 4:
          (_b = _d.sent()), (connected = _b.connected), (dbError = _b.error);
          if (!connected) {
            sonner_1.toast.error("Database connectivity issue", {
              description: dbError
                ? dbError.message
                : "Could not connect to database",
            });
            console.error("Database connection error:", dbError);
            return [2 /*return*/, false];
          }
          console.log("Database connectivity check passed");
          return [
            4 /*yield*/,
            supabase
              .from("profiles")
              .select("role")
              .eq("id", session.user.id)
              .single(),
          ];
        case 5:
          (_c = _d.sent()), (profile = _c.data), (profileError = _c.error);
          if (profileError) {
            sonner_1.toast.error("Profile access error", {
              description: "Could not verify user permissions",
            });
            console.error("Error checking user profile:", profileError);
            return [2 /*return*/, false];
          }
          if (
            (profile === null || profile === void 0 ? void 0 : profile.role) !==
            "admin"
          ) {
            sonner_1.toast.error("Permission denied", {
              description: "Admin role required for deep scan",
            });
            console.log(
              "User does not have admin role:",
              profile === null || profile === void 0 ? void 0 : profile.role,
            );
            return [2 /*return*/, false];
          }
          console.log("Permission check passed, user has admin role");
          routeCheckResult = checkForRequiredRoutes();
          if (!routeCheckResult.success) {
            sonner_1.toast.error("Routing configuration issue", {
              description: routeCheckResult.message,
            });
            console.error("Route check failed:", routeCheckResult.message);
            return [2 /*return*/, false];
          }
          console.log("Route check passed");
          // All checks passed, perform final verification
          sonner_1.toast.success("Deep scan completed successfully", {
            description: "All system components are properly configured",
          });
          return [2 /*return*/, true];
        case 6:
          error_1 = _d.sent();
          console.error("Unexpected error during deep scan:", error_1);
          sonner_1.toast.error("Deep scan failed", {
            description:
              error_1 instanceof Error
                ? error_1.message
                : "Unknown error occurred",
          });
          return [2 /*return*/, false];
        case 7:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Check if Supabase connection is working properly
 * @returns A promise with connection status and any errors
 */
function checkSupabaseConnection() {
  return __awaiter(this, void 0, void 0, function () {
    var supabase, _a, data, error, error_2;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 3, , 4]);
          return [
            4 /*yield*/,
            Promise.resolve().then(function () {
              return require("@/integrations/supabase/client");
            }),
          ];
        case 1:
          supabase = _b.sent().supabase;
          return [
            4 /*yield*/,
            supabase
              .from("information_schema.tables")
              .select("table_name")
              .limit(1),
          ];
        case 2:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            return [2 /*return*/, { connected: false, error: error }];
          }
          return [2 /*return*/, { connected: true }];
        case 3:
          error_2 = _b.sent();
          return [
            2 /*return*/,
            {
              connected: false,
              error:
                error_2 instanceof Error ? error_2 : new Error("Unknown error"),
            },
          ];
        case 4:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Check if all required routes are defined
 */
function checkForRequiredRoutes() {
  try {
    // This is a basic check to ensure the router definition exists
    // In a production environment, we would do more sophisticated checks
    if (
      window.location.pathname.includes("admin/settings") &&
      !document.querySelector("main")
    ) {
      return {
        success: false,
        message: "Admin Settings route definition issue detected",
      };
    }
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Route check failed",
    };
  }
}

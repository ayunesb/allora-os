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
exports.verifyDatabaseFunctions = verifyDatabaseFunctions;
var client_1 = require("@/integrations/supabase/client");
/**
 * Verifies the existence and security of required database functions
 * @returns Promise with array of function verification results
 */
function verifyDatabaseFunctions() {
  return __awaiter(this, void 0, void 0, function () {
    var functionsToCheck,
      functionResults,
      _a,
      session,
      authError,
      _b,
      checkFuncExists,
      checkFuncError,
      canUseChecker,
      _i,
      functionsToCheck_1,
      funcName,
      _c,
      data,
      error,
      result,
      status_1,
      err_1,
      err_2;
    return __generator(this, function (_d) {
      switch (_d.label) {
        case 0:
          functionsToCheck = [
            "handle_new_user",
            "update_profile_after_company_creation",
            "check_rls_enabled",
            "check_function_exists",
            "update_user_preferences",
            "get_lead_communication_summary",
          ];
          functionResults = [];
          _d.label = 1;
        case 1:
          _d.trys.push([1, 12, , 13]);
          return [4 /*yield*/, client_1.supabase.auth.getSession()];
        case 2:
          (_a = _d.sent()), (session = _a.data.session), (authError = _a.error);
          if (authError) {
            console.error(
              "Authentication error during function verification:",
              authError,
            );
            return [
              2 /*return*/,
              [
                {
                  name: "authentication",
                  exists: false,
                  isSecure: false,
                  status: "error",
                  message: "Authentication error: ".concat(
                    authError.message,
                    ". Please sign in to verify database functions.",
                  ),
                },
              ],
            ];
          }
          return [
            4 /*yield*/,
            client_1.supabase.rpc("check_function_exists", {
              function_name: "check_function_exists",
            }),
          ];
        case 3:
          (_b = _d.sent()),
            (checkFuncExists = _b.data),
            (checkFuncError = _b.error);
          canUseChecker =
            !checkFuncError && checkFuncExists && checkFuncExists.length > 0;
          if (!canUseChecker) return [3 /*break*/, 10];
          console.log(
            "Using check_function_exists RPC for function verification",
          );
          (_i = 0), (functionsToCheck_1 = functionsToCheck);
          _d.label = 4;
        case 4:
          if (!(_i < functionsToCheck_1.length)) return [3 /*break*/, 9];
          funcName = functionsToCheck_1[_i];
          _d.label = 5;
        case 5:
          _d.trys.push([5, 7, , 8]);
          return [
            4 /*yield*/,
            client_1.supabase.rpc("check_function_exists", {
              function_name: funcName,
            }),
          ];
        case 6:
          (_c = _d.sent()), (data = _c.data), (error = _c.error);
          if (error) {
            console.error(
              "Error checking function ".concat(funcName, ":"),
              error,
            );
            functionResults.push({
              name: funcName,
              exists: false,
              isSecure: false,
              status: "error",
              message: "Error checking function: ".concat(error.message),
            });
          } else if (data && data.length > 0) {
            result = data[0];
            status_1 = result.function_exists
              ? result.is_secure
                ? "success"
                : "warning"
              : "error";
            functionResults.push({
              name: funcName,
              exists: result.function_exists,
              isSecure: result.is_secure,
              status: status_1,
              message: result.function_exists
                ? result.is_secure
                  ? "Function ".concat(funcName, " exists and is secure")
                  : "Function ".concat(
                      funcName,
                      " exists but is NOT using SECURITY DEFINER",
                    )
                : "Function ".concat(funcName, " does not exist"),
            });
          } else {
            functionResults.push({
              name: funcName,
              exists: false,
              isSecure: false,
              status: "error",
              message: "Could not determine if function ".concat(
                funcName,
                " exists",
              ),
            });
          }
          return [3 /*break*/, 8];
        case 7:
          err_1 = _d.sent();
          console.error(
            "Error checking function ".concat(funcName, ":"),
            err_1,
          );
          functionResults.push({
            name: funcName,
            exists: false,
            isSecure: false,
            status: "error",
            message: "Error: ".concat(err_1.message || String(err_1)),
          });
          return [3 /*break*/, 8];
        case 8:
          _i++;
          return [3 /*break*/, 4];
        case 9:
          return [3 /*break*/, 11];
        case 10:
          // Fallback: query pg_proc directly
          console.log("Falling back to manual function verification");
          // Just add a placeholder result explaining that we can't check properly
          functionResults.push({
            name: "function_verification",
            exists: false,
            isSecure: false,
            status: "error",
            message:
              "The check_function_exists database function is missing. Please run the SQL setup script to add it.",
          });
          _d.label = 11;
        case 11:
          return [3 /*break*/, 13];
        case 12:
          err_2 = _d.sent();
          console.error("Unexpected error in function verification:", err_2);
          functionResults.push({
            name: "verification_process",
            exists: false,
            isSecure: false,
            status: "error",
            message: "Verification process error: ".concat(
              err_2.message || String(err_2),
            ),
          });
          return [3 /*break*/, 13];
        case 13:
          return [2 /*return*/, functionResults];
      }
    });
  });
}

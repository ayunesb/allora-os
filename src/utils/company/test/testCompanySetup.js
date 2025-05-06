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
exports.runTestCompanySetup = runTestCompanySetup;
var supabase_1 = require("@/backend/supabase");
var testCompanyQueries_1 = require("./testCompanyQueries");
var testCompanyCreation_1 = require("./testCompanyCreation");
/**
 * Sets up a test company for the given user email
 */
function runTestCompanySetup(userEmail) {
  return __awaiter(this, void 0, void 0, function () {
    var _a,
      profile,
      profileError,
      existingCompanyResult,
      updateError_1,
      newCompanyResult,
      updateError,
      error_1;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 7, , 8]);
          // Validate email
          if (!userEmail || !userEmail.includes("@")) {
            return [
              2 /*return*/,
              {
                success: false,
                message: "Invalid email address provided",
                errorCode: "VALIDATION_ERROR",
              },
            ];
          }
          return [
            4 /*yield*/,
            supabase_1.supabase
              .from("profiles")
              .select("*")
              .eq("email", userEmail)
              .maybeSingle(),
          ];
        case 1:
          (_a = _b.sent()), (profile = _a.data), (profileError = _a.error);
          if (profileError) {
            return [
              2 /*return*/,
              {
                success: false,
                message: "Error fetching user profile: ".concat(
                  profileError.message,
                ),
                errorCode: profileError.code,
              },
            ];
          }
          if (!profile) {
            return [
              2 /*return*/,
              {
                success: false,
                message: "User profile not found",
                errorCode: "USER_NOT_FOUND",
              },
            ];
          }
          return [4 /*yield*/, (0, testCompanyQueries_1.getTestCompany)()];
        case 2:
          existingCompanyResult = _b.sent();
          if (!(existingCompanyResult.success && existingCompanyResult.data))
            return [3 /*break*/, 4];
          return [
            4 /*yield*/,
            supabase_1.supabase
              .from("profiles")
              .update({ company_id: existingCompanyResult.data.id })
              .eq("id", profile.id),
          ];
        case 3:
          updateError_1 = _b.sent().error;
          if (updateError_1) {
            return [
              2 /*return*/,
              {
                success: false,
                message:
                  "Test company exists but failed to associate with user: ".concat(
                    updateError_1.message,
                  ),
                errorCode: updateError_1.code,
              },
            ];
          }
          return [
            2 /*return*/,
            {
              success: true,
              message: "Test company already exists",
              companyId: existingCompanyResult.data.id,
              companyName: existingCompanyResult.data.name,
            },
          ];
        case 4:
          return [
            4 /*yield*/,
            (0, testCompanyCreation_1.createTestCompany)(profile.id, userEmail),
          ];
        case 5:
          newCompanyResult = _b.sent();
          if (!newCompanyResult.success) {
            return [2 /*return*/, newCompanyResult];
          }
          return [
            4 /*yield*/,
            supabase_1.supabase
              .from("profiles")
              .update({ company_id: newCompanyResult.companyId })
              .eq("id", profile.id),
          ];
        case 6:
          updateError = _b.sent().error;
          if (updateError) {
            return [
              2 /*return*/,
              {
                success: false,
                message:
                  "Created company but failed to associate with user: ".concat(
                    updateError.message,
                  ),
                companyId: newCompanyResult.companyId,
                companyName: newCompanyResult.companyName,
                errorCode: "PROFILE_UPDATE_ERROR",
              },
            ];
          }
          return [
            2 /*return*/,
            {
              success: true,
              message: 'Test company "'.concat(
                newCompanyResult.companyName,
                '" created and associated with user',
              ),
              companyId: newCompanyResult.companyId,
              companyName: newCompanyResult.companyName,
            },
          ];
        case 7:
          error_1 = _b.sent();
          return [
            2 /*return*/,
            {
              success: false,
              message: "Error in test company setup: ".concat(error_1.message),
              error: error_1.message,
            },
          ];
        case 8:
          return [2 /*return*/];
      }
    });
  });
}

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
exports.removeUserFromCompany = removeUserFromCompany;
exports.assignUserToCompany = assignUserToCompany;
var supabase_1 = require("@/backend/supabase");
var sonner_1 = require("sonner");
/**
 * Removes a user from a company by updating their company_id to null
 * @param userId The ID of the user to remove
 * @returns Boolean indicating success
 */
function removeUserFromCompany(userId) {
  return __awaiter(this, void 0, void 0, function () {
    var error, error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            supabase_1.supabase
              .from("profiles")
              .update({ company_id: null })
              .eq("id", userId),
          ];
        case 1:
          error = _a.sent().error;
          if (error) {
            throw error;
          }
          sonner_1.toast.success("User removed from company");
          return [2 /*return*/, true];
        case 2:
          error_1 = _a.sent();
          console.error("Error removing user from company:", error_1.message);
          sonner_1.toast.error(
            "Failed to remove user: ".concat(error_1.message),
          );
          return [2 /*return*/, false];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Invites a user to join a company and assigns them a role (DEPRECATED)
 * This is a legacy function that is maintained for backward compatibility.
 * For new code, use the inviteUserToCompany function from invitations.ts instead.
 *
 * @deprecated Use inviteUserToCompany from invitations.ts instead
 * @param userEmail The email of the user to invite
 * @param companyId The company ID to assign the user to
 * @param role The role to assign to the user
 * @returns Boolean indicating success
 */
function assignUserToCompany(userEmail_1, companyId_1) {
  return __awaiter(
    this,
    arguments,
    void 0,
    function (userEmail, companyId, role) {
      var _a, userData, userError, updateError, error_2;
      if (role === void 0) {
        role = "user";
      }
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _b.trys.push([0, 3, , 4]);
            return [
              4 /*yield*/,
              supabase_1.supabase
                .from("profiles")
                .select("id")
                .eq("email", userEmail)
                .single(),
            ];
          case 1:
            (_a = _b.sent()), (userData = _a.data), (userError = _a.error);
            if (userError) {
              if (userError.code === "PGRST116") {
                sonner_1.toast.error(
                  "User with email ".concat(userEmail, " not found"),
                );
              } else {
                sonner_1.toast.error(
                  "Error finding user: ".concat(userError.message),
                );
              }
              return [2 /*return*/, false];
            }
            return [
              4 /*yield*/,
              supabase_1.supabase
                .from("profiles")
                .update({
                  company_id: companyId,
                  role: role,
                })
                .eq("id", userData.id),
            ];
          case 2:
            updateError = _b.sent().error;
            if (updateError) {
              sonner_1.toast.error(
                "Failed to update user: ".concat(updateError.message),
              );
              return [2 /*return*/, false];
            }
            sonner_1.toast.success("User successfully added to company");
            return [2 /*return*/, true];
          case 3:
            error_2 = _b.sent();
            console.error("Error inviting user to company:", error_2);
            sonner_1.toast.error(
              "Failed to invite user: ".concat(error_2.message),
            );
            return [2 /*return*/, false];
          case 4:
            return [2 /*return*/];
        }
      });
    },
  );
}

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
exports.getCompanyUsers =
  exports.deleteCompanyAsAdmin =
  exports.deleteUserAsAdmin =
  exports.updateCompanyAsAdmin =
  exports.updateUserAsAdmin =
  exports.getAllCompanies =
  exports.getAllUsers =
    void 0;
var client_1 = require("@/integrations/supabase/client");
var sonner_1 = require("sonner");
// Get all users for admin dashboard
var getAllUsers = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var _a, data, error, error_1;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            client_1.supabase
              .from("profiles")
              .select("id, name, company_id, role, created_at")
              .order("created_at", { ascending: false }),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            throw error;
          }
          // Transform the data to include email (which might come from auth.users
          // but we can't directly query that with client-side code)
          // For now, we'll use the id as a placeholder for email
          return [
            2 /*return*/,
            (data || []).map(function (profile) {
              return {
                id: profile.id,
                name: profile.name || "",
                email: "user-".concat(
                  profile.id.substring(0, 8),
                  "@example.com",
                ), // Placeholder email
                company_id: profile.company_id,
                role: profile.role,
                created_at: profile.created_at,
              };
            }),
          ];
        case 2:
          error_1 = _b.sent();
          console.error("Error fetching all users:", error_1.message);
          sonner_1.toast.error("Admin error: ".concat(error_1.message));
          return [2 /*return*/, []];
        case 3:
          return [2 /*return*/];
      }
    });
  });
};
exports.getAllUsers = getAllUsers;
// Get all companies
var getAllCompanies = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var _a, data, error, error_2;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            client_1.supabase
              .from("companies")
              .select("*")
              .order("created_at", { ascending: false }),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            throw error;
          }
          return [2 /*return*/, data || []];
        case 2:
          error_2 = _b.sent();
          console.error("Error fetching all companies:", error_2.message);
          sonner_1.toast.error("Admin error: ".concat(error_2.message));
          return [2 /*return*/, []];
        case 3:
          return [2 /*return*/];
      }
    });
  });
};
exports.getAllCompanies = getAllCompanies;
// Update user as admin
var updateUserAsAdmin = function (userId, data) {
  return __awaiter(void 0, void 0, void 0, function () {
    var error, error_3;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            client_1.supabase.from("profiles").update(data).eq("id", userId),
          ];
        case 1:
          error = _a.sent().error;
          if (error) {
            throw error;
          }
          sonner_1.toast.success("User updated successfully");
          return [2 /*return*/, true];
        case 2:
          error_3 = _a.sent();
          console.error("Error updating user as admin:", error_3.message);
          sonner_1.toast.error("Admin error: ".concat(error_3.message));
          return [2 /*return*/, false];
        case 3:
          return [2 /*return*/];
      }
    });
  });
};
exports.updateUserAsAdmin = updateUserAsAdmin;
// Update company as admin
var updateCompanyAsAdmin = function (companyId, data) {
  return __awaiter(void 0, void 0, void 0, function () {
    var error, error_4;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            client_1.supabase
              .from("companies")
              .update(data)
              .eq("id", companyId),
          ];
        case 1:
          error = _a.sent().error;
          if (error) {
            throw error;
          }
          sonner_1.toast.success("Company updated successfully");
          return [2 /*return*/, true];
        case 2:
          error_4 = _a.sent();
          console.error("Error updating company as admin:", error_4.message);
          sonner_1.toast.error("Admin error: ".concat(error_4.message));
          return [2 /*return*/, false];
        case 3:
          return [2 /*return*/];
      }
    });
  });
};
exports.updateCompanyAsAdmin = updateCompanyAsAdmin;
// Delete user as admin
var deleteUserAsAdmin = function (userId) {
  return __awaiter(void 0, void 0, void 0, function () {
    var error, error_5;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            client_1.supabase.from("profiles").delete().eq("id", userId),
          ];
        case 1:
          error = _a.sent().error;
          if (error) {
            throw error;
          }
          sonner_1.toast.success("User profile deleted successfully");
          return [2 /*return*/, true];
        case 2:
          error_5 = _a.sent();
          console.error("Error deleting user as admin:", error_5.message);
          sonner_1.toast.error("Admin error: ".concat(error_5.message));
          return [2 /*return*/, false];
        case 3:
          return [2 /*return*/];
      }
    });
  });
};
exports.deleteUserAsAdmin = deleteUserAsAdmin;
// Delete company as admin
var deleteCompanyAsAdmin = function (companyId) {
  return __awaiter(void 0, void 0, void 0, function () {
    var error, error_6;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            client_1.supabase.from("companies").delete().eq("id", companyId),
          ];
        case 1:
          error = _a.sent().error;
          if (error) {
            throw error;
          }
          sonner_1.toast.success("Company deleted successfully");
          return [2 /*return*/, true];
        case 2:
          error_6 = _a.sent();
          console.error("Error deleting company as admin:", error_6.message);
          sonner_1.toast.error("Admin error: ".concat(error_6.message));
          return [2 /*return*/, false];
        case 3:
          return [2 /*return*/];
      }
    });
  });
};
exports.deleteCompanyAsAdmin = deleteCompanyAsAdmin;
// Get users for a specific company
var getCompanyUsers = function (companyId) {
  return __awaiter(void 0, void 0, void 0, function () {
    var _a, data, error, error_7;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            client_1.supabase
              .from("profiles")
              .select("id, name, company_id, role, created_at")
              .eq("company_id", companyId)
              .order("created_at", { ascending: false }),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            throw error;
          }
          // Transform the data to include required fields for the User type
          return [
            2 /*return*/,
            (data || []).map(function (profile) {
              return {
                id: profile.id,
                name: profile.name || "",
                email: "user-".concat(
                  profile.id.substring(0, 8),
                  "@example.com",
                ), // Placeholder email
                company_id: profile.company_id,
                role: profile.role,
                created_at: profile.created_at,
              };
            }),
          ];
        case 2:
          error_7 = _b.sent();
          console.error("Error fetching company users:", error_7.message);
          sonner_1.toast.error("Admin error: ".concat(error_7.message));
          return [2 /*return*/, []];
        case 3:
          return [2 /*return*/];
      }
    });
  });
};
exports.getCompanyUsers = getCompanyUsers;

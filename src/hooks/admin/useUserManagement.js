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
exports.useUserManagement = useUserManagement;
var react_1 = require("react");
var client_1 = require("@/integrations/supabase/client");
var sonner_1 = require("sonner");
function useUserManagement() {
  var _this = this;
  var _a = (0, react_1.useState)([]),
    users = _a[0],
    setUsers = _a[1];
  var _b = (0, react_1.useState)([]),
    companyUsers = _b[0],
    setCompanyUsers = _b[1];
  var _c = (0, react_1.useState)(null),
    selectedCompany = _c[0],
    setSelectedCompany = _c[1];
  var _d = (0, react_1.useState)(false),
    isLoading = _d[0],
    setIsLoading = _d[1];
  var loadUsers = (0, react_1.useCallback)(function () {
    return __awaiter(_this, void 0, void 0, function () {
      var _a, data, error, mappedUsers, error_1;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            setIsLoading(true);
            _b.label = 1;
          case 1:
            _b.trys.push([1, 3, 4, 5]);
            return [
              4 /*yield*/,
              client_1.supabase
                .from("profiles")
                .select("id, name, email, company_id, role, created_at")
                .order("created_at", { ascending: false }),
            ];
          case 2:
            (_a = _b.sent()), (data = _a.data), (error = _a.error);
            if (error) {
              throw error;
            }
            mappedUsers = (data || []).map(function (profile) {
              return {
                id: profile.id,
                name: profile.name || "",
                email: profile.email || "",
                firstName: "",
                lastName: "",
                company_id: profile.company_id,
                role: profile.role || "user",
                created_at: profile.created_at,
                company: "",
                industry: "",
                app_metadata: {},
              };
            });
            setUsers(mappedUsers);
            return [3 /*break*/, 5];
          case 3:
            error_1 = _b.sent();
            console.error("Error loading users:", error_1);
            sonner_1.toast.error(
              "Failed to load users: ".concat(error_1.message),
            );
            return [3 /*break*/, 5];
          case 4:
            setIsLoading(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  }, []);
  var loadCompanyUsers = (0, react_1.useCallback)(function (companyId) {
    return __awaiter(_this, void 0, void 0, function () {
      var _a, data, error, mappedUsers, error_2;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            if (!companyId) return [2 /*return*/];
            setIsLoading(true);
            _b.label = 1;
          case 1:
            _b.trys.push([1, 3, 4, 5]);
            return [
              4 /*yield*/,
              client_1.supabase
                .from("profiles")
                .select("id, name, email, company_id, role, created_at")
                .eq("company_id", companyId)
                .order("created_at", { ascending: false }),
            ];
          case 2:
            (_a = _b.sent()), (data = _a.data), (error = _a.error);
            if (error) {
              throw error;
            }
            mappedUsers = (data || []).map(function (profile) {
              return {
                id: profile.id,
                name: profile.name || "",
                email: profile.email || "",
                firstName: "",
                lastName: "",
                company_id: profile.company_id,
                role: profile.role || "user",
                created_at: profile.created_at,
                company: "",
                industry: "",
                app_metadata: {},
              };
            });
            setCompanyUsers(mappedUsers);
            setSelectedCompany(companyId);
            return [3 /*break*/, 5];
          case 3:
            error_2 = _b.sent();
            console.error("Error loading company users:", error_2);
            sonner_1.toast.error(
              "Failed to load company users: ".concat(error_2.message),
            );
            return [3 /*break*/, 5];
          case 4:
            setIsLoading(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  }, []);
  var updateUser = (0, react_1.useCallback)(
    function (userId, data) {
      return __awaiter(_this, void 0, void 0, function () {
        var error, error_3;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              setIsLoading(true);
              _a.label = 1;
            case 1:
              _a.trys.push([1, 6, 7, 8]);
              return [
                4 /*yield*/,
                client_1.supabase
                  .from("profiles")
                  .update(data)
                  .eq("id", userId),
              ];
            case 2:
              error = _a.sent().error;
              if (error) {
                throw error;
              }
              sonner_1.toast.success("User updated successfully");
              return [4 /*yield*/, loadUsers()];
            case 3:
              _a.sent();
              if (!selectedCompany) return [3 /*break*/, 5];
              return [4 /*yield*/, loadCompanyUsers(selectedCompany)];
            case 4:
              _a.sent();
              _a.label = 5;
            case 5:
              return [2 /*return*/, true];
            case 6:
              error_3 = _a.sent();
              console.error("Error updating user:", error_3);
              sonner_1.toast.error(
                "Failed to update user: ".concat(error_3.message),
              );
              return [2 /*return*/, false];
            case 7:
              setIsLoading(false);
              return [7 /*endfinally*/];
            case 8:
              return [2 /*return*/];
          }
        });
      });
    },
    [loadUsers, loadCompanyUsers, selectedCompany],
  );
  var deleteUser = (0, react_1.useCallback)(
    function (userId) {
      return __awaiter(_this, void 0, void 0, function () {
        var error, error_4;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              setIsLoading(true);
              _a.label = 1;
            case 1:
              _a.trys.push([1, 6, 7, 8]);
              return [
                4 /*yield*/,
                client_1.supabase.from("profiles").delete().eq("id", userId),
              ];
            case 2:
              error = _a.sent().error;
              if (error) {
                throw error;
              }
              sonner_1.toast.success("User deleted successfully");
              return [4 /*yield*/, loadUsers()];
            case 3:
              _a.sent();
              if (!selectedCompany) return [3 /*break*/, 5];
              return [4 /*yield*/, loadCompanyUsers(selectedCompany)];
            case 4:
              _a.sent();
              _a.label = 5;
            case 5:
              return [2 /*return*/, true];
            case 6:
              error_4 = _a.sent();
              console.error("Error deleting user:", error_4);
              sonner_1.toast.error(
                "Failed to delete user: ".concat(error_4.message),
              );
              return [2 /*return*/, false];
            case 7:
              setIsLoading(false);
              return [7 /*endfinally*/];
            case 8:
              return [2 /*return*/];
          }
        });
      });
    },
    [loadUsers, loadCompanyUsers, selectedCompany],
  );
  return {
    users: users,
    companyUsers: companyUsers,
    selectedCompany: selectedCompany,
    isLoading: isLoading,
    loadUsers: loadUsers,
    loadCompanyUsers: loadCompanyUsers,
    updateUser: updateUser,
    deleteUser: deleteUser,
    setSelectedCompany: setSelectedCompany,
  };
}

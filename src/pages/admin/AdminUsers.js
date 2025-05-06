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
exports.default = AdminUsers;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var PageErrorBoundary_1 = require("@/components/errorHandling/PageErrorBoundary");
var users_1 = require("@/components/admin/users");
var EntityListSkeleton_1 = require("@/components/admin/EntityListSkeleton");
var sonner_1 = require("sonner");
var useUserManagement_1 = require("@/hooks/admin/useUserManagement");
function AdminUsers() {
  var _this = this;
  var _a = (0, useUserManagement_1.useUserManagement)(),
    users = _a.users,
    isLoading = _a.isLoading,
    loadUsers = _a.loadUsers,
    updateUser = _a.updateUser,
    deleteUser = _a.deleteUser;
  var _b = (0, react_1.useState)([]),
    companies = _b[0],
    setCompanies = _b[1];
  var _c = (0, react_1.useState)(true),
    loadingCompanies = _c[0],
    setLoadingCompanies = _c[1];
  (0, react_1.useEffect)(
    function () {
      // Load users when component mounts
      loadUsers();
      fetchCompanies();
    },
    [loadUsers],
  );
  var fetchCompanies = function () {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        setLoadingCompanies(true);
        try {
          // For this implementation, we'll use a simple mock data
          // In a real implementation, this would fetch from the database
          setTimeout(function () {
            setCompanies([
              { id: "company-1", name: "Acme Inc." },
              { id: "company-2", name: "Global Tech" },
              { id: "company-3", name: "Future Solutions" },
            ]);
            setLoadingCompanies(false);
          }, 500);
        } catch (error) {
          console.error("Error fetching companies:", error);
          sonner_1.toast.error("Failed to load companies");
          setLoadingCompanies(false);
        }
        return [2 /*return*/];
      });
    });
  };
  var handleUserAdded = function () {
    sonner_1.toast.success("User added successfully");
    loadUsers();
  };
  var handleUpdateUser = function (userId, updates) {
    updateUser(userId, updates);
    sonner_1.toast.success("User updated");
  };
  var handleDeleteUser = function (userId, userName) {
    if (
      window.confirm(
        "Are you sure you want to delete user ".concat(userName, "?"),
      )
    ) {
      deleteUser(userId);
      sonner_1.toast.success("User deleted");
    }
  };
  if (isLoading || loadingCompanies) {
    return (0, jsx_runtime_1.jsx)(EntityListSkeleton_1.EntityListSkeleton, {});
  }
  return (0, jsx_runtime_1.jsx)(PageErrorBoundary_1.PageErrorBoundary, {
    pageName: "User Management",
    children: (0, jsx_runtime_1.jsxs)("div", {
      className: "space-y-6",
      children: [
        (0, jsx_runtime_1.jsx)(users_1.UserManagementHeader, {
          companies: companies,
          loadingCompanies: loadingCompanies,
          onUserAdded: handleUserAdded,
        }),
        (0, jsx_runtime_1.jsx)(users_1.UserTable, {
          users: users,
          isLoading: isLoading,
          onUpdateUser: handleUpdateUser,
          onDeleteUser: handleDeleteUser,
        }),
      ],
    }),
  });
}

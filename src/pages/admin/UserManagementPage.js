"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserManagementPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var users_1 = require("@/components/admin/users");
function UserManagementPage() {
  var _a = (0, react_1.useState)([
      { id: "company-1", name: "Acme Inc." },
      { id: "company-2", name: "Global Tech" },
      { id: "company-3", name: "Future Solutions" },
    ]),
    companies = _a[0],
    setCompanies = _a[1];
  var _b = (0, react_1.useState)([
      {
        id: "user-1",
        name: "John Doe",
        email: "john@example.com",
        role: "admin",
        company_id: "company-1",
        created_at: "2025-01-01",
      },
      {
        id: "user-2",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "user",
        company_id: "company-2",
        created_at: "2025-01-15",
      },
      {
        id: "user-3",
        name: "Bob Johnson",
        email: "bob@example.com",
        role: "user",
        company_id: "company-3",
        created_at: "2025-02-01",
      },
    ]),
    users = _b[0],
    setUsers = _b[1];
  var _c = (0, react_1.useState)(false),
    loadingCompanies = _c[0],
    setLoadingCompanies = _c[1];
  var handleUserAdded = function () {
    // Handle user added functionality
    console.log("User added");
  };
  var handleUpdateUser = function (userId, data) {
    // Update user functionality
    console.log("Update user", userId, data);
    setUsers(function (prev) {
      return prev.map(function (user) {
        return user.id === userId ? __assign(__assign({}, user), data) : user;
      });
    });
  };
  var handleDeleteUser = function (userId) {
    // Delete user functionality
    console.log("Delete user", userId);
    setUsers(function (prev) {
      return prev.filter(function (user) {
        return user.id !== userId;
      });
    });
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsx)(users_1.UserManagementHeader, {
        companies: companies,
        loadingCompanies: loadingCompanies,
        onUserAdded: handleUserAdded,
      }),
      (0, jsx_runtime_1.jsx)(users_1.UserTable, {
        users: users,
        onUpdateUser: handleUpdateUser,
        onDeleteUser: handleDeleteUser,
      }),
    ],
  });
}

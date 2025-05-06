"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManagementHeader = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var InviteUserDialog_1 = require("./InviteUserDialog");
var use_mobile_1 = require("@/hooks/use-mobile");
var UserManagementHeader = function (_a) {
  var companies = _a.companies,
    loadingCompanies = _a.loadingCompanies,
    onUserAdded = _a.onUserAdded;
  var breakpoint = (0, use_mobile_1.useBreakpoint)();
  var isMobileView = ["xs", "mobile"].includes(breakpoint);
  return (0, jsx_runtime_1.jsxs)("div", {
    className:
      "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "w-full sm:w-auto",
        children: [
          (0, jsx_runtime_1.jsx)("h1", {
            className: "".concat(
              isMobileView ? "text-xl" : "text-2xl sm:text-3xl",
              " font-bold text-white",
            ),
            children: "User Management",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base",
            children: "Manage user accounts and permissions",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "".concat(isMobileView ? "w-full" : "w-auto"),
        children: (0, jsx_runtime_1.jsx)(InviteUserDialog_1.InviteUserDialog, {
          companies: companies,
          loadingCompanies: loadingCompanies,
          onSuccess: onUserAdded,
        }),
      }),
    ],
  });
};
exports.UserManagementHeader = UserManagementHeader;

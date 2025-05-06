"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AdminOnly;
var jsx_runtime_1 = require("react/jsx-runtime");
var AuthContext_1 = require("@/context/AuthContext");
var react_router_dom_1 = require("react-router-dom");
var sonner_1 = require("sonner");
var authCompatibility_1 = require("@/utils/authCompatibility");
function AdminOnly(_a) {
  var _b, _c, _d;
  var children = _a.children;
  var authContext = (0, AuthContext_1.useAuth)();
  var auth = (0, authCompatibility_1.createAuthCompatibilityLayer)(authContext);
  // Calculate isAuthenticated based on user presence
  var isAuthenticated = !!(auth === null || auth === void 0
    ? void 0
    : auth.user);
  if (!isAuthenticated) {
    return (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, {
      to: "/auth/login",
      replace: true,
    });
  }
  // Check if the user has admin role
  var isAdmin =
    ((_b = auth.user) === null || _b === void 0 ? void 0 : _b.role) ===
      "admin" ||
    ((_d =
      (_c = auth.user) === null || _c === void 0 ? void 0 : _c.app_metadata) ===
      null || _d === void 0
      ? void 0
      : _d.is_admin);
  if (!isAdmin) {
    sonner_1.toast.error("Access denied. Admin rights required.", {
      id: "admin-access-denied",
    });
    return (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, {
      to: "/dashboard",
      replace: true,
    });
  }
  return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
}

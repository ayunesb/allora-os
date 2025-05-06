"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProviderWrapper = AuthProviderWrapper;
var jsx_runtime_1 = require("react/jsx-runtime");
var AuthContext_1 = require("@/context/AuthContext");
/**
 * A component that ensures all children are wrapped with the AuthProvider
 * to prevent "useAuth must be used within an AuthProvider" errors
 */
function AuthProviderWrapper(_a) {
  var children = _a.children;
  return (0, jsx_runtime_1.jsx)(AuthContext_1.AuthProvider, {
    children: children,
  });
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ForgotPassword;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
function ForgotPassword() {
  // Redirect to the reset password page
  return (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, {
    to: "/reset-password",
    replace: true,
  });
}

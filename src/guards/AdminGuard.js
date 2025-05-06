"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var AdminGuard = function (_a) {
  var children = _a.children;
  var isAdmin = true; // Replace with actual admin check logic
  if (!isAdmin) {
    return (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, {
      to: "/login",
      replace: true,
    });
  }
  return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
};
exports.default = AdminGuard;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Legal;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
function Legal() {
  // Redirect to the terms of service page
  return (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, {
    to: "/legal/terms-of-service",
    replace: true,
  });
}

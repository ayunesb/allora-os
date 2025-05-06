"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RedirectToDashboard;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
function RedirectToDashboard() {
  return (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, {
    to: "/dashboard",
  });
}

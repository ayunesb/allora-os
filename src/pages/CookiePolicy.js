"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CookiePolicy;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
function CookiePolicy() {
  // Redirect to the cookies page
  return (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, {
    to: "/legal/cookies",
    replace: true,
  });
}

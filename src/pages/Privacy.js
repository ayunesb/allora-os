"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Privacy;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
function Privacy() {
  // Redirect to the privacy policy page
  return (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, {
    to: "/legal/privacy-policy",
    replace: true,
  });
}

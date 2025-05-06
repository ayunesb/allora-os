"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RefundPolicy;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
function RefundPolicy() {
  // Redirect to the refund policy page
  return (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, {
    to: "/legal/refund-policy",
    replace: true,
  });
}

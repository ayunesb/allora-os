"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var Sidebar = function () {
  return (0, jsx_runtime_1.jsx)("nav", {
    children: (0, jsx_runtime_1.jsx)("ul", {
      children: (0, jsx_runtime_1.jsx)("li", {
        children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
          to: "/dashboard",
          children: "Dashboard",
        }),
      }),
    }),
  });
};
exports.default = Sidebar;

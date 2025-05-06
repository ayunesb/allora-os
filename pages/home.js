"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var index_1 = require("@/routes/index");
var App = function () {
  return (0, jsx_runtime_1.jsx)(react_router_dom_1.BrowserRouter, {
    children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Switch, {
      children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, {
        exact: true,
        path: "/",
        component: index_1.default,
      }),
    }),
  });
};
exports.default = App;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var routes_1 = require("./routes"); // your full route array
function AppRoutes() {
  return (0, jsx_runtime_1.jsx)(react_1.Suspense, {
    fallback: (0, jsx_runtime_1.jsx)("div", {
      className: "p-6",
      children: "Loading...",
    }),
    children: (0, react_router_dom_1.useRoutes)(routes_1.appRoutes),
  });
}
function App() {
  return (0, jsx_runtime_1.jsx)(react_router_dom_1.BrowserRouter, {
    children: (0, jsx_runtime_1.jsx)(AppRoutes, {}),
  });
}

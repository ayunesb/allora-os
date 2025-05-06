"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var react_router_dom_1 = require("react-router-dom");
var App_1 = require("./App");
var DashboardBreadcrumb_1 = require("./components/DashboardBreadcrumb");
react_dom_1.default.render(
  (0, jsx_runtime_1.jsx)(react_1.default.StrictMode, {
    children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.BrowserRouter, {
      children: [
        (0, jsx_runtime_1.jsx)(DashboardBreadcrumb_1.default, {
          rootPath: "/vault",
          rootLabel: "Vault",
        }),
        (0, jsx_runtime_1.jsx)(App_1.default, {}),
      ],
    }),
  }),
  document.getElementById("root"),
);

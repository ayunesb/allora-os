import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import DashboardBreadcrumb from "./components/DashboardBreadcrumb";
ReactDOM.render(_jsx(React.StrictMode, { children: _jsxs(BrowserRouter, { children: [_jsx(DashboardBreadcrumb, { rootPath: "/vault", rootLabel: "Vault" }), _jsx(App, {})] }) }), document.getElementById("root"));

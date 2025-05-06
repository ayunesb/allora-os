"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var react_router_dom_1 = require("react-router-dom");
var DashboardBreadcrumb = function (_a) {
  var rootPath = _a.rootPath,
    rootLabel = _a.rootLabel;
  return (0, jsx_runtime_1.jsx)(antd_1.Breadcrumb, {
    children: (0, jsx_runtime_1.jsx)(antd_1.Breadcrumb.Item, {
      children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
        to: rootPath,
        children: rootLabel,
      }),
    }),
  });
};
exports.default = DashboardBreadcrumb;

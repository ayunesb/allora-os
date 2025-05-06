"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var DashboardBreadcrumb_1 = require("@/components/DashboardBreadcrumb");
var Publish = function () {
  return (0, jsx_runtime_1.jsx)("div", {
    children: (0, jsx_runtime_1.jsx)(DashboardBreadcrumb_1.default, {
      rootPath: "/vault",
      rootLabel: "Vault",
    }),
  });
};
exports.default = Publish;

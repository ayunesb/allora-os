"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RootLayout;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var Sidebar_1 = require("@/components/layout/Sidebar");
var toaster_1 = require("@/components/ui/toaster");
function RootLayout() {
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "flex min-h-screen bg-background text-foreground",
    children: [
      (0, jsx_runtime_1.jsx)(Sidebar_1.Sidebar, {}),
      (0, jsx_runtime_1.jsx)("main", {
        className: "flex flex-1 flex-col overflow-hidden p-6",
        children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {}),
      }),
      (0, jsx_runtime_1.jsx)(toaster_1.Toaster, {}),
    ],
  });
}

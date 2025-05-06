"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AdminLayout;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var scroll_area_1 = require("@/components/ui/scroll-area");
var Navbar_1 = require("@/components/Navbar");
var Sidebar_1 = require("@/components/dashboard/Sidebar");
function AdminLayout(_a) {
  var children = _a.children;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "flex min-h-screen flex-col",
    children: [
      (0, jsx_runtime_1.jsx)(Navbar_1.Navbar, {}),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex flex-1",
        children: [
          (0, jsx_runtime_1.jsx)(Sidebar_1.Sidebar, {}),
          (0, jsx_runtime_1.jsx)(scroll_area_1.ScrollArea, {
            className: "h-screen w-full",
            children: (0, jsx_runtime_1.jsx)("main", {
              className: "flex-1 p-4 md:p-6",
              children:
                children !== null && children !== void 0
                  ? children
                  : (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {}),
            }),
          }),
        ],
      }),
    ],
  });
}

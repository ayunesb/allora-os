"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminHeader = AdminHeader;
var jsx_runtime_1 = require("react/jsx-runtime");
var use_mobile_1 = require("@/hooks/use-mobile");
function AdminHeader() {
  var breakpoint = (0, use_mobile_1.useBreakpoint)();
  var isMobileView = ["xs", "mobile"].includes(breakpoint);
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "mb-4 sm:mb-6",
    children: [
      (0, jsx_runtime_1.jsx)("h1", {
        className: "".concat(
          isMobileView ? "text-xl" : "text-2xl sm:text-3xl",
          " font-bold",
        ),
        children: "Admin Dashboard",
      }),
      (0, jsx_runtime_1.jsx)("p", {
        className: "text-muted-foreground mt-1 sm:mt-2 text-sm",
        children: "Overview of platform metrics and management tools",
      }),
    ],
  });
}

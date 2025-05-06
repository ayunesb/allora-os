"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navbar = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var useUser_1 = require("@/hooks/useUser");
var react_router_dom_1 = require("react-router-dom");
var button_1 = require("@/components/ui/button");
var authCompatibility_1 = require("@/utils/authCompatibility");
var Navbar = function () {
  var user = (0, useUser_1.useUser)().user;
  return (0, jsx_runtime_1.jsx)("nav", {
    className: "bg-background border-b border-border/40 px-4 py-3",
    children: (0, jsx_runtime_1.jsxs)("div", {
      className: "max-w-7xl mx-auto flex justify-between items-center",
      children: [
        (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
          to: "/",
          className: "font-bold text-xl text-primary",
          children: "Allora AI",
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "flex items-center gap-6",
          children: [
            (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
              to: "/dashboard",
              className: "text-sm font-medium hover:text-primary",
              children: "Dashboard",
            }),
            (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
              to: "/campaigns",
              className: "text-sm font-medium hover:text-primary",
              children: "Campaigns",
            }),
            (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
              to: "/analytics",
              className: "text-sm font-medium hover:text-primary",
              children: "Analytics",
            }),
            user
              ? (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex items-center gap-2",
                  children: [
                    (0, jsx_runtime_1.jsx)("img", {
                      src: (0, authCompatibility_1.getUserAvatar)(user),
                      alt: "".concat(
                        (0, authCompatibility_1.getUserDisplayName)(user),
                        "'s avatar",
                      ),
                      className: "w-8 h-8 rounded-full",
                    }),
                    (0, jsx_runtime_1.jsx)("span", {
                      className: "text-sm font-medium",
                      children: (0, authCompatibility_1.getUserDisplayName)(
                        user,
                      ),
                    }),
                  ],
                })
              : (0, jsx_runtime_1.jsx)(button_1.Button, {
                  asChild: true,
                  size: "sm",
                  children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
                    to: "/login",
                    children: "Sign In",
                  }),
                }),
          ],
        }),
      ],
    }),
  });
};
exports.Navbar = Navbar;
// This is exported as default for backwards compatibility
exports.default = exports.Navbar;

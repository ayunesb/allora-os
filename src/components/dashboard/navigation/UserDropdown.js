"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDropdown = UserDropdown;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var dropdown_menu_1 = require("@/components/ui/dropdown-menu");
function UserDropdown(_a) {
  var onSignOut = _a.onSignOut;
  return (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenu, {
    children: [
      (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuTrigger, {
        asChild: true,
        children: (0, jsx_runtime_1.jsx)(button_1.Button, {
          variant: "ghost",
          size: "icon",
          className: "rounded-full",
          children: (0, jsx_runtime_1.jsx)(lucide_react_1.User, {
            className: "h-5 w-5",
          }),
        }),
      }),
      (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuContent, {
        align: "end",
        children: [
          (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuLabel, {
            children: "My Account",
          }),
          (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuSeparator, {}),
          (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, {
            asChild: true,
            children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, {
              to: "/dashboard/profile",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Settings, {
                  className: "mr-2 h-4 w-4",
                }),
                "Profile Settings",
              ],
            }),
          }),
          (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuSeparator, {}),
          (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuItem, {
            onClick: onSignOut,
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.LogOut, {
                className: "mr-2 h-4 w-4",
              }),
              "Logout",
            ],
          }),
        ],
      }),
    ],
  });
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var avatar_1 = require("@/components/ui/avatar");
var button_1 = require("@/components/ui/button");
var dropdown_menu_1 = require("@/components/ui/dropdown-menu");
var lucide_react_1 = require("lucide-react");
var UserMenu = function (_a) {
  var avatarUrl = _a.avatarUrl,
    name = _a.name,
    email = _a.email,
    onSignOut = _a.onSignOut,
    isSigningOut = _a.isSigningOut,
    hasActiveSubscription = _a.hasActiveSubscription;
  return (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenu, {
    children: [
      (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuTrigger, {
        asChild: true,
        children: (0, jsx_runtime_1.jsx)(button_1.Button, {
          variant: "ghost",
          className: "h-8 w-8 p-0 data-[state=open]:bg-muted",
          children: (0, jsx_runtime_1.jsxs)(avatar_1.Avatar, {
            className: "h-8 w-8",
            children: [
              (0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, {
                src: avatarUrl || "",
                alt: name || "",
              }),
              (0, jsx_runtime_1.jsx)(avatar_1.AvatarFallback, {
                children:
                  (name === null || name === void 0 ? void 0 : name[0]) ||
                  (email === null || email === void 0 ? void 0 : email[0]),
              }),
            ],
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
              to: "/dashboard/settings",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Settings, {
                  className: "mr-2 h-4 w-4",
                }),
                (0, jsx_runtime_1.jsx)("span", { children: "Settings" }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, {
            asChild: true,
            children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, {
              to: "/faq",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.HelpCircle, {
                  className: "mr-2 h-4 w-4",
                }),
                (0, jsx_runtime_1.jsx)("span", { children: "FAQ" }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuSeparator, {}),
          !hasActiveSubscription &&
            (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
              children: [
                (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, {
                  asChild: true,
                  children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
                    to: "/pricing",
                    children: "Upgrade",
                  }),
                }),
                (0, jsx_runtime_1.jsx)(
                  dropdown_menu_1.DropdownMenuSeparator,
                  {},
                ),
              ],
            }),
          (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, {
            onClick: onSignOut,
            disabled: isSigningOut,
            className: "cursor-pointer",
            children: isSigningOut ? "Signing out..." : "Sign out",
          }),
        ],
      }),
    ],
  });
};
exports.default = UserMenu;

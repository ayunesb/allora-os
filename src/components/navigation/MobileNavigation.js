"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var button_1 = require("@/components/ui/button");
var sheet_1 = require("@/components/ui/sheet");
var lucide_react_1 = require("lucide-react");
var avatar_1 = require("@/components/ui/avatar");
var use_mobile_1 = require("@/hooks/use-mobile");
var MobileNavigation = function (_a) {
  var isOpen = _a.isOpen,
    setIsOpen = _a.setIsOpen,
    navItems = _a.navItems,
    onSignOut = _a.onSignOut,
    isSigningOut = _a.isSigningOut,
    userName = _a.userName,
    userEmail = _a.userEmail;
  var breakpoint = (0, use_mobile_1.useBreakpoint)();
  var isXSmall = breakpoint === "xs";
  // Create the user's initials for the avatar
  var getInitials = function () {
    if (!userName) return "U";
    var parts = userName.split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (
      parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  };
  return (0, jsx_runtime_1.jsxs)(sheet_1.Sheet, {
    open: isOpen,
    onOpenChange: setIsOpen,
    children: [
      (0, jsx_runtime_1.jsx)(sheet_1.SheetTrigger, {
        asChild: true,
        children: (0, jsx_runtime_1.jsx)(button_1.Button, {
          variant: "ghost",
          size: "sm",
          className: "mr-2 flex md:hidden touch-target",
          "aria-label": "Toggle Menu",
          children: (0, jsx_runtime_1.jsx)(lucide_react_1.Menu, {
            className: "h-5 w-5",
          }),
        }),
      }),
      (0, jsx_runtime_1.jsxs)(sheet_1.SheetContent, {
        side: "left",
        className: "pr-0 w-[85vw] max-w-[280px] sm:max-w-[320px]",
        children: [
          (0, jsx_runtime_1.jsx)(sheet_1.SheetHeader, {
            className: "text-left",
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-center mb-4",
              children: [
                (0, jsx_runtime_1.jsx)(avatar_1.Avatar, {
                  className: "h-10 w-10 mr-3",
                  children: (0, jsx_runtime_1.jsx)(avatar_1.AvatarFallback, {
                    children: getInitials(),
                  }),
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex flex-col overflow-hidden",
                  children: [
                    (0, jsx_runtime_1.jsx)(sheet_1.SheetTitle, {
                      className: "text-left truncate",
                      children: userName || "Dashboard Menu",
                    }),
                    userEmail &&
                      (0, jsx_runtime_1.jsx)(sheet_1.SheetDescription, {
                        className: "text-left text-xs mt-1 truncate",
                        children: userEmail,
                      }),
                  ],
                }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "py-4",
            children: navItems.map(function (item) {
              return (0, jsx_runtime_1.jsx)(
                react_router_dom_1.Link,
                {
                  to: item.href,
                  onClick: function () {
                    return setIsOpen(false);
                  },
                  children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
                    variant: "ghost",
                    className: "w-full justify-start text-base py-3 h-auto",
                    children: [
                      (0, jsx_runtime_1.jsx)(item.icon, {
                        className: "mr-3 h-5 w-5",
                      }),
                      item.name,
                    ],
                  }),
                },
                item.name,
              );
            }),
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className:
              "absolute bottom-0 left-0 right-0 border-t border-border/50 p-4",
            children: [
              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                variant: "outline",
                className: "w-full justify-start mb-2",
                onClick: function () {
                  // Navigate to profile page
                  setIsOpen(false);
                },
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Settings, {
                    className: "mr-2 h-4 w-4",
                  }),
                  "Settings",
                ],
              }),
              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                variant: "destructive",
                className: "w-full justify-start",
                onClick: onSignOut,
                disabled: isSigningOut,
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.LogOut, {
                    className: "mr-2 h-4 w-4",
                  }),
                  isSigningOut ? "Signing out..." : "Sign Out",
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
exports.default = MobileNavigation;

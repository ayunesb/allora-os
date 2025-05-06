"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTable = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var table_1 = require("@/components/ui/table");
var badge_1 = require("@/components/ui/badge");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
var use_mobile_1 = require("@/hooks/use-mobile");
var UserTable = function (_a) {
  var users = _a.users,
    _b = _a.isLoading,
    isLoading = _b === void 0 ? false : _b,
    onUpdateUser = _a.onUpdateUser,
    onDeleteUser = _a.onDeleteUser;
  var breakpoint = (0, use_mobile_1.useBreakpoint)();
  var isMobileView = ["xs", "mobile"].includes(breakpoint);
  var isTabletView = breakpoint === "tablet";
  if (isLoading) {
    return (0, jsx_runtime_1.jsx)("div", {
      className:
        "text-center py-8 border border-white/10 rounded-md text-gray-400 bg-[#111827]",
      children: "Loading users...",
    });
  }
  if (users.length === 0) {
    return (0, jsx_runtime_1.jsx)("div", {
      className:
        "text-center py-8 border border-white/10 rounded-md text-gray-400 bg-[#111827]",
      children: "No users found",
    });
  }
  // For mobile view, use a card-based layout instead of a table
  if (isMobileView) {
    return (0, jsx_runtime_1.jsx)("div", {
      className: "space-y-4",
      children: users.map(function (user) {
        return (0, jsx_runtime_1.jsxs)(
          "div",
          {
            className:
              "border border-white/10 rounded-md p-4 bg-[#111827] shadow-sm",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center justify-between mb-3",
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex items-center",
                    children: [
                      (0, jsx_runtime_1.jsx)("div", {
                        className: "bg-[#1E293B] rounded-full p-2 mr-3",
                        children: (0, jsx_runtime_1.jsx)(lucide_react_1.User, {
                          size: 16,
                          className: "text-[#5A67D8]",
                        }),
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        children: [
                          (0, jsx_runtime_1.jsx)("h3", {
                            className: "font-medium text-white",
                            children: user.name || "Unnamed User",
                          }),
                          (0, jsx_runtime_1.jsx)("p", {
                            className: "text-sm text-gray-400",
                            children: user.email,
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                    variant: user.role === "admin" ? "default" : "secondary",
                    className:
                      user.role === "admin" ? "bg-[#5A67D8]" : "bg-gray-600",
                    children: user.role,
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "text-xs text-gray-400 mb-3",
                children: [
                  "Created: ",
                  new Date(user.created_at).toLocaleDateString(),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex gap-2 mt-2",
                children: [
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    variant: "outline",
                    size: "sm",
                    onClick: function () {
                      var newRole = user.role === "admin" ? "user" : "admin";
                      onUpdateUser(user.id, { role: newRole });
                      sonner_1.toast.success(
                        "User role updated to ".concat(newRole),
                      );
                    },
                    className:
                      "flex-1 h-8 px-2 border-white/10 bg-[#1E293B] hover:bg-[#2D3A4F] text-white",
                    children:
                      user.role === "admin"
                        ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                            children: [
                              (0, jsx_runtime_1.jsx)(lucide_react_1.ShieldOff, {
                                className: "h-3 w-3 mr-2",
                              }),
                              "Make User",
                            ],
                          })
                        : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                            children: [
                              (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, {
                                className: "h-3 w-3 mr-2",
                              }),
                              "Make Admin",
                            ],
                          }),
                  }),
                  (0, jsx_runtime_1.jsxs)(button_1.Button, {
                    variant: "outline",
                    size: "sm",
                    className:
                      "flex-1 h-8 px-2 text-red-500 border-white/10 bg-[#1E293B] hover:bg-[#2D3A4F]",
                    onClick: function () {
                      return onDeleteUser(
                        user.id,
                        user.name || user.email || "",
                      );
                    },
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, {
                        className: "h-3 w-3 mr-2",
                      }),
                      "Delete",
                    ],
                  }),
                ],
              }),
            ],
          },
          user.id,
        );
      }),
    });
  }
  // Regular table for tablet and desktop
  return (0, jsx_runtime_1.jsx)("div", {
    className: "rounded-md border border-white/10 overflow-x-auto bg-[#111827]",
    children: (0, jsx_runtime_1.jsxs)(table_1.Table, {
      children: [
        (0, jsx_runtime_1.jsx)(table_1.TableHeader, {
          className: "bg-[#1A1F2C]",
          children: (0, jsx_runtime_1.jsxs)(table_1.TableRow, {
            className: "border-white/10 hover:bg-transparent",
            children: [
              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                className: "text-gray-400",
                children: "Name",
              }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                className: "text-gray-400 ".concat(
                  isTabletView ? "hidden lg:table-cell" : "",
                ),
                children: "Email",
              }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                className: "text-gray-400",
                children: "Role",
              }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                className: "hidden md:table-cell text-gray-400",
                children: "Created",
              }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                className: "text-gray-400",
                children: "Actions",
              }),
            ],
          }),
        }),
        (0, jsx_runtime_1.jsx)(table_1.TableBody, {
          children: users.map(function (user) {
            return (0, jsx_runtime_1.jsxs)(
              table_1.TableRow,
              {
                className: "border-white/10 hover:bg-[#1E293B]",
                children: [
                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                    className: "font-medium text-white",
                    children: user.name || "Unnamed User",
                  }),
                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                    className: "text-gray-300 ".concat(
                      isTabletView ? "hidden lg:table-cell" : "",
                    ),
                    children: user.email,
                  }),
                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                    children: (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                      variant: user.role === "admin" ? "default" : "secondary",
                      className:
                        user.role === "admin" ? "bg-[#5A67D8]" : "bg-gray-600",
                      children: user.role,
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                    className: "hidden md:table-cell text-gray-300",
                    children: new Date(user.created_at).toLocaleDateString(),
                  }),
                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                    children: (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex flex-wrap gap-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(button_1.Button, {
                          variant: "outline",
                          size: "sm",
                          onClick: function () {
                            var newRole =
                              user.role === "admin" ? "user" : "admin";
                            onUpdateUser(user.id, { role: newRole });
                            sonner_1.toast.success(
                              "User role updated to ".concat(newRole),
                            );
                          },
                          className:
                            "h-8 px-2 flex items-center gap-1 border-white/10 bg-[#1E293B] hover:bg-[#2D3A4F] text-white",
                          children:
                            user.role === "admin"
                              ? (0, jsx_runtime_1.jsxs)(
                                  jsx_runtime_1.Fragment,
                                  {
                                    children: [
                                      (0, jsx_runtime_1.jsx)(
                                        lucide_react_1.ShieldOff,
                                        { className: "h-3 w-3" },
                                      ),
                                      (0, jsx_runtime_1.jsx)("span", {
                                        className: "hidden sm:inline",
                                        children: "Make User",
                                      }),
                                    ],
                                  },
                                )
                              : (0, jsx_runtime_1.jsxs)(
                                  jsx_runtime_1.Fragment,
                                  {
                                    children: [
                                      (0, jsx_runtime_1.jsx)(
                                        lucide_react_1.Shield,
                                        { className: "h-3 w-3" },
                                      ),
                                      (0, jsx_runtime_1.jsx)("span", {
                                        className: "hidden sm:inline",
                                        children: "Make Admin",
                                      }),
                                    ],
                                  },
                                ),
                        }),
                        (0, jsx_runtime_1.jsxs)(button_1.Button, {
                          variant: "outline",
                          size: "sm",
                          className:
                            "h-8 px-2 flex items-center gap-1 text-red-500 border-white/10 bg-[#1E293B] hover:bg-[#2D3A4F]",
                          onClick: function () {
                            return onDeleteUser(
                              user.id,
                              user.name || user.email || "",
                            );
                          },
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, {
                              className: "h-3 w-3",
                            }),
                            (0, jsx_runtime_1.jsx)("span", {
                              className: "hidden sm:inline",
                              children: "Delete",
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                ],
              },
              user.id,
            );
          }),
        }),
      ],
    }),
  });
};
exports.UserTable = UserTable;

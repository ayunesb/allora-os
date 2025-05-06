"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ExecutiveBoard;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var avatar_1 = require("@/components/ui/avatar");
var badge_1 = require("@/components/ui/badge");
function ExecutiveBoard(_a) {
  var executives = _a.executives,
    onSelectExecutive = _a.onSelectExecutive;
  return (0, jsx_runtime_1.jsx)("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
    children: executives.map(function (executive) {
      return (0, jsx_runtime_1.jsx)(
        card_1.Card,
        {
          className: "cursor-pointer transition-shadow hover:shadow-md ".concat(
            executive.status === "inactive" ? "opacity-70" : "",
          ),
          onClick: function () {
            return onSelectExecutive && onSelectExecutive(executive.id);
          },
          children: (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            className: "p-5",
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-center space-x-4",
              children: [
                (0, jsx_runtime_1.jsxs)(avatar_1.Avatar, {
                  className: "h-12 w-12",
                  children: [
                    (0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, {
                      src: executive.avatar,
                      alt: executive.name,
                    }),
                    (0, jsx_runtime_1.jsx)(avatar_1.AvatarFallback, {
                      children: executive.name.substring(0, 2),
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex-1 space-y-1",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center justify-between",
                      children: [
                        (0, jsx_runtime_1.jsx)("h3", {
                          className: "font-medium text-sm",
                          children: executive.name,
                        }),
                        (0, jsx_runtime_1.jsx)(StatusBadge, {
                          status: executive.status,
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "text-xs text-muted-foreground",
                      children: executive.role,
                    }),
                    executive.specialties &&
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex flex-wrap gap-1.5 mt-2",
                        children: [
                          executive.specialties
                            .slice(0, 2)
                            .map(function (specialty) {
                              return (0, jsx_runtime_1.jsx)(
                                badge_1.Badge,
                                {
                                  variant: "outline",
                                  className: "text-[0.65rem] px-1.5 py-0",
                                  children: specialty,
                                },
                                specialty,
                              );
                            }),
                          executive.specialties.length > 2 &&
                            (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
                              variant: "outline",
                              className: "text-[0.65rem] px-1.5 py-0",
                              children: ["+", executive.specialties.length - 2],
                            }),
                        ],
                      }),
                    executive.lastActivity &&
                      (0, jsx_runtime_1.jsxs)("p", {
                        className: "text-[0.65rem] text-muted-foreground mt-2",
                        children: ["Last active: ", executive.lastActivity],
                      }),
                  ],
                }),
              ],
            }),
          }),
        },
        executive.id,
      );
    }),
  });
}
function StatusBadge(_a) {
  var status = _a.status;
  var variants = {
    active: {
      className:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    },
    learning: {
      className:
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    },
    inactive: {
      className:
        "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
    },
  };
  var statusText = {
    active: "Active",
    learning: "Learning",
    inactive: "Inactive",
  };
  return (0, jsx_runtime_1.jsxs)("span", {
    className:
      "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ".concat(
        variants[status].className,
      ),
    children: [
      (0, jsx_runtime_1.jsx)("span", {
        className: "mr-1 h-1.5 w-1.5 rounded-full bg-current",
      }),
      statusText[status],
    ],
  });
}

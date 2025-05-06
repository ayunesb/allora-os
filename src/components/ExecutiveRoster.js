"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ExecutiveRoster;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var executiveBots_1 = require("@/backend/executiveBots");
var tabs_1 = require("@/components/ui/tabs");
var lucide_react_1 = require("lucide-react");
function ExecutiveRoster() {
  var _a = (0, react_1.useState)("ceo"),
    activeRole = _a[0],
    setActiveRole = _a[1];
  var getRoleIcon = function (role) {
    switch (role) {
      case "ceo":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.RocketIcon, {
          className: "h-5 w-5",
        });
      case "cfo":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.DollarSign, {
          className: "h-5 w-5",
        });
      case "cio":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.Brain, {
          className: "h-5 w-5",
        });
      case "cmo":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.Activity, {
          className: "h-5 w-5",
        });
      case "chro":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.Users, {
          className: "h-5 w-5",
        });
      case "strategy":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, {
          className: "h-5 w-5",
        });
      default:
        return (0, jsx_runtime_1.jsx)(lucide_react_1.Brain, {
          className: "h-5 w-5",
        });
    }
  };
  var getRoleTitle = function (role) {
    switch (role) {
      case "ceo":
        return "Chief Executive Officers";
      case "cfo":
        return "Chief Financial Officers";
      case "cio":
        return "Chief Information Officers";
      case "cmo":
        return "Chief Marketing Officers";
      case "chro":
        return "Chief HR Officers";
      case "strategy":
        return "Strategy Consultants";
      default:
        return "Executives";
    }
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "bg-card border rounded-lg p-6",
    children: [
      (0, jsx_runtime_1.jsx)("h2", {
        className: "text-xl font-bold mb-4",
        children: "Full Executive Roster",
      }),
      (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
        defaultValue: "ceo",
        onValueChange: setActiveRole,
        children: [
          (0, jsx_runtime_1.jsx)(tabs_1.TabsList, {
            className: "mb-4",
            children: Object.keys(executiveBots_1.executiveBots).map(
              function (role) {
                return (0, jsx_runtime_1.jsxs)(
                  tabs_1.TabsTrigger,
                  {
                    value: role,
                    className: "flex items-center gap-2",
                    children: [
                      getRoleIcon(role),
                      (0, jsx_runtime_1.jsx)("span", {
                        className: "capitalize",
                        children: role,
                      }),
                    ],
                  },
                  role,
                );
              },
            ),
          }),
          Object.entries(executiveBots_1.executiveBots).map(function (_a) {
            var role = _a[0],
              names = _a[1];
            return (0, jsx_runtime_1.jsx)(
              tabs_1.TabsContent,
              {
                value: role,
                children: (0, jsx_runtime_1.jsxs)("div", {
                  className: "bg-muted/30 rounded-lg p-4",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center gap-2 mb-3",
                      children: [
                        getRoleIcon(role),
                        (0, jsx_runtime_1.jsx)("h3", {
                          className: "text-lg font-medium",
                          children: getRoleTitle(role),
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)("div", {
                      className:
                        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3",
                      children: names.map(function (name) {
                        return (0, jsx_runtime_1.jsxs)(
                          "div",
                          {
                            className:
                              "bg-background border border-border/50 rounded-md p-3 flex items-center gap-2",
                            children: [
                              (0, jsx_runtime_1.jsx)("div", {
                                className:
                                  "w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center",
                                children: name.split(" ")[0][0],
                              }),
                              (0, jsx_runtime_1.jsx)("span", {
                                children: name,
                              }),
                            ],
                          },
                          name,
                        );
                      }),
                    }),
                  ],
                }),
              },
              role,
            );
          }),
        ],
      }),
    ],
  });
}

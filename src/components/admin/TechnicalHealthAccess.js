"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TechnicalHealthAccess;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var react_router_dom_1 = require("react-router-dom");
function TechnicalHealthAccess() {
  var adminLinks = [
    {
      title: "Technical",
      description: "Performance improvements",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Zap, {
        className: "h-8 w-8 text-amber-500",
      }),
      link: "/admin/technical-improvements",
    },
    {
      title: "System Health",
      description: "Monitor system performance",
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Activity, {
        className: "h-8 w-8 text-blue-500",
      }),
      link: "/admin/system-health",
    },
  ];
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "border-primary/20",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
            className: "flex items-center",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Server, {
                className: "h-5 w-5 text-primary mr-2",
              }),
              "Technical Administration",
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children: "Monitor and manage system performance",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: (0, jsx_runtime_1.jsx)("div", {
          className: "grid grid-cols-2 gap-4",
          children: adminLinks.map(function (link, index) {
            return (0, jsx_runtime_1.jsx)(
              react_router_dom_1.Link,
              {
                to: link.link,
                children: (0, jsx_runtime_1.jsxs)("div", {
                  className:
                    "flex flex-col items-center justify-center p-4 rounded-lg border hover:bg-accent/50 transition-colors h-full",
                  children: [
                    link.icon,
                    (0, jsx_runtime_1.jsx)("h3", {
                      className: "mt-3 font-medium text-sm",
                      children: link.title,
                    }),
                    (0, jsx_runtime_1.jsx)("p", {
                      className:
                        "text-xs text-muted-foreground text-center mt-1",
                      children: link.description,
                    }),
                  ],
                }),
              },
              index,
            );
          }),
        }),
      }),
    ],
  });
}

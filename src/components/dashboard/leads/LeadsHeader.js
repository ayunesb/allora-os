"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadsHeader = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("@/components/ui/button");
var react_router_dom_1 = require("react-router-dom");
var lucide_react_1 = require("lucide-react");
var LeadsHeader = function (_a) {
  var isMobileView = _a.isMobileView;
  return (0, jsx_runtime_1.jsx)("div", {
    className: "".concat(isMobileView ? "px-4" : ""),
    children: (0, jsx_runtime_1.jsxs)("div", {
      className:
        "flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0",
      children: [
        (0, jsx_runtime_1.jsxs)("div", {
          children: [
            (0, jsx_runtime_1.jsx)("h1", {
              className: "text-2xl font-bold tracking-tight",
              children: "Lead Management",
            }),
            (0, jsx_runtime_1.jsx)("p", {
              className: "text-muted-foreground",
              children:
                "Manage your leads and track their progress through your sales pipeline",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "flex space-x-2",
          children: [
            (0, jsx_runtime_1.jsx)(button_1.Button, {
              variant: "outline",
              asChild: true,
              children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, {
                to: "/dashboard/leads/linkedin",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Linkedin, {
                    className: "mr-2 h-4 w-4",
                  }),
                  "LinkedIn",
                ],
              }),
            }),
            (0, jsx_runtime_1.jsx)(button_1.Button, {
              variant: "outline",
              asChild: true,
              children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, {
                to: "/dashboard/leads/follow-up-sequences",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.MessageSquareText, {
                    className: "mr-2 h-4 w-4",
                  }),
                  "Follow-up Sequences",
                ],
              }),
            }),
          ],
        }),
      ],
    }),
  });
};
exports.LeadsHeader = LeadsHeader;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardBreadcrumb = DashboardBreadcrumb;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var lucide_react_1 = require("lucide-react");
function DashboardBreadcrumb(_a) {
  var rootPath = _a.rootPath,
    rootLabel = _a.rootLabel,
    rootIcon = _a.rootIcon,
    currentPath = _a.currentPath,
    currentLabel = _a.currentLabel;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "flex items-center text-sm mb-6 text-muted-foreground",
    children: [
      (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
        to: "/dashboard",
        className: "hover:text-foreground transition-colors",
        children: "Dashboard",
      }),
      (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, {
        className: "h-4 w-4 mx-2",
      }),
      (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, {
        to: rootPath,
        className: "flex items-center hover:text-foreground transition-colors",
        children: [
          rootIcon &&
            (0, jsx_runtime_1.jsx)("span", {
              className: "mr-1.5",
              children: rootIcon,
            }),
          rootLabel,
        ],
      }),
      currentPath &&
        currentLabel &&
        (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, {
              className: "h-4 w-4 mx-2",
            }),
            (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
              to: currentPath,
              className: "text-foreground font-medium",
              children: currentLabel,
            }),
          ],
        }),
    ],
  });
}

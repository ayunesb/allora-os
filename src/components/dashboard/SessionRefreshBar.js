"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionRefreshBar = SessionRefreshBar;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
function SessionRefreshBar(_a) {
  var onRefreshSession = _a.onRefreshSession;
  return (0, jsx_runtime_1.jsx)("div", {
    className: "bg-muted py-2 px-4 border-b",
    children: (0, jsx_runtime_1.jsx)("div", {
      className: "container mx-auto flex justify-end",
      children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
        size: "sm",
        variant: "ghost",
        onClick: onRefreshSession,
        className: "text-xs flex items-center gap-1",
        children: [
          (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
            className: "h-3 w-3",
          }),
          " Refresh Session",
        ],
      }),
    }),
  });
}

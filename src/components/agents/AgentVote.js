"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AgentVote;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
function AgentVote(_a) {
  var onVote = _a.onVote;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "flex space-x-2",
    children: [
      (0, jsx_runtime_1.jsx)("button", {
        onClick: function () {
          return onVote(true);
        },
        className: "hover:text-green-400",
        children: (0, jsx_runtime_1.jsx)(lucide_react_1.ThumbsUp, {}),
      }),
      (0, jsx_runtime_1.jsx)("button", {
        onClick: function () {
          return onVote(false);
        },
        className: "hover:text-red-400",
        children: (0, jsx_runtime_1.jsx)(lucide_react_1.ThumbsDown, {}),
      }),
    ],
  });
}

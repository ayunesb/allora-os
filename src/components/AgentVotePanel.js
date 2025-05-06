"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentVotePanel = AgentVotePanel;
var jsx_runtime_1 = require("react/jsx-runtime");
function AgentVotePanel(_a) {
  var logId = _a.logId,
    agentId = _a.agentId,
    xp = _a.xp,
    version = _a.version,
    onVote = _a.onVote;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "p-4 border rounded shadow",
    children: [
      (0, jsx_runtime_1.jsx)("h2", {
        className: "text-lg font-bold",
        children: "Agent Details",
      }),
      (0, jsx_runtime_1.jsxs)("p", { children: ["XP: ", xp] }),
      (0, jsx_runtime_1.jsxs)("p", { children: ["Version: ", version] }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "mt-4",
        children: [
          (0, jsx_runtime_1.jsx)("button", {
            className: "px-4 py-2 bg-green-500 text-white rounded mr-2",
            onClick: function () {
              return onVote("up");
            },
            children: "Upvote",
          }),
          (0, jsx_runtime_1.jsx)("button", {
            className: "px-4 py-2 bg-red-500 text-white rounded",
            onClick: function () {
              return onVote("down");
            },
            children: "Downvote",
          }),
        ],
      }),
    ],
  });
}

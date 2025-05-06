"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LeadFollowUpSequences;
var jsx_runtime_1 = require("react/jsx-runtime");
var FollowUpSequences_1 = require("@/components/leads/FollowUpSequences");
function LeadFollowUpSequences() {
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "animate-fadeIn space-y-6",
    children: [
      (0, jsx_runtime_1.jsx)("h1", {
        className: "text-2xl font-bold tracking-tight",
        children: "Follow-Up Sequences",
      }),
      (0, jsx_runtime_1.jsx)("p", {
        className: "text-muted-foreground",
        children:
          "Create and manage automated follow-up sequences for your leads.",
      }),
      (0, jsx_runtime_1.jsx)(FollowUpSequences_1.FollowUpSequences, {}),
    ],
  });
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AIExecutiveDebate;
var jsx_runtime_1 = require("react/jsx-runtime");
var DebateGenerator_1 = require("@/components/ai-executive-debate/DebateGenerator");
function AIExecutiveDebate() {
  return (0, jsx_runtime_1.jsx)("div", {
    className: "p-6",
    children: (0, jsx_runtime_1.jsx)(DebateGenerator_1.DebateGenerator, {}),
  });
}

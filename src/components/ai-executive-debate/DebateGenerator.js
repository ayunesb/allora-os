"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebateGenerator = DebateGenerator;
var jsx_runtime_1 = require("react/jsx-runtime");
var ExecutiveDebateRunner_1 = require("../debate/ExecutiveDebateRunner");
function DebateGenerator() {
  return (0, jsx_runtime_1.jsx)("div", {
    className: "space-y-6",
    children: (0, jsx_runtime_1.jsx)(ExecutiveDebateRunner_1.default, {}),
  });
}

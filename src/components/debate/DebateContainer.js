"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DebateContainer;
var jsx_runtime_1 = require("react/jsx-runtime");
var ExecutiveDebateRunner_1 = require("./ExecutiveDebateRunner");
function DebateContainer() {
  return (0, jsx_runtime_1.jsx)("div", {
    className: "container mx-auto py-6",
    children: (0, jsx_runtime_1.jsx)(ExecutiveDebateRunner_1.default, {}),
  });
}

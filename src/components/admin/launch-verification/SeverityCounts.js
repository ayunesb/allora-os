"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeverityCounts = SeverityCounts;
var jsx_runtime_1 = require("react/jsx-runtime");
var badge_1 = require("@/components/ui/badge");
function SeverityCounts(_a) {
  var counts = _a.counts;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "flex flex-wrap gap-2 my-3",
    children: [
      (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
        variant: "outline",
        className: "bg-red-100 text-red-800 border-red-200",
        children: ["Critical: ", counts.critical],
      }),
      (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
        variant: "outline",
        className: "bg-orange-100 text-orange-800 border-orange-200",
        children: ["High: ", counts.high],
      }),
      (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
        variant: "outline",
        className: "bg-blue-100 text-blue-800 border-blue-200",
        children: ["Medium: ", counts.medium],
      }),
      (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
        variant: "outline",
        className: "bg-green-100 text-green-800 border-green-200",
        children: ["Low: ", counts.low],
      }),
    ],
  });
}

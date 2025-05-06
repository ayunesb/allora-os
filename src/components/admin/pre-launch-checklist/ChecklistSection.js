"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChecklistSection = ChecklistSection;
var jsx_runtime_1 = require("react/jsx-runtime");
var ChecklistItem_1 = require("./ChecklistItem");
function ChecklistSection(_a) {
  var title = _a.title,
    items = _a.items,
    onToggle = _a.onToggle;
  if (items.length === 0) return null;
  return (0, jsx_runtime_1.jsxs)("div", {
    children: [
      (0, jsx_runtime_1.jsx)("h3", {
        className: "text-lg font-medium mb-2",
        children: title,
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "space-y-2",
        children: items.map(function (item) {
          return (0, jsx_runtime_1.jsx)(
            ChecklistItem_1.ChecklistItem,
            { item: item, onToggle: onToggle },
            item.id,
          );
        }),
      }),
    ],
  });
}

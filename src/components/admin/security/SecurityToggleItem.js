"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var label_1 = require("@/components/ui/label");
var switch_1 = require("@/components/ui/switch");
var SecurityToggleItem = function (_a) {
  var id = _a.id,
    title = _a.title,
    description = _a.description,
    Icon = _a.icon,
    checked = _a.checked,
    onCheckedChange = _a.onCheckedChange;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "flex items-center justify-between",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-0.5 flex items-center",
        children: [
          (0, jsx_runtime_1.jsx)(Icon, {
            className: "h-4 w-4 mr-2 text-primary",
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsx)(label_1.Label, {
                htmlFor: id,
                children: title,
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-sm text-muted-foreground",
                children: description,
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(switch_1.Switch, {
        id: id,
        checked: checked,
        onCheckedChange: onCheckedChange,
      }),
    ],
  });
};
exports.default = SecurityToggleItem;

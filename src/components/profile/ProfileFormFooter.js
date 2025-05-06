"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var DangerZone_1 = require("./DangerZone");
var ProfileFormFooter = function (_a) {
  var isLoading = _a.isLoading,
    isDirty = _a.isDirty,
    avatarFile = _a.avatarFile,
    onReset = _a.onReset;
  return (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
    className: "flex flex-col items-end space-y-4",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex justify-end space-x-2 w-full",
        children: [
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            type: "button",
            variant: "outline",
            onClick: onReset,
            disabled: isLoading || !isDirty,
            children: "Cancel",
          }),
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            type: "submit",
            disabled: isLoading || (!isDirty && !avatarFile),
            children: isLoading ? "Saving..." : "Save Changes",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(DangerZone_1.default, {}),
    ],
  });
};
exports.default = ProfileFormFooter;

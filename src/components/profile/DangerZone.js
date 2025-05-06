"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var separator_1 = require("@/components/ui/separator");
var DeleteAccountDialog_1 = require("./DeleteAccountDialog");
var DangerZone = function () {
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "w-full",
    children: [
      (0, jsx_runtime_1.jsx)(separator_1.Separator, { className: "my-4" }),
      (0, jsx_runtime_1.jsx)("h3", {
        className: "text-lg font-medium text-destructive mb-2",
        children: "Danger Zone",
      }),
      (0, jsx_runtime_1.jsx)("p", {
        className: "text-sm text-muted-foreground mb-4",
        children:
          "Permanently delete your account and all associated data. This action cannot be undone.",
      }),
      (0, jsx_runtime_1.jsx)(DeleteAccountDialog_1.default, {}),
    ],
  });
};
exports.default = DangerZone;

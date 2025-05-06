"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileSidebar = MobileSidebar;
var jsx_runtime_1 = require("react/jsx-runtime");
var sheet_1 = require("@/components/ui/sheet");
var Sidebar_1 = require("./Sidebar");
function MobileSidebar(_a) {
  var open = _a.open,
    onClose = _a.onClose;
  return (0, jsx_runtime_1.jsx)(sheet_1.Sheet, {
    open: open,
    onOpenChange: onClose,
    children: (0, jsx_runtime_1.jsx)(sheet_1.SheetContent, {
      side: "left",
      className: "p-0 w-72",
      children: (0, jsx_runtime_1.jsx)(Sidebar_1.Sidebar, {}),
    }),
  });
}

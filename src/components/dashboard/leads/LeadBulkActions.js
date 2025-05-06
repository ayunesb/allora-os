"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadBulkActions = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var dropdown_menu_1 = require("@/components/ui/dropdown-menu");
var LeadBulkActions = function (_a) {
  var selectedCount = _a.selectedCount,
    onStatusUpdate = _a.onStatusUpdate;
  return (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenu, {
    children: [
      (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuTrigger, {
        asChild: true,
        children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
          variant: "secondary",
          className: "flex items-center gap-2",
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.Check, {
              className: "h-4 w-4",
            }),
            (0, jsx_runtime_1.jsxs)("span", {
              children: [selectedCount, " Selected"],
            }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuContent, {
        align: "end",
        children: [
          (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, {
            onClick: function () {
              return onStatusUpdate("new");
            },
            children: "Mark as New",
          }),
          (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, {
            onClick: function () {
              return onStatusUpdate("contacted");
            },
            children: "Mark as Contacted",
          }),
          (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, {
            onClick: function () {
              return onStatusUpdate("qualified");
            },
            children: "Mark as Qualified",
          }),
          (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, {
            onClick: function () {
              return onStatusUpdate("closed");
            },
            children: "Mark as Closed",
          }),
        ],
      }),
    ],
  });
};
exports.LeadBulkActions = LeadBulkActions;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadsHeader = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var LeadsHeader = function (_a) {
  var isMobileView = _a.isMobileView,
    onAddLead = _a.onAddLead;
  return (0, jsx_runtime_1.jsxs)("div", {
    className:
      "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        children: [
          (0, jsx_runtime_1.jsx)("h1", {
            className: "text-2xl sm:text-3xl font-bold",
            children: "Lead Management",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-muted-foreground mt-1",
            children: "Oversee all leads generated through the platform",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex flex-col sm:flex-row gap-2",
        children: [
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            variant: "outline",
            size: "sm",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.BarChart2, {
                className: "h-4 w-4 mr-2",
              }),
              "Analytics",
            ],
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            variant: "outline",
            size: "sm",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Download, {
                className: "h-4 w-4 mr-2",
              }),
              "Export",
            ],
          }),
          onAddLead &&
            (0, jsx_runtime_1.jsxs)(button_1.Button, {
              size: "sm",
              onClick: onAddLead,
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.PlusCircle, {
                  className: "h-4 w-4 mr-2",
                }),
                "Add Lead",
              ],
            }),
        ],
      }),
    ],
  });
};
exports.LeadsHeader = LeadsHeader;

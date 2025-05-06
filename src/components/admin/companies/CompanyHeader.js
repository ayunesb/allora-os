"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyHeader = CompanyHeader;
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
function CompanyHeader(_a) {
  var onAddCompanyClick = _a.onAddCompanyClick;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "flex justify-between items-center mb-8",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        children: [
          (0, jsx_runtime_1.jsx)("h1", {
            className: "text-3xl font-bold",
            children: "Company Management",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-muted-foreground mt-2",
            children: "Manage organizations in the platform",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(button_1.Button, {
        onClick: onAddCompanyClick,
        children: [
          (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, {
            className: "mr-2 h-4 w-4",
          }),
          "Add Company",
        ],
      }),
    ],
  });
}

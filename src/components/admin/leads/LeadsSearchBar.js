"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadsSearchBar = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var input_1 = require("@/components/ui/input");
var LeadsSearchBar = function (_a) {
  var searchQuery = _a.searchQuery,
    onSearchChange = _a.onSearchChange;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "relative w-full",
    children: [
      (0, jsx_runtime_1.jsx)(lucide_react_1.Search, {
        className:
          "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground",
      }),
      (0, jsx_runtime_1.jsx)(input_1.Input, {
        placeholder: "Search leads...",
        className: "pl-9 w-full",
        value: searchQuery,
        onChange: function (e) {
          return onSearchChange(e.target.value);
        },
      }),
    ],
  });
};
exports.LeadsSearchBar = LeadsSearchBar;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewToggle = ViewToggle;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var badge_1 = require("@/components/ui/badge");
var tabs_1 = require("@/components/ui/tabs");
function ViewToggle(_a) {
  var view = _a.view,
    onViewChange = _a.onViewChange,
    postCount = _a.postCount;
  // Create a typed wrapper function for onViewChange
  var handleViewChange = function (value) {
    if (value === "calendar" || value === "list") {
      onViewChange(value);
    }
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "flex justify-between items-center",
    children: [
      (0, jsx_runtime_1.jsx)(tabs_1.Tabs, {
        value: view,
        onValueChange: handleViewChange,
        children: (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
          children: [
            (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, {
              value: "calendar",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.CalendarIcon, {
                  className: "mr-2 h-4 w-4",
                }),
                "Calendar",
              ],
            }),
            (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, {
              value: "list",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.List, {
                  className: "mr-2 h-4 w-4",
                }),
                "List",
              ],
            }),
          ],
        }),
      }),
      postCount > 0 &&
        (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
          variant: "outline",
          children: [postCount, " post", postCount !== 1 ? "s" : ""],
        }),
    ],
  });
}

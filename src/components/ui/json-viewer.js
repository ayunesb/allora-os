"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonViewer = JsonViewer;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
/**
 * A simple component to display JSON data in a formatted way
 */
function JsonViewer(_a) {
  var data = _a.data,
    _b = _a.collapsed,
    collapsed = _b === void 0 ? false : _b,
    shouldCollapse = _a.shouldCollapse,
    _c = _a.maxHeight,
    maxHeight = _c === void 0 ? "96" : _c;
  // Format JSON with proper indentation
  var formattedJson = react_1.default.useMemo(
    function () {
      try {
        return JSON.stringify(data, null, 2);
      } catch (error) {
        console.error("Error formatting JSON:", error);
        return String(data);
      }
    },
    [data],
  );
  // Ensure the maxHeight is a valid Tailwind class value
  var heightClass =
    maxHeight && !isNaN(parseInt(maxHeight))
      ? "max-h-".concat(maxHeight)
      : "max-h-96";
  return (0, jsx_runtime_1.jsx)("pre", {
    className: "bg-muted p-4 rounded-md overflow-auto ".concat(
      heightClass,
      " text-xs font-mono",
    ),
    children: formattedJson,
  });
}
exports.default = JsonViewer;

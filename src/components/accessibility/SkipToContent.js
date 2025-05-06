"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkipToContent = SkipToContent;
var jsx_runtime_1 = require("react/jsx-runtime");
/**
 * Skip to Content component for keyboard accessibility
 * This allows keyboard users to skip directly to the main content
 * instead of having to tab through all navigation elements
 */
function SkipToContent() {
  return (0, jsx_runtime_1.jsx)("a", {
    href: "#main-content",
    className:
      "skip-link focus:bg-primary focus:text-primary-foreground focus:no-underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    children: "Skip to content",
  });
}
exports.default = SkipToContent;

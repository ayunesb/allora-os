"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessibilityAnnouncer = AccessibilityAnnouncer;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
/**
 * Accessibility announcer component for screen readers
 * Announces route changes and other important information
 * This component must be used within a Router context
 */
function AccessibilityAnnouncer() {
  var _a = (0, react_1.useState)(""),
    announcement = _a[0],
    setAnnouncement = _a[1];
  // Since this component needs to be within a Router context,
  // we'll safely access the location
  var location;
  try {
    location = (0, react_router_dom_1.useLocation)();
  } catch (error) {
    // Fallback if used outside Router context
    console.warn("AccessibilityAnnouncer used outside Router context");
    return null; // Return nothing if outside Router context
  }
  // Announce route changes
  (0, react_1.useEffect)(
    function () {
      if (!location) return;
      // Get the page title from document or h1 elements
      var getPageTitle = function () {
        // Try to get the document title
        if (document.title) {
          return document.title;
        }
        // Try to get the first h1 element
        var h1Element = document.querySelector("h1");
        if (h1Element && h1Element.textContent) {
          return h1Element.textContent;
        }
        // Default to pathname
        return location.pathname.replace(/\//g, " ").trim() || "Home";
      };
      // Build the announcement
      var pageTitle = getPageTitle();
      var newAnnouncement = "Navigated to ".concat(pageTitle);
      // Set the announcement
      setAnnouncement(newAnnouncement);
      // Clear the announcement after 3 seconds
      var timer = setTimeout(function () {
        setAnnouncement("");
      }, 3000);
      return function () {
        return clearTimeout(timer);
      };
    },
    [location],
  );
  return (0, jsx_runtime_1.jsx)("div", {
    className: "sr-only",
    role: "status",
    "aria-live": "polite",
    "aria-atomic": "true",
    children: announcement,
  });
}
exports.default = AccessibilityAnnouncer;

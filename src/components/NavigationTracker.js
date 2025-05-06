"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationTracker = NavigationTracker;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var navigation_1 = require("@/utils/navigation");
var AccessibilityContext_1 = require("@/context/AccessibilityContext");
var accessibilityHelpers_1 = require("@/utils/accessibilityHelpers");
/**
 * Component that silently tracks navigation to help with
 * improved 404 recommendations and route analytics,
 * while also ensuring accessibility features are maintained across navigation
 */
function NavigationTracker() {
  var location = (0, react_router_dom_1.useLocation)();
  var preferences = (0, AccessibilityContext_1.useAccessibility)().preferences;
  (0, react_1.useEffect)(
    function () {
      // Track the current route
      (0, navigation_1.trackRouteVisit)(location.pathname);
      // Ensure the main content area has an id for skip links
      var mainContent = document.querySelector("main");
      if (mainContent && !mainContent.id) {
        mainContent.id = "main-content";
      }
      // Re-apply accessibility classes on route change
      // This ensures consistent experience across page navigation
      (0, accessibilityHelpers_1.applyAccessibilityClasses)(preferences);
      // Move focus to the main content area for keyboard users
      // (only if coming from a different page and not on initial load)
      if (location.state && location.state.fromNavigation) {
        var mainElement_1 = document.getElementById("main-content");
        if (mainElement_1) {
          // Add tabindex temporarily to make it focusable
          mainElement_1.setAttribute("tabindex", "-1");
          mainElement_1.focus({ preventScroll: false });
          // Remove tabindex after focusing
          setTimeout(function () {
            mainElement_1.removeAttribute("tabindex");
          }, 100);
        }
      }
    },
    [location.pathname, preferences],
  );
  // This component doesn't render anything visually
  return null;
}

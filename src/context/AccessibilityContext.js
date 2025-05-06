"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAccessibility = exports.AccessibilityContext = void 0;
exports.AccessibilityProvider = AccessibilityProvider;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var accessibilityHelpers_1 = require("@/utils/accessibilityHelpers");
// Export the context so it can be imported elsewhere
exports.AccessibilityContext = (0, react_1.createContext)(undefined);
function AccessibilityProvider(_a) {
  var children = _a.children;
  // Initialize preferences from localStorage if available
  var _b = (0, react_1.useState)(function () {
      if (typeof window === "undefined") return {}; // Server-side rendering check
      var savedPrefs = localStorage.getItem("accessibility-preferences");
      return savedPrefs
        ? JSON.parse(savedPrefs)
        : {
            highContrast: false,
            largeText: false,
            reducedMotion: false,
            enhancedFocus: false,
            screenReaderFriendly: false,
            improvedTextSpacing: false,
            invertColors: false,
          };
    }),
    preferences = _b[0],
    setPreferences = _b[1];
  var _c = (0, react_1.useState)(16),
    fontSize = _c[0],
    setFontSize = _c[1];
  // Update preferences with new values
  var updatePreferences = function (newPrefs) {
    setPreferences(function (prev) {
      var updated = __assign(__assign({}, prev), newPrefs);
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "accessibility-preferences",
          JSON.stringify(updated),
        );
      }
      return updated;
    });
  };
  // Apply classes based on current preferences
  var applyAccessibilityClasses = function () {
    (0, accessibilityHelpers_1.applyAccessibilityClasses)(preferences);
  };
  // Apply preferences when they change
  (0, react_1.useEffect)(
    function () {
      applyAccessibilityClasses();
    },
    [preferences],
  );
  // Individual toggle functions
  var toggleHighContrast = function () {
    return updatePreferences({ highContrast: !preferences.highContrast });
  };
  var toggleLargeText = function () {
    return updatePreferences({ largeText: !preferences.largeText });
  };
  var toggleReducedMotion = function () {
    return updatePreferences({ reducedMotion: !preferences.reducedMotion });
  };
  var toggleEnhancedFocus = function () {
    return updatePreferences({ enhancedFocus: !preferences.enhancedFocus });
  };
  var toggleScreenReaderFriendly = function () {
    return updatePreferences({
      screenReaderFriendly: !preferences.screenReaderFriendly,
    });
  };
  var toggleImprovedTextSpacing = function () {
    return updatePreferences({
      improvedTextSpacing: !preferences.improvedTextSpacing,
    });
  };
  var toggleInvertColors = function () {
    return updatePreferences({ invertColors: !preferences.invertColors });
  };
  // Reset all preferences
  var resetPreferences = function () {
    return updatePreferences({
      highContrast: false,
      largeText: false,
      reducedMotion: false,
      enhancedFocus: false,
      screenReaderFriendly: false,
      improvedTextSpacing: false,
      invertColors: false,
    });
  };
  // Compatibility with older code - alias updatePreferences as updatePreference
  var updatePreference = function (key, value) {
    var _a;
    updatePreferences(((_a = {}), (_a[key] = value), _a));
  };
  // Mock implementation for checkForUpdates
  var checkForUpdates = function () {
    console.log("Checking for accessibility updates");
  };
  // Mock implementation for setAutoUpdate
  var setAutoUpdate = function (value) {
    console.log("Setting auto-update to", value);
  };
  var value = {
    preferences: preferences,
    updatePreferences: updatePreferences,
    applyAccessibilityClasses: applyAccessibilityClasses,
    highContrast: preferences.highContrast || false,
    largeText: preferences.largeText || false,
    reducedMotion: preferences.reducedMotion || false,
    enhancedFocus: preferences.enhancedFocus || false,
    screenReaderFriendly: preferences.screenReaderFriendly || false,
    improvedTextSpacing: preferences.improvedTextSpacing || false,
    invertColors: preferences.invertColors || false,
    fontSize: fontSize,
    setFontSize: setFontSize,
    toggleHighContrast: toggleHighContrast,
    toggleLargeText: toggleLargeText,
    toggleReducedMotion: toggleReducedMotion,
    toggleEnhancedFocus: toggleEnhancedFocus,
    toggleScreenReaderFriendly: toggleScreenReaderFriendly,
    toggleImprovedTextSpacing: toggleImprovedTextSpacing,
    toggleInvertColors: toggleInvertColors,
    resetPreferences: resetPreferences,
    // Compatibility properties
    updatePreference: updatePreference,
    checkForUpdates: checkForUpdates,
    setAutoUpdate: setAutoUpdate,
    isCheckingUpdates: false,
    lastChecked: null,
    autoUpdate: false,
  };
  return (0, jsx_runtime_1.jsx)(exports.AccessibilityContext.Provider, {
    value: value,
    children: children,
  });
}
var useAccessibility = function () {
  var context = (0, react_1.useContext)(exports.AccessibilityContext);
  if (!context) {
    throw new Error(
      "useAccessibility must be used within an AccessibilityProvider",
    );
  }
  return context;
};
exports.useAccessibility = useAccessibility;

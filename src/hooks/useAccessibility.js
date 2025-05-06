"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAccessibility = useAccessibility;
var react_1 = require("react");
function useAccessibility() {
  var _a = (0, react_1.useState)(16),
    fontSize = _a[0],
    setFontSize = _a[1];
  var _b = (0, react_1.useState)(false),
    highContrast = _b[0],
    setHighContrast = _b[1];
  var _c = (0, react_1.useState)(false),
    largeText = _c[0],
    setLargeText = _c[1];
  var _d = (0, react_1.useState)(false),
    reducedMotion = _d[0],
    setReducedMotion = _d[1];
  var _e = (0, react_1.useState)(false),
    screenReaderFriendly = _e[0],
    setScreenReaderFriendly = _e[1];
  var _f = (0, react_1.useState)(false),
    invertColors = _f[0],
    setInvertColors = _f[1];
  // Toggle functions
  var toggleHighContrast = (0, react_1.useCallback)(function () {
    setHighContrast(function (prev) {
      return !prev;
    });
  }, []);
  var toggleLargeText = (0, react_1.useCallback)(function () {
    setLargeText(function (prev) {
      return !prev;
    });
    setFontSize(function (prev) {
      return prev === 16 ? 20 : 16;
    });
  }, []);
  var toggleReducedMotion = (0, react_1.useCallback)(function () {
    setReducedMotion(function (prev) {
      return !prev;
    });
  }, []);
  var toggleScreenReaderFriendly = (0, react_1.useCallback)(function () {
    setScreenReaderFriendly(function (prev) {
      return !prev;
    });
  }, []);
  var toggleInvertColors = (0, react_1.useCallback)(function () {
    setInvertColors(function (prev) {
      return !prev;
    });
  }, []);
  return {
    fontSize: fontSize,
    setFontSize: setFontSize,
    highContrast: highContrast,
    reducedMotion: reducedMotion,
    screenReaderFriendly: screenReaderFriendly,
    largeText: largeText,
    invertColors: invertColors,
    toggleHighContrast: toggleHighContrast,
    toggleLargeText: toggleLargeText,
    toggleReducedMotion: toggleReducedMotion,
    toggleScreenReaderFriendly: toggleScreenReaderFriendly,
    toggleInvertColors: toggleInvertColors,
  };
}

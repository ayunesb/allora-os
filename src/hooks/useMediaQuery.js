"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMediaQuery = useMediaQuery;
var react_1 = require("react");
/**
 * Custom hook for responsive design
 * @param query - CSS media query string
 * @returns boolean indicating if the media query matches
 */
function useMediaQuery(query) {
  var _a = (0, react_1.useState)(false),
    matches = _a[0],
    setMatches = _a[1];
  (0, react_1.useEffect)(
    function () {
      var mediaQuery = window.matchMedia(query);
      setMatches(mediaQuery.matches);
      var handler = function (event) {
        setMatches(event.matches);
      };
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", handler);
      } else {
        // For older browsers
        mediaQuery.addListener(handler);
      }
      return function () {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener("change", handler);
        } else {
          // For older browsers
          mediaQuery.removeListener(handler);
        }
      };
    },
    [query],
  );
  return matches;
}
exports.default = useMediaQuery;

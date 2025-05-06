"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BREAKPOINTS = void 0;
exports.useIsMobile = useIsMobile;
exports.useBreakpoint = useBreakpoint;
exports.getResponsiveGridCols = getResponsiveGridCols;
var react_1 = require("react");
// Define breakpoints for better responsive design
exports.BREAKPOINTS = {
  xs: 480, // Extra small devices
  mobile: 640, // Small mobile devices
  tablet: 768, // Tablets and large tablets
  laptop: 1024, // Small laptops and large tablets
  desktop: 1280, // Desktop and large laptops
};
// Hook to check if viewport is mobile-sized
function useIsMobile() {
  var _a = (0, react_1.useState)(undefined),
    isMobile = _a[0],
    setIsMobile = _a[1];
  (0, react_1.useEffect)(function () {
    var checkIfMobile = function () {
      setIsMobile(window.innerWidth < exports.BREAKPOINTS.tablet);
    };
    // Add event listener for resize
    window.addEventListener("resize", checkIfMobile);
    // Set initial value
    checkIfMobile();
    return function () {
      return window.removeEventListener("resize", checkIfMobile);
    };
  }, []);
  return !!isMobile;
}
function useBreakpoint() {
  var _a = (0, react_1.useState)("desktop"),
    breakpoint = _a[0],
    setBreakpoint = _a[1];
  (0, react_1.useEffect)(function () {
    var handleResize = function () {
      var width = window.innerWidth;
      if (width < exports.BREAKPOINTS.xs) {
        setBreakpoint("xs");
      } else if (width < exports.BREAKPOINTS.mobile) {
        setBreakpoint("mobile");
      } else if (width < exports.BREAKPOINTS.tablet) {
        setBreakpoint("tablet");
      } else if (width < exports.BREAKPOINTS.laptop) {
        setBreakpoint("laptop");
      } else {
        setBreakpoint("desktop");
      }
    };
    // Initial check
    handleResize();
    // Set up event listener
    window.addEventListener("resize", handleResize);
    // Clean up
    return function () {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return breakpoint;
}
// Helper function to get appropriate column count based on breakpoint
function getResponsiveGridCols(breakpoint) {
  switch (breakpoint) {
    case "xs":
      return "grid-cols-1";
    case "mobile":
      return "grid-cols-1";
    case "tablet":
      return "grid-cols-2";
    case "laptop":
      return "grid-cols-3";
    case "desktop":
      return "grid-cols-4";
    default:
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  }
}

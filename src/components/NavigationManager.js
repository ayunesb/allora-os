"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationManager = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var navigation_1 = require("@/utils/navigation");
var loggingService_1 = require("@/utils/loggingService");
var NavigationManager = function () {
  var navigate = (0, react_router_dom_1.useNavigate)();
  var location = (0, react_router_dom_1.useLocation)();
  (0, react_1.useEffect)(
    function () {
      try {
        // Register the navigate function for use outside of React components
        loggingService_1.logger.info(
          "NavigationManager: Registering navigation function for route: ".concat(
            location.pathname,
          ),
        );
        (0, navigation_1.registerNavigate)(navigate);
        // Clean up when component unmounts
        return function () {
          loggingService_1.logger.info(
            "NavigationManager: Unregistering navigation function",
          );
          (0, navigation_1.registerNavigate)(function () {
            console.warn("Navigation attempted after component unmounted");
          });
        };
      } catch (error) {
        loggingService_1.logger.error(
          "Error in NavigationManager useEffect:",
          error,
        );
      }
    },
    [navigate],
  );
  // Log current route for debugging
  (0, react_1.useEffect)(
    function () {
      try {
        loggingService_1.logger.info(
          "NavigationManager: Current route changed to: ".concat(
            location.pathname,
          ),
        );
        console.log("Current route path:", location.pathname);
      } catch (error) {
        loggingService_1.logger.error("Error logging current route:", error);
      }
    },
    [location],
  );
  // This component doesn't render anything
  return null;
};
exports.NavigationManager = NavigationManager;

"use strict";
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSuggestedLegalRoutes =
  exports.isValidLegalRoute =
  exports.trackRouteAccess =
  exports.legalRouteDisplayNames =
  exports.validLegalRoutes =
    void 0;
var loggingService_1 = require("@/utils/loggingService");
// Define all valid legal routes in a single place for easier maintenance
exports.validLegalRoutes = [
  "/legal/terms-of-service",
  "/legal/privacy-policy",
  "/legal/cookies",
  "/legal/compliance",
  "/legal/refund-policy",
  "/legal/messaging-consent",
  "/privacy",
  "/terms",
  "/cookie-policy",
  "/refund-policy",
  "/messaging-consent",
  "/compliance/gdpr", // Adding GDPR compliance route
  "/legal/gdpr", // Adding alternate GDPR route
  "/gdpr", // Adding direct GDPR route
  "/legal/cookie-settings", // Adding cookie settings route
  "/cookie-settings", // Adding direct cookie settings route
];
// Map of shortened route names to their full paths for better error messages
exports.legalRouteDisplayNames = {
  "/legal/terms-of-service": "Terms of Service",
  "/legal/privacy-policy": "Privacy Policy",
  "/legal/cookies": "Cookies Policy",
  "/legal/compliance": "Compliance Information",
  "/legal/refund-policy": "Refund Policy",
  "/legal/messaging-consent": "Messaging Consent",
  "/privacy": "Privacy Policy",
  "/terms": "Terms of Service",
  "/cookie-policy": "Cookies Policy",
  "/refund-policy": "Refund Policy",
  "/messaging-consent": "Messaging Consent",
  "/compliance/gdpr": "GDPR Compliance",
  "/legal/gdpr": "GDPR Compliance",
  "/gdpr": "GDPR Compliance",
  "/legal/cookie-settings": "Cookie Settings",
  "/cookie-settings": "Cookie Settings",
};
/**
 * Tracks access to legal routes and logs appropriate messages
 * @param path The current route path
 * @returns void
 */
var trackRouteAccess = function (path) {
  if (exports.validLegalRoutes.includes(path)) {
    loggingService_1.logger.info("Legal Route Access: ".concat(path));
    console.log("\u2705 Legal Route Access: ".concat(path));
    // Track in analytics for future reference
    try {
      // This will be picked up by your analytics tracking
      window.dispatchEvent(
        new CustomEvent("route-access", {
          detail: {
            type: "legal",
            path: path,
            name: exports.legalRouteDisplayNames[path] || path.split("/").pop(),
          },
        }),
      );
    } catch (error) {
      // Silent catch - analytics is non-critical
    }
  } else if (
    path.includes("/legal") ||
    path.includes("/privacy") ||
    path.includes("/terms") ||
    path.includes("/cookie") ||
    path.includes("/gdpr") ||
    path.includes("/refund") ||
    path.includes("/messaging-consent")
  ) {
    loggingService_1.logger.warn(
      "Potentially Invalid Legal Route: ".concat(path),
    );
    console.warn("\u274C Potentially Invalid Legal Route: ".concat(path));
    // Suggest similar valid routes for better user experience
    var similarRoutes = exports.validLegalRoutes
      .filter(function (route) {
        return (
          route.includes("/legal") ||
          (path.includes("/privacy") && route.includes("/privacy")) ||
          (path.includes("/terms") && route.includes("/terms")) ||
          (path.includes("/cookie") && route.includes("/cookie")) ||
          (path.includes("/gdpr") && route.includes("/gdpr")) ||
          (path.includes("/refund") && route.includes("/refund")) ||
          (path.includes("/messaging") && route.includes("/messaging"))
        );
      })
      .map(function (route) {
        return { route: route, name: exports.legalRouteDisplayNames[route] };
      });
    if (similarRoutes.length > 0) {
      console.info("Available legal routes:", similarRoutes);
    }
  }
};
exports.trackRouteAccess = trackRouteAccess;
/**
 * Checks if a route is a valid legal route
 * @param path The route path to check
 * @returns boolean indicating if the route is valid
 */
var isValidLegalRoute = function (path) {
  return exports.validLegalRoutes.includes(path);
};
exports.isValidLegalRoute = isValidLegalRoute;
/**
 * Gets suggested legal routes based on partial path matching
 * @param partialPath A partial route path to match against
 * @returns Array of matching route objects with path and display name
 */
var getSuggestedLegalRoutes = function (partialPath) {
  // Handle special cases for common typos or user errors
  var searchPath = partialPath.toLowerCase();
  // Define patterns to match against for better suggestions
  var patterns = {
    privacy: ["/privacy", "/legal/privacy-policy"],
    terms: ["/terms", "/legal/terms-of-service", "/tos"],
    cookie: ["/cookie-policy", "/legal/cookies", "/cookie-settings"],
    refund: ["/refund-policy", "/legal/refund-policy"],
    message: ["/messaging-consent", "/legal/messaging-consent"],
    gdpr: ["/gdpr", "/legal/gdpr", "/compliance/gdpr"],
    legal: exports.validLegalRoutes,
  };
  // Find which pattern matches best
  var bestMatches = [];
  for (var _i = 0, _a = Object.entries(patterns); _i < _a.length; _i++) {
    var _b = _a[_i],
      key = _b[0],
      routes = _b[1];
    if (searchPath.includes(key)) {
      bestMatches = __spreadArray(
        __spreadArray([], bestMatches, true),
        routes,
        true,
      );
    }
  }
  // If no patterns matched, do a general filter
  if (bestMatches.length === 0) {
    return exports.validLegalRoutes
      .filter(function (route) {
        return route.toLowerCase().includes(searchPath);
      })
      .map(function (route) {
        return {
          path: route,
          name: exports.legalRouteDisplayNames[route] || route,
        };
      });
  }
  // Return unique matches based on patterns
  var uniqueMatches = __spreadArray([], new Set(bestMatches), true);
  return uniqueMatches.map(function (route) {
    return {
      path: route,
      name: exports.legalRouteDisplayNames[route] || route,
    };
  });
};
exports.getSuggestedLegalRoutes = getSuggestedLegalRoutes;

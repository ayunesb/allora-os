"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createViewDeepLinker =
  exports.extractDeepLinkParams =
  exports.createShareableLink =
  exports.createDeepLink =
    void 0;
var navigation_1 = require("./navigation");
/**
 * Constructs a deep link URL for the application
 * @param basePath The base path (e.g., '/dashboard/strategy')
 * @param params Optional query parameters
 * @param hash Optional hash fragment
 * @returns Formatted URL string
 */
var createDeepLink = function (basePath, params, hash) {
  // First normalize the route in case it's a common alias
  var normalizedPath = (0, navigation_1.normalizeRoute)(basePath);
  // Construct URL with query parameters if provided
  var url = normalizedPath;
  if (params && Object.keys(params).length > 0) {
    var searchParams_1 = new URLSearchParams();
    Object.entries(params).forEach(function (_a) {
      var key = _a[0],
        value = _a[1];
      if (value !== undefined && value !== null) {
        searchParams_1.append(key, String(value));
      }
    });
    var queryString = searchParams_1.toString();
    if (queryString) {
      url += "?".concat(queryString);
    }
  }
  // Add hash if provided
  if (hash) {
    // Ensure hash starts with # symbol
    url += hash.startsWith("#") ? hash : "#".concat(hash);
  }
  return url;
};
exports.createDeepLink = createDeepLink;
/**
 * Creates a shareable URL for the current state
 * @param route The base route path
 * @param state The current state to encode in the URL
 * @returns A shareable URL string
 */
var createShareableLink = function (route, state) {
  var baseUrl = window.location.origin;
  var params = {};
  // Only include serializable values in the URL
  Object.entries(state).forEach(function (_a) {
    var key = _a[0],
      value = _a[1];
    if (
      value !== undefined &&
      value !== null &&
      (typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean")
    ) {
      params[key] = value;
    }
  });
  var deepLink = (0, exports.createDeepLink)(route, params);
  return "".concat(baseUrl).concat(deepLink);
};
exports.createShareableLink = createShareableLink;
/**
 * Extracts and validates parameters from the URL
 * @param searchParams URLSearchParams object
 * @param paramMap Mapping of parameter names to their expected types
 * @returns Object with parsed parameters
 */
var extractDeepLinkParams = function (searchParams, paramMap) {
  var result = {};
  Object.entries(paramMap).forEach(function (_a) {
    var paramName = _a[0],
      paramType = _a[1];
    if (searchParams.has(paramName)) {
      var value = searchParams.get(paramName);
      if (value !== null) {
        switch (paramType) {
          case "number":
            result[paramName] = parseFloat(value);
            break;
          case "boolean":
            result[paramName] = value === "true";
            break;
          default:
            result[paramName] = value;
        }
      }
    }
  });
  return result;
};
exports.extractDeepLinkParams = extractDeepLinkParams;
/**
 * Creates a hook-friendly function to generate deep links
 * @param baseRoute The base route for the current view
 * @returns Function that generates proper deep links
 */
var createViewDeepLinker = function (baseRoute) {
  return function (params, hash) {
    return (0, exports.createDeepLink)(baseRoute, params, hash);
  };
};
exports.createViewDeepLinker = createViewDeepLinker;

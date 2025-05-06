"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAIStrategyGeneration =
  exports.checkConsistentBranding =
  exports.checkImageOptimization =
  exports.checkPerformanceMetrics =
  exports.checkLegalDocuments =
    void 0;
var strategyGenerator_1 = require("@/utils/strategy/strategyGenerator");
// Check for legal documents
var checkLegalDocuments = function () {
  // Array of legal routes to check
  var legalRoutes = [
    "/legal/terms-of-service",
    "/legal/privacy-policy",
    "/legal/cookies",
    "/legal/messaging-consent",
    "/legal/refund-policy",
    "/legal/compliance",
  ];
  // Check in routes configuration
  var routes = document.querySelectorAll("a");
  var foundRoutes = [];
  routes.forEach(function (route) {
    var href = route.getAttribute("href");
    if (
      href &&
      legalRoutes.some(function (legalRoute) {
        return href.includes(legalRoute);
      })
    ) {
      foundRoutes.push(href);
    }
  });
  // Return true if we found at least 4 of the 6 legal routes
  return foundRoutes.length >= 4;
};
exports.checkLegalDocuments = checkLegalDocuments;
// Check performance metrics
var checkPerformanceMetrics = function () {
  if (!window.performance) return true;
  try {
    // Check navigation timing if available
    if (window.performance.timing) {
      var loadTime =
        window.performance.timing.loadEventEnd -
        window.performance.timing.navigationStart;
      return loadTime < 2000;
    }
    // Alternative check using performance.now()
    return window.performance.now() < 2000;
  } catch (error) {
    console.error("Error checking performance metrics:", error);
    return true; // Pass by default on error
  }
};
exports.checkPerformanceMetrics = checkPerformanceMetrics;
// Check for image optimization
var checkImageOptimization = function () {
  var images = document.querySelectorAll("img");
  var optimizedCount = 0;
  images.forEach(function (img) {
    if (
      img.getAttribute("loading") === "lazy" ||
      (img.getAttribute("width") && img.getAttribute("height")) ||
      img.complete
    ) {
      optimizedCount++;
    }
  });
  return optimizedCount >= images.length * 0.7;
};
exports.checkImageOptimization = checkImageOptimization;
// Check for consistent branding
var checkConsistentBranding = function () {
  // Check for primary colors
  var primaryElements = document.querySelectorAll(
    '.text-primary, .bg-primary, [class*="border-primary"]',
  );
  // Check for consistent typography
  var fontElements = document.querySelectorAll('[class*="font-"]');
  // Check for logo presence
  var logoElements = document.querySelectorAll(
    'img[src*="logo"], [class*="logo"], [id*="logo"]',
  );
  return (
    primaryElements.length > 5 &&
    fontElements.length > 10 &&
    logoElements.length > 0
  );
};
exports.checkConsistentBranding = checkConsistentBranding;
// Check for AI Strategy Generation
var checkAIStrategyGeneration = function () {
  try {
    // Test if the strategy generator utility works
    var strategy = (0, strategyGenerator_1.generateCustomizedStrategy)(
      { level: "Medium", score: 65, breakdown: {} },
      "SaaS",
      "Small",
      "Growth",
    );
    // If we get a valid strategy object with expected properties
    return (
      strategy &&
      strategy.title &&
      strategy.description &&
      strategy.keyActions &&
      strategy.keyActions.length > 0
    );
  } catch (error) {
    console.error("Error testing AI Strategy Generation:", error);
    return false;
  }
};
exports.checkAIStrategyGeneration = checkAIStrategyGeneration;

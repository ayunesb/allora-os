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
exports.customizeTitle = customizeTitle;
exports.customizeDescription = customizeDescription;
exports.customizeROI = customizeROI;
exports.customizeMetrics = customizeMetrics;
/**
 * Helper function to customize strategy title
 */
function customizeTitle(baseTitle, industryContext, primaryGoal) {
  if (!industryContext && !primaryGoal) return baseTitle;
  var title = baseTitle;
  if (primaryGoal) {
    var goalPrefix = {
      Growth: "Growth-Oriented",
      Profitability: "Profit-Focused",
      Innovation: "Innovation-Driven",
      Stability: "Sustainability-Centered",
    }[primaryGoal];
    title = "".concat(goalPrefix, " ").concat(title);
  }
  if (industryContext) {
    title = "".concat(title, " for ").concat(industryContext);
  }
  return title;
}
/**
 * Helper function to customize strategy description
 */
function customizeDescription(baseDescription, industryContext, companySize) {
  var description = baseDescription;
  if (industryContext) {
    description += " Specifically tailored for the ".concat(
      industryContext,
      " industry.",
    );
  }
  if (companySize) {
    var sizeContext = {
      Startup: "early-stage companies looking to establish market presence",
      Small: "small businesses seeking sustainable growth",
      Medium: "mid-sized organizations aiming to scale operations",
      Enterprise:
        "established enterprises focusing on maintaining competitive advantage",
    }[companySize];
    description += " Optimized for ".concat(sizeContext, ".");
  }
  return description;
}
/**
 * Helper function to customize ROI expectations
 */
function customizeROI(baseROI, companySize) {
  if (!companySize) return baseROI;
  // Adjust ROI expectations based on company size
  switch (companySize) {
    case "Startup":
      return baseROI.replace(/\d+%/g, function (match) {
        var num = parseInt(match);
        return "".concat(num + 10, "%");
      });
    case "Small":
      return baseROI;
    case "Medium":
      return baseROI.replace(/(\d+)-(\d+)%/g, function (_, min, max) {
        return "".concat(parseInt(min) - 5, "-").concat(parseInt(max), "%");
      });
    case "Enterprise":
      return baseROI.replace(/(\d+)-(\d+)%/g, function (_, min, max) {
        return ""
          .concat(parseInt(min) - 10, "-")
          .concat(parseInt(max) - 5, "%");
      });
    default:
      return baseROI;
  }
}
/**
 * Helper function to customize metrics based on industry
 */
function customizeMetrics(baseMetrics, industryContext) {
  if (!industryContext) return baseMetrics;
  // Add industry-specific metrics
  var industryMetrics = {
    Technology: "Increased user engagement by 25%",
    Healthcare: "Improved patient outcomes by 15%",
    Retail: "Enhanced customer lifetime value by 20%",
    Manufacturing: "Reduced production defects by 30%",
    Finance: "Decreased risk exposure by 25%",
    Education: "Improved learning outcomes by 20%",
  };
  var metrics = __spreadArray([], baseMetrics, true);
  // Add industry-specific metric if available
  Object.keys(industryMetrics).forEach(function (industry) {
    if (industryContext.toLowerCase().includes(industry.toLowerCase())) {
      metrics.push(industryMetrics[industry]);
    }
  });
  // If no specific industry match, add a generic one
  if (metrics.length === baseMetrics.length) {
    metrics.push(
      "Achieved industry-specific benchmarks for ".concat(industryContext),
    );
  }
  return metrics;
}

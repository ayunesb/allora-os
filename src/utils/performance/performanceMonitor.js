"use strict";
/**
 * Performance monitoring utility for tracking page load times and user interactions
 */
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
exports.performanceMonitor = void 0;
var PerformanceMonitor = /** @class */ (function () {
  function PerformanceMonitor() {
    this.measures = [];
    this.marks = {};
    this.enabled = true;
    // Initialize performance monitoring
    if (typeof window !== "undefined" && window.performance) {
      this.capturePageLoadMetrics();
    }
  }
  /**
   * Capture initial page load metrics
   */
  PerformanceMonitor.prototype.capturePageLoadMetrics = function () {
    var _this = this;
    window.addEventListener("load", function () {
      if (!_this.enabled || !window.performance) return;
      // Get navigation timing metrics if available
      if (window.performance.timing) {
        var timing = window.performance.timing;
        var pageLoadTime = timing.loadEventEnd - timing.navigationStart;
        var domContentLoaded =
          timing.domContentLoadedEventEnd - timing.navigationStart;
        var firstPaint = timing.responseEnd - timing.navigationStart;
        _this.measures.push({
          id: "initial-page-load",
          startTime: timing.navigationStart,
          endTime: timing.loadEventEnd,
          duration: pageLoadTime,
          type: "page-load",
          metadata: {
            domContentLoaded: domContentLoaded,
            firstPaint: firstPaint,
            totalResources:
              window.performance.getEntriesByType("resource").length,
          },
        });
      }
    });
  };
  /**
   * Start a performance measurement
   */
  PerformanceMonitor.prototype.startMeasure = function (id, type, metadata) {
    if (type === void 0) {
      type = "custom";
    }
    if (!this.enabled) return id;
    var startTime = performance.now();
    this.measures.push({
      id: id,
      startTime: startTime,
      type: type,
      metadata: metadata,
    });
    return id;
  };
  /**
   * End a performance measurement
   */
  PerformanceMonitor.prototype.endMeasure = function (id) {
    if (!this.enabled) return undefined;
    var endTime = performance.now();
    var measureIndex = this.measures.findIndex(function (m) {
      return m.id === id && !m.endTime;
    });
    if (measureIndex === -1) return undefined;
    this.measures[measureIndex].endTime = endTime;
    this.measures[measureIndex].duration =
      endTime - this.measures[measureIndex].startTime;
    return this.measures[measureIndex];
  };
  /**
   * Create a performance mark
   */
  PerformanceMonitor.prototype.mark = function (name) {
    if (!this.enabled) return;
    this.marks[name] = performance.now();
  };
  /**
   * Measure time between marks
   */
  PerformanceMonitor.prototype.measureBetweenMarks = function (
    measureName,
    startMark,
    endMark,
  ) {
    if (!this.enabled || !this.marks[startMark] || !this.marks[endMark])
      return undefined;
    var duration = this.marks[endMark] - this.marks[startMark];
    this.measures.push({
      id: measureName,
      startTime: this.marks[startMark],
      endTime: this.marks[endMark],
      duration: duration,
      type: "custom",
    });
    return duration;
  };
  /**
   * Get all performance measurements
   */
  PerformanceMonitor.prototype.getMeasures = function () {
    return __spreadArray([], this.measures, true);
  };
  /**
   * Get all performance measurements
   * This is an alias for getMeasures() to fix the current error
   */
  PerformanceMonitor.prototype.getAllMeasurements = function () {
    return this.getMeasures();
  };
  /**
   * Get average duration for a specific measurement type
   */
  PerformanceMonitor.prototype.getAverageDuration = function (type) {
    var measures = this.measures.filter(function (m) {
      return m.type === type && m.duration !== undefined;
    });
    if (measures.length === 0) return undefined;
    var totalDuration = measures.reduce(function (sum, measure) {
      return sum + (measure.duration || 0);
    }, 0);
    return totalDuration / measures.length;
  };
  /**
   * Enable or disable performance monitoring
   */
  PerformanceMonitor.prototype.setEnabled = function (enabled) {
    this.enabled = enabled;
  };
  /**
   * Clear all measurements
   */
  PerformanceMonitor.prototype.clear = function () {
    this.measures = [];
    this.marks = {};
  };
  return PerformanceMonitor;
})();
// Export a singleton instance
exports.performanceMonitor = new PerformanceMonitor();

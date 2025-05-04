/**
 * Performance monitoring utility for tracking page load times and user interactions
 */
class PerformanceMonitor {
    measures = [];
    marks = {};
    enabled = true;
    constructor() {
        // Initialize performance monitoring
        if (typeof window !== 'undefined' && window.performance) {
            this.capturePageLoadMetrics();
        }
    }
    /**
     * Capture initial page load metrics
     */
    capturePageLoadMetrics() {
        window.addEventListener('load', () => {
            if (!this.enabled || !window.performance)
                return;
            // Get navigation timing metrics if available
            if (window.performance.timing) {
                const timing = window.performance.timing;
                const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
                const domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart;
                const firstPaint = timing.responseEnd - timing.navigationStart;
                this.measures.push({
                    id: 'initial-page-load',
                    startTime: timing.navigationStart,
                    endTime: timing.loadEventEnd,
                    duration: pageLoadTime,
                    type: 'page-load',
                    metadata: {
                        domContentLoaded,
                        firstPaint,
                        totalResources: window.performance.getEntriesByType('resource').length
                    }
                });
            }
        });
    }
    /**
     * Start a performance measurement
     */
    startMeasure(id, type = 'custom', metadata) {
        if (!this.enabled)
            return id;
        const startTime = performance.now();
        this.measures.push({
            id,
            startTime,
            type,
            metadata
        });
        return id;
    }
    /**
     * End a performance measurement
     */
    endMeasure(id) {
        if (!this.enabled)
            return undefined;
        const endTime = performance.now();
        const measureIndex = this.measures.findIndex(m => m.id === id && !m.endTime);
        if (measureIndex === -1)
            return undefined;
        this.measures[measureIndex].endTime = endTime;
        this.measures[measureIndex].duration = endTime - this.measures[measureIndex].startTime;
        return this.measures[measureIndex];
    }
    /**
     * Create a performance mark
     */
    mark(name) {
        if (!this.enabled)
            return;
        this.marks[name] = performance.now();
    }
    /**
     * Measure time between marks
     */
    measureBetweenMarks(measureName, startMark, endMark) {
        if (!this.enabled || !this.marks[startMark] || !this.marks[endMark])
            return undefined;
        const duration = this.marks[endMark] - this.marks[startMark];
        this.measures.push({
            id: measureName,
            startTime: this.marks[startMark],
            endTime: this.marks[endMark],
            duration,
            type: 'custom'
        });
        return duration;
    }
    /**
     * Get all performance measurements
     */
    getMeasures() {
        return [...this.measures];
    }
    /**
     * Get all performance measurements
     * This is an alias for getMeasures() to fix the current error
     */
    getAllMeasurements() {
        return this.getMeasures();
    }
    /**
     * Get average duration for a specific measurement type
     */
    getAverageDuration(type) {
        const measures = this.measures.filter(m => m.type === type && m.duration !== undefined);
        if (measures.length === 0)
            return undefined;
        const totalDuration = measures.reduce((sum, measure) => sum + (measure.duration || 0), 0);
        return totalDuration / measures.length;
    }
    /**
     * Enable or disable performance monitoring
     */
    setEnabled(enabled) {
        this.enabled = enabled;
    }
    /**
     * Clear all measurements
     */
    clear() {
        this.measures = [];
        this.marks = {};
    }
}
// Export a singleton instance
export const performanceMonitor = new PerformanceMonitor();

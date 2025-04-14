
/**
 * Performance monitoring utility for tracking page load times and user interactions
 */

interface PerformanceMeasure {
  id: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  type: 'page-load' | 'api-call' | 'render' | 'interaction' | 'custom';
  metadata?: Record<string, any>;
}

class PerformanceMonitor {
  private measures: PerformanceMeasure[] = [];
  private marks: Record<string, number> = {};
  private enabled: boolean = true;

  constructor() {
    // Initialize performance monitoring
    if (typeof window !== 'undefined' && window.performance) {
      this.capturePageLoadMetrics();
    }
  }

  /**
   * Capture initial page load metrics
   */
  private capturePageLoadMetrics() {
    window.addEventListener('load', () => {
      if (!this.enabled || !window.performance) return;
      
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
  public startMeasure(id: string, type: 'page-load' | 'api-call' | 'render' | 'interaction' | 'custom' = 'custom', metadata?: Record<string, any>): string {
    if (!this.enabled) return id;
    
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
  public endMeasure(id: string): PerformanceMeasure | undefined {
    if (!this.enabled) return undefined;
    
    const endTime = performance.now();
    const measureIndex = this.measures.findIndex(m => m.id === id && !m.endTime);
    
    if (measureIndex === -1) return undefined;
    
    this.measures[measureIndex].endTime = endTime;
    this.measures[measureIndex].duration = endTime - this.measures[measureIndex].startTime;
    
    return this.measures[measureIndex];
  }

  /**
   * Create a performance mark
   */
  public mark(name: string): void {
    if (!this.enabled) return;
    
    this.marks[name] = performance.now();
  }

  /**
   * Measure time between marks
   */
  public measureBetweenMarks(measureName: string, startMark: string, endMark: string): number | undefined {
    if (!this.enabled || !this.marks[startMark] || !this.marks[endMark]) return undefined;
    
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
  public getMeasures(): PerformanceMeasure[] {
    return [...this.measures];
  }

  /**
   * Get average duration for a specific measurement type
   */
  public getAverageDuration(type: PerformanceMeasure['type']): number | undefined {
    const measures = this.measures.filter(m => m.type === type && m.duration !== undefined);
    
    if (measures.length === 0) return undefined;
    
    const totalDuration = measures.reduce((sum, measure) => sum + (measure.duration || 0), 0);
    return totalDuration / measures.length;
  }

  /**
   * Enable or disable performance monitoring
   */
  public setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  /**
   * Clear all measurements
   */
  public clear(): void {
    this.measures = [];
    this.marks = {};
  }
}

// Export a singleton instance
export const performanceMonitor = new PerformanceMonitor();

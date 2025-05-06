/**
 * Performance monitoring utility for tracking page load times and user interactions
 */
interface PerformanceMeasure {
  id: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  type: "page-load" | "api-call" | "render" | "interaction" | "custom";
  metadata?: Record<string, any>;
}
declare class PerformanceMonitor {
  private measures;
  private marks;
  private enabled;
  constructor();
  /**
   * Capture initial page load metrics
   */
  private capturePageLoadMetrics;
  /**
   * Start a performance measurement
   */
  startMeasure(
    id: string,
    type?: "page-load" | "api-call" | "render" | "interaction" | "custom",
    metadata?: Record<string, any>,
  ): string;
  /**
   * End a performance measurement
   */
  endMeasure(id: string): PerformanceMeasure | undefined;
  /**
   * Create a performance mark
   */
  mark(name: string): void;
  /**
   * Measure time between marks
   */
  measureBetweenMarks(
    measureName: string,
    startMark: string,
    endMark: string,
  ): number | undefined;
  /**
   * Get all performance measurements
   */
  getMeasures(): PerformanceMeasure[];
  /**
   * Get all performance measurements
   * This is an alias for getMeasures() to fix the current error
   */
  getAllMeasurements(): PerformanceMeasure[];
  /**
   * Get average duration for a specific measurement type
   */
  getAverageDuration(type: PerformanceMeasure["type"]): number | undefined;
  /**
   * Enable or disable performance monitoring
   */
  setEnabled(enabled: boolean): void;
  /**
   * Clear all measurements
   */
  clear(): void;
}
export declare const performanceMonitor: PerformanceMonitor;
export {};

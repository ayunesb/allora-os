
import { logger } from '@/utils/loggingService';

type PerformanceMetric = {
  name: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  metadata?: Record<string, any>;
};

/**
 * Simple performance monitoring service to help identify bottlenecks
 */
class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private isEnabled = process.env.NODE_ENV !== 'production' || localStorage.getItem('enable_performance_monitoring') === 'true';
  private slowThreshold = 300; // ms
  
  /**
   * Start measuring a performance metric
   */
  startMeasure(name: string, metadata?: Record<string, any>): string {
    if (!this.isEnabled) return name;
    
    const id = `${name}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    this.metrics.push({
      name,
      startTime: performance.now(),
      metadata
    });
    
    return id;
  }
  
  /**
   * End measuring a performance metric
   */
  endMeasure(name: string): number | undefined {
    if (!this.isEnabled) return;
    
    const metricIndex = this.metrics.findIndex(m => m.name === name && !m.endTime);
    if (metricIndex === -1) return;
    
    const metric = this.metrics[metricIndex];
    metric.endTime = performance.now();
    metric.duration = metric.endTime - metric.startTime;
    
    // Log slow operations
    if (metric.duration > this.slowThreshold) {
      logger.warn(`Slow operation detected: ${metric.name} took ${metric.duration.toFixed(2)}ms`, {
        ...metric.metadata,
        duration: metric.duration
      });
    }
    
    return metric.duration;
  }
  
  /**
   * Measure the execution time of a function
   */
  measure<T>(name: string, fn: () => T, metadata?: Record<string, any>): T {
    if (!this.isEnabled) return fn();
    
    const start = performance.now();
    try {
      return fn();
    } finally {
      const duration = performance.now() - start;
      this.metrics.push({
        name,
        startTime: start,
        endTime: start + duration,
        duration,
        metadata
      });
      
      if (duration > this.slowThreshold) {
        logger.warn(`Slow operation detected: ${name} took ${duration.toFixed(2)}ms`, {
          ...metadata,
          duration
        });
      }
    }
  }
  
  /**
   * Measure the execution time of an async function
   */
  async measureAsync<T>(name: string, fn: () => Promise<T>, metadata?: Record<string, any>): Promise<T> {
    if (!this.isEnabled) return fn();
    
    const start = performance.now();
    try {
      return await fn();
    } finally {
      const duration = performance.now() - start;
      this.metrics.push({
        name,
        startTime: start,
        endTime: start + duration,
        duration,
        metadata
      });
      
      if (duration > this.slowThreshold) {
        logger.warn(`Slow async operation detected: ${name} took ${duration.toFixed(2)}ms`, {
          ...metadata,
          duration
        });
      }
    }
  }
  
  /**
   * Get all metrics collected
   */
  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }
  
  /**
   * Clear all metrics
   */
  clearMetrics(): void {
    this.metrics = [];
  }
  
  /**
   * Create a performance marker in the browser timeline (dev tool)
   */
  mark(name: string): void {
    if (!this.isEnabled) return;
    
    if (typeof performance.mark === 'function') {
      performance.mark(name);
    }
  }
  
  /**
   * Enable or disable performance monitoring
   */
  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
    if (enabled) {
      localStorage.setItem('enable_performance_monitoring', 'true');
    } else {
      localStorage.removeItem('enable_performance_monitoring');
    }
  }
  
  /**
   * Set slow operation threshold in milliseconds
   */
  setSlowThreshold(threshold: number): void {
    this.slowThreshold = threshold;
  }
}

export const performanceMonitor = new PerformanceMonitor();

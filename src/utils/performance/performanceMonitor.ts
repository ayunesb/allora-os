
/**
 * Utility for monitoring and tracking application performance
 */
class PerformanceMonitor {
  private measurements: Map<string, { start: number; end?: number }> = new Map();
  
  /**
   * Start measuring performance for a specific operation
   */
  startMeasure(id: string): string {
    if (typeof window !== 'undefined' && window.performance) {
      const uniqueId = `${id}-${Date.now()}`;
      this.measurements.set(uniqueId, { start: performance.now() });
      
      // Also create a performance mark if available
      if (performance.mark) {
        performance.mark(`${uniqueId}-start`);
      }
      
      return uniqueId;
    }
    
    return id;
  }
  
  /**
   * End measuring performance and calculate duration
   */
  endMeasure(id: string): number | null {
    if (typeof window !== 'undefined' && window.performance) {
      const measurement = this.measurements.get(id);
      
      if (measurement) {
        const end = performance.now();
        const duration = end - measurement.start;
        
        this.measurements.set(id, { ...measurement, end });
        
        // Also create a performance mark if available
        if (performance.mark) {
          performance.mark(`${id}-end`);
          
          if (performance.measure) {
            try {
              performance.measure(id, `${id}-start`, `${id}-end`);
            } catch (err) {
              console.error('Error measuring performance:', err);
            }
          }
        }
        
        return duration;
      }
    }
    
    return null;
  }
  
  /**
   * Create a performance mark
   */
  mark(name: string): void {
    if (typeof window !== 'undefined' && window.performance && performance.mark) {
      performance.mark(name);
    }
  }
  
  /**
   * Get all measurements
   */
  getAllMeasurements(): Record<string, { duration: number | null }> {
    const result: Record<string, { duration: number | null }> = {};
    
    this.measurements.forEach((value, key) => {
      if (value.end) {
        result[key] = { duration: value.end - value.start };
      } else {
        result[key] = { duration: null };
      }
    });
    
    return result;
  }
  
  /**
   * Clear all measurements
   */
  clearMeasurements(): void {
    this.measurements.clear();
    
    if (typeof window !== 'undefined' && window.performance && performance.clearMarks) {
      performance.clearMarks();
      
      if (performance.clearMeasures) {
        performance.clearMeasures();
      }
    }
  }
}

export const performanceMonitor = new PerformanceMonitor();

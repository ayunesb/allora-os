
/**
 * Allora AI Platform Monitoring and Alerting System
 */

import { logAuditEvent } from './auditLogger';

// Types for our monitoring system
export type AlertSeverity = 'info' | 'warning' | 'error' | 'critical';
export type MetricType = 'counter' | 'gauge' | 'histogram' | 'timer';

export interface Metric {
  name: string;
  value: number;
  type: MetricType;
  tags?: Record<string, string>;
  timestamp?: string;
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: AlertSeverity;
  source: string;
  timestamp: string;
  metadata?: Record<string, any>;
  acknowledged?: boolean;
}

class MonitoringSystem {
  private metrics: Record<string, Metric> = {};
  private alerts: Alert[] = [];
  private alertHandlers: ((alert: Alert) => void)[] = [];
  private isEnabled: boolean = true;
  
  // Error rate tracking
  private errorCounts: Record<string, number> = {};
  private errorWindows: Record<string, number[]> = {};
  
  // Initialize the monitoring system
  constructor() {
    // Setup global error handler
    if (typeof window !== 'undefined') {
      window.addEventListener('error', this.handleGlobalError.bind(this));
      window.addEventListener('unhandledrejection', this.handleUnhandledRejection.bind(this));
      
      // Check if monitoring should be disabled (e.g. during testing)
      this.isEnabled = localStorage.getItem('disable_monitoring') !== 'true';
      
      // Start regular health checks
      this.startHealthChecks();
    }
  }
  
  // Track a metric
  trackMetric(metric: Omit<Metric, 'timestamp'>): void {
    if (!this.isEnabled) return;
    
    const fullMetric: Metric = {
      ...metric,
      timestamp: new Date().toISOString()
    };
    
    this.metrics[metric.name] = fullMetric;
    
    // For counters, we could send immediately or batch
    if (metric.type === 'counter' && metric.value > 0) {
      this.sendMetricToBackend(fullMetric);
    }
    
    // Check for thresholds that might trigger alerts
    this.checkMetricThresholds(fullMetric);
  }
  
  // Increment a counter metric
  incrementCounter(name: string, value: number = 1, tags?: Record<string, string>): void {
    const existing = this.metrics[name];
    const currentValue = existing?.value || 0;
    
    this.trackMetric({
      name,
      value: currentValue + value,
      type: 'counter',
      tags
    });
  }
  
  // Record a timing metric
  recordTiming(name: string, durationMs: number, tags?: Record<string, string>): void {
    this.trackMetric({
      name,
      value: durationMs,
      type: 'timer',
      tags
    });
  }
  
  // Create a timing function that returns a stop function
  startTimer(name: string, tags?: Record<string, string>): () => number {
    const start = performance.now();
    
    return () => {
      const duration = performance.now() - start;
      this.recordTiming(name, duration, tags);
      return duration;
    };
  }
  
  // Set a gauge metric
  setGauge(name: string, value: number, tags?: Record<string, string>): void {
    this.trackMetric({
      name,
      value,
      type: 'gauge',
      tags
    });
  }
  
  // Trigger an alert
  triggerAlert(
    title: string,
    message: string,
    severity: AlertSeverity = 'info',
    metadata?: Record<string, any>
  ): string {
    if (!this.isEnabled) return 'disabled';
    
    const alert: Alert = {
      id: `alert_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      title,
      message,
      severity,
      source: window.location.pathname,
      timestamp: new Date().toISOString(),
      metadata,
      acknowledged: false
    };
    
    // Store alert
    this.alerts.push(alert);
    
    // Truncate alerts if we have too many
    if (this.alerts.length > 100) {
      this.alerts = this.alerts.slice(-100);
    }
    
    // Notify handlers
    this.alertHandlers.forEach(handler => {
      try {
        handler(alert);
      } catch (e) {
        console.error('Error in alert handler:', e);
      }
    });
    
    // Log critical alerts to audit log
    if (severity === 'critical' || severity === 'error') {
      logAuditEvent({
        user: 'system',
        action: 'SYSTEM_CHANGE',
        resource: 'monitoring_alert',
        details: {
          alertId: alert.id,
          title,
          message,
          severity,
          source: alert.source
        },
        severity: severity === 'critical' ? 'high' : 'medium'
      }).catch(err => console.error('Failed to log alert to audit log:', err));
    }
    
    // For critical alerts, we might want to send them immediately
    if (severity === 'critical') {
      this.sendAlertToBackend(alert);
      
      // Display in console for visibility during development
      console.error(`🚨 CRITICAL ALERT: ${title} - ${message}`);
    }
    
    return alert.id;
  }
  
  // Register an alert handler
  onAlert(handler: (alert: Alert) => void): () => void {
    this.alertHandlers.push(handler);
    
    // Return unsubscribe function
    return () => {
      this.alertHandlers = this.alertHandlers.filter(h => h !== handler);
    };
  }
  
  // Get all active alerts
  getAlerts(filterBySeverity?: AlertSeverity): Alert[] {
    if (filterBySeverity) {
      return this.alerts.filter(a => a.severity === filterBySeverity);
    }
    return [...this.alerts];
  }
  
  // Acknowledge an alert
  acknowledgeAlert(alertId: string): boolean {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.acknowledged = true;
      return true;
    }
    return false;
  }
  
  // Track error rates for specific error types
  trackError(errorType: string, context?: Record<string, any>): void {
    if (!this.isEnabled) return;
    
    // Initialize tracking for this error type if needed
    if (!this.errorCounts[errorType]) {
      this.errorCounts[errorType] = 0;
      this.errorWindows[errorType] = [];
    }
    
    // Increment error count
    this.errorCounts[errorType]++;
    
    // Add timestamp to sliding window (last 5 minutes)
    const now = Date.now();
    this.errorWindows[errorType].push(now);
    
    // Clean up window (remove entries older than 5 minutes)
    const fiveMinutesAgo = now - 5 * 60 * 1000;
    this.errorWindows[errorType] = this.errorWindows[errorType].filter(t => t > fiveMinutesAgo);
    
    // Check for error threshold triggers
    this.checkErrorRateThresholds(errorType, context);
    
    // Track as a metric
    this.incrementCounter(`error.${errorType}`, 1, { 
      path: window.location.pathname,
      ...(context ? { context: JSON.stringify(context) } : {})
    });
  }
  
  // Send a metric to the backend
  private sendMetricToBackend(metric: Metric): void {
    // In a production system, this would send to a metrics collector
    // For now, we'll just log to console
    if (metric.value > 0) {
      console.debug(`[Metric] ${metric.name}: ${metric.value} (${metric.type})`);
    }
  }
  
  // Send an alert to the backend
  private sendAlertToBackend(alert: Alert): void {
    // In a production system, this would send to an alerting service
    console.info(`[Alert] ${alert.severity.toUpperCase()}: ${alert.title}`);
    
    // For critical alerts in production, we might send an email or SMS
    // if (alert.severity === 'critical' && process.env.NODE_ENV === 'production') {
    //   fetch('/api/send-alert', {
    //     method: 'POST',
    //     body: JSON.stringify(alert)
    //   }).catch(err => console.error('Failed to send alert:', err));
    // }
  }
  
  // Check if a metric crosses any thresholds
  private checkMetricThresholds(metric: Metric): void {
    // CPU load threshold
    if (metric.name === 'system.cpu' && metric.value > 90) {
      this.triggerAlert(
        'High CPU Usage',
        `CPU usage is at ${metric.value}%, which is above the 90% threshold.`,
        'warning',
        { metricValue: metric.value, threshold: 90 }
      );
    }
    
    // Memory usage threshold
    if (metric.name === 'system.memory' && metric.value > 85) {
      this.triggerAlert(
        'High Memory Usage',
        `Memory usage is at ${metric.value}%, which is above the 85% threshold.`,
        metric.value > 95 ? 'critical' : 'warning',
        { metricValue: metric.value, threshold: 85 }
      );
    }
    
    // API response time threshold
    if (metric.name.startsWith('api.') && metric.type === 'timer' && metric.value > 2000) {
      this.triggerAlert(
        'Slow API Response',
        `API endpoint ${metric.name.substring(4)} took ${metric.value}ms to respond, which is above the 2000ms threshold.`,
        metric.value > 5000 ? 'error' : 'warning',
        { metricValue: metric.value, threshold: 2000 }
      );
    }
  }
  
  // Check if error rates cross thresholds
  private checkErrorRateThresholds(errorType: string, context?: Record<string, any>): void {
    const errorCount = this.errorWindows[errorType]?.length || 0;
    
    // If we have more than 5 errors in 5 minutes
    if (errorCount >= 5) {
      this.triggerAlert(
        'High Error Rate Detected',
        `${errorType} errors are occurring at a high rate (${errorCount} in the last 5 minutes).`,
        errorCount >= 10 ? 'error' : 'warning',
        { 
          errorType, 
          errorCount,
          errorRate: `${errorCount}/5min`,
          ...context
        }
      );
    }
    
    // If we have more than 20 errors in 5 minutes, it's critical
    if (errorCount >= 20) {
      this.triggerAlert(
        'Critical Error Rate',
        `${errorType} errors are occurring at a critical rate (${errorCount} in the last 5 minutes).`,
        'critical',
        { 
          errorType, 
          errorCount,
          errorRate: `${errorCount}/5min`,
          ...context
        }
      );
    }
  }
  
  // Handle global errors
  private handleGlobalError(event: ErrorEvent): void {
    if (!this.isEnabled) return;
    
    this.trackError('uncaught_exception', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      stack: event.error?.stack
    });
    
    // For serious errors, trigger an alert
    this.triggerAlert(
      'Uncaught Exception',
      `An uncaught exception occurred: ${event.message}`,
      'error',
      {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack
      }
    );
  }
  
  // Handle unhandled promise rejections
  private handleUnhandledRejection(event: PromiseRejectionEvent): void {
    if (!this.isEnabled) return;
    
    const reason = event.reason;
    const message = reason instanceof Error ? reason.message : String(reason);
    const stack = reason instanceof Error ? reason.stack : undefined;
    
    this.trackError('unhandled_rejection', {
      message,
      stack
    });
    
    this.triggerAlert(
      'Unhandled Promise Rejection',
      `An unhandled promise rejection occurred: ${message}`,
      'error',
      {
        message,
        stack
      }
    );
  }
  
  // Start periodic health checks
  private startHealthChecks(): void {
    // Check memory usage (safely)
    setInterval(() => {
      if (typeof performance !== 'undefined' && 
          'memory' in performance && 
          performance.memory && 
          typeof performance.memory === 'object' &&
          'usedJSHeapSize' in performance.memory &&
          'jsHeapSizeLimit' in performance.memory) {
        
        // TypeScript doesn't know about non-standard browser APIs
        // so we need to use type assertion to access these properties
        const memory = performance.memory as unknown as {
          usedJSHeapSize: number;
          jsHeapSizeLimit: number;
        };
        
        const usedHeap = memory.usedJSHeapSize;
        const totalHeap = memory.jsHeapSizeLimit;
        const usagePercent = (usedHeap / totalHeap) * 100;
        
        this.setGauge('system.memory', usagePercent, {
          usedHeap: String(usedHeap),
          totalHeap: String(totalHeap)
        });
      }
    }, 60000); // Check every minute
    
    // Connectivity check
    setInterval(() => {
      if (navigator.onLine === false) {
        this.triggerAlert(
          'Connectivity Issue',
          'The application is currently offline.',
          'warning'
        );
      }
    }, 30000); // Check every 30 seconds
  }
}

// Create singleton instance
export const monitoring = new MonitoringSystem();

// Utility functions for easy access
export const recordApiTiming = (endpoint: string, durationMs: number): void => {
  monitoring.recordTiming(`api.${endpoint}`, durationMs, { endpoint });
};

export const startApiTimer = (endpoint: string): () => number => {
  return monitoring.startTimer(`api.${endpoint}`, { endpoint });
};

export const trackApiError = (endpoint: string, error: any): void => {
  monitoring.trackError(`api_error.${endpoint}`, {
    message: error?.message || String(error),
    status: error?.status,
    endpoint
  });
};

export const reportError = (
  title: string,
  error: any,
  context?: Record<string, any>
): string => {
  const message = error?.message || String(error);
  const severity: AlertSeverity = context?.critical ? 'critical' : 'error';
  
  return monitoring.triggerAlert(
    title,
    message,
    severity,
    {
      stack: error?.stack,
      ...context
    }
  );
};

export const reportWarning = (
  title: string,
  message: string,
  context?: Record<string, any>
): string => {
  return monitoring.triggerAlert(title, message, 'warning', context);
};

export const reportInfo = (
  title: string,
  message: string,
  context?: Record<string, any>
): string => {
  return monitoring.triggerAlert(title, message, 'info', context);
};

// Export the monitoring system
export default monitoring;

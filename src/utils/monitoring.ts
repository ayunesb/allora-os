
/**
 * Monitoring utility module for handling system alerts and monitoring
 */

export type AlertSeverity = 'info' | 'warning' | 'error' | 'critical';

export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: AlertSeverity;
  timestamp: Date;
  metadata?: Record<string, any>;
  dismissed?: boolean;
  acknowledged?: boolean; // Added acknowledged property
}

class MonitoringService {
  private alerts: Alert[] = [];
  private listeners: ((alerts: Alert[]) => void)[] = [];
  private metrics: Record<string, number> = {}; // Store for gauge metrics

  constructor() {
    // Initialize with some sample alerts
    this.alerts = [
      {
        id: '1',
        title: 'System Update',
        message: 'Allora AI platform was updated to version 2.4.0',
        severity: 'info',
        timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
        metadata: { version: '2.4.0' }
      },
      {
        id: '2',
        title: 'Database Connection Latency',
        message: 'Database connections experiencing higher than normal latency',
        severity: 'warning',
        timestamp: new Date(Date.now() - 32 * 60 * 1000), // 32 minutes ago
        metadata: { latency: '320ms', threshold: '200ms' }
      }
    ];
  }

  /**
   * Get all current alerts, optionally filtered by severity
   */
  getAlerts(severity?: AlertSeverity): Alert[] {
    if (!severity) return [...this.alerts];
    return this.alerts.filter(alert => alert.severity === severity);
  }

  /**
   * Get most recent alerts up to a specified limit
   */
  getRecentAlerts(limit: number = 5): Alert[] {
    return [...this.alerts]
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  /**
   * Create and trigger a new alert
   */
  triggerAlert(title: string, message: string, severity: AlertSeverity, metadata?: Record<string, any>): Alert {
    const alert: Alert = {
      id: Date.now().toString(),
      title,
      message,
      severity,
      timestamp: new Date(),
      metadata
    };

    this.alerts.unshift(alert);
    
    // Only keep the last 100 alerts
    if (this.alerts.length > 100) {
      this.alerts = this.alerts.slice(0, 100);
    }
    
    // Notify listeners
    this.notifyListeners();
    
    // Log to console in development
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[ALERT ${severity.toUpperCase()}]`, title, message, metadata);
    }
    
    return alert;
  }

  /**
   * Dismiss an alert
   */
  dismissAlert(alertId: string): boolean {
    const alertIndex = this.alerts.findIndex(a => a.id === alertId);
    if (alertIndex === -1) return false;
    
    this.alerts[alertIndex].dismissed = true;
    this.notifyListeners();
    return true;
  }

  /**
   * Acknowledge an alert
   */
  acknowledgeAlert(alertId: string): boolean {
    const alertIndex = this.alerts.findIndex(a => a.id === alertId);
    if (alertIndex === -1) return false;
    
    this.alerts[alertIndex].acknowledged = true;
    this.notifyListeners();
    return true;
  }

  /**
   * Set a gauge metric value
   */
  setGauge(metricName: string, value: number): void {
    this.metrics[metricName] = value;
  }

  /**
   * Get a gauge metric value
   */
  getGauge(metricName: string): number {
    return this.metrics[metricName] || 0;
  }

  /**
   * Record timing information
   */
  recordTiming(metricName: string, durationMs: number, metadata?: Record<string, any>): void {
    console.log(`[TIMING] ${metricName}: ${durationMs}ms`, metadata);
    // In a real implementation, this would store the timing data for analytics
  }

  /**
   * Add a listener for alert changes
   */
  addListener(callback: (alerts: Alert[]) => void): () => void {
    this.listeners.push(callback);
    
    // Return remove function
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  /**
   * Notify all listeners of updates
   */
  private notifyListeners(): void {
    const activeAlerts = this.alerts.filter(a => !a.dismissed);
    this.listeners.forEach(listener => listener(activeAlerts));
  }
}

// Export a singleton instance of the MonitoringService
export const monitoring = new MonitoringService();

// Add timing utility functions
export const startApiTimer = (endpoint: string) => {
  const startTime = performance.now();
  return () => {
    const endTime = performance.now();
    const duration = endTime - startTime;
    monitoring.recordTiming(`api.${endpoint}`, duration, { endpoint });
    return duration;
  };
};

// Helper functions for reporting different severity levels
export const reportInfo = (title: string, message: string, metadata?: Record<string, any>) => {
  return monitoring.triggerAlert(title, message, 'info', metadata);
};

export const reportWarning = (title: string, message: string, metadata?: Record<string, any>) => {
  return monitoring.triggerAlert(title, message, 'warning', metadata);
};

export const reportError = (title: string, message: string, metadata?: Record<string, any>) => {
  return monitoring.triggerAlert(title, message, 'error', metadata);
};

export const reportCritical = (title: string, message: string, metadata?: Record<string, any>) => {
  return monitoring.triggerAlert(title, message, 'critical', metadata);
};

// Export a method to check system health
export const checkSystemHealth = async () => {
  try {
    // This would normally involve checking various services
    // For demo purposes, we're just returning a mock result
    return {
      healthy: true,
      services: {
        database: { status: 'healthy', responseTime: 45 },
        api: { status: 'healthy', responseTime: 78 },
        storage: { status: 'healthy', responseTime: 120 },
        authentication: { status: 'healthy', responseTime: 32 }
      }
    };
  } catch (error) {
    console.error('Error checking system health:', error);
    return {
      healthy: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

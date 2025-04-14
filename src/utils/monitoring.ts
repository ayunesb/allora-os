
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

export interface HealthCheckResult {
  status: 'healthy' | 'unhealthy' | 'degraded';
  timestamp: string;
  services: Record<string, ServiceHealth>;
  environment: string;
  version?: string;
  uptime?: number;
}

export interface ServiceHealth {
  status: 'healthy' | 'unhealthy' | 'degraded';
  responseTime?: number;
  message?: string;
  lastChecked: string;
}

class MonitoringService {
  private alerts: Alert[] = [];
  private listeners: ((alerts: Alert[]) => void)[] = [];
  private metrics: Record<string, number> = {}; // Store for gauge metrics
  private healthCheckInterval: number | null = null;
  private healthCheckListeners: ((health: HealthCheckResult) => void)[] = [];
  private lastHealthCheck: HealthCheckResult | null = null;

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
   * Start automatic health checks at the specified interval (in ms)
   */
  startHealthChecks(intervalMs: number = 60000): void {
    if (this.healthCheckInterval) {
      this.stopHealthChecks();
    }

    this.healthCheckInterval = window.setInterval(async () => {
      const health = await this.performHealthCheck();
      
      // Notify health check listeners
      this.healthCheckListeners.forEach(listener => listener(health));
      
      // Trigger alerts for unhealthy services
      if (health.status !== 'healthy') {
        this.triggerAlert(
          'System Health Degraded',
          `System health check detected issues with ${Object.entries(health.services)
            .filter(([, service]) => service.status !== 'healthy')
            .map(([name]) => name)
            .join(', ')}`,
          health.status === 'degraded' ? 'warning' : 'error',
          { healthCheck: health }
        );
      }
    }, intervalMs);
  }

  /**
   * Stop automatic health checks
   */
  stopHealthChecks(): void {
    if (this.healthCheckInterval) {
      window.clearInterval(this.healthCheckInterval);
      this.healthCheckInterval = null;
    }
  }

  /**
   * Add a listener for health check results
   */
  addHealthCheckListener(callback: (health: HealthCheckResult) => void): () => void {
    this.healthCheckListeners.push(callback);
    
    // If we have a recent health check result, call the listener immediately
    if (this.lastHealthCheck) {
      callback(this.lastHealthCheck);
    }
    
    // Return remove function
    return () => {
      this.healthCheckListeners = this.healthCheckListeners.filter(l => l !== callback);
    };
  }

  /**
   * Perform a health check of the system
   */
  async performHealthCheck(): Promise<HealthCheckResult> {
    const startTime = performance.now();
    
    try {
      // Check various services
      const servicesHealth: Record<string, ServiceHealth> = {
        api: await this.checkApiHealth(),
        database: await this.checkDatabaseHealth(),
        auth: await this.checkAuthHealth(),
        storage: await this.checkStorageHealth()
      };
      
      // Determine overall system health
      const unhealthyServices = Object.values(servicesHealth).filter(s => s.status === 'unhealthy');
      const degradedServices = Object.values(servicesHealth).filter(s => s.status === 'degraded');
      
      let overallStatus: 'healthy' | 'unhealthy' | 'degraded' = 'healthy';
      if (unhealthyServices.length > 0) {
        overallStatus = 'unhealthy';
      } else if (degradedServices.length > 0) {
        overallStatus = 'degraded';
      }
      
      const result: HealthCheckResult = {
        status: overallStatus,
        timestamp: new Date().toISOString(),
        services: servicesHealth,
        environment: process.env.NODE_ENV || 'development',
        version: '2.4.0', // This should be dynamically populated in a real app
        uptime: performance.now() // Milliseconds since page load as a proxy for uptime
      };
      
      this.lastHealthCheck = result;
      return result;
    } catch (error) {
      console.error('Error performing health check:', error);
      
      const errorResult: HealthCheckResult = {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        services: {
          system: {
            status: 'unhealthy',
            message: error instanceof Error ? error.message : 'Unknown error during health check',
            lastChecked: new Date().toISOString()
          }
        },
        environment: process.env.NODE_ENV || 'development'
      };
      
      this.lastHealthCheck = errorResult;
      return errorResult;
    } finally {
      const duration = performance.now() - startTime;
      this.recordTiming('health_check', duration);
    }
  }

  /**
   * Notify all listeners of updates
   */
  private notifyListeners(): void {
    const activeAlerts = this.alerts.filter(a => !a.dismissed);
    this.listeners.forEach(listener => listener(activeAlerts));
  }

  /**
   * Check API health
   */
  private async checkApiHealth(): Promise<ServiceHealth> {
    const startTime = performance.now();
    try {
      // This is a simplified check - in a real app, you'd check actual API endpoints
      // or use a dedicated health check endpoint
      const isOnline = navigator.onLine;
      const status = isOnline ? 'healthy' : 'unhealthy';
      
      return {
        status,
        responseTime: performance.now() - startTime,
        message: isOnline ? 'API is accessible' : 'Network connection unavailable',
        lastChecked: new Date().toISOString()
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        message: error instanceof Error ? error.message : 'Unknown error checking API health',
        lastChecked: new Date().toISOString()
      };
    }
  }

  /**
   * Check database health
   */
  private async checkDatabaseHealth(): Promise<ServiceHealth> {
    // In a real app, this would make a request to check database connectivity
    // For this demo, we're simulating a successful response
    return {
      status: 'healthy',
      responseTime: 45,
      message: 'Database connection established',
      lastChecked: new Date().toISOString()
    };
  }

  /**
   * Check authentication service health
   */
  private async checkAuthHealth(): Promise<ServiceHealth> {
    // In a real app, this would check the auth service
    // For this demo, we're simulating a successful response
    return {
      status: 'healthy',
      responseTime: 32,
      message: 'Authentication service responding normally',
      lastChecked: new Date().toISOString()
    };
  }

  /**
   * Check storage service health
   */
  private async checkStorageHealth(): Promise<ServiceHealth> {
    // In a real app, this would check storage service connectivity
    // For this demo, we're simulating a successful response
    return {
      status: 'healthy',
      responseTime: 120,
      message: 'Storage service operating normally',
      lastChecked: new Date().toISOString()
    };
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

// Export system health check function
export const checkSystemHealth = async () => {
  return monitoring.performHealthCheck();
};

// Start health checks immediately (once per minute)
if (typeof window !== 'undefined') {
  monitoring.startHealthChecks(60000); // 60000ms = 1 minute
}

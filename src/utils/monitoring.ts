
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

export interface ServiceHealth {
  status: 'healthy' | 'degraded' | 'unhealthy';
  responseTime?: number;
}

export interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'unhealthy';
  services: Record<string, ServiceHealth>;
  environment?: string;
  version?: string;
  uptime?: number;
}

// Alert System
export type AlertSeverity = 'info' | 'warning' | 'error' | 'critical';

export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: AlertSeverity;
  timestamp: Date;
  source?: string;
  acknowledged?: boolean;
  metadata?: Record<string, any>;
}

// Performance Monitoring
export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: Date;
}

// Gauge Metrics
export interface GaugeMetric {
  name: string;
  value: number;
  min: number;
  max: number;
  thresholds?: {
    warning: number;
    critical: number;
  };
  unit: string;
  timestamp: Date;
}

// Timing Metrics
export interface TimingMetric {
  name: string;
  duration: number;
  category: string;
  timestamp: Date;
}

type AlertListener = (alerts: Alert[]) => void;

class MonitoringSystem {
  private alerts: Alert[] = [];
  private listeners: AlertListener[] = [];
  private performanceMetrics: PerformanceMetric[] = [];
  private timers: Record<string, number> = {};
  private gaugeMetrics: GaugeMetric[] = [];
  private timingMetrics: TimingMetric[] = [];

  constructor() {
    // Initialize with some system alerts if needed
    this.alerts = [];
  }

  // Alert Management
  public getRecentAlerts(count: number = 10): Alert[] {
    return [...this.alerts].sort((a, b) => 
      b.timestamp.getTime() - a.timestamp.getTime()
    ).slice(0, count);
  }

  public getAlerts(severity?: AlertSeverity): Alert[] {
    if (!severity) return [...this.alerts];
    return this.alerts.filter(alert => alert.severity === severity);
  }

  public triggerAlert(
    title: string,
    message: string,
    severity: AlertSeverity = 'info',
    metadata?: Record<string, any>
  ): Alert {
    const newAlert: Alert = {
      id: uuidv4(),
      title,
      message,
      severity,
      timestamp: new Date(),
      acknowledged: false,
      metadata
    };

    this.alerts.push(newAlert);
    
    // Notify listeners
    this.notifyListeners();
    
    // Persist to database if critical or error
    if (severity === 'critical' || severity === 'error') {
      this.persistAlert(newAlert);
    }
    
    return newAlert;
  }

  public dismissAlert(alertId: string): void {
    const alertIndex = this.alerts.findIndex(a => a.id === alertId);
    if (alertIndex >= 0) {
      this.alerts.splice(alertIndex, 1);
      this.notifyListeners();
    }
  }

  public acknowledgeAlert(alertId: string): void {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.acknowledged = true;
      this.notifyListeners();
    }
  }

  public clearAlerts(): void {
    this.alerts = [];
    this.notifyListeners();
  }

  // Listeners
  public addListener(listener: AlertListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    for (const listener of this.listeners) {
      listener([...this.alerts]);
    }
  }

  // Alert Persistence
  private async persistAlert(alert: Alert): Promise<void> {
    try {
      await supabase.from('system_alerts').insert({
        alert_id: alert.id,
        title: alert.title,
        message: alert.message,
        severity: alert.severity,
        timestamp: alert.timestamp.toISOString(),
        metadata: alert.metadata
      });
    } catch (error) {
      console.error('Failed to persist alert:', error);
    }
  }

  // Performance Tracking
  public startApiTimer(name: string): void {
    this.timers[name] = performance.now();
  }

  public endApiTimer(name: string): number | null {
    if (!this.timers[name]) return null;
    
    const startTime = this.timers[name];
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    this.recordPerformanceMetric({
      name,
      value: duration,
      unit: 'ms',
      timestamp: new Date()
    });
    
    // Clean up timer
    delete this.timers[name];
    
    return duration;
  }

  public recordPerformanceMetric(metric: PerformanceMetric): void {
    this.performanceMetrics.push(metric);
    
    // If response time is too slow, create an alert
    if (metric.name.includes('api') && metric.value > 1000) {
      this.triggerAlert(
        'Slow API Response',
        `${metric.name} took ${metric.value}ms to complete`,
        'warning',
        { metric }
      );
    }
  }

  // New method for gauge metrics
  public setGauge(
    name: string, 
    value: number, 
    min: number = 0, 
    max: number = 100, 
    unit: string = '%',
    thresholds?: { warning: number; critical: number }
  ): void {
    const metric: GaugeMetric = {
      name,
      value,
      min,
      max,
      unit,
      thresholds,
      timestamp: new Date()
    };
    
    // Update existing gauge or add new one
    const existingIndex = this.gaugeMetrics.findIndex(g => g.name === name);
    if (existingIndex >= 0) {
      this.gaugeMetrics[existingIndex] = metric;
    } else {
      this.gaugeMetrics.push(metric);
    }
    
    // Check thresholds and trigger alerts if necessary
    if (thresholds) {
      if (value >= thresholds.critical) {
        this.triggerAlert(
          `Critical ${name}`,
          `${name} is at ${value}${unit}, which exceeds critical threshold of ${thresholds.critical}${unit}`,
          'critical',
          { metric }
        );
      } else if (value >= thresholds.warning) {
        this.triggerAlert(
          `Warning ${name}`,
          `${name} is at ${value}${unit}, which exceeds warning threshold of ${thresholds.warning}${unit}`,
          'warning',
          { metric }
        );
      }
    }
  }

  // Get all gauge metrics
  public getGaugeMetrics(): GaugeMetric[] {
    return [...this.gaugeMetrics];
  }

  // New method for timing metrics
  public recordTiming(name: string, duration: number, category: string = 'general'): void {
    const metric: TimingMetric = {
      name,
      duration,
      category,
      timestamp: new Date()
    };
    
    this.timingMetrics.push(metric);
    
    // Alert on slow operations
    if (duration > 3000) {
      this.triggerAlert(
        'Slow Operation',
        `${name} took ${duration}ms to complete`,
        'warning',
        { metric }
      );
    }
  }

  // Get timing metrics
  public getTimingMetrics(category?: string): TimingMetric[] {
    if (category) {
      return [...this.timingMetrics].filter(m => m.category === category);
    }
    return [...this.timingMetrics];
  }

  public getPerformanceMetrics(limit: number = 100): PerformanceMetric[] {
    return [...this.performanceMetrics]
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }
}

// Singleton instance
export const monitoring = new MonitoringSystem();

// Utility functions for health check
export async function checkSystemHealth(): Promise<HealthCheckResult> {
  try {
    // Check Supabase connection
    const supabaseCheck = await checkSupabaseConnection();

    // Check other critical services (you can expand this)
    const services: Record<string, ServiceHealth> = {
      database: supabaseCheck,
      authentication: await checkAuthService(),
      api: await checkApiService()
    };

    // Determine overall system status
    const overallStatus = determineOverallStatus(services);

    return {
      status: overallStatus,
      services,
      environment: import.meta.env.MODE || 'development',
      version: import.meta.env.VITE_APP_VERSION || '1.0.0',
      uptime: process.uptime ? process.uptime() * 1000 : undefined
    };
  } catch (error) {
    console.error('System health check failed:', error);
    return {
      status: 'unhealthy',
      services: {},
      environment: import.meta.env.MODE || 'development'
    };
  }
}

async function checkSupabaseConnection(): Promise<ServiceHealth> {
  try {
    const start = Date.now();
    const { data, error } = await supabase
      .from('system_settings')
      .select('key')
      .limit(1);

    const responseTime = Date.now() - start;

    if (error) {
      return {
        status: 'unhealthy',
        responseTime
      };
    }

    return {
      status: responseTime < 500 ? 'healthy' : 'degraded',
      responseTime
    };
  } catch {
    return {
      status: 'unhealthy'
    };
  }
}

async function checkAuthService(): Promise<ServiceHealth> {
  try {
    const start = Date.now();
    const { data } = await supabase.auth.getSession();
    const responseTime = Date.now() - start;

    return {
      status: responseTime < 300 ? 'healthy' : 'degraded',
      responseTime
    };
  } catch {
    return {
      status: 'unhealthy'
    };
  }
}

async function checkApiService(): Promise<ServiceHealth> {
  // Simulated API check - replace with actual API endpoint if available
  const start = Date.now();
  await new Promise(resolve => setTimeout(resolve, 100));
  const responseTime = Date.now() - start;

  return {
    status: responseTime < 200 ? 'healthy' : 'degraded',
    responseTime
  };
}

function determineOverallStatus(services: Record<string, ServiceHealth>): 'healthy' | 'degraded' | 'unhealthy' {
  const statuses = Object.values(services).map(service => service.status);
  
  if (statuses.some(status => status === 'unhealthy')) return 'unhealthy';
  if (statuses.some(status => status === 'degraded')) return 'degraded';
  
  return 'healthy';
}

// Helper functions for reporting different types of alerts
export function reportInfo(title: string, message: string, metadata?: Record<string, any>): Alert {
  return monitoring.triggerAlert(title, message, 'info', metadata);
}

export function reportWarning(title: string, message: string, metadata?: Record<string, any>): Alert {
  return monitoring.triggerAlert(title, message, 'warning', metadata);
}

export function reportError(title: string, message: string, metadata?: Record<string, any>): Alert {
  return monitoring.triggerAlert(title, message, 'error', metadata);
}

export function reportCritical(title: string, message: string, metadata?: Record<string, any>): Alert {
  return monitoring.triggerAlert(title, message, 'critical', metadata);
}

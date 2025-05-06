export interface ServiceHealth {
  status: "healthy" | "degraded" | "unhealthy";
  responseTime?: number;
}
export interface HealthCheckResult {
  status: "healthy" | "degraded" | "unhealthy";
  services: Record<string, ServiceHealth>;
  environment?: string;
  version?: string;
  uptime?: number;
}
export type AlertSeverity = "info" | "warning" | "error" | "critical";
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
export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: Date;
}
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
export interface TimingMetric {
  name: string;
  duration: number;
  category: string;
  timestamp: Date;
}
type AlertListener = (alerts: Alert[]) => void;
declare class MonitoringSystem {
  private alerts;
  private listeners;
  private performanceMetrics;
  private timers;
  private gaugeMetrics;
  private timingMetrics;
  constructor();
  getRecentAlerts(count?: number): Alert[];
  getAlerts(severity?: AlertSeverity): Alert[];
  triggerAlert(
    title: string,
    message: string,
    severity?: AlertSeverity,
    metadata?: Record<string, any>,
  ): Alert;
  dismissAlert(alertId: string): void;
  acknowledgeAlert(alertId: string): void;
  clearAlerts(): void;
  addListener(listener: AlertListener): () => void;
  private notifyListeners;
  private persistAlert;
  startApiTimer(name: string): void;
  endApiTimer(name: string): number | null;
  recordPerformanceMetric(metric: PerformanceMetric): void;
  setGauge(
    name: string,
    value: number,
    min?: number,
    max?: number,
    unit?: string,
    thresholds?: {
      warning: number;
      critical: number;
    },
  ): void;
  getGaugeMetrics(): GaugeMetric[];
  recordTiming(name: string, duration: number, category?: string): void;
  getTimingMetrics(category?: string): TimingMetric[];
  getPerformanceMetrics(limit?: number): PerformanceMetric[];
}
export declare const monitoring: MonitoringSystem;
export declare function checkSystemHealth(): Promise<HealthCheckResult>;
export declare function reportInfo(
  title: string,
  message: string,
  metadata?: Record<string, any>,
): Alert;
export declare function reportWarning(
  title: string,
  message: string,
  metadata?: Record<string, any>,
): Alert;
export declare function reportError(
  title: string,
  message: string,
  metadata?: Record<string, any>,
): Alert;
export declare function reportCritical(
  title: string,
  message: string,
  metadata?: Record<string, any>,
): Alert;
export {};

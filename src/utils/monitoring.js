var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";
class MonitoringSystem {
    constructor() {
        this.alerts = [];
        this.listeners = [];
        this.performanceMetrics = [];
        this.timers = {};
        this.gaugeMetrics = [];
        this.timingMetrics = [];
        // Initialize with some system alerts if needed
        this.alerts = [];
    }
    // Alert Management
    getRecentAlerts(count = 10) {
        return [...this.alerts]
            .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
            .slice(0, count);
    }
    getAlerts(severity) {
        if (!severity)
            return [...this.alerts];
        return this.alerts.filter((alert) => alert.severity === severity);
    }
    triggerAlert(title, message, severity = "info", metadata) {
        const newAlert = {
            id: uuidv4(),
            title,
            message,
            severity,
            timestamp: new Date(),
            acknowledged: false,
            metadata,
        };
        this.alerts.push(newAlert);
        // Notify listeners
        this.notifyListeners();
        // Persist to database if critical or error
        if (severity === "critical" || severity === "error") {
            this.persistAlert(newAlert);
        }
        return newAlert;
    }
    dismissAlert(alertId) {
        const alertIndex = this.alerts.findIndex((a) => a.id === alertId);
        if (alertIndex >= 0) {
            this.alerts.splice(alertIndex, 1);
            this.notifyListeners();
        }
    }
    acknowledgeAlert(alertId) {
        const alert = this.alerts.find((a) => a.id === alertId);
        if (alert) {
            alert.acknowledged = true;
            this.notifyListeners();
        }
    }
    clearAlerts() {
        this.alerts = [];
        this.notifyListeners();
    }
    // Listeners
    addListener(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }
    notifyListeners() {
        for (const listener of this.listeners) {
            listener([...this.alerts]);
        }
    }
    // Alert Persistence
    persistAlert(alert) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield supabase.from("system_alerts").insert({
                    alert_id: alert.id,
                    title: alert.title,
                    message: alert.message,
                    severity: alert.severity,
                    timestamp: alert.timestamp.toISOString(),
                    metadata: alert.metadata,
                });
            }
            catch (error) {
                console.error("Failed to persist alert:", error);
            }
        });
    }
    // Performance Tracking
    startApiTimer(name) {
        this.timers[name] = performance.now();
    }
    endApiTimer(name) {
        if (!this.timers[name])
            return null;
        const startTime = this.timers[name];
        const endTime = performance.now();
        const duration = endTime - startTime;
        this.recordPerformanceMetric({
            name,
            value: duration,
            unit: "ms",
            timestamp: new Date(),
        });
        // Clean up timer
        delete this.timers[name];
        return duration;
    }
    recordPerformanceMetric(metric) {
        this.performanceMetrics.push(metric);
        // If response time is too slow, create an alert
        if (metric.name.includes("api") && metric.value > 1000) {
            this.triggerAlert("Slow API Response", `${metric.name} took ${metric.value}ms to complete`, "warning", { metric });
        }
    }
    // New method for gauge metrics
    setGauge(name, value, min = 0, max = 100, unit = "%", thresholds) {
        const metric = {
            name,
            value,
            min,
            max,
            unit,
            thresholds,
            timestamp: new Date(),
        };
        // Update existing gauge or add new one
        const existingIndex = this.gaugeMetrics.findIndex((g) => g.name === name);
        if (existingIndex >= 0) {
            this.gaugeMetrics[existingIndex] = metric;
        }
        else {
            this.gaugeMetrics.push(metric);
        }
        // Check thresholds and trigger alerts if necessary
        if (thresholds) {
            if (value >= thresholds.critical) {
                this.triggerAlert(`Critical ${name}`, `${name} is at ${value}${unit}, which exceeds critical threshold of ${thresholds.critical}${unit}`, "critical", { metric });
            }
            else if (value >= thresholds.warning) {
                this.triggerAlert(`Warning ${name}`, `${name} is at ${value}${unit}, which exceeds warning threshold of ${thresholds.warning}${unit}`, "warning", { metric });
            }
        }
    }
    // Get all gauge metrics
    getGaugeMetrics() {
        return [...this.gaugeMetrics];
    }
    // New method for timing metrics
    recordTiming(name, duration, category = "general") {
        const metric = {
            name,
            duration,
            category,
            timestamp: new Date(),
        };
        this.timingMetrics.push(metric);
        // Alert on slow operations
        if (duration > 3000) {
            this.triggerAlert("Slow Operation", `${name} took ${duration}ms to complete`, "warning", { metric });
        }
    }
    // Get timing metrics
    getTimingMetrics(category) {
        if (category) {
            return [...this.timingMetrics].filter((m) => m.category === category);
        }
        return [...this.timingMetrics];
    }
    getPerformanceMetrics(limit = 100) {
        return [...this.performanceMetrics]
            .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
            .slice(0, limit);
    }
}
// Singleton instance
export const monitoring = new MonitoringSystem();
// Utility functions for health check
export function checkSystemHealth() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Check Supabase connection
            const supabaseCheck = yield checkSupabaseConnection();
            // Check other critical services (you can expand this)
            const services = {
                database: supabaseCheck,
                authentication: yield checkAuthService(),
                api: yield checkApiService(),
            };
            // Determine overall system status
            const overallStatus = determineOverallStatus(services);
            return {
                status: overallStatus,
                services,
                environment: import.meta.env.MODE || "development",
                version: import.meta.env.VITE_APP_VERSION || "1.0.0",
                uptime: process.uptime ? process.uptime() * 1000 : undefined,
            };
        }
        catch (error) {
            console.error("System health check failed:", error);
            return {
                status: "unhealthy",
                services: {},
                environment: import.meta.env.MODE || "development",
            };
        }
    });
}
function checkSupabaseConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const start = Date.now();
            const { data, error } = yield supabase
                .from("system_settings")
                .select("key")
                .limit(1);
            const responseTime = Date.now() - start;
            if (error) {
                return {
                    status: "unhealthy",
                    responseTime,
                };
            }
            return {
                status: responseTime < 500 ? "healthy" : "degraded",
                responseTime,
            };
        }
        catch (_a) {
            return {
                status: "unhealthy",
            };
        }
    });
}
function checkAuthService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const start = Date.now();
            const { data } = yield supabase.auth.getSession();
            const responseTime = Date.now() - start;
            return {
                status: responseTime < 300 ? "healthy" : "degraded",
                responseTime,
            };
        }
        catch (_a) {
            return {
                status: "unhealthy",
            };
        }
    });
}
function checkApiService() {
    return __awaiter(this, void 0, void 0, function* () {
        // Simulated API check - replace with actual API endpoint if available
        const start = Date.now();
        yield new Promise((resolve) => setTimeout(resolve, 100));
        const responseTime = Date.now() - start;
        return {
            status: responseTime < 200 ? "healthy" : "degraded",
            responseTime,
        };
    });
}
function determineOverallStatus(services) {
    const statuses = Object.values(services).map((service) => service.status);
    if (statuses.some((status) => status === "unhealthy"))
        return "unhealthy";
    if (statuses.some((status) => status === "degraded"))
        return "degraded";
    return "healthy";
}
// Helper functions for reporting different types of alerts
export function reportInfo(title, message, metadata) {
    return monitoring.triggerAlert(title, message, "info", metadata);
}
export function reportWarning(title, message, metadata) {
    return monitoring.triggerAlert(title, message, "warning", metadata);
}
export function reportError(title, message, metadata) {
    return monitoring.triggerAlert(title, message, "error", metadata);
}
export function reportCritical(title, message, metadata) {
    return monitoring.triggerAlert(title, message, "critical", metadata);
}


/**
 * Audit logger utility to track system changes and compliance events
 */

type LogLevel = 'info' | 'warning' | 'error' | 'critical';

interface AuditLogEntry {
  timestamp: string;
  userId: string;
  action: string;
  details?: Record<string, any>;
  level: LogLevel;
}

/**
 * Logs a compliance-related change for auditing purposes
 */
export function logComplianceChange(
  userId: string, 
  action: string, 
  details?: Record<string, any>
) {
  const logEntry: AuditLogEntry = {
    timestamp: new Date().toISOString(),
    userId,
    action,
    details,
    level: 'info'
  };

  // Log to console in development mode
  if (process.env.NODE_ENV !== 'production') {
    console.info('Compliance Change:', logEntry);
  }

  // In a production environment, we would send this to a backend service or Supabase
  try {
    // Code to send to backend would be here
    return true;
  } catch (error) {
    console.error('Failed to log compliance change:', error);
    return false;
  }
}

/**
 * Logs a system change for auditing purposes
 */
export function logSystemChange(
  userId: string,
  action: string,
  details?: Record<string, any>,
  level: LogLevel = 'info'
) {
  const logEntry: AuditLogEntry = {
    timestamp: new Date().toISOString(),
    userId,
    action,
    details,
    level
  };

  // Log to console in development mode
  if (process.env.NODE_ENV !== 'production') {
    console.info('System Change:', logEntry);
  }

  // In a production environment, we would send this to a backend service or Supabase
  try {
    // Code to send to backend would be here
    return true;
  } catch (error) {
    console.error('Failed to log system change:', error);
    return false;
  }
}

/**
 * Logs a security event for auditing purposes
 */
export function logSecurityEvent(
  userId: string,
  action: string,
  details?: Record<string, any>
) {
  const logEntry: AuditLogEntry = {
    timestamp: new Date().toISOString(),
    userId,
    action,
    details,
    level: 'warning'
  };

  // Always log security events
  console.warn('Security Event:', logEntry);

  // In a production environment, we would send this to a backend service or Supabase
  try {
    // Code to send to backend would be here
    return true;
  } catch (error) {
    console.error('Failed to log security event:', error);
    return false;
  }
}

// Export a default logger with all methods
export const auditLogger = {
  logComplianceChange,
  logSystemChange,
  logSecurityEvent
};

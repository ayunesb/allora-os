
/**
 * Logger utility for security and audit events
 */

export interface AuditEvent {
  user?: string;
  action: string;
  resource: string;
  details?: Record<string, any>;
  result?: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  timestamp?: string;
}

/**
 * Log a security-related event for audit purposes
 */
export const logSecurityEvent = async (event: AuditEvent): Promise<void> => {
  const enhancedEvent = {
    ...event,
    timestamp: event.timestamp || new Date().toISOString(),
    type: 'security',
  };
  
  console.log('[Security Event]:', enhancedEvent);
  
  // In a real implementation, this would send the event to a logging service
  return Promise.resolve();
};

/**
 * Log an audit event for tracking system changes
 */
export const logAuditEvent = async (event: AuditEvent): Promise<void> => {
  const enhancedEvent = {
    ...event,
    timestamp: event.timestamp || new Date().toISOString(),
    type: 'audit',
  };
  
  console.log('[Audit Event]:', enhancedEvent);
  
  // In a real implementation, this would send the event to a logging service
  return Promise.resolve();
};

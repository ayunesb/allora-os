
import { supabase } from "@/integrations/supabase/client";

export interface AuditEvent {
  user: string;
  action: 'USER_ACTION' | 'SYSTEM_CHANGE' | 'SECURITY_EVENT' | 'DATA_ACCESS';
  resource: string;
  details: any;
  timestamp?: string;
  ip_address?: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  event_id?: string;
}

export const logAuditEvent = async (event: AuditEvent): Promise<void> => {
  try {
    const timestamp = event.timestamp || new Date().toISOString();
    const eventId = event.event_id || `evt_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    
    console.log(`[AUDIT LOG] ${timestamp} | ${event.user} | ${event.action} | ${event.resource} | ${JSON.stringify(event.details)}`);
    
    // For production, we would use a Supabase table for auditing
    // const { error } = await supabase
    //   .from('audit_logs')
    //   .insert({
    //     user_id: event.user,
    //     action: event.action,
    //     resource: event.resource,
    //     details: event.details,
    //     timestamp: timestamp,
    //     ip_address: event.ip_address,
    //     severity: event.severity || 'low',
    //     event_id: eventId
    //   });
    
    // if (error) {
    //   console.error("Error logging audit event to database:", error);
    // }
  } catch (error) {
    console.error("Failed to log audit event:", error);
  }
};

export const logComplianceChange = async (
  userId: string,
  description: string,
  details: any
): Promise<void> => {
  try {
    await logAuditEvent({
      user: userId,
      action: 'SYSTEM_CHANGE',
      resource: 'compliance_documents',
      details: {
        description,
        ...details,
      },
      severity: 'high'
    });
    
    console.log(`[COMPLIANCE CHANGE] ${new Date().toISOString()} | ${userId} | ${description}`);
  } catch (error) {
    console.error("Failed to log compliance change:", error);
  }
};

// Enhanced security event logging with severity levels and traceability
export const logSecurityEvent = async (event: AuditEvent): Promise<string> => {
  try {
    const timestamp = event.timestamp || new Date().toISOString();
    const eventId = `sec_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    
    console.log(`[SECURITY EVENT] ${timestamp} | ${event.user} | ${event.resource} | ${JSON.stringify(event.details)}`);
    
    // For critical security events, implement real-time alerting
    if (event.severity === 'critical' || 
        event.resource === 'admin_verification' || 
        event.resource === 'api_key_usage') {
      // In production, this would trigger an alert to security teams
      console.warn(`[CRITICAL SECURITY ALERT] ${timestamp} | ${event.resource}`);
      // alertSecurityTeam(event); // Would be implemented with a notification API
    }
    
    // Log the event with the generated event ID for traceability
    await logAuditEvent({
      ...event,
      event_id: eventId
    });
    
    // Return the event ID so it can be referenced in related logs
    return eventId;
  } catch (error) {
    console.error("Failed to log security event:", error);
    return '';
  }
};

export const logSystemChange = async (
  userId: string,
  resource: string,
  description: string,
  details: any
): Promise<void> => {
  try {
    await logAuditEvent({
      user: userId,
      action: 'SYSTEM_CHANGE',
      resource,
      details: {
        description,
        ...details,
      },
      severity: resource.includes('security') ? 'high' : 'medium'
    });
    
    console.log(`[SYSTEM CHANGE] ${new Date().toISOString()} | ${userId} | ${resource} | ${description}`);
  } catch (error) {
    console.error("Failed to log system change:", error);
  }
};

// New function for data access logging
export const logDataAccess = async (
  userId: string,
  resource: string,
  operation: 'read' | 'write' | 'delete',
  resourceId: string,
  details?: any
): Promise<void> => {
  try {
    await logAuditEvent({
      user: userId,
      action: 'DATA_ACCESS',
      resource,
      details: {
        operation,
        resourceId,
        ...details
      },
      severity: operation === 'delete' ? 'high' : 'low'
    });
  } catch (error) {
    console.error("Failed to log data access:", error);
  }
};

// New function for failed authentication attempts
export const logAuthAttempt = async (
  userId: string,
  success: boolean,
  ipAddress?: string,
  details?: any
): Promise<void> => {
  try {
    const eventId = `auth_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    
    await logAuditEvent({
      user: userId,
      action: 'SECURITY_EVENT',
      resource: 'authentication',
      details: {
        success,
        attempt_time: new Date().toISOString(),
        ...details
      },
      ip_address: ipAddress,
      severity: success ? 'low' : 'medium',
      event_id: eventId
    });
    
    // Track failed login attempts for potential brute force detection
    if (!success) {
      // In production, this would check for repeated failures and trigger alerts
      console.warn(`[FAILED AUTH] ${new Date().toISOString()} | ${userId} | ${ipAddress || 'unknown'}`);
    }
  } catch (error) {
    console.error("Failed to log auth attempt:", error);
  }
};

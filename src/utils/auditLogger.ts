
import { supabase } from "@/integrations/supabase/client";

export interface AuditEvent {
  user: string;
  action: 'USER_ACTION' | 'SYSTEM_CHANGE' | 'SECURITY_EVENT' | 'DATA_ACCESS';
  resource: string;
  details: any;
  timestamp?: string;
  ip_address?: string;
}

export const logAuditEvent = async (event: AuditEvent): Promise<void> => {
  try {
    const timestamp = event.timestamp || new Date().toISOString();
    
    // In a real app, this would write to a proper audit log table
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
    //     ip_address: event.ip_address
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
      }
    });
    
    console.log(`[COMPLIANCE CHANGE] ${new Date().toISOString()} | ${userId} | ${description}`);
    
    // For production, we would also store this in a specific compliance table
    // const { error } = await supabase
    //   .from('compliance_audit')
    //   .insert({
    //     user_id: userId,
    //     description, 
    //     details,
    //     timestamp: new Date().toISOString()
    //   });
      
    // if (error) {
    //   console.error("Error logging compliance change:", error);
    // }
  } catch (error) {
    console.error("Failed to log compliance change:", error);
  }
};

// Enhanced security event logging
export const logSecurityEvent = async (event: AuditEvent): Promise<void> => {
  try {
    const timestamp = event.timestamp || new Date().toISOString();
    
    console.log(`[SECURITY EVENT] ${timestamp} | ${event.user} | ${event.resource} | ${JSON.stringify(event.details)}`);
    
    // For production, we would also send critical security events to an incident management system
    if (event.details?.severity === 'critical' || 
        event.resource === 'admin_verification' || 
        event.resource === 'api_key_usage') {
      // alertSecurityTeam(event); // Would be implemented with a notification API
    }
    
    return await logAuditEvent(event);
  } catch (error) {
    console.error("Failed to log security event:", error);
  }
};

// Add the missing logSystemChange function
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
      }
    });
    
    console.log(`[SYSTEM CHANGE] ${new Date().toISOString()} | ${userId} | ${resource} | ${description}`);
    
  } catch (error) {
    console.error("Failed to log system change:", error);
  }
};

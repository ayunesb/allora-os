
import { supabase } from '@/integrations/supabase/client';

export type AuditLogAction = 
  | 'DATA_ACCESS'
  | 'DATA_MODIFICATION'
  | 'SYSTEM_CHANGE'
  | 'AUTHENTICATION'
  | 'EXPORT'
  | 'COMPLIANCE_CHANGE';

export type AuditLogResource =
  | 'customer_records'
  | 'financial_data'
  | 'security_settings'
  | 'login_service'
  | 'product_database'
  | 'compliance_settings'
  | 'data_policies';

interface AuditLogEntry {
  user: string;
  action: AuditLogAction;
  resource: AuditLogResource;
  details: string;
  ip?: string;
  metadata?: Record<string, any>;
}

/**
 * Logs an audit event for compliance tracking
 */
export const logAuditEvent = async (entry: AuditLogEntry): Promise<boolean> => {
  try {
    // Get client IP address - this would need server-side implementation in a real app
    const ip = entry.ip || '127.0.0.1';
    
    // In a production app, this would typically insert into a database table
    // For demo, we're just logging to console
    console.log('AUDIT LOG:', {
      timestamp: new Date().toISOString(),
      ...entry,
      ip
    });
    
    // In a real implementation, you would insert into the database:
    // const { error } = await supabase
    //   .from('audit_logs')
    //   .insert({
    //     user_id: entry.user,
    //     action: entry.action,
    //     resource: entry.resource,
    //     details: entry.details,
    //     ip_address: ip,
    //     metadata: entry.metadata
    //   });
    
    // if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error logging audit event:', error);
    return false;
  }
};

/**
 * Helper function to log data access events
 */
export const logDataAccess = (
  user: string, 
  resource: AuditLogResource, 
  details: string,
  metadata?: Record<string, any>
): Promise<boolean> => {
  return logAuditEvent({
    user,
    action: 'DATA_ACCESS',
    resource,
    details,
    metadata
  });
};

/**
 * Helper function to log data modification events
 */
export const logDataModification = (
  user: string, 
  resource: AuditLogResource, 
  details: string,
  metadata?: Record<string, any>
): Promise<boolean> => {
  return logAuditEvent({
    user,
    action: 'DATA_MODIFICATION',
    resource,
    details,
    metadata
  });
};

/**
 * Helper function to log system changes
 */
export const logSystemChange = (
  user: string, 
  resource: AuditLogResource, 
  details: string,
  metadata?: Record<string, any>
): Promise<boolean> => {
  return logAuditEvent({
    user,
    action: 'SYSTEM_CHANGE',
    resource,
    details,
    metadata
  });
};

/**
 * Helper function to log compliance policy changes
 */
export const logComplianceChange = (
  user: string, 
  details: string,
  metadata?: Record<string, any>
): Promise<boolean> => {
  return logAuditEvent({
    user,
    action: 'COMPLIANCE_CHANGE',
    resource: 'compliance_settings',
    details,
    metadata
  });
};

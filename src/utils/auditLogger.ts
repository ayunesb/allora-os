
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/loggingService';

/**
 * Log a security event to the audit log
 * 
 * @param eventType The type of security event
 * @param details Details about the event
 * @param userId Optional user ID associated with the event
 * @param severity Severity level of the event (1-5, where 5 is most severe)
 * @param metadata Any additional metadata to log
 * @returns Success status
 */
export async function logSecurityEvent(
  eventType: string, 
  details: string, 
  userId?: string, 
  severity: number = 1,
  metadata?: Record<string, any>
): Promise<boolean> {
  try {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      logger.warn(`SECURITY EVENT [${severity}]: ${eventType} - ${details} ${userId ? `(User: ${userId})` : ''}`);
    }
    
    // Log to audit_logs table in Supabase
    await supabase.from('audit_logs').insert({
      type: 'security',
      event: eventType,
      details,
      user_id: userId || null,
      severity,
      metadata: metadata || {},
      tenant_id: 'development'
    });
    
    return true;
  } catch (error) {
    logger.error('Failed to log security event', error);
    return false;
  }
}

/**
 * Log an audit event for compliance or record-keeping
 * 
 * @param action The type of audit event
 * @param resource Resource being modified
 * @param details Additional event details
 * @param userId Optional user ID associated with the event
 */
export async function logAuditEvent(
  params: {
    action: string;
    resource?: string;
    details: any;
    user_id?: string;
  }
): Promise<boolean> {
  try {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      logger.info(`AUDIT EVENT: ${params.action} - ${JSON.stringify(params.details)} ${params.user_id ? `(User: ${params.user_id})` : ''}`);
    }
    
    // Log to audit_logs table in Supabase
    await supabase.from('audit_logs').insert({
      action: params.action,
      resource: params.resource,
      details: params.details,
      user_id: params.user_id,
      tenant_id: 'development'
    });
    
    return true;
  } catch (error) {
    logger.error('Failed to log audit event', error);
    return false;
  }
}

/**
 * Log a system change event
 */
export const logSystemChange = async (
  action: string,
  details: any,
  userId?: string
): Promise<boolean> => {
  return logAuditEvent({
    action: 'SYSTEM_CHANGE',
    resource: action,
    details,
    user_id: userId
  });
};

/**
 * Log a compliance change for audit purposes
 * 
 * @param userId User who made the change
 * @param details Details about the compliance change
 * @param metadata Any additional metadata to log
 * @returns Success status
 */
export async function logComplianceChange(
  userId: string,
  details: string,
  metadata?: Record<string, any>
): Promise<boolean> {
  try {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      logger.info(`COMPLIANCE CHANGE: ${details} ${userId ? `(User: ${userId})` : ''}`);
    }
    
    // Log to audit_logs table in Supabase
    await supabase.from('audit_logs').insert({
      type: 'compliance',
      event: 'compliance_change',
      details,
      user_id: userId || null,
      metadata: metadata || {},
      tenant_id: 'development'
    });
    
    return true;
  } catch (error) {
    logger.error('Failed to log compliance change', error);
    return false;
  }
}

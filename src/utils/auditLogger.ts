
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
    await supabase.from('agent_logs').insert({
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
 * @param eventType The type of audit event
 * @param details Details about the event
 * @param userId Optional user ID associated with the event
 * @param metadata Any additional metadata to log
 * @returns Success status
 */
export async function logAuditEvent(
  eventType: string,
  details: string,
  userId?: string,
  metadata?: Record<string, any>
): Promise<boolean> {
  try {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      logger.info(`AUDIT EVENT: ${eventType} - ${details} ${userId ? `(User: ${userId})` : ''}`);
    }
    
    // Log to audit_logs table in Supabase
    await supabase.from('agent_logs').insert({
      type: 'audit',
      event: eventType,
      details,
      user_id: userId || null,
      metadata: metadata || {},
      tenant_id: 'development'
    });
    
    return true;
  } catch (error) {
    logger.error('Failed to log audit event', error);
    return false;
  }
}

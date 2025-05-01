
import { logger } from './loggingService';
import { supabase } from '@/integrations/supabase/client';

/**
 * Logs a security-related event
 */
export async function logSecurityEvent(event: {
  user: string;
  action: string;
  resource: string;
  details?: Record<string, any>;
  severity?: 'low' | 'medium' | 'high';
}): Promise<string> {
  try {
    // Log locally first
    logger.info(`Security event: ${event.action} on ${event.resource}`, {
      ...event.details,
      severity: event.severity || 'low',
    });
    
    // Also log to the database if available
    if (supabase) {
      const { data, error } = await supabase.from('audit_logs').insert({
        user_id: event.user,
        action: event.action,
        resource: event.resource,
        details: event.details || {},
        severity: event.severity || 'low',
      }).select();
      
      if (error) {
        logger.error('Failed to log security event to database', error);
      } else if (data && data[0]) {
        return data[0].id;
      }
    }
    
    return 'local-log-only';
  } catch (error) {
    logger.error('Failed to log security event', error);
    return 'error-logging';
  }
}

/**
 * Logs a compliance-related change to both the local logger and the database
 */
export async function logComplianceChange(
  userId: string, 
  action: string, 
  details?: Record<string, any>
): Promise<void> {
  // Log locally first
  logger.info(`Compliance change: ${action}`, { userId, ...details });
  
  try {
    // Also log to the database if available
    if (supabase) {
      await supabase.from('audit_logs').insert({
        user_id: userId,
        action,
        resource: 'compliance',
        details,
        created_at: new Date().toISOString()
      });
    }
  } catch (error) {
    // Just log the error but don't fail the operation
    logger.error('Failed to save compliance audit log to database', error);
  }
}

/**
 * Logs an audit event for general application events
 */
export async function logAuditEvent(event: {
  user?: string;
  action: string;
  resource: string;
  details?: Record<string, any>;
  severity?: string;
}): Promise<void> {
  try {
    // Log locally first
    logger.info(`Audit event: ${event.action} on ${event.resource}`, {
      ...event.details,
      severity: event.severity || 'info',
    });
    
    // Also log to the database if available
    if (supabase) {
      await supabase.from('audit_logs').insert({
        user_id: event.user,
        action: event.action,
        resource: event.resource,
        details: event.details || {},
      });
    }
  } catch (error) {
    logger.error('Failed to log audit event', error);
  }
}

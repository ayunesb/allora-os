
import { logger } from './loggingService';
import { supabase } from '@/integrations/supabase/client';

/**
 * Logs a compliance-related change to both the local logger and the database
 * @param userId The user who made the change
 * @param action Description of the action taken
 * @param details Optional details about the action
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
      await supabase.from('compliance_audit_logs').insert({
        user_id: userId,
        action,
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
 * Gets recent compliance audit logs
 * @param limit Number of logs to retrieve
 */
export async function getComplianceAuditLogs(limit = 50) {
  try {
    if (!supabase) {
      return [];
    }
    
    const { data, error } = await supabase
      .from('compliance_audit_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    logger.error('Failed to retrieve compliance audit logs', error);
    return [];
  }
}

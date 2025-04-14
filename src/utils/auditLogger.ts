
import { supabase } from '@/integrations/supabase/client';

export interface AuditEventPayload {
  action: 'USER_ACTION' | 'SYSTEM_CHANGE' | 'SECURITY_EVENT' | 'ERROR';
  resource: string;
  resourceId?: string;
  userId?: string;
  details?: any;
  ip?: string;
  status?: 'SUCCESS' | 'FAILURE' | 'PENDING';
}

/**
 * Logs an audit event to the system
 */
export async function logAuditEvent(payload: AuditEventPayload): Promise<void> {
  try {
    // Get current user
    const { data } = await supabase.auth.getUser();
    const userId = data?.user?.id;
    
    // Log the event
    await supabase.from('audit_logs').insert({
      action: payload.action,
      resource: payload.resource,
      resource_id: payload.resourceId,
      user_id: payload.userId || userId,
      details: payload.details,
      ip_address: payload.ip,
      status: payload.status || 'SUCCESS'
    });
  } catch (error) {
    console.error('Error logging audit event:', error);
    // We don't throw here to prevent errors in the audit system from affecting application flow
  }
}

/**
 * Gets audit logs for a resource
 */
export async function getAuditLogsForResource(
  resource: string,
  resourceId?: string,
  limit: number = 20
): Promise<any[]> {
  try {
    let query = supabase
      .from('audit_logs')
      .select('*')
      .eq('resource', resource)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (resourceId) {
      query = query.eq('resource_id', resourceId);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching audit logs:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in getAuditLogsForResource:', error);
    return [];
  }
}

/**
 * Gets recent audit logs for system activity
 */
export async function getRecentSystemActivity(limit: number = 10): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from('audit_logs')
      .select(`
        *,
        profiles:user_id(name, avatar_url)
      `)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) {
      console.error('Error fetching recent system activity:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in getRecentSystemActivity:', error);
    return [];
  }
}

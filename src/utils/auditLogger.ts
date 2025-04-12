
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
    
  } catch (error) {
    console.error("Failed to log compliance change:", error);
  }
};

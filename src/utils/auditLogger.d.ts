type SecurityEventDetails = {
    user: string;
    action: string;
    resource: string;
    details?: Record<string, any>;
    severity?: 'low' | 'medium' | 'high';
};
/**
 * Log a security event to the audit log
 */
export declare function logSecurityEvent(eventDetails: SecurityEventDetails): Promise<boolean>;
/**
 * Legacy signature for backwards compatibility
 */
export declare function logSecurityEvent(eventType: string, details: string, userId?: string, severity?: number, metadata?: Record<string, any>): Promise<boolean>;
/**
 * Log an audit event for compliance or record-keeping
 *
 * @param eventType The type of audit event
 * @param details Details about the event
 * @param userId Optional user ID associated with the event
 * @param metadata Any additional metadata to log
 * @returns Success status
 */
export declare function logAuditEvent(eventType: string, details: string, userId?: string, metadata?: Record<string, any>): Promise<boolean>;
/**
 * Log a compliance change for audit purposes
 *
 * @param userId User who made the change
 * @param details Details about the compliance change
 * @param metadata Any additional metadata to log
 * @returns Success status
 */
export declare function logComplianceChange(userId: string, details: string, metadata?: Record<string, any>): Promise<boolean>;
export declare const log: typeof logAuditEvent;
export declare const logSystemChange: typeof logAuditEvent;
export {};

import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/utils/loggingService";

type SecurityEventDetails = {
  user: string;
  action: string;
  resource: string;
  details?: Record<string, any>;
  severity?: "low" | "medium" | "high";
};

/**
 * Log a security event to the audit log
 */
export async function logSecurityEvent(
  eventDetails: SecurityEventDetails,
): Promise<boolean>;

/**
 * Legacy signature for backwards compatibility
 */
export async function logSecurityEvent(
  eventType: string,
  details: string,
  userId?: string,
  severity?: number,
  metadata?: Record<string, any>,
): Promise<boolean>;

export async function logSecurityEvent(
  eventTypeOrDetails: string | SecurityEventDetails,
  details?: string,
  userId?: string,
  severity: number = 1,
  metadata?: Record<string, any>,
): Promise<boolean> {
  try {
    // Handle new format
    if (typeof eventTypeOrDetails === "object") {
      const { user, action, resource, details, severity } = eventTypeOrDetails;

      // Log to console in development
      if (process.env.NODE_ENV === "development") {
        logger.warn(
          `SECURITY EVENT [${severity}]: ${action} - ${resource} ${user ? `(User: ${user})` : ""}`,
        );
      }

      // Log to audit_logs table in Supabase
      await supabase.from("agent_logs").insert({
        type: "security",
        event: action,
        details: JSON.stringify(details || {}),
        user_id: user || null,
        severity: severity === "high" ? 3 : severity === "medium" ? 2 : 1,
        metadata: details || {},
        tenant_id: "development",
      });

      return true;
    }

    // Legacy format
    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      logger.warn(
        `SECURITY EVENT [${severity}]: ${eventTypeOrDetails} - ${details} ${userId ? `(User: ${userId})` : ""}`,
      );
    }

    // Log to audit_logs table in Supabase
    await supabase.from("agent_logs").insert({
      type: "security",
      event: eventTypeOrDetails,
      details,
      user_id: userId || null,
      severity,
      metadata: metadata || {},
      tenant_id: "development",
    });

    return true;
  } catch (error) {
    logger.error("Failed to log security event", error);
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
  metadata?: Record<string, any>,
): Promise<boolean> {
  try {
    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      logger.info(
        `AUDIT EVENT: ${eventType} - ${details} ${userId ? `(User: ${userId})` : ""}`,
      );
    }

    // Log to audit_logs table in Supabase
    await supabase.from("agent_logs").insert({
      type: "audit",
      event: eventType,
      details,
      user_id: userId || null,
      metadata: metadata || {},
      tenant_id: "development",
    });

    return true;
  } catch (error) {
    logger.error("Failed to log audit event", error);
    return false;
  }
}

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
  metadata?: Record<string, any>,
): Promise<boolean> {
  try {
    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      logger.info(
        `COMPLIANCE CHANGE: ${details} ${userId ? `(User: ${userId})` : ""}`,
      );
    }

    // Log to audit_logs table in Supabase
    await supabase.from("agent_logs").insert({
      type: "compliance",
      event: "compliance_change",
      details,
      user_id: userId || null,
      metadata: metadata || {},
      tenant_id: "development",
    });

    return true;
  } catch (error) {
    logger.error("Failed to log compliance change", error);
    return false;
  }
}

// Add the log export that was missing and causing errors
export const log = logAuditEvent;

// Also add logSystemChange for backward compatibility
export const logSystemChange = logAuditEvent;

function logAudit({
  severity = 1,
  eventType,
  details,
  userId,
  metadata,
}: {
  severity?: number;
  eventType: string;
  details: string;
  userId?: string;
  metadata?: Record<string, any>;
}) {
  // ...existing code...
}

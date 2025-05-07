var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/utils/loggingService";
export function logSecurityEvent(eventTypeOrDetails_1, details_1, userId_1) {
    return __awaiter(this, arguments, void 0, function* (eventTypeOrDetails, details, userId, severity = 1, metadata) {
        try {
            // Handle new format
            if (typeof eventTypeOrDetails === "object") {
                const { user, action, resource, details, severity } = eventTypeOrDetails;
                // Log to console in development
                if (process.env.NODE_ENV === "development") {
                    logger.warn(`SECURITY EVENT [${severity}]: ${action} - ${resource} ${user ? `(User: ${user})` : ""}`);
                }
                // Log to audit_logs table in Supabase
                yield supabase.from("agent_logs").insert({
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
                logger.warn(`SECURITY EVENT [${severity}]: ${eventTypeOrDetails} - ${details} ${userId ? `(User: ${userId})` : ""}`);
            }
            // Log to audit_logs table in Supabase
            yield supabase.from("agent_logs").insert({
                type: "security",
                event: eventTypeOrDetails,
                details,
                user_id: userId || null,
                severity,
                metadata: metadata || {},
                tenant_id: "development",
            });
            return true;
        }
        catch (error) {
            logger.error("Failed to log security event", error);
            return false;
        }
    });
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
export function logAuditEvent(eventType, details, userId, metadata) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Log to console in development
            if (process.env.NODE_ENV === "development") {
                logger.info(`AUDIT EVENT: ${eventType} - ${details} ${userId ? `(User: ${userId})` : ""}`);
            }
            // Log to audit_logs table in Supabase
            yield supabase.from("agent_logs").insert({
                type: "audit",
                event: eventType,
                details,
                user_id: userId || null,
                metadata: metadata || {},
                tenant_id: "development",
            });
            return true;
        }
        catch (error) {
            logger.error("Failed to log audit event", error);
            return false;
        }
    });
}
/**
 * Log a compliance change for audit purposes
 *
 * @param userId User who made the change
 * @param details Details about the compliance change
 * @param metadata Any additional metadata to log
 * @returns Success status
 */
export function logComplianceChange(userId, details, metadata) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Log to console in development
            if (process.env.NODE_ENV === "development") {
                logger.info(`COMPLIANCE CHANGE: ${details} ${userId ? `(User: ${userId})` : ""}`);
            }
            // Log to audit_logs table in Supabase
            yield supabase.from("agent_logs").insert({
                type: "compliance",
                event: "compliance_change",
                details,
                user_id: userId || null,
                metadata: metadata || {},
                tenant_id: "development",
            });
            return true;
        }
        catch (error) {
            logger.error("Failed to log compliance change", error);
            return false;
        }
    });
}
// Add the log export that was missing and causing errors
export const log = logAuditEvent;
// Also add logSystemChange for backward compatibility
export const logSystemChange = logAuditEvent;
function logAudit({ severity = 1, eventType, details, userId, metadata, }) {
    // ...existing code...
}

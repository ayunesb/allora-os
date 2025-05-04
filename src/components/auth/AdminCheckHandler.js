import { useState, useEffect } from "react";
import { checkIfUserIsAdmin } from "@/utils/adminHelper";
import { logSecurityEvent } from "@/utils/auditLogger";
export const AdminCheckHandler = ({ user, roleRequired, adminOnly, hasInitialized, children }) => {
    const [adminCheckDone, setAdminCheckDone] = useState(false);
    const [isUserAdmin, setIsUserAdmin] = useState(false);
    const [verificationAttempts, setVerificationAttempts] = useState(0);
    const [lastVerificationTime, setLastVerificationTime] = useState(null);
    // Enhanced security check with detailed logging and timing analysis
    useEffect(() => {
        const verifyAdminStatus = async () => {
            if (user && (adminOnly || roleRequired === 'admin')) {
                try {
                    // Implement rate limiting for admin verification attempts
                    if (lastVerificationTime && new Date().getTime() - lastVerificationTime.getTime() < 1000) {
                        console.warn("Admin verification attempts happening too quickly - possible abuse");
                        // Log suspicious rapid verification attempts
                        await logSecurityEvent({
                            user: user.email || user.id || 'unknown',
                            action: 'SECURITY_EVENT',
                            resource: 'admin_verification',
                            details: {
                                warning: 'Rapid verification attempts detected',
                                attempts_count: verificationAttempts + 1,
                                time_window: 'less than 1 second',
                            },
                            severity: 'high'
                        });
                        // Still proceed with verification but with increased logging
                    }
                    // Track verification attempts for security monitoring
                    setVerificationAttempts(prev => prev + 1);
                    setLastVerificationTime(new Date());
                    // Log the admin verification attempt for security audit
                    await logSecurityEvent({
                        user: user.email || user.id || 'unknown',
                        action: 'SECURITY_EVENT',
                        resource: 'admin_verification',
                        details: {
                            attempt: verificationAttempts + 1,
                            method: 'database_check',
                            timestamp: new Date().toISOString(),
                            user_agent: navigator.userAgent,
                            route: window.location.pathname
                        },
                        severity: verificationAttempts > 3 ? 'high' : 'medium'
                    });
                    const startTime = performance.now();
                    const isAdmin = await checkIfUserIsAdmin();
                    const endTime = performance.now();
                    console.log('Admin check result:', isAdmin, 'for user:', user.email, `(took ${endTime - startTime}ms)`);
                    setIsUserAdmin(isAdmin);
                    setAdminCheckDone(true);
                    // Log the verification result with timing information
                    await logSecurityEvent({
                        user: user.email || user.id || 'unknown',
                        action: 'SECURITY_EVENT',
                        resource: 'admin_verification',
                        details: {
                            result: isAdmin ? 'success' : 'denied',
                            timestamp: new Date().toISOString(),
                            verification_time_ms: Math.round(endTime - startTime),
                            total_attempts: verificationAttempts + 1
                        },
                        severity: isAdmin ? 'medium' : 'high'
                    });
                    // Alert on suspicious activity: multiple failed attempts
                    if (!isAdmin && verificationAttempts > 3) {
                        console.error(`Suspicious admin access attempts by user: ${user.email || user.id}`);
                        // In production, this would trigger a security alert
                    }
                }
                catch (error) {
                    console.error('Error checking admin status:', error);
                    // Log the verification error with detailed information
                    await logSecurityEvent({
                        user: user.email || user.id || 'unknown',
                        action: 'SECURITY_EVENT',
                        resource: 'admin_verification',
                        details: {
                            result: 'error',
                            error: error instanceof Error ? error.message : String(error),
                            timestamp: new Date().toISOString(),
                            stack: error instanceof Error ? error.stack : undefined
                        },
                        severity: 'high'
                    });
                    setAdminCheckDone(true); // Continue even on error
                    setIsUserAdmin(false); // Fail secure - deny admin access on error
                }
            }
            else {
                setAdminCheckDone(true);
            }
        };
        if (user && !adminCheckDone && hasInitialized) {
            verifyAdminStatus();
        }
    }, [user, adminOnly, roleRequired, adminCheckDone, hasInitialized, verificationAttempts, lastVerificationTime]);
    return <>{children(isUserAdmin, adminCheckDone)}</>;
};


import { ReactNode, useState, useEffect } from "react";
import { checkIfUserIsAdmin } from "@/utils/adminHelper";
import { logSecurityEvent } from "@/utils/auditLogger";

interface AdminCheckHandlerProps {
  user: any;
  roleRequired?: 'admin' | 'user';
  adminOnly?: boolean;
  hasInitialized: boolean;
  children: (isUserAdmin: boolean, adminCheckDone: boolean) => ReactNode;
}

export const AdminCheckHandler = ({ 
  user, 
  roleRequired, 
  adminOnly, 
  hasInitialized,
  children 
}: AdminCheckHandlerProps) => {
  const [adminCheckDone, setAdminCheckDone] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [verificationAttempts, setVerificationAttempts] = useState(0);

  // Enhanced security check with detailed logging
  useEffect(() => {
    const verifyAdminStatus = async () => {
      if (user && (adminOnly || roleRequired === 'admin')) {
        try {
          // Track verification attempts for security monitoring
          setVerificationAttempts(prev => prev + 1);
          
          // Log the admin verification attempt for security audit
          await logSecurityEvent({
            user: user.email || user.id,
            action: 'SECURITY_EVENT',
            resource: 'admin_verification',
            details: {
              attempt: verificationAttempts + 1,
              method: 'database_check',
              timestamp: new Date().toISOString()
            }
          });
          
          const isAdmin = await checkIfUserIsAdmin();
          console.log('Admin check result:', isAdmin, 'for user:', user.email);
          
          setIsUserAdmin(isAdmin);
          setAdminCheckDone(true);
          
          // Log the verification result
          await logSecurityEvent({
            user: user.email || user.id,
            action: 'SECURITY_EVENT',
            resource: 'admin_verification',
            details: {
              result: isAdmin ? 'success' : 'denied',
              timestamp: new Date().toISOString()
            }
          });
        } catch (error) {
          console.error('Error checking admin status:', error);
          
          // Log the verification error
          await logSecurityEvent({
            user: user.email || user.id,
            action: 'SECURITY_EVENT',
            resource: 'admin_verification',
            details: {
              result: 'error',
              error: error instanceof Error ? error.message : String(error),
              timestamp: new Date().toISOString()
            }
          });
          
          setAdminCheckDone(true); // Continue even on error
        }
      } else {
        setAdminCheckDone(true);
      }
    };

    if (user && !adminCheckDone && hasInitialized) {
      verifyAdminStatus();
    }
  }, [user, adminOnly, roleRequired, adminCheckDone, hasInitialized, verificationAttempts]);

  return <>{children(isUserAdmin, adminCheckDone)}</>;
};

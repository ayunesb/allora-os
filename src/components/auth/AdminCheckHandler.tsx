
import { ReactNode, useState, useEffect } from "react";
import { checkIfUserIsAdmin } from "@/utils/adminHelper";

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

  // Check admin status directly from the database
  useEffect(() => {
    const verifyAdminStatus = async () => {
      if (user && (adminOnly || roleRequired === 'admin')) {
        try {
          const isAdmin = await checkIfUserIsAdmin();
          console.log('Admin check result:', isAdmin, 'for user:', user.email);
          setIsUserAdmin(isAdmin);
          setAdminCheckDone(true);
        } catch (error) {
          console.error('Error checking admin status:', error);
          setAdminCheckDone(true); // Continue even on error
        }
      } else {
        setAdminCheckDone(true);
      }
    };

    if (user && !adminCheckDone && hasInitialized) {
      verifyAdminStatus();
    }
  }, [user, adminOnly, roleRequired, adminCheckDone, hasInitialized]);

  return <>{children(isUserAdmin, adminCheckDone)}</>;
};

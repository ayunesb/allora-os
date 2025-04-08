
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

type ProtectedRouteProps = {
  children: ReactNode;
  roleRequired?: 'admin' | 'user';
};

export default function ProtectedRoute({ children, roleRequired }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // If still loading, we could show a loading spinner
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // If not logged in, redirect to login
  if (!user) {
    toast.error("Please log in to access this page");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If role is required but user doesn't have it
  // In a real implementation, you would check against user.role or a claims/permissions system
  if (roleRequired === 'admin') {
    // For demo purposes, let's assume the first user is an admin
    // This would be replaced with proper role checking logic
    const isAdmin = user.email === 'admin@example.com';
    
    if (!isAdmin) {
      toast.error("You don't have permission to access this page");
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
}

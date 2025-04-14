
import { RouteObject, Navigate } from "react-router-dom";
import NotFound from "@/pages/NotFound";

// Global routes that should be available everywhere
export const globalRoutes: RouteObject[] = [
  // Common redirects and URL normalizations
  {
    path: "/administrator",
    element: <Navigate to="/admin" replace />,
  },
  {
    path: "/administration",
    element: <Navigate to="/admin" replace />,
  },
  {
    path: "/admins",
    element: <Navigate to="/admin" replace />,
  },
  {
    path: "/signin",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/register",
    element: <Navigate to="/signup" replace />,
  },
  {
    path: "/users",
    element: <Navigate to="/admin/entities?tab=users" replace />,
  },
  {
    path: "/companies",
    element: <Navigate to="/admin/entities?tab=companies" replace />,
  },
  {
    path: "/account",
    element: <Navigate to="/dashboard/profile" replace />,
  },
  {
    path: "/settings",
    element: <Navigate to="/dashboard/settings" replace />,
  },
  {
    path: "/campaigns",
    element: <Navigate to="/dashboard/campaigns" replace />,
  },
  {
    path: "/strategies",
    element: <Navigate to="/dashboard/strategies" replace />,
  },
  {
    path: "/board",
    element: <Navigate to="/dashboard/strategies" replace />,
  },
  {
    path: "/board-room",
    element: <Navigate to="/dashboard/strategies" replace />,
  },
  {
    path: "/leads",
    element: <Navigate to="/dashboard/leads" replace />,
  },
  {
    path: "/contacts",
    element: <Navigate to="/dashboard/leads" replace />,
  },
  {
    path: "/customers",
    element: <Navigate to="/dashboard/leads" replace />,
  },
  // Compliance section redirects
  {
    path: "/compliance-center",
    element: <Navigate to="/compliance" replace />,
  },
  {
    path: "/audit-logs",
    element: <Navigate to="/compliance/audit-logs" replace />,
  },
  {
    path: "/data-policies",
    element: <Navigate to="/compliance/data-policies" replace />,
  },
  {
    path: "/compliance-reports",
    element: <Navigate to="/compliance/reports" replace />,
  },
  // The 404 catch-all route - must be last
  {
    path: "*",
    element: <NotFound />,
  }
];

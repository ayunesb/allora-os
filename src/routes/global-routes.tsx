
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
  // Admin route redirects
  {
    path: "/admin/dashboard",
    element: <Navigate to="/admin" replace />,
  },
  {
    path: "/admin/platform-stability",
    element: <Navigate to="/admin/platform-stability" replace />,
  },
  {
    path: "/admin/user-onboarding",
    element: <Navigate to="/admin/user-onboarding" replace />,
  },
  {
    path: "/admin/ai-bot-logic",
    element: <Navigate to="/admin/ai-bot-logic" replace />,
  },
  {
    path: "/admin/dashboard-modules",
    element: <Navigate to="/admin/dashboard-modules" replace />,
  },
  {
    path: "/admin/communication-tools",
    element: <Navigate to="/admin/communication-tools" replace />,
  },
  // Compliance section redirects
  {
    path: "/compliance-center",
    element: <Navigate to="/compliance/overview" replace />,
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
  // Contact route redirects
  {
    path: "/contactus",
    element: <Navigate to="/contact" replace />,
  },
  {
    path: "/get-in-touch",
    element: <Navigate to="/contact" replace />,
  },
  {
    path: "/reach-out",
    element: <Navigate to="/contact" replace />,
  },
  // Legal page redirects
  {
    path: "/terms",
    element: <Navigate to="/legal/terms-of-service" replace />,
  },
  {
    path: "/tos",
    element: <Navigate to="/legal/terms-of-service" replace />,
  },
  {
    path: "/terms-conditions",
    element: <Navigate to="/legal/terms-of-service" replace />,
  },
  {
    path: "/privacy-policy",
    element: <Navigate to="/privacy" replace />,
  },
  {
    path: "/cookies",
    element: <Navigate to="/cookie-policy" replace />,
  },
  {
    path: "/refund",
    element: <Navigate to="/refund-policy" replace />,
  },
  {
    path: "/message-consent",
    element: <Navigate to="/messaging-consent" replace />,
  },
  // The 404 catch-all route - must be last
  {
    path: "*",
    element: <NotFound />,
  }
];

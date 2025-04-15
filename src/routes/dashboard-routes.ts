
import { RouteObject } from "react-router-dom";

export const dashboardRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    async lazy() {
      const { default: ProtectedRoute } = await import("@/components/ProtectedRoute");
      const { default: Dashboard } = await import("@/pages/dashboard/Dashboard");
      return { element: <ProtectedRoute><Dashboard /></ProtectedRoute> };
    }
  },
  {
    path: "/dashboard/campaigns",
    async lazy() {
      const { default: ProtectedRoute } = await import("@/components/ProtectedRoute");
      const { default: Campaigns } = await import("@/pages/dashboard/Campaigns");
      return { element: <ProtectedRoute><Campaigns /></ProtectedRoute> };
    }
  },
  {
    path: "/dashboard/leads",
    async lazy() {
      const { default: ProtectedRoute } = await import("@/components/ProtectedRoute");
      const { default: Leads } = await import("@/pages/dashboard/Leads");
      return { element: <ProtectedRoute><Leads /></ProtectedRoute> };
    }
  },
  {
    path: "/dashboard/ai-agent",
    async lazy() {
      const { default: ProtectedRoute } = await import("@/components/ProtectedRoute");
      const { default: AIAgent } = await import("@/pages/dashboard/AIAgent");
      return { element: <ProtectedRoute><AIAgent /></ProtectedRoute> };
    }
  }
];

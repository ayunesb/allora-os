
import { RouteObject } from "react-router-dom";

export const dashboardRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    async lazy() {
      const { default: ProtectedRoute } = await import("@/components/ProtectedRoute");
      const { default: Dashboard } = await import("@/pages/dashboard/Dashboard");
      return { 
        Component() {
          const Protected = ProtectedRoute(Dashboard);
          return <Protected />;
        }
      };
    }
  },
  {
    path: "/dashboard/campaigns",
    async lazy() {
      const { default: ProtectedRoute } = await import("@/components/ProtectedRoute");
      const { default: Campaigns } = await import("@/pages/dashboard/Campaigns");
      return { 
        Component() {
          const Protected = ProtectedRoute(Campaigns);
          return <Protected />;
        }
      };
    }
  },
  {
    path: "/dashboard/leads",
    async lazy() {
      const { default: ProtectedRoute } = await import("@/components/ProtectedRoute");
      const { default: Leads } = await import("@/pages/dashboard/Leads");
      return { 
        Component() {
          const Protected = ProtectedRoute(Leads);
          return <Protected />;
        }
      };
    }
  },
  {
    path: "/dashboard/ai-agent",
    async lazy() {
      const { default: ProtectedRoute } = await import("@/components/ProtectedRoute");
      const { default: AIAgent } = await import("@/pages/dashboard/AIAgent");
      return { 
        Component() {
          const Protected = ProtectedRoute(AIAgent);
          return <Protected />;
        }
      };
    }
  }
];

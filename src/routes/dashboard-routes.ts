
import { RouteObject } from "react-router-dom";

export const dashboardRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    async lazy() {
      const { default: ProtectedRoute } = await import("@/components/ProtectedRoute");
      const { default: Dashboard } = await import("@/pages/dashboard/Dashboard");
      return { 
        Component: () => {
          const ProtectedDashboard = ProtectedRoute(Dashboard);
          return <ProtectedDashboard />;
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
        Component: () => {
          const ProtectedCampaigns = ProtectedRoute(Campaigns);
          return <ProtectedCampaigns />;
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
        Component: () => {
          const ProtectedLeads = ProtectedRoute(Leads);
          return <ProtectedLeads />;
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
        Component: () => {
          const ProtectedAIAgent = ProtectedRoute(AIAgent);
          return <ProtectedAIAgent />;
        }
      };
    }
  }
];


import { RouteObject } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardIndex from "@/pages/dashboard/Index";
import DashboardStrategies from "@/pages/dashboard/Strategies";
import DashboardAnalytics from "@/pages/dashboard/Analytics";
import DashboardSettings from "@/pages/dashboard/Settings";
import DashboardProfile from "@/pages/dashboard/Profile";
import DashboardAiBots from "@/pages/dashboard/AiBots";
import DashboardBotDetail from "@/pages/dashboard/BotDetail";
import DashboardCampaigns from "@/pages/dashboard/Campaigns";
import DashboardLeads from "@/pages/dashboard/Leads";
import DashboardCalls from "@/pages/dashboard/Calls";
import ProtectedRoute from "@/components/ProtectedRoute";

export const dashboardRoutes: RouteObject = {
  path: "/dashboard",
  element: (
    <ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      index: true,
      element: <DashboardIndex />,
    },
    {
      path: "strategies",
      element: <DashboardStrategies />,
    },
    {
      path: "analytics",
      element: <DashboardAnalytics />,
    },
    {
      path: "settings",
      element: <DashboardSettings />,
    },
    {
      path: "profile",
      element: <DashboardProfile />,
    },
    {
      path: "ai-bots",
      element: <DashboardAiBots />,
    },
    {
      path: "ai-bots/:botId",
      element: <DashboardBotDetail />,
    },
    {
      path: "campaigns",
      element: <DashboardCampaigns />,
    },
    {
      path: "leads",
      element: <DashboardLeads />,
    },
    {
      path: "calls",
      element: <DashboardCalls />,
    },
  ],
};

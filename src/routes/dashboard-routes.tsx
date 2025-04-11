
import { RouteObject } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardIndex from "@/pages/dashboard/Index";
import DashboardStrategies from "@/pages/dashboard/Strategies";
import DashboardAnalytics from "@/pages/dashboard/Analytics";
import DashboardSettings from "@/pages/dashboard/Settings";
import DashboardProfile from "@/pages/dashboard/Profile";
import DashboardAiBots from "@/pages/dashboard/AiBots";
import DashboardCampaigns from "@/pages/dashboard/CampaignDashboard";
import Campaigns from "@/pages/dashboard/Campaigns";
import DashboardLeads from "@/pages/dashboard/Leads";
import DashboardCalls from "@/pages/dashboard/Calls";
import DashboardApprovals from "@/pages/dashboard/Approvals";
import DashboardDebate from "@/pages/dashboard/Debate";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdAccountsConnect from "@/pages/dashboard/AdAccountsConnect";
import CampaignCreate from "@/pages/dashboard/CampaignCreate";
import CampaignDetail from "@/pages/dashboard/CampaignDetail";
import CampaignPaymentSuccess from "@/pages/dashboard/CampaignPaymentSuccess";
import TiktokCallback from "@/components/auth/TiktokCallback";

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
      path: "debate",
      element: <DashboardDebate />,
    },
    {
      path: "campaigns",
      element: <DashboardCampaigns />,
    },
    {
      path: "campaigns/legacy",
      element: <Campaigns />,
    },
    {
      path: "campaigns/create",
      element: <CampaignCreate />,
    },
    {
      path: "campaigns/:id",
      element: <CampaignDetail />,
    },
    {
      path: "campaigns/payment-success",
      element: <CampaignPaymentSuccess />,
    },
    {
      path: "ad-accounts",
      element: <AdAccountsConnect />,
    },
    {
      path: "auth/tiktok/callback",
      element: <TiktokCallback />,
    },
    {
      path: "leads",
      element: <DashboardLeads />,
    },
    {
      path: "calls",
      element: <DashboardCalls />,
    },
    {
      path: "approvals",
      element: <DashboardApprovals />,
    },
  ],
};

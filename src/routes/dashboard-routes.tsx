
import { RouteObject } from "react-router-dom";
import Dashboard from "@/pages/dashboard/Dashboard";
import Leads from "@/pages/dashboard/Leads";
import Campaigns from "@/pages/dashboard/Campaigns";
import Analytics from "@/pages/dashboard/Analytics";
import AiBoardroom from "@/pages/AiBoardroom";
import Settings from "@/pages/admin/Settings";
import CompanySetup from "@/pages/DevAdminHelper";
import Debate from "@/pages/dashboard/Debate";
import CampaignPaymentSuccess from "@/pages/dashboard/CampaignPaymentSuccess";
import Billing from "@/pages/Billing";
import AiBots from "@/pages/dashboard/AiBots";
import AIExecutiveDebate from "@/pages/dashboard/AIExecutiveDebate";
import AISettings from "@/pages/dashboard/AISettings";
import Calls from "@/pages/dashboard/Calls";
import NotFound from "@/pages/NotFound";
import Executives from "@/pages/dashboard/Executives";
import DashboardLayout from "@/components/DashboardLayout";

export const dashboardRoutes: RouteObject[] = [
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "leads",
        element: <Leads />,
      },
      {
        path: "my-leads",
        element: <Leads />,
      },
      {
        path: "leads/new",
        element: <Dashboard />,
      },
      {
        path: "leads/:leadId",
        element: <Dashboard />,
      },
      {
        path: "campaigns",
        element: <Campaigns />,
      },
      {
        path: "campaigns/new",
        element: <Dashboard />,
      },
      {
        path: "campaigns/:campaignId",
        element: <Dashboard />,
      },
      {
        path: "campaigns/payment-success",
        element: <CampaignPaymentSuccess />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "strategies",
        element: <AiBoardroom />,
      },
      {
        path: "strategies/new",
        element: <AiBoardroom />,
      },
      {
        path: "strategies/:strategyId",
        element: <AiBoardroom />,
      },
      {
        path: "calls",
        element: <Calls />,
      },
      {
        path: "executives",
        element: <Executives />,
      },
      {
        path: "ai-bots",
        element: <AiBots />,
      },
      {
        path: "ai-bots/:botId",
        element: <AiBots />,
      },
      {
        path: "debate",
        element: <Debate />,
      },
      {
        path: "ai-settings",
        element: <AISettings />,
      },
      {
        path: "account",
        element: <Settings />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "company-setup",
        element: <CompanySetup />,
      },
      {
        path: "dashboard-settings",
        element: <Settings />,
      },
      {
        path: "onboarding",
        element: <CompanySetup />,
      },
      {
        path: "billing",
        element: <Billing />,
      },
      {
        path: "*",
        element: <NotFound />,
      }
    ],
  },
];

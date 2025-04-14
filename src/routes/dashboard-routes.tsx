
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
import AiBots from "@/components/ai-bots/AiBotsPage";
import AIExecutiveDebate from "@/pages/dashboard/AIExecutiveDebate";
import AISettings from "@/pages/dashboard/AISettings";
import Page404 from "@/pages/404";

export const dashboardRoutes: RouteObject[] = [
  {
    path: "dashboard",
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
        path: "executives",
        element: <AiBots />,
      },
      {
        path: "executives/:executiveId",
        element: <AiBots />,
      },
      {
        path: "debate",
        element: <Debate />,
      },
      {
        path: "ai-bots",
        element: <AiBots />,
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
        element: <Page404 />,
      }
    ],
  },
];


import { RouteObject } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import Dashboard from "@/pages/dashboard/Dashboard";
import Leads from "@/pages/dashboard/Leads";
import Campaigns from "@/pages/dashboard/Campaigns";
import Analytics from "@/pages/dashboard/Analytics";
import AiBoardroom from "@/pages/AiBoardroom"; // Using AiBoardroom instead of Strategy
import Settings from "@/pages/admin/Settings"; // Using admin Settings as a replacement
import CompanySetup from "@/pages/DevAdminHelper"; // Using DevAdminHelper as a temporary replacement
import Debate from "@/pages/dashboard/Debate";
import CampaignPaymentSuccess from "@/pages/dashboard/CampaignPaymentSuccess";
import Billing from "@/pages/Billing";

export const dashboardRoutes: RouteObject = {
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
      element: <Leads />, // Using Leads as temporary replacement for MyLeads
    },
    {
      path: "leads/new",
      element: <Dashboard />, // Using Dashboard as a temporary replacement
    },
    {
      path: "leads/:leadId",
      element: <Dashboard />, // Using Dashboard as a temporary replacement
    },
    {
      path: "campaigns",
      element: <Campaigns />,
    },
    {
      path: "campaigns/new",
      element: <Dashboard />, // Using Dashboard as a temporary replacement
    },
    {
      path: "campaigns/:campaignId",
      element: <Dashboard />, // Using Dashboard as a temporary replacement
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
      path: "strategy",
      element: <AiBoardroom />, // Using AiBoardroom instead of Strategy
    },
    {
      path: "strategy/new",
      element: <AiBoardroom />, // Using AiBoardroom as a temporary replacement
    },
    {
      path: "strategy/:strategyId",
      element: <AiBoardroom />, // Using AiBoardroom as a temporary replacement
    },
    {
      path: "executives",
      element: <Dashboard />, // Using Dashboard as a temporary replacement
    },
    {
      path: "executives/:executiveId",
      element: <Dashboard />, // Using Dashboard as a temporary replacement
    },
    {
      path: "debate",
      element: <Debate />,
    },
    {
      path: "account",
      element: <Settings />, // Using admin Settings as a replacement
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
      element: <Settings />, // Using Settings as a replacement
    },
    {
      path: "onboarding",
      element: <CompanySetup />, // Using CompanySetup as a temporary replacement
    },
    {
      path: "billing",
      element: <Billing />,
    },
  ],
};

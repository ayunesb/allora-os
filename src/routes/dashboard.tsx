
import { RouteObject } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import Dashboard from "@/pages/dashboard/Dashboard";
import Leads from "@/pages/dashboard/Leads";
import Campaigns from "@/pages/dashboard/Campaigns";
import Analytics from "@/pages/dashboard/Analytics";
import Strategy from "@/pages/dashboard/Strategy";
import Account from "@/pages/dashboard/Account";
import Settings from "@/pages/dashboard/Settings";
import CompanySetup from "@/pages/dashboard/CompanySetup";
import Debate from "@/pages/dashboard/Debate";
import Executives from "@/pages/dashboard/Executives";
import ExecutiveProfile from "@/pages/dashboard/ExecutiveProfile";
import MyLeads from "@/pages/dashboard/MyLeads";
import LeadDetails from "@/pages/dashboard/LeadDetails";
import LeadCreation from "@/pages/dashboard/LeadCreation";
import CampaignCreation from "@/pages/dashboard/CampaignCreation";
import CampaignDetails from "@/pages/dashboard/CampaignDetails";
import StrategyDetails from "@/pages/dashboard/StrategyDetails";
import StrategyCreation from "@/pages/dashboard/StrategyCreation";
import DashboardSettings from "@/pages/dashboard/DashboardSettings";
import OnboardingWrapper from "@/pages/onboarding/OnboardingWrapper";
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
      element: <MyLeads />,
    },
    {
      path: "leads/new",
      element: <LeadCreation />,
    },
    {
      path: "leads/:leadId",
      element: <LeadDetails />,
    },
    {
      path: "campaigns",
      element: <Campaigns />,
    },
    {
      path: "campaigns/new",
      element: <CampaignCreation />,
    },
    {
      path: "campaigns/:campaignId",
      element: <CampaignDetails />,
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
      element: <Strategy />,
    },
    {
      path: "strategy/new",
      element: <StrategyCreation />,
    },
    {
      path: "strategy/:strategyId",
      element: <StrategyDetails />,
    },
    {
      path: "executives",
      element: <Executives />,
    },
    {
      path: "executives/:executiveId",
      element: <ExecutiveProfile />,
    },
    {
      path: "debate",
      element: <Debate />,
    },
    {
      path: "account",
      element: <Account />,
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
      element: <DashboardSettings />,
    },
    {
      path: "onboarding",
      element: <OnboardingWrapper />,
    },
    {
      path: "billing",
      element: <Billing />,
    },
  ],
};


import { RouteObject } from "react-router-dom";
import Dashboard from "@/pages/dashboard/Dashboard";
import Leads from "@/pages/dashboard/Leads";
import Campaigns from "@/pages/dashboard/Campaigns";
import Analytics from "@/pages/dashboard/Analytics";
import Strategies from "@/pages/dashboard/Strategies";
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
import CampaignDetail from "@/pages/dashboard/CampaignDetail";
import CampaignCreate from "@/pages/dashboard/CampaignCreate";
import BotDetail from "@/pages/dashboard/BotDetail";
import Profile from "@/pages/dashboard/Profile";
import OnboardingWorkflow from "@/pages/dashboard/OnboardingWorkflow";
import { Navigate } from "react-router-dom";
import ExecutiveAgents from "@/pages/dashboard/ExecutiveAgents";
import ExecutiveDecisions from "@/pages/dashboard/ExecutiveDecisions";

export const dashboardRoutes: RouteObject[] = [
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      // Leads section - consolidated
      {
        path: "leads",
        element: <Leads />,
      },
      {
        path: "leads/:leadId",
        element: <Leads />,
      },
      // Campaigns section - consolidated
      {
        path: "campaigns",
        element: <Campaigns />,
      },
      {
        path: "campaigns/new",
        element: <CampaignCreate />,
      },
      {
        path: "campaigns/:campaignId",
        element: <CampaignDetail />,
      },
      {
        path: "campaigns/payment-success",
        element: <CampaignPaymentSuccess />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      // Strategy section - consolidated to clear naming
      {
        path: "strategies",
        element: <Strategies />,
      },
      {
        path: "strategy",
        element: <Navigate to="/dashboard/strategies" replace />,
      },
      {
        path: "strategies/new",
        element: <Debate />,
      },
      {
        path: "strategies/:strategyId",
        element: <Debate />,
      },
      {
        path: "calls",
        element: <Calls />,
      },
      {
        path: "executives",
        element: <Executives />,
      },
      // New Executive Agents route
      {
        path: "executive-agents",
        element: <ExecutiveAgents />,
      },
      // New Executive Decisions route
      {
        path: "decisions",
        element: <ExecutiveDecisions />,
      },
      {
        path: "ai-bots",
        element: <AiBots />,
      },
      {
        path: "ai-bots/:botId",
        element: <BotDetail />,
      },
      {
        path: "debate",
        element: <Debate />,
      },
      {
        path: "ai-settings",
        element: <AISettings />,
      },
      // New AI Executive Workflow Onboarding
      {
        path: "ai-workflow",
        element: <OnboardingWorkflow />,
      },
      // Settings section - consolidated
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "company-setup",
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

import { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Dashboard from "@/pages/dashboard/Dashboard";
import Leads from "@/pages/dashboard/Leads";
import Campaigns from "@/pages/dashboard/Campaigns";
import Analytics from "@/pages/dashboard/Analytics";
import Strategies from "@/pages/dashboard/Strategies";
import Settings from "@/pages/dashboard/Settings";
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
import ExecutiveAgents from "@/pages/dashboard/ExecutiveAgents";
import ExecutiveDecisions from "@/pages/dashboard/ExecutiveDecisions";
import ExecutiveProfile from "@/pages/dashboard/executives/[name]";
import RiskHeatmap from "@/pages/dashboard/RiskHeatmap";
import ExecutiveLeaderboard from "@/pages/dashboard/ExecutiveLeaderboard";
import AIChat from "@/pages/dashboard/AIChat";
import Forecast from "@/pages/dashboard/Forecast";
import DigitalTwin from "@/pages/dashboard/DigitalTwin";
import AIAgent from "@/pages/dashboard/AIAgent";
import CalendlyIntegration from "@/pages/admin/CalendlyIntegration";
import PlaidIntegration from "@/pages/admin/PlaidIntegration";
import KPIMetricsPage from "@/pages/insights/kpis";
import AgentPerformancePage from "@/pages/agents/performance";

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
        path: "leads/:leadId",
        element: <Leads />,
      },
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
      {
        path: "executive-agents",
        element: <ExecutiveAgents />,
      },
      {
        path: "decisions",
        element: <ExecutiveDecisions />,
      },
      {
        path: "risk-heatmap",
        element: <RiskHeatmap />,
      },
      {
        path: "leaderboard",
        element: <ExecutiveLeaderboard />,
      },
      {
        path: "forecast",
        element: <Forecast />,
      },
      {
        path: "digital-twin",
        element: <DigitalTwin />,
      },
      {
        path: "executive-preferences",
        element: <AISettings />,
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
        path: "ai-chat",
        element: <AIChat />,
      },
      {
        path: "ai-agent",
        element: <AIAgent />,
      },
      {
        path: "calendly",
        element: <CalendlyIntegration />,
      },
      {
        path: "plaid",
        element: <PlaidIntegration />,
      },
      {
        path: "ai-settings",
        element: <AISettings />,
      },
      {
        path: "ai-workflow",
        element: <OnboardingWorkflow />,
      },
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
        path: "executives/:name",
        element: <ExecutiveProfile />,
      },
      {
        path: "insights/kpis",
        element: <KPIMetricsPage />,
      },
      {
        path: "agents/performance",
        element: <AgentPerformancePage />,
      },
      {
        path: "*",
        element: <NotFound />,
      }
    ],
  },
];

import React from "react";
import { RouteObject } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Navigate } from "react-router-dom";

// Lazy loaded components
const Index = lazy(() => import("@/pages/dashboard/Index"));
const Analytics = lazy(() => import("@/pages/dashboard/Analytics"));
const AiBots = lazy(() => import("@/pages/dashboard/AiBots"));
const BotDetail = lazy(() => import("@/pages/dashboard/BotDetail"));
const Profile = lazy(() => import("@/pages/dashboard/Profile"));
const Debate = lazy(() => import("@/pages/dashboard/Debate"));
const Settings = lazy(() => import("@/pages/dashboard/Settings"));
const Strategies = lazy(() => import("@/pages/dashboard/Strategies"));
const Leads = lazy(() => import("@/pages/dashboard/Leads"));
const Calls = lazy(() => import("@/pages/dashboard/Calls"));
const Campaigns = lazy(() => import("@/pages/dashboard/Campaigns"));
const CampaignDetail = lazy(() => import("@/pages/dashboard/CampaignDetail"));
const CampaignCreate = lazy(() => import("@/pages/dashboard/CampaignCreate"));
const AdAccountsConnect = lazy(() => import("@/pages/dashboard/AdAccountsConnect"));
const CampaignDashboard = lazy(() => import("@/pages/dashboard/CampaignDashboard"));
const CampaignPaymentSuccess = lazy(() => import("@/pages/dashboard/CampaignPaymentSuccess"));
const ShopifyOptimization = lazy(() => import("@/pages/dashboard/ShopifyOptimization"));
const SocialMediaCalendar = lazy(() => import("@/pages/dashboard/SocialMediaCalendar"));
const Approvals = lazy(() => import("@/pages/dashboard/Approvals"));
const LeadFollowUpSequences = lazy(() => import("@/pages/dashboard/LeadFollowUpSequences"));
const AISettings = lazy(() => import("@/pages/dashboard/AISettings"));
const LinkedInAuthCallback = lazy(() => import("@/pages/dashboard/LinkedInAuthCallback"));
const LinkedInIntegration = lazy(() => import("@/pages/dashboard/LinkedInIntegration"));
const Integrations = lazy(() => import("@/pages/dashboard/Integrations"));
const TechnicalImprovements = lazy(() => import("@/pages/dashboard/TechnicalImprovements"));

export const dashboardRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Index /> },
      { path: "analytics", element: <Analytics /> },
      { path: "ai-bots", element: <AiBots /> },
      { path: "ai-bots/:botId", element: <BotDetail /> },
      { path: "profile", element: <Profile /> },
      { path: "debate", element: <Debate /> },
      { path: "settings", element: <Settings /> },
      { path: "strategies", element: <Strategies /> },
      { path: "leads", element: <Leads /> },
      { path: "leads/follow-up-sequences", element: <LeadFollowUpSequences /> },
      { path: "calls", element: <Calls /> },
      { path: "campaigns", element: <Campaigns /> },
      { path: "campaigns/create", element: <CampaignCreate /> },
      { path: "campaigns/:campaignId", element: <CampaignDetail /> },
      { path: "ad-accounts/connect", element: <AdAccountsConnect /> },
      { path: "campaign-dashboard", element: <CampaignDashboard /> },
      { path: "campaign/payment-success", element: <CampaignPaymentSuccess /> },
      { path: "shopify-optimization", element: <ShopifyOptimization /> },
      { path: "social-media-calendar", element: <SocialMediaCalendar /> },
      { path: "approvals", element: <Approvals /> },
      { path: "ai-settings", element: <AISettings /> },
      { path: "linkedin-auth-callback", element: <LinkedInAuthCallback /> },
      { path: "linkedin-integration", element: <LinkedInIntegration /> },
      { path: "integrations", element: <Integrations /> },
      { path: "technical-improvements", element: <TechnicalImprovements /> },
      { path: "*", element: <Navigate to="/dashboard" replace /> },
    ],
  },
];


import React from "react";
import { RouteObject } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import ErrorBoundary from "@/components/ErrorBoundary";

const { lazy } = React;

// Improved code splitting with named chunks for better caching
const Index = lazy(() => import(/* webpackChunkName: "dashboard-index" */ "@/pages/dashboard/Index"));
const Analytics = lazy(() => import(/* webpackChunkName: "dashboard-analytics" */ "@/pages/dashboard/Analytics"));
const AiBots = lazy(() => import(/* webpackChunkName: "dashboard-ai-bots" */ "@/pages/dashboard/AiBots"));
const BotDetail = lazy(() => import(/* webpackChunkName: "dashboard-bot-detail" */ "@/pages/dashboard/BotDetail"));
const Profile = lazy(() => import(/* webpackChunkName: "dashboard-profile" */ "@/pages/dashboard/Profile"));
const Debate = lazy(() => import(/* webpackChunkName: "dashboard-debate" */ "@/pages/dashboard/Debate"));
const Settings = lazy(() => import(/* webpackChunkName: "dashboard-settings" */ "@/pages/dashboard/Settings"));
const Strategies = lazy(() => import(/* webpackChunkName: "dashboard-strategies" */ "@/pages/dashboard/Strategies"));
const Leads = lazy(() => import(/* webpackChunkName: "dashboard-leads" */ "@/pages/dashboard/Leads"));
const Calls = lazy(() => import(/* webpackChunkName: "dashboard-calls" */ "@/pages/dashboard/Calls"));
const Campaigns = lazy(() => import(/* webpackChunkName: "dashboard-campaigns" */ "@/pages/dashboard/Campaigns"));
const CampaignDetail = lazy(() => import(/* webpackChunkName: "dashboard-campaign-detail" */ "@/pages/dashboard/CampaignDetail"));
const CampaignCreate = lazy(() => import(/* webpackChunkName: "dashboard-campaign-create" */ "@/pages/dashboard/CampaignCreate"));
const AdAccountsConnect = lazy(() => import(/* webpackChunkName: "dashboard-ad-accounts" */ "@/pages/dashboard/AdAccountsConnect"));
const CampaignDashboard = lazy(() => import(/* webpackChunkName: "dashboard-campaign-dashboard" */ "@/pages/dashboard/CampaignDashboard"));
const CampaignPaymentSuccess = lazy(() => import(/* webpackChunkName: "dashboard-campaign-payment" */ "@/pages/dashboard/CampaignPaymentSuccess"));
const ShopifyOptimization = lazy(() => import(/* webpackChunkName: "dashboard-shopify" */ "@/pages/dashboard/ShopifyOptimization"));
const SocialMediaCalendar = lazy(() => import(/* webpackChunkName: "dashboard-social-media" */ "@/pages/dashboard/SocialMediaCalendar"));
const Approvals = lazy(() => import(/* webpackChunkName: "dashboard-approvals" */ "@/pages/dashboard/Approvals"));
const LeadFollowUpSequences = lazy(() => import(/* webpackChunkName: "dashboard-lead-followup" */ "@/pages/dashboard/LeadFollowUpSequences"));
const AISettings = lazy(() => import(/* webpackChunkName: "dashboard-ai-settings" */ "@/pages/dashboard/AISettings"));
const LinkedInAuthCallback = lazy(() => import(/* webpackChunkName: "dashboard-linkedin-auth" */ "@/pages/dashboard/LinkedInAuthCallback"));
const LinkedInIntegration = lazy(() => import(/* webpackChunkName: "dashboard-linkedin" */ "@/pages/dashboard/LinkedInIntegration"));
const Integrations = lazy(() => import(/* webpackChunkName: "dashboard-integrations" */ "@/pages/dashboard/Integrations"));
const TechnicalImprovements = lazy(() => import(/* webpackChunkName: "dashboard-technical" */ "@/pages/dashboard/TechnicalImprovements"));

// Wrap each route component with ProtectedRoute to ensure auth context is available
const wrapInProtectedRoute = (Component: React.ComponentType, adminOnly: boolean = false) => {
  return (
    <ErrorBoundary>
      <ProtectedRoute adminOnly={adminOnly}>
        <Component />
      </ProtectedRoute>
    </ErrorBoundary>
  );
};

export const dashboardRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: wrapInProtectedRoute(Index) },
      { path: "analytics", element: wrapInProtectedRoute(Analytics) },
      { path: "ai-bots", element: wrapInProtectedRoute(AiBots) },
      { path: "ai-bots/:botId", element: wrapInProtectedRoute(BotDetail) },
      { path: "profile", element: wrapInProtectedRoute(Profile) },
      { path: "debate", element: wrapInProtectedRoute(Debate) },
      { path: "settings", element: wrapInProtectedRoute(Settings) },
      { path: "strategies", element: wrapInProtectedRoute(Strategies) },
      { path: "leads", element: wrapInProtectedRoute(Leads) },
      { path: "leads/follow-up-sequences", element: wrapInProtectedRoute(LeadFollowUpSequences) },
      { path: "calls", element: wrapInProtectedRoute(Calls) },
      { path: "campaigns", element: wrapInProtectedRoute(Campaigns) },
      { path: "campaigns/create", element: wrapInProtectedRoute(CampaignCreate) },
      { path: "campaigns/:campaignId", element: wrapInProtectedRoute(CampaignDetail) },
      { path: "ad-accounts/connect", element: wrapInProtectedRoute(AdAccountsConnect) },
      { path: "campaign-dashboard", element: wrapInProtectedRoute(CampaignDashboard) },
      { path: "campaign/payment-success", element: wrapInProtectedRoute(CampaignPaymentSuccess) },
      { path: "shopify-optimization", element: wrapInProtectedRoute(ShopifyOptimization) },
      { path: "social-media-calendar", element: wrapInProtectedRoute(SocialMediaCalendar) },
      { path: "approvals", element: wrapInProtectedRoute(Approvals) },
      { path: "ai-settings", element: wrapInProtectedRoute(AISettings) },
      { path: "linkedin-auth-callback", element: wrapInProtectedRoute(LinkedInAuthCallback) },
      { path: "linkedin-integration", element: wrapInProtectedRoute(LinkedInIntegration) },
      { path: "integrations", element: wrapInProtectedRoute(Integrations) },
      { path: "technical-improvements", element: wrapInProtectedRoute(TechnicalImprovements, true) },
      // Redirects for backward compatibility
      { path: "calendar", element: <Navigate to="/dashboard/social-media-calendar" replace /> },
      { path: "shop", element: <Navigate to="/dashboard/shopify-optimization" replace /> },
      { path: "*", element: <Navigate to="/dashboard" replace /> },
    ],
  },
];

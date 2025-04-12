
import React from "react";
import { RouteObject } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import ErrorBoundary from "@/components/ErrorBoundary";

const { lazy } = React;

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

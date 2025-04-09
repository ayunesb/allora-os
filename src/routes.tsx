
import { createBrowserRouter } from "react-router-dom";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import ResetPassword from "@/pages/ResetPassword";
import UpdatePassword from "@/pages/UpdatePassword";
import Onboarding from "@/pages/Onboarding";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import AdminLayout from "@/components/AdminLayout";
import Legal from "@/pages/Legal";
import Privacy from "@/pages/Privacy";
import ComplianceLayout from "@/components/ComplianceLayout";

// Dashboard Pages
import DashboardIndex from "@/pages/dashboard/Index";
import DashboardStrategies from "@/pages/dashboard/Strategies";
import DashboardAnalytics from "@/pages/dashboard/Analytics";
import DashboardSettings from "@/pages/dashboard/Settings";
import DashboardProfile from "@/pages/dashboard/Profile";
import DashboardAiBots from "@/pages/dashboard/AiBots";
import DashboardBotDetail from "@/pages/dashboard/BotDetail";
import DashboardCampaigns from "@/pages/dashboard/Campaigns";
import DashboardLeads from "@/pages/dashboard/Leads";
import DashboardCalls from "@/pages/dashboard/Calls";

// Admin Pages
import AdminIndex from "@/pages/admin/Index";
import AdminUsers from "@/pages/admin/Users";
import AdminCompanies from "@/pages/admin/Companies";
import AdminCampaigns from "@/pages/admin/Campaigns";
import AdminLeads from "@/pages/admin/Leads";
import AdminAnalytics from "@/pages/admin/Analytics";
import AdminSettings from "@/pages/admin/Settings";

// Compliance Pages
import ComplianceOverview from "@/pages/compliance/Index";
import ComplianceAuditLogs from "@/pages/compliance/AuditLogs";
import ComplianceDataPolicies from "@/pages/compliance/DataPolicies";
import ComplianceReports from "@/pages/compliance/Reports";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/update-password",
    element: <UpdatePassword />,
  },
  {
    path: "/onboarding",
    element: (
      <ProtectedRoute>
        <Onboarding />
      </ProtectedRoute>
    ),
  },
  {
    path: "/legal",
    element: <Legal />,
  },
  {
    path: "/privacy",
    element: <Privacy />,
  },
  {
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
        path: "ai-bots/:botId",
        element: <DashboardBotDetail />,
      },
      {
        path: "campaigns",
        element: <DashboardCampaigns />,
      },
      {
        path: "leads",
        element: <DashboardLeads />,
      },
      {
        path: "calls",
        element: <DashboardCalls />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute roleRequired="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminIndex />,
      },
      {
        path: "users",
        element: <AdminUsers />,
      },
      {
        path: "companies",
        element: <AdminCompanies />,
      },
      {
        path: "campaigns",
        element: <AdminCampaigns />,
      },
      {
        path: "leads",
        element: <AdminLeads />,
      },
      {
        path: "analytics",
        element: <AdminAnalytics />,
      },
      {
        path: "settings",
        element: <AdminSettings />,
      },
    ],
  },
  {
    path: "/compliance",
    element: (
      <ProtectedRoute>
        <ComplianceLayout>
          <ComplianceOverview />
        </ComplianceLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/compliance/audit-logs",
    element: (
      <ProtectedRoute>
        <ComplianceLayout>
          <ComplianceAuditLogs />
        </ComplianceLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/compliance/data-policies",
    element: (
      <ProtectedRoute>
        <ComplianceLayout>
          <ComplianceDataPolicies />
        </ComplianceLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/compliance/reports",
    element: (
      <ProtectedRoute>
        <ComplianceLayout>
          <ComplianceReports />
        </ComplianceLayout>
      </ProtectedRoute>
    ),
  },
]);

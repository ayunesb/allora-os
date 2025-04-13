
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { AccessibilityProvider } from '@/context/AccessibilityContext';
import { SocialMediaProvider } from '@/context/SocialMediaContext';
import RootLayout from '@/components/layouts/RootLayout';
import Home from '@/pages/Home';
import Dashboard from '@/pages/dashboard/Dashboard';
import AIExecutiveDebate from '@/pages/dashboard/AIExecutiveDebate';
import PageNotFound from '@/pages/PageNotFound';
import WebhooksPage from '@/pages/admin/WebhooksPage';
import ApiKeysPage from '@/pages/admin/ApiKeysPage';
import UserManagementPage from '@/pages/admin/UserManagementPage';
import CompaniesPage from '@/pages/admin/CompaniesPage';
import CampaignsPage from '@/pages/admin/CampaignsPage';
import LeadsPage from '@/pages/admin/LeadsPage';
import AnalyticsPage from '@/pages/admin/AnalyticsPage';
import DatabaseVerificationPage from '@/pages/admin/DatabaseVerificationPage';
import AIBotLogicPage from '@/pages/admin/AIBotLogicPage';
import UserOnboarding from '@/pages/admin/UserOnboarding';
import DashboardModulesPage from '@/pages/admin/DashboardModulesPage';
import CommunicationToolsPage from '@/pages/admin/CommunicationToolsPage';

function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme="dark" storageKey="allora-ui-theme">
        <AccessibilityProvider>
          <SocialMediaProvider>
            <Routes>
              <Route path="/" element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="dashboard/ai-executive-debate" element={<AIExecutiveDebate />} />
                <Route path="admin/webhooks" element={<WebhooksPage />} />
                <Route path="admin/api-config" element={<ApiKeysPage />} />
                <Route path="admin/users" element={<UserManagementPage />} />
                <Route path="admin/companies" element={<CompaniesPage />} />
                <Route path="admin/campaigns" element={<CampaignsPage />} />
                <Route path="admin/leads" element={<LeadsPage />} />
                <Route path="admin/analytics" element={<AnalyticsPage />} />
                <Route path="admin/database" element={<DatabaseVerificationPage />} />
                <Route path="admin/ai-bot" element={<AIBotLogicPage />} />
                <Route path="admin/onboarding" element={<UserOnboarding />} />
                <Route path="admin/dashboard-modules" element={<DashboardModulesPage />} />
                <Route path="admin/communication" element={<CommunicationToolsPage />} />
                <Route path="*" element={<PageNotFound />} />
              </Route>
            </Routes>
            <Toaster />
          </SocialMediaProvider>
        </AccessibilityProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;

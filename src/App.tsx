import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword'; 
import UpdatePassword from './pages/UpdatePassword';
import Dashboard from './pages/dashboard/Index';
import Strategies from './pages/dashboard/Strategies';
import Campaigns from './pages/dashboard/Campaigns';
import Calls from './pages/dashboard/Calls';
import Leads from './pages/dashboard/Leads';
import AiBots from './pages/dashboard/AiBots';
import BotDetail from './pages/dashboard/BotDetail';
import Profile from './pages/dashboard/Profile';
import Settings from './pages/dashboard/Settings';
import Onboarding from './pages/Onboarding';
import NotFound from './pages/NotFound';
import Legal from './pages/Legal';
import Privacy from './pages/Privacy';
import DashboardLayout from './components/DashboardLayout';
import AdminLayout from './components/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Analytics from './pages/dashboard/Analytics';

// Admin pages
import AdminIndex from './pages/admin/Index';
import AdminUsers from './pages/admin/Users';
import AdminCompanies from './pages/admin/Companies';
import AdminCampaigns from './pages/admin/Campaigns';
import AdminLeads from './pages/admin/Leads';
import AdminAnalytics from './pages/admin/Analytics';
import AdminSettings from './pages/admin/Settings';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/privacy" element={<Privacy />} />
        
        {/* Protected standalone routes */}
        <Route path="/onboarding" element={
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        } />
        
        {/* Dashboard routes with consistent layout */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/strategies" element={<Strategies />} />
          <Route path="/dashboard/campaigns" element={<Campaigns />} />
          <Route path="/dashboard/calls" element={<Calls />} />
          <Route path="/dashboard/leads" element={<Leads />} />
          <Route path="/dashboard/ai-bots" element={<AiBots />} />
          <Route path="/dashboard/ai-bots/:botName/:role" element={<BotDetail />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/analytics" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Analytics />
              </DashboardLayout>
            </ProtectedRoute>
          } />
        </Route>
        
        {/* Admin routes with admin layout */}
        <Route element={
          <ProtectedRoute roleRequired="admin">
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route path="/admin" element={<AdminIndex />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/companies" element={<AdminCompanies />} />
          <Route path="/admin/campaigns" element={<AdminCampaigns />} />
          <Route path="/admin/leads" element={<AdminLeads />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

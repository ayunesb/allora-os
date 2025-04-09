
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
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="strategies" element={<Strategies />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="calls" element={<Calls />} />
          <Route path="leads" element={<Leads />} />
          <Route path="ai-bots" element={<AiBots />} />
          <Route path="ai-bots/:botName/:role" element={<BotDetail />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
        
        {/* Admin routes with admin layout */}
        <Route path="/admin" element={
          <ProtectedRoute roleRequired="admin">
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminIndex />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="companies" element={<AdminCompanies />} />
          <Route path="campaigns" element={<AdminCampaigns />} />
          <Route path="leads" element={<AdminLeads />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

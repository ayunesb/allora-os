
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import SystemHealthPage from './pages/admin/system-health/SystemHealthPage';
import DevHelperRedirect from './pages/admin/DevHelperRedirect';
import DevAdminHelper from './pages/DevAdminHelper';
import WebhooksTab from './components/admin/WebhooksTab';
import LaunchVerification from './components/admin/LaunchVerification';
import DatabaseVerificationPage from './pages/admin/DatabaseVerificationPage';
import ReadinessChecklist from './components/admin/ReadinessChecklist';
import SecurityDashboard from './pages/admin/SecurityDashboard';
import AdminRoute from './components/AdminRoute';
import PageNotFound from './pages/PageNotFound';
import LaunchPlan from './pages/admin/LaunchPlan';
import LaunchCheck from './pages/admin/LaunchCheck';
import { adminRoutes } from './routes/admin-routes';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Dashboard />} />
        
        {/* Admin routes */}
        <Route path="/admin" element={<AdminRoute><Dashboard /></AdminRoute>} />
        <Route path="/admin/system-health" element={<AdminRoute><SystemHealthPage /></AdminRoute>} />
        <Route path="/admin/webhooks" element={<AdminRoute><WebhooksTab /></AdminRoute>} />
        <Route path="/admin/launch-verification" element={<AdminRoute><LaunchVerification /></AdminRoute>} />
        <Route path="/admin/database-verification" element={<AdminRoute><DatabaseVerificationPage /></AdminRoute>} />
        <Route path="/admin/readiness-checklist" element={<AdminRoute><ReadinessChecklist /></AdminRoute>} />
        <Route path="/admin/security" element={<AdminRoute><SecurityDashboard /></AdminRoute>} />
        <Route path="/admin/launch-plan" element={<AdminRoute><LaunchPlan /></AdminRoute>} />
        <Route path="/admin/launch-check" element={<AdminRoute><LaunchCheck /></AdminRoute>} />
        <Route path="/admin/launch-prep" element={<AdminRoute><LaunchPlan /></AdminRoute>} />
        
        {/* Dev Helper Redirect */}
        <Route path="/dev-helper-redirect" element={<DevHelperRedirect />} />
        <Route path="/dev-admin-helper" element={<DevAdminHelper />} />
        
        {/* Use the imported admin routes */}
        {adminRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        
        {/* 404 catch-all route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;

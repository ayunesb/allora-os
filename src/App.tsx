
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import SystemHealth from './pages/admin/system-health/SystemHealthPage';
import DevHelperRedirect from './pages/admin/DevHelperRedirect';
import DevAdminHelper from './pages/DevAdminHelper';
import WebhooksTab from './components/admin/WebhooksTab';
import LaunchVerification from './components/admin/LaunchVerification';
import DatabaseVerificationPage from './pages/admin/DatabaseVerificationPage';
import ReadinessChecklist from './components/admin/ReadinessChecklist';
import SecurityDashboard from './pages/admin/SecurityDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Dashboard />} />

        {/* Admin routes */}
        <Route path="/admin/system-health" element={<SystemHealth />} />
        <Route path="/dev-admin-helper" element={<DevAdminHelper />} />
        <Route path="/admin/webhooks" element={<WebhooksTab />} />
        <Route path="/admin/launch-verification" element={<LaunchVerification />} />
        <Route path="/admin/database-verification" element={<DatabaseVerificationPage />} />
        <Route path="/admin/readiness-checklist" element={<ReadinessChecklist />} />
        <Route path="/admin/security" element={<SecurityDashboard />} />

        {/* Dev Helper Redirect */}
        <Route path="/dev-helper-redirect" element={<DevHelperRedirect />} />
      </Routes>
    </Router>
  );
};

export default App;

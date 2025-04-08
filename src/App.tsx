import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/dashboard/Index';
import Strategies from './pages/dashboard/Strategies';
import Campaigns from './pages/dashboard/Campaigns';
import Calls from './pages/dashboard/Calls';
import Leads from './pages/dashboard/Leads';
import AiBots from './pages/dashboard/AiBots';
import BotDetail from './pages/dashboard/BotDetail';
import OnboardingPage from './pages/OnboardingPage';
import CompanySettings from './pages/dashboard/CompanySettings';
import UserManagement from './pages/dashboard/UserManagement';
import Billing from './pages/dashboard/Billing';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/strategies" element={<Strategies />} />
        <Route path="/dashboard/campaigns" element={<Campaigns />} />
        <Route path="/dashboard/calls" element={<Calls />} />
        <Route path="/dashboard/leads" element={<Leads />} />
        <Route path="/dashboard/ai-bots" element={<AiBots />} />
        <Route path="/dashboard/ai-bots/:botName/:role" element={<BotDetail />} />
        <Route path="/dashboard/company-settings" element={<CompanySettings />} />
        <Route path="/dashboard/user-management" element={<UserManagement />} />
        <Route path="/dashboard/billing" element={<Billing />} />
      </Routes>
    </Router>
  );
}

export default App;

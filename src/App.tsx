
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/dashboard/Index';
import Strategies from './pages/dashboard/Strategies';
import Campaigns from './pages/dashboard/Campaigns';
import Calls from './pages/dashboard/Calls';
import Leads from './pages/dashboard/Leads';
import AiBots from './pages/dashboard/AiBots';
import BotDetail from './pages/dashboard/BotDetail';
import Onboarding from './pages/Onboarding';
import NotFound from './pages/NotFound';
import Legal from './pages/Legal';
import Privacy from './pages/Privacy';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/strategies" element={<Strategies />} />
        <Route path="/dashboard/campaigns" element={<Campaigns />} />
        <Route path="/dashboard/calls" element={<Calls />} />
        <Route path="/dashboard/leads" element={<Leads />} />
        <Route path="/dashboard/ai-bots" element={<AiBots />} />
        <Route path="/dashboard/ai-bots/:botName/:role" element={<BotDetail />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/dashboard/Index";
import Strategies from "./pages/dashboard/Strategies";
import Campaigns from "./pages/dashboard/Campaigns";
import Calls from "./pages/dashboard/Calls";
import Leads from "./pages/dashboard/Leads";
import AiBots from "./pages/dashboard/AiBots";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminCampaigns from "./pages/admin/Campaigns";
import AdminLeads from "./pages/admin/Leads";
import AdminSettings from "./pages/admin/Settings";

import Legal from "./pages/Legal";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/strategies" element={<Strategies />} />
          <Route path="/dashboard/campaigns" element={<Campaigns />} />
          <Route path="/dashboard/calls" element={<Calls />} />
          <Route path="/dashboard/leads" element={<Leads />} />
          <Route path="/dashboard/ai-bots" element={<AiBots />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/campaigns" element={<AdminCampaigns />} />
          <Route path="/admin/leads" element={<AdminLeads />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          
          {/* Legal Routes */}
          <Route path="/legal" element={<Legal />} />
          <Route path="/privacy" element={<Privacy />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

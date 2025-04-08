
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
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
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/onboarding" element={
              <ProtectedRoute>
                <Onboarding />
              </ProtectedRoute>
            } />
            
            {/* Dashboard Routes - Protected */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/strategies" element={<ProtectedRoute><Strategies /></ProtectedRoute>} />
            <Route path="/dashboard/campaigns" element={<ProtectedRoute><Campaigns /></ProtectedRoute>} />
            <Route path="/dashboard/calls" element={<ProtectedRoute><Calls /></ProtectedRoute>} />
            <Route path="/dashboard/leads" element={<ProtectedRoute><Leads /></ProtectedRoute>} />
            <Route path="/dashboard/ai-bots" element={<ProtectedRoute><AiBots /></ProtectedRoute>} />
            
            {/* Admin Routes - Protected */}
            <Route path="/admin" element={<ProtectedRoute roleRequired="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute roleRequired="admin"><AdminUsers /></ProtectedRoute>} />
            <Route path="/admin/campaigns" element={<ProtectedRoute roleRequired="admin"><AdminCampaigns /></ProtectedRoute>} />
            <Route path="/admin/leads" element={<ProtectedRoute roleRequired="admin"><AdminLeads /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute roleRequired="admin"><AdminSettings /></ProtectedRoute>} />
            
            {/* Legal Routes */}
            <Route path="/legal" element={<Legal />} />
            <Route path="/privacy" element={<Privacy />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

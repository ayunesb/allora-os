import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminRoute from '@/components/AdminRoute';
import { PageLoader } from '@/components/ui/page-loader';
import RootLayout from "@/components/layout/RootLayout";
import SidebarLayout from "@/components/layouts/SidebarLayout';
import RequireAuth from '@/components/RequireAuth';
import ExploreGalaxy from '@/pages/explore';
import ExploreRoutes from '@/routes/explore-routes';
import { exploreRoutes } from '@/routes/explore-routes';

// Lazy-loaded components
const Dashboard = lazy(() => import('@/pages/dashboard/Index'));
const Profile = lazy(() => import('@/pages/dashboard/Profile'));
const Login = lazy(() => import('@/pages/Login'));
const SignUpNew = lazy(() => import('@/pages/SignUpNew'));
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword'));
const ResetPassword = lazy(() => import('@/pages/ResetPassword'));
const Onboarding = lazy(() => import('@/pages/Onboarding'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Home = lazy(() => import('@/pages/Home'));
const AdminDashboard = lazy(() => import('@/pages/admin/Dashboard'));
const DevAdminHelper = lazy(() => import('@/pages/DevAdminHelper'));
const GDPRCompliance = lazy(() => import('@/pages/GDPRCompliance'));
const CookieSettings = lazy(() => import('@/pages/CookieSettings'));
const Overview = lazy(() => import('@/pages/dashboard/Overview'));
const KPIs = lazy(() => import('@/pages/dashboard/KPIs'));
const Executives = lazy(() => import('@/pages/dashboard/Executives'));
const AISettings = lazy(() => import('@/pages/dashboard/AISettings'));

export const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpNew />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/gdpr-compliance" element={<GDPRCompliance />} />
        <Route path="/cookie-settings" element={<CookieSettings />} />
        <Route path="/explore/*" element={<Routes>{exploreRoutes.map(route => <Route key={route.path} {...route} />)}</Routes>} />

        {/* Protected routes */}
        <Route path="/dashboard/*" element={
          <RequireAuth>
            <ProtectedRoute>
              <SidebarLayout>
                <Routes>
                  <Route path="" element={<Overview />} />
                  <Route path="kpis" element={<KPIs />} />
                  <Route path="executives" element={<Executives />} />
                  <Route path="ai-settings" element={<AISettings />} />
                </Routes>
              </SidebarLayout>
            </ProtectedRoute>
          </RequireAuth>
        } />
        <Route path="/dashboard/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/onboarding" element={
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        } />

        {/* Admin routes */}
        <Route path="/admin/*" element={
          <ProtectedRoute adminOnly>
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          </ProtectedRoute>
        } />

        {/* Development helper */}
        <Route path="/dev-admin-helper" element={<DevAdminHelper />} />

        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

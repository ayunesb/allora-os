import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { SubscriptionProvider } from './context/SubscriptionContext';
import { ComplianceProvider } from './context/ComplianceContext';
import { DebateProvider } from './context/DebateContext';
import { SettingsProvider } from './context/SettingsContext';
import { CampaignProvider } from './context/CampaignContext';
import { StrategyProvider } from './context/StrategyContext';
import { LeadProvider } from './context/LeadContext';
import { CallProvider } from './context/CallContext';
import { AnalyticsProvider } from './context/AnalyticsContext';
import { SocialMediaProvider } from './context/SocialMediaContext';
import { LoadingScreen } from './components/LoadingScreen';
import { ErrorBoundary } from './components/ErrorBoundary';

// Lazy-loaded components
const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/auth/Login'));
const RegisterPage = lazy(() => import('./pages/auth/Register'));
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPassword'));
const ResetPasswordPage = lazy(() => import('./pages/auth/ResetPassword'));
const VerifyEmailPage = lazy(() => import('./pages/auth/VerifyEmail'));
const DashboardLayout = lazy(() => import('./components/DashboardLayout'));
const DashboardPage = lazy(() => import('./pages/dashboard/Dashboard'));
const AIBotsPage = lazy(() => import('./pages/dashboard/AIBots'));
const DebatePage = lazy(() => import('./pages/dashboard/Debate'));
const AISettingsPage = lazy(() => import('./pages/dashboard/AISettings'));
const CampaignsPage = lazy(() => import('./pages/dashboard/Campaigns'));
const CampaignDetailPage = lazy(() => import('./pages/dashboard/CampaignDetail'));
const LeadsPage = lazy(() => import('./pages/dashboard/Leads'));
const LeadDetailPage = lazy(() => import('./pages/dashboard/LeadDetail'));
const CallsPage = lazy(() => import('./pages/dashboard/Calls'));
const CallDetailPage = lazy(() => import('./pages/dashboard/CallDetail'));
const StrategiesPage = lazy(() => import('./pages/dashboard/Strategies'));
const StrategyDetailPage = lazy(() => import('./pages/dashboard/StrategyDetail'));
const AnalyticsPage = lazy(() => import('./pages/dashboard/Analytics'));
const SettingsPage = lazy(() => import('./pages/dashboard/Settings'));
const ProfilePage = lazy(() => import('./pages/dashboard/Profile'));
const SocialMediaCalendarPage = lazy(() => import('./pages/dashboard/SocialMediaCalendar'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfServicePage = lazy(() => import('./pages/TermsOfService'));
const LegalDocument = lazy(() => import('./pages/LegalDocument'));

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider>
          <AuthProvider>
            <SubscriptionProvider>
              <ComplianceProvider>
                <SettingsProvider>
                  <Router>
                    <Suspense fallback={<LoadingScreen />}>
                      <Routes>
                        {/* Public routes */}
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                        <Route path="/reset-password" element={<ResetPasswordPage />} />
                        <Route path="/verify-email" element={<VerifyEmailPage />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
                        <Route path="/legal/:documentId" element={<LegalDocument />} />

                        {/* Dashboard routes */}
                        <Route path="/dashboard" element={<DashboardLayout />}>
                          <Route index element={<DashboardPage />} />
                          <Route path="ai-bots" element={
                            <DebateProvider>
                              <AIBotsPage />
                            </DebateProvider>
                          } />
                          <Route path="debate" element={
                            <DebateProvider>
                              <DebatePage />
                            </DebateProvider>
                          } />
                          <Route path="ai-settings" element={<AISettingsPage />} />
                          <Route path="campaigns" element={
                            <CampaignProvider>
                              <CampaignsPage />
                            </CampaignProvider>
                          } />
                          <Route path="campaigns/:id" element={
                            <CampaignProvider>
                              <CampaignDetailPage />
                            </CampaignProvider>
                          } />
                          <Route path="social-media" element={
                            <SocialMediaProvider>
                              <SocialMediaCalendarPage />
                            </SocialMediaProvider>
                          } />
                          <Route path="leads" element={
                            <LeadProvider>
                              <LeadsPage />
                            </LeadProvider>
                          } />
                          <Route path="leads/:id" element={
                            <LeadProvider>
                              <LeadDetailPage />
                            </LeadProvider>
                          } />
                          <Route path="calls" element={
                            <CallProvider>
                              <CallsPage />
                            </CallProvider>
                          } />
                          <Route path="calls/:id" element={
                            <CallProvider>
                              <CallDetailPage />
                            </CallProvider>
                          } />
                          <Route path="strategies" element={
                            <StrategyProvider>
                              <StrategiesPage />
                            </StrategyProvider>
                          } />
                          <Route path="strategies/:id" element={
                            <StrategyProvider>
                              <StrategyDetailPage />
                            </StrategyProvider>
                          } />
                          <Route path="analytics" element={
                            <AnalyticsProvider>
                              <AnalyticsPage />
                            </AnalyticsProvider>
                          } />
                          <Route path="settings" element={<SettingsPage />} />
                          <Route path="profile" element={<ProfilePage />} />
                        </Route>

                        {/* Fallback routes */}
                        <Route path="/404" element={<NotFoundPage />} />
                        <Route path="*" element={<Navigate to="/404" replace />} />
                      </Routes>
                    </Suspense>
                  </Router>
                </SettingsProvider>
              </ComplianceProvider>
            </SubscriptionProvider>
          </AuthProvider>
          <Toaster position="top-right" richColors closeButton />
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;

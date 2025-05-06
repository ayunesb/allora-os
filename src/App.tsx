import React, { Suspense } from "react";
import { Toaster } from "sonner";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { GlobalErrorBoundary } from "./components/errorHandling/GlobalErrorBoundary";
import { setupErrorLogging } from "./utils/errorHandling/errorLogging";
import { GlobalErrorModal } from "./components/errorHandling/GlobalErrorModal";
import { CompanyAPIProvider } from "./context/CompanyAPIContext";
import { initializeAnalytics } from "./utils/analytics";
import { AccessibilityProvider } from "./context/AccessibilityContext";
import CookieConsent from "./components/CookieConsent";
import { RouterProvider, Route, Routes } from "react-router-dom";
import { router } from "./routes/router";
import { Helmet } from "react-helmet-async";
import PluginDetailPage from "@/pages/plugin/[id]";
import StrategyDetailPage from "@/pages/strategy/[id]";
const App = () => {
  React.useEffect(() => {
    // Initialize error logging
    setupErrorLogging();
    // Initialize analytics (only if consent is given)
    const cookieConsent = localStorage.getItem("cookie-consent");
    if (cookieConsent) {
      const settings = JSON.parse(cookieConsent);
      if (settings?.analytics) {
        initializeAnalytics();
      }
    }
  }, []);
  return (
    <GlobalErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <AccessibilityProvider>
            <CompanyAPIProvider>
              <Helmet>
                <title>Allora OS – AI-Native Business System</title>
                <meta
                  name="description"
                  content="Allora OS helps startups run 90% autonomously with AI agents and strategy automation."
                />
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1"
                />
                <meta property="og:title" content="Allora OS" />
                <meta
                  property="og:description"
                  content="Run your startup like a pro—with autonomous AI execution."
                />
                <meta
                  property="og:url"
                  content="https://allora-os.vercel.app"
                />
              </Helmet>
              <RouterProvider router={router} />
              <Suspense
                fallback={
                  <div className="p-8 text-white">Loading Galaxy...</div>
                }
              >
                <Routes>
                  <Route path="/plugin/:id" element={<PluginDetailPage />} />
                  <Route
                    path="/strategy/:id"
                    element={<StrategyDetailPage />}
                  />
                  <Route path="*" element={<div>404 Not Found</div>} />
                </Routes>
              </Suspense>
              <Toaster position="top-right" />
              <GlobalErrorModal />
              <CookieConsent />

              {/* Accessibility helpers */}
              <div
                id="aria-live-polite"
                className="sr-only"
                aria-live="polite"
              ></div>
              <div
                id="aria-live-assertive"
                className="sr-only"
                aria-live="assertive"
              ></div>
            </CompanyAPIProvider>
          </AccessibilityProvider>
        </AuthProvider>
      </ThemeProvider>
    </GlobalErrorBoundary>
  );
};
export default App;

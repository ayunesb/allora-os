
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { router } from './routes/router';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { GlobalErrorBoundary } from './components/errorHandling/GlobalErrorBoundary';
import { setupErrorLogging } from './utils/errorHandling/errorLogging';
import { GlobalErrorModal } from './components/errorHandling/GlobalErrorModal';
import { CompanyAPIProvider } from './context/CompanyAPIContext';
import { initializeAnalytics } from './utils/analytics';
import { AccessibilityProvider } from './context/AccessibilityContext';
import CookieConsent from './components/CookieConsent';

const App = () => {
  React.useEffect(() => {
    // Initialize error logging
    setupErrorLogging();

    // Initialize analytics (only if consent is given)
    const cookieConsent = localStorage.getItem('cookie-consent');
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
              <RouterProvider router={router} />
              <Toaster position="top-right" />
              <GlobalErrorModal />
              <CookieConsent />

              {/* Accessibility helpers */}
              <div id="aria-live-polite" className="sr-only" aria-live="polite"></div>
              <div id="aria-live-assertive" className="sr-only" aria-live="assertive"></div>
            </CompanyAPIProvider>
          </AccessibilityProvider>
        </AuthProvider>
      </ThemeProvider>
    </GlobalErrorBoundary>
  );
};

export default App;

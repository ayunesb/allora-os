import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AppRoutes } from './routes';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { GlobalErrorBoundary } from './components/errorHandling/GlobalErrorBoundary';
import { setupErrorLogging } from './utils/errorHandling/errorLogging';
import { GlobalErrorModal } from './components/errorHandling/GlobalErrorModal';
import NavigationFixer from './components/navigation/NavigationFixer';
import { CompanyAPIProvider } from './context/CompanyAPIContext';
import { initializeAnalytics } from './utils/analytics';
import CookieConsent from './components/CookieConsent';

const App = () => {
  useEffect(() => {
    // Initialize error logging
    setupErrorLogging();

    // Initialize analytics (only if consent is given)
    const cookieConsent = localStorage.getItem('cookie-consent');
    if (cookieConsent) {
      const settings = JSON.parse(cookieConsent);
      if (settings.analytics) {
        initializeAnalytics();
      }
    }
  }, []);

  return (
    <GlobalErrorBoundary>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <CompanyAPIProvider>
              <NavigationFixer />
              <AppRoutes />
              <Toaster position="top-right" />
              <GlobalErrorModal />
              <CookieConsent />

              {/* Accessibility helpers */}
              <div id="aria-live-polite" className="sr-only" aria-live="polite"></div>
              <div id="aria-live-assertive" className="sr-only" aria-live="assertive"></div>
            </CompanyAPIProvider>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </GlobalErrorBoundary>
  );
};

export default App;

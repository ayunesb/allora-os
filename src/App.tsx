
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/context/AuthContext";
import { AuthRedirectProvider } from "@/context/AuthRedirectContext";
import { ExecutiveWorkflowProvider } from "@/context/ExecutiveWorkflowContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { lazyLoad } from "@/utils/performance/lazyLoad";
import { router } from "@/routes/router";
import { GlobalErrorModal } from "@/components/errorHandling/GlobalErrorModal";
import { setupErrorLogging } from "@/utils/errorHandling/errorLogging";
import { Suspense } from "react";
import { BackendConnectionAlert } from "@/components/dashboard/BackendConnectionAlert";
import { useEffect } from "react";
import { initializeAutoExecutorCron } from '@/utils/executorCron';

// Set up error logging
setupErrorLogging();

// Loading fallback for Suspense
const AppLoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Initialize performance monitoring
const initializePerformanceMonitoring = () => {
  // Record initial load time
  if (typeof window !== 'undefined') {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - 
                    window.performance.timing.navigationStart;
    console.log(`App loaded in ${loadTime}ms`);
    
    // Monitor long tasks
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) { // Tasks longer than 50ms
          console.warn('Long task detected:', entry);
        }
      }
    });
    
    observer.observe({ entryTypes: ['longtask'] });
  }
};

function App() {
  useEffect(() => {
    // Initialize auto-executor cron when app loads
    initializeAutoExecutorCron();
    
    // Initialize performance monitoring
    initializePerformanceMonitoring();
    
    // Clean up performance observers when component unmounts
    return () => {
      if (typeof window !== 'undefined') {
        PerformanceObserver.disconnect();
      }
    };
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Allora AI - Business Acceleration Platform</title>
        <meta name="description" content="AI-powered executive advisory platform designed to help businesses make strategic decisions and develop growth strategies" />
      </Helmet>
      
      <AuthRedirectProvider>
        <AuthProvider>
          <ExecutiveWorkflowProvider>
            <LanguageProvider>
              <div className="flex flex-col min-h-screen">
                <BackendConnectionAlert />
                <Suspense fallback={<AppLoadingFallback />}>
                  <RouterProvider router={router} />
                </Suspense>
                <Toaster richColors />
                <GlobalErrorModal />
              </div>
            </LanguageProvider>
          </ExecutiveWorkflowProvider>
        </AuthProvider>
      </AuthRedirectProvider>
    </HelmetProvider>
  );
}

export default App;

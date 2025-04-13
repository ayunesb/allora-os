
import { RouterProvider } from "react-router-dom";
import { router } from './routes/router';
import { ThemeProvider } from '@/components/theme-provider';
import { AccessibilityProvider } from '@/context/AccessibilityContext';
import { AuthProvider } from '@/context/AuthContext';
import { GlobalErrorBoundary } from "@/components/errorHandling/GlobalErrorBoundary";
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from 'sonner';
import { logger } from '@/utils/loggingService';

function App() {
  logger.info('App component rendering');

  return (
    <GlobalErrorBoundary>
      <ThemeProvider defaultTheme="dark" storageKey="allora-ui-theme">
        <AuthProvider>
          <AccessibilityProvider>
            <RouterProvider router={router} />
            <Toaster />
            <SonnerToaster position="bottom-right" />
          </AccessibilityProvider>
        </AuthProvider>
      </ThemeProvider>
    </GlobalErrorBoundary>
  );
}

export default App;

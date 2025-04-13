
import { RouterProvider } from "react-router-dom";
import { router } from './routes/router';
import { ThemeProvider } from '@/components/theme-provider';
import { AccessibilityProvider } from '@/context/AccessibilityContext';
import { AuthProvider } from '@/context/AuthContext';
import { HelpProvider } from '@/context/HelpContext';
import { GlobalErrorBoundary } from "@/components/errorHandling/GlobalErrorBoundary";
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from 'sonner';
import { logger } from '@/utils/loggingService';
import { HelpModal } from "@/components/help/HelpModal";

function App() {
  logger.info('App component rendering');

  return (
    <GlobalErrorBoundary>
      <ThemeProvider defaultTheme="dark" storageKey="allora-ui-theme">
        <AuthProvider>
          <AccessibilityProvider>
            <HelpProvider>
              <RouterProvider router={router} />
              <HelpModal />
              <Toaster />
              <SonnerToaster position="bottom-right" />
            </HelpProvider>
          </AccessibilityProvider>
        </AuthProvider>
      </ThemeProvider>
    </GlobalErrorBoundary>
  );
}

export default App;


import { RouterProvider } from "react-router-dom";
import { router } from './routes/router';
import { ThemeProvider } from '@/components/theme-provider';
import { AccessibilityProvider } from '@/context/AccessibilityContext';
import { AuthProvider } from '@/context/AuthContext';
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from 'sonner';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" storageKey="allora-ui-theme">
        <AuthProvider>
          <AccessibilityProvider>
            <RouterProvider router={router} />
            <Toaster />
            <SonnerToaster position="bottom-right" />
          </AccessibilityProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

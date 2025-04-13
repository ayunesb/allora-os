
import { RouterProvider } from "react-router-dom";
import { router } from './routes/router';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { AccessibilityProvider } from '@/context/AccessibilityContext';
import { AuthProvider } from '@/context/AuthContext';
import { NavigationManager } from '@/components/NavigationManager';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="allora-ui-theme">
      <AuthProvider>
        <AccessibilityProvider>
          <RouterProvider router={router} />
          <NavigationManager />
          <Toaster />
        </AccessibilityProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

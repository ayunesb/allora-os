
import { RouterProvider } from "react-router-dom";
import { router } from './routes/router';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { AccessibilityProvider } from '@/context/AccessibilityContext';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="allora-ui-theme">
      <AccessibilityProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AccessibilityProvider>
    </ThemeProvider>
  );
}

export default App;

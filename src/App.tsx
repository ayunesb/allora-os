
import { BrowserRouter as Router } from 'react-router-dom';
import { RouterProvider } from "react-router-dom";
import { router } from './routes/router';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { AccessibilityProvider } from '@/context/AccessibilityContext';
import { SocialMediaProvider } from '@/context/SocialMediaContext';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="allora-ui-theme">
      <AccessibilityProvider>
        <SocialMediaProvider>
          <RouterProvider router={router} />
          <Toaster />
        </SocialMediaProvider>
      </AccessibilityProvider>
    </ThemeProvider>
  );
}

export default App;

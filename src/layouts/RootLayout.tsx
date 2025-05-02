import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalErrorBoundary } from '@/components/errorHandling/GlobalErrorBoundary';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <GlobalErrorBoundary>
      <HelmetProvider>
        <ThemeProvider defaultTheme="dark" storageKey="allora-theme">
          <QueryClientProvider client={queryClient}>
            <div className="min-h-screen bg-background text-foreground antialiased">
              <Outlet />
              <Toaster />
            </div>
          </QueryClientProvider>
        </ThemeProvider>
      </HelmetProvider>
    </GlobalErrorBoundary>
  );
}

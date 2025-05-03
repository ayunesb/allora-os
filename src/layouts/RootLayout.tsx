import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalErrorBoundary } from '@/components/errorHandling/GlobalErrorBoundary';
import { AnimatePresence, motion } from 'framer-motion';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton'; // if using shadcn
import GalaxyGraph from '@/components/galaxy/GalaxyGraph';
import GalaxyPage from '@/pages/Galaxy';

const queryClient = new QueryClient();

export default function RootLayout() {
  const location = useLocation();

  return (
    <GlobalErrorBoundary>
      <HelmetProvider>
        <ThemeProvider defaultTheme="dark" storageKey="allora-theme">
          <QueryClientProvider client={queryClient}>
            <div className="min-h-screen text-white bg-gradient-to-br from-[#0A0A23] to-[#1A1A40] bg-fixed">
              <body className="bg-gradient-futuristic text-foreground">
                <div id="root">
                  <div className="min-h-screen bg-background text-foreground antialiased">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="min-h-screen"
                      >
                        <Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
                          {location.pathname === '/galaxy' ? <GalaxyPage /> : <Outlet />}
                        </Suspense>
                      </motion.div>
                    </AnimatePresence>
                    <Toaster />
                  </div>
                </div>
              </body>
            </div>
          </QueryClientProvider>
        </ThemeProvider>
      </HelmetProvider>
    </GlobalErrorBoundary>
  );
}

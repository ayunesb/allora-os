import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalErrorBoundary } from '@/components/errorHandling/GlobalErrorBoundary';
import { AnimatePresence, motion } from 'framer-motion';

const queryClient = new QueryClient();

export default function RootLayout() {
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Outlet />
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

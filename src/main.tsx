
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';

// Import routes
import { AppRoutes } from './routes';

// Import styles - using the new centralized import
import './styles/index';

// Create a new QueryClient instance with better error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      meta: {
        onError: (error: Error) => {
          // Silently handle errors in production
          if (process.env.NODE_ENV !== 'production') {
            console.error('Query error:', error);
          }
        }
      }
    },
    mutations: {
      meta: {
        onError: (error: Error) => {
          // Silently handle errors in production
          if (process.env.NODE_ENV !== 'production') {
            console.error('Mutation error:', error);
          }
        }
      }
    }
  },
});

// Function to hide Lovable badge
const hideLovableBadge = () => {
  // Set flag in localStorage
  localStorage.setItem('lovable-badge-hidden', 'true');
  
  // Hide badge directly with CSS
  const style = document.createElement('style');
  style.textContent = `
    [class*="lovable-badge"], 
    [id*="lovable-badge"], 
    [data-lovable],
    .LovableBadge,
    .LovablePoweredBy {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
    }
  `;
  document.head.appendChild(style);
  
  // Also try to find and remove any badge elements
  const removeBadge = () => {
    const badges = document.querySelectorAll('[class*="lovable-badge"], [id*="lovable-badge"], [data-lovable]');
    badges.forEach(badge => {
      if (badge instanceof HTMLElement) {
        badge.style.display = 'none';
      }
    });
  };
  
  // Run immediately and periodically check for new badges
  removeBadge();
  setInterval(removeBadge, 1000);
};

// Hide Lovable badge
hideLovableBadge();

// Wrap the app with our providers
function WrappedApp() {
  // Hide badge on component mount
  useEffect(() => {
    hideLovableBadge();
  }, []);

  return (
    <React.StrictMode>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
        </QueryClientProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}

// Render the app
ReactDOM.createRoot(document.getElementById('root')!).render(<WrappedApp />);


import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRoutes } from './routes'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { AccessibilityProvider } from './context/AccessibilityContext'
import ErrorBoundary from './components/ErrorBoundary'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a client with optimized production settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      // Performance optimizations
      keepPreviousData: true, // Keep previous data while fetching new data
      suspense: false, // Don't use React suspense
    },
  },
})

// Use deferred mounting for non-critical components
const deferredMounting = (Component: React.ComponentType) => {
  return (props: any) => {
    const [show, setShow] = React.useState(false);
    
    React.useEffect(() => {
      // Defer rendering of non-critical components
      const timer = setTimeout(() => {
        setShow(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }, []);
    
    if (!show) return null;
    return <Component {...props} />;
  };
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AccessibilityProvider>
            <AppRoutes />
          </AccessibilityProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)

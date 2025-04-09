
import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRoutes } from './routes'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { AccessibilityProvider } from './context/AccessibilityContext'
import ErrorBoundary from './components/ErrorBoundary'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

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

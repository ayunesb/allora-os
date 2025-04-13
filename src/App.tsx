
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import { GlobalErrorBoundary } from '@/components/errorHandling/GlobalErrorBoundary';
import { logger } from '@/utils/loggingService';
import { AccessibilityProvider } from '@/context/AccessibilityContext';

// Handle errors gracefully
const handleError = (error: Error) => {
  logger.error('Caught React error in App component:', error);
  console.error('React error caught in App.tsx:', error);
};

const App = () => {
  return (
    <GlobalErrorBoundary 
      onError={handleError}
      fallback={<div className="p-8 text-center">Something went wrong. Please refresh the page.</div>}
    >
      <AccessibilityProvider>
        <RouterProvider router={router} />
      </AccessibilityProvider>
    </GlobalErrorBoundary>
  );
};

export default App;


import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

// This component is now primarily a wrapper for the new routing system
function App() {
  const location = useLocation();
  
  useEffect(() => {
    console.log("Current route:", location.pathname);
  }, [location]);

  // The actual routing is now handled in src/routes.tsx
  return (
    <div className="min-h-screen bg-background">
      <Outlet />
    </div>
  );
}

export default App;

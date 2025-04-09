
import React from 'react';
import { Outlet } from 'react-router-dom';

// This component is now primarily a wrapper for the new routing system
function App() {
  // The actual routing is now handled in src/routes.tsx
  return <Outlet />;
}

export default App;

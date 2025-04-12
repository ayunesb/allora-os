
// This file is kept for backward compatibility
// The main routing is now handled in router.tsx
import { router } from './router';

// Export the router for use in main.tsx or App.tsx
export { router };

// Export a component to use in main.tsx (legacy support)
export const AppRoutes = () => {
  return null; // This component doesn't render anything as the router is used externally
};

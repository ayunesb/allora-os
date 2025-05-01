
import { useContext } from 'react';
import { AuthContext, AuthContextProps } from "@/context/AuthContext";

/**
 * Hook that provides access to authentication context
 * Wrapped in a try-catch so that it can be used in components not wrapped in AuthProvider
 * This helps create more resilient components that can handle being loaded outside the auth context
 */
export const useAuth = (): AuthContextProps => {
  try {
    const context = useContext(AuthContext);
    
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    
    return context;
  } catch (error) {
    // Provide a fallback for testing or when auth context is not available
    console.warn('Auth context not available, returning fallback values');
    
    return {
      user: null,
      profile: null,
      session: null,
      isLoading: false,
      isEmailVerified: false,
      authError: "Auth context not available",
      isSessionExpired: false,
      hasInitialized: false,
      refreshSession: async () => false,
      refreshProfile: async () => {},
      signIn: async () => { throw new Error('Auth context not available'); },
      signUp: async () => { throw new Error('Auth context not available'); },
      signOut: async () => { throw new Error('Auth context not available'); }
    };
  }
};

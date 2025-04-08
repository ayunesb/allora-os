
import { createContext, useContext, ReactNode } from 'react';
import { useAuthState } from '@/hooks/useAuthState';
import { AuthContextType } from '@/types/auth';
import { handleSignIn, handleSignUp, handleSignOut, refreshSession } from '@/services/authService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { 
    user, 
    session, 
    isLoading, 
    profile, 
    isProfileLoading, 
    isEmailVerified,
    loadUserProfile,
    setUser,
    setSession
  } = useAuthState();

  const refreshProfile = async () => {
    if (user?.id) {
      await loadUserProfile(user.id);
    }
  };
  
  const refreshUserSession = async () => {
    try {
      const { session: newSession, user: newUser } = await refreshSession();
      
      setSession(newSession);
      setUser(newUser);
      
      if (newUser) {
        setTimeout(() => {
          loadUserProfile(newUser.id);
        }, 0);
      }
    } catch (error) {
      console.error('Error refreshing session:', error);
    }
  };

  const value: AuthContextType = {
    user,
    session,
    isLoading,
    profile,
    isProfileLoading,
    isEmailVerified,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
    refreshProfile,
    refreshSession: refreshUserSession,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

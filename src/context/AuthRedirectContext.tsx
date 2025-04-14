
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthRedirectContextType {
  redirectUrl: string | null;
  setRedirectUrl: (url: string | null) => void;
  clearRedirectUrl: () => void;
}

const AuthRedirectContext = createContext<AuthRedirectContextType | undefined>(undefined);

interface AuthRedirectProviderProps {
  children: ReactNode;
}

export const AuthRedirectProvider: React.FC<AuthRedirectProviderProps> = ({ children }) => {
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  const clearRedirectUrl = () => {
    setRedirectUrl(null);
  };

  return (
    <AuthRedirectContext.Provider
      value={{
        redirectUrl,
        setRedirectUrl,
        clearRedirectUrl
      }}
    >
      {children}
    </AuthRedirectContext.Provider>
  );
};

export const useAuthRedirect = () => {
  const context = useContext(AuthRedirectContext);
  if (context === undefined) {
    throw new Error('useAuthRedirect must be used within an AuthRedirectProvider');
  }
  return context;
};

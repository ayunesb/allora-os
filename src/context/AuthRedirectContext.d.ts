import React, { ReactNode } from 'react';
interface AuthRedirectContextType {
    redirectUrl: string | null;
    setRedirectUrl: (url: string | null) => void;
    clearRedirectUrl: () => void;
}
interface AuthRedirectProviderProps {
    children: ReactNode;
}
export declare const AuthRedirectProvider: React.FC<AuthRedirectProviderProps>;
export declare const useAuthRedirect: () => AuthRedirectContextType;
export {};

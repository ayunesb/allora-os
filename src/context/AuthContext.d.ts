import { ReactNode } from 'react';
import { AuthContextProps as AuthContextType } from '@/types/fixed/Auth';
interface AuthProviderProps {
    children: ReactNode;
}
export declare const AuthProvider: React.FC<AuthProviderProps>;
export declare const useAuth: () => AuthContextType;
export {};

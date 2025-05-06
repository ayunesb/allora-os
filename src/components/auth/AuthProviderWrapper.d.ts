import { ReactNode } from "react";
interface AuthProviderWrapperProps {
  children: ReactNode;
}
/**
 * A component that ensures all children are wrapped with the AuthProvider
 * to prevent "useAuth must be used within an AuthProvider" errors
 */
export declare function AuthProviderWrapper({
  children,
}: AuthProviderWrapperProps): JSX.Element;
export {};

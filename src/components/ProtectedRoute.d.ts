import { ReactNode } from "react";
type ProtectedRouteProps = {
    children: ReactNode;
    roleRequired?: 'admin' | 'user';
    adminOnly?: boolean;
    requireVerified?: boolean;
};
export default function ProtectedRoute({ children, roleRequired, adminOnly, requireVerified }: ProtectedRouteProps): import("react").JSX.Element;
export {};

import { ReactNode } from "react";
interface AdminCheckHandlerProps {
    user: any;
    roleRequired?: 'admin' | 'user';
    adminOnly?: boolean;
    hasInitialized: boolean;
    children: (isUserAdmin: boolean, adminCheckDone: boolean) => ReactNode;
}
export declare const AdminCheckHandler: ({ user, roleRequired, adminOnly, hasInitialized, children }: AdminCheckHandlerProps) => import("react").JSX.Element;
export {};

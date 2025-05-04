interface SessionRefreshHandlerProps {
    user: any;
    refreshSession: () => Promise<void>;
    children: (isRefreshing: boolean, handleSessionRefresh: () => Promise<void>) => React.ReactNode;
}
export declare const SessionRefreshHandler: ({ user, refreshSession, children }: SessionRefreshHandlerProps) => import("react").JSX.Element;
export {};

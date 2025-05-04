interface AuthStateHandlerProps {
    isLoading: boolean;
    authError: string | null;
    onRetry: () => Promise<void>;
    isRetrying: boolean;
    children: React.ReactNode;
}
export declare const AuthStateHandler: ({ isLoading, authError, onRetry, isRetrying, children }: AuthStateHandlerProps) => import("react").JSX.Element;
export {};

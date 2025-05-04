interface AuthErrorStateProps {
    error: string;
    onRetry: () => Promise<void>;
    isRetrying: boolean;
}
export declare function AuthErrorState({ error, onRetry, isRetrying }: AuthErrorStateProps): import("react").JSX.Element;
export {};

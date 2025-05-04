export type AuthErrorType = 'invalid_credentials' | 'email_not_confirmed' | 'user_not_found' | 'signup_failed' | 'session_expired' | 'network_error' | 'rate_limit' | 'weak_password' | 'email_already_exists' | 'password_recovery_failed' | 'unauthorized' | 'unknown';
interface AuthError {
    type: AuthErrorType;
    message: string;
    originalError?: any;
}
export declare function useAuthErrorHandler(): {
    lastError: AuthError;
    handleAuthError: (error: any, options?: {
        showToast?: boolean;
        redirectTo?: string;
        logError?: boolean;
    }) => AuthError;
    clearError: () => void;
    isErrorType: (type: AuthErrorType) => boolean;
};
export {};

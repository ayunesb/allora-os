import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { AuthLoadingState } from "./AuthLoadingState";
import { AuthErrorState } from "./AuthErrorState";
export const AuthStateHandler = ({ isLoading, authError, onRetry, isRetrying, children, }) => {
    const [loadingTimeout, setLoadingTimeout] = useState(false);
    // Set a timeout to avoid infinite loading
    useEffect(() => {
        let timer;
        if (isLoading && !loadingTimeout) {
            timer = window.setTimeout(() => {
                setLoadingTimeout(true);
            }, 10000); // 10 seconds loading timeout
        }
        return () => {
            if (timer)
                clearTimeout(timer);
        };
    }, [isLoading, loadingTimeout]);
    // Show loading state but with timeout protection
    if (isLoading && !loadingTimeout) {
        return _jsx(AuthLoadingState, {});
    }
    // If loading took too long, give user the option to retry or navigate back
    if (loadingTimeout && isLoading) {
        return (_jsx(AuthErrorState, { error: "Loading took too long. There might be an issue with the connection.", onRetry: onRetry, isRetrying: isRetrying }));
    }
    if (authError) {
        return (_jsx(AuthErrorState, { error: authError, onRetry: onRetry, isRetrying: isRetrying }));
    }
    return _jsx(_Fragment, { children: children });
};

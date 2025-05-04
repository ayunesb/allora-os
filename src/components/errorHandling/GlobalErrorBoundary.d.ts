import React from 'react';
interface GlobalErrorBoundaryProps {
    children: React.ReactNode;
    onError?: (error: Error, errorInfo?: React.ErrorInfo) => void;
    fallback?: React.ReactNode;
}
export declare function GlobalErrorBoundary({ children, onError, fallback }: GlobalErrorBoundaryProps): JSX.Element;
export {};

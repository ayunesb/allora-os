import { Component, ErrorInfo, ReactNode } from "react";
type FallbackProps = {
    error: Error;
    resetErrorBoundary: () => void;
};
type FallbackType = ReactNode | ((props: FallbackProps) => ReactNode);
interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: FallbackType;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
}
interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}
export declare class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps);
    static getDerivedStateFromError(error: Error): ErrorBoundaryState;
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void;
    resetErrorBoundary(): void;
    render(): string | number | boolean | Iterable<ReactNode> | import("react").JSX.Element;
}
export default ErrorBoundary;

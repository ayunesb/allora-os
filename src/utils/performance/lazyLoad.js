import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { Suspense, lazy } from "react";
/**
 * Default loading component
 */
const DefaultLoadingFallback = () => (_jsx("div", { className: "flex items-center justify-center min-h-[200px]", children: _jsx("div", { className: "h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" }) }));
/**
 * Error fallback component
 */
const ErrorFallback = ({ error, resetErrorBoundary }) => (_jsxs("div", { className: "p-4 border border-red-300 rounded bg-red-50 text-red-800", children: [_jsx("h2", { className: "text-lg font-semibold mb-2", children: "Something went wrong" }), _jsx("p", { className: "mb-2", children: error.message }), _jsx("button", { className: "px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors", onClick: resetErrorBoundary, children: "Try again" })] }));
/**
 * Error boundary component
 */
class LazyErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.resetErrorBoundary = () => {
            this.setState({ hasError: false, error: null });
        };
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    render() {
        if (this.state.hasError && this.state.error) {
            const { fallback: Fallback } = this.props;
            return (_jsx(Fallback, { error: this.state.error, resetErrorBoundary: this.resetErrorBoundary }));
        }
        return this.props.children;
    }
}
export function lazyLoad(importFunc, options = {}) {
    const { fallback = _jsx(DefaultLoadingFallback, {}), errorBoundary = true, preload = false, } = options;
    // Create the lazy component
    const LazyComponent = lazy(importFunc);
    // Preload the component if requested
    if (preload) {
        importFunc();
    }
    // Create a wrapper that applies Suspense and optional ErrorBoundary
    const WrappedComponent = (props) => {
        const content = (_jsx(Suspense, { fallback: fallback, children: _jsx(LazyComponent, Object.assign({}, props)) }));
        if (errorBoundary) {
            return (_jsx(LazyErrorBoundary, { fallback: ErrorFallback, children: content }));
        }
        return content;
    };
    return WrappedComponent;
}
/**
 * Creates a lazy-loaded component that only loads when it becomes visible in the viewport
 * @param importFunc Function that returns the import promise
 * @param options Configuration options
 * @returns Lazy-loaded component that loads on viewport visibility
 */
export function lazyLoadOnVisible(importFunc, options = {}) {
    const LazyComponent = lazyLoad(importFunc, options);
    const VisibilityWrapper = (props) => {
        const [isVisible, setIsVisible] = React.useState(false);
        const ref = React.useRef(null);
        React.useEffect(() => {
            if (!ref.current)
                return;
            const observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            }, { rootMargin: "200px" });
            observer.observe(ref.current);
            return () => {
                observer.disconnect();
            };
        }, []);
        return (_jsx("div", { ref: ref, className: "min-h-[10px]", children: isVisible ? (_jsx(LazyComponent, Object.assign({}, props))) : (options.fallback || _jsx(DefaultLoadingFallback, {})) }));
    };
    return VisibilityWrapper;
}

import React, { Suspense, lazy } from "react";
/**
 * Default loading component
 */
const DefaultLoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);
/**
 * Error fallback component
 */
const ErrorFallback: React.FC<{
  error: any;
  resetErrorBoundary: () => void;
}> = ({ error, resetErrorBoundary }) => (
  <div className="p-4 border border-red-300 rounded bg-red-50 text-red-800">
    <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
    <p className="mb-2">{error.message}</p>
    <button
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      onClick={resetErrorBoundary}
    >
      Try again
    </button>
  </div>
);

/**
 * Error boundary component
 */
class LazyErrorBoundary extends React.Component<
  {
    fallback: React.FC<{ error: any; resetErrorBoundary: () => void }>;
    children: React.ReactNode;
  },
  { hasError: boolean; error: any }
> {
  constructor(props: {
    fallback: React.FC<{ error: any; resetErrorBoundary: () => void }>;
    children: React.ReactNode;
  }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const { fallback: Fallback } = this.props;
      return (
        <Fallback
          error={this.state.error}
          resetErrorBoundary={this.resetErrorBoundary}
        />
      );
    }
    return this.props.children;
  }
}

/**
 * Creates a lazy-loaded component with optional error boundary and custom loading fallback
 * @param importFunc Function that returns the import promise
 * @param options Configuration options
 * @returns Lazy-loaded component
 */
type LazyLoadOptions = {
  fallback?: JSX.Element;
  errorBoundary?: boolean;
  preload?: boolean;
};

export function lazyLoad(
  importFunc: () => Promise<{ default: React.ComponentType<any> }>,
  options: LazyLoadOptions = {},
) {
  const {
    fallback = <DefaultLoadingFallback />,
    errorBoundary = true,
    preload = false,
  } = options;

  // Create the lazy component
  const LazyComponent = lazy(importFunc);

  // Preload the component if requested
  if (preload) {
    importFunc();
  }

  // Create a wrapper that applies Suspense and optional ErrorBoundary
  const WrappedComponent: React.FC<any> = (props) => {
    const content = (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
    if (errorBoundary) {
      return (
        <LazyErrorBoundary fallback={ErrorFallback}>
          {content}
        </LazyErrorBoundary>
      );
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
export function lazyLoadOnVisible(
  importFunc: () => Promise<{ default: React.ComponentType<any> }>,
  options: LazyLoadOptions = {},
) {
  const LazyComponent = lazyLoad(importFunc, options);
  const VisibilityWrapper: React.FC<any> = (props) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const ref = React.useRef(null);
    React.useEffect(() => {
      if (!ref.current) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { rootMargin: "200px" }, // Start loading when within 200px of viewport
      );
      observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }, []);
    return (
      <div ref={ref} className="min-h-[10px]">
        {isVisible ? (
          <LazyComponent {...props} />
        ) : (
          options.fallback || <DefaultLoadingFallback />
        )}
      </div>
    );
  };
  return VisibilityWrapper;
}

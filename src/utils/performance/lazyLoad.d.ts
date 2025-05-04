import React, { ComponentType, LazyExoticComponent } from 'react';
/**
 * Interface for lazy loading options
 */
interface LazyLoadOptions {
    fallback?: React.ReactNode;
    errorBoundary?: boolean;
    preload?: boolean;
    chunkName?: string;
}
/**
 * Creates a lazy-loaded component with optional error boundary and custom loading fallback
 * @param importFunc Function that returns the import promise
 * @param options Configuration options
 * @returns Lazy-loaded component
 */
export declare function lazyLoad<T extends ComponentType<any>>(importFunc: () => Promise<{
    default: T;
}>, options?: LazyLoadOptions): LazyExoticComponent<T>;
/**
 * Creates a lazy-loaded component that only loads when it becomes visible in the viewport
 * @param importFunc Function that returns the import promise
 * @param options Configuration options
 * @returns Lazy-loaded component that loads on viewport visibility
 */
export declare function lazyLoadOnVisible<T extends ComponentType<any>>(importFunc: () => Promise<{
    default: T;
}>, options?: LazyLoadOptions): LazyExoticComponent<T>;
export {};

export interface LoadingProps {
    /**
     * The size of the loading spinner
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Optional text to display with the spinner
     */
    text?: string;
    /**
     * Whether to center the loading spinner
     */
    center?: boolean;
    /**
     * Whether to fill the parent container
     */
    fullHeight?: boolean;
    /**
     * Show a tooltip with more information about the loading state
     */
    tooltip?: string;
    /**
     * Optional className to override styles
     */
    className?: string;
}
/**
 * Loading component that displays a spinner and optional text
 */
export declare function Loading({ size, text, center, fullHeight, tooltip, className, }: LoadingProps): JSX.Element;
/**
 * Skeleton loader for content that's still loading
 */
export declare function SkeletonLoader({ rows, className, tooltip }: {
    rows?: number;
    className?: string;
    tooltip?: string;
}): JSX.Element;
/**
 * Component to use when data is still being fetched
 */
export declare function DataLoading({ tooltipMessage }: {
    tooltipMessage?: string;
}): JSX.Element;
/**
 * Component to use specifically for API calls
 */
export declare function APILoading({ text, tooltipMessage }: {
    text?: string;
    tooltipMessage?: string;
}): JSX.Element;
export default Loading;


import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

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
   * Optional className to override styles
   */
  className?: string;
}

/**
 * Loading component that displays a spinner and optional text
 */
export function Loading({
  size = 'md',
  text,
  center = false,
  fullHeight = false,
  className,
}: LoadingProps) {
  // Map sizes to Tailwind classes
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };
  
  // Basic component
  const spinner = (
    <Loader2 
      className={cn(
        sizeClasses[size],
        'animate-spin',
        className
      )} 
    />
  );
  
  // If just the spinner is needed without any positioning or text
  if (!center && !fullHeight && !text) {
    return spinner;
  }
  
  return (
    <div 
      className={cn(
        'flex flex-col items-center justify-center',
        center && 'w-full',
        fullHeight && 'min-h-[200px]',
        center && fullHeight && 'min-h-[50vh]'
      )}
    >
      {spinner}
      {text && (
        <p className="mt-2 text-sm text-muted-foreground">
          {text}
        </p>
      )}
    </div>
  );
}

/**
 * Skeleton loader for content that's still loading
 */
export function SkeletonLoader({ 
  rows = 3, 
  className 
}: { 
  rows?: number;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array(rows).fill(0).map((_, i) => (
        <div 
          key={i} 
          className="h-4 bg-muted animate-pulse rounded"
          style={{ 
            width: `${Math.floor(Math.random() * 50) + 50}%` 
          }}
        />
      ))}
    </div>
  );
}

/**
 * Component to use when data is still being fetched
 */
export function DataLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loading size="lg" text="Loading data..." />
    </div>
  );
}

/**
 * Component to use specifically for API calls
 */
export function APILoading({ text = "Connecting to server..." }: { text?: string }) {
  return (
    <div className="rounded-lg border p-8 text-center">
      <Loading center text={text} />
    </div>
  );
}

export default Loading;

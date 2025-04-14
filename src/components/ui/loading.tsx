
import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2, Info } from 'lucide-react';
import { HelpTooltip } from '@/components/help/HelpTooltip';

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
export function Loading({
  size = 'md',
  text,
  center = false,
  fullHeight = false,
  tooltip,
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
    return tooltip ? (
      <HelpTooltip content={tooltip}>
        {spinner}
      </HelpTooltip>
    ) : spinner;
  }
  
  return (
    <div 
      className={cn(
        'flex flex-col items-center justify-center',
        center && 'w-full',
        fullHeight && 'min-h-[200px]',
        center && fullHeight && 'min-h-[50vh]'
      )}
      role="status"
      aria-live="polite"
    >
      {spinner}
      {text && (
        <div className="mt-2 flex items-center">
          <p className="text-sm text-muted-foreground">
            {text}
          </p>
          {tooltip && (
            <HelpTooltip content={tooltip}>
              <Info className="ml-1 h-4 w-4 text-muted-foreground cursor-help" />
            </HelpTooltip>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Skeleton loader for content that's still loading
 */
export function SkeletonLoader({ 
  rows = 3, 
  className,
  tooltip
}: { 
  rows?: number;
  className?: string;
  tooltip?: string;
}) {
  const skeletonContent = (
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

  return tooltip ? (
    <div className="relative">
      {skeletonContent}
      <HelpTooltip content={tooltip} className="absolute top-0 right-0">
        <span className="sr-only">Loading information</span>
      </HelpTooltip>
    </div>
  ) : skeletonContent;
}

/**
 * Component to use when data is still being fetched
 */
export function DataLoading({ tooltipMessage }: { tooltipMessage?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12" role="status" aria-live="polite">
      <Loading 
        size="lg" 
        text="Loading data..." 
        tooltip={tooltipMessage || "We're fetching the latest data for you. This should only take a moment."}
      />
    </div>
  );
}

/**
 * Component to use specifically for API calls
 */
export function APILoading({ 
  text = "Connecting to server...",
  tooltipMessage
}: { 
  text?: string;
  tooltipMessage?: string;
}) {
  return (
    <div className="rounded-lg border p-8 text-center" role="status" aria-live="polite">
      <Loading 
        center 
        text={text} 
        tooltip={tooltipMessage || "We're establishing a secure connection to our servers. This may take a few seconds."}
      />
    </div>
  );
}

export default Loading;

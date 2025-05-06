import React from "react";
import { cn } from "@/lib/utils";
import { Loader2, Info } from "lucide-react";
import { HelpTooltip } from "@/components/help/HelpTooltip";
/**
 * Loading component that displays a spinner and optional text
 */
export const Loading: React.FC = () => <div className="spinner">Loading...</div>;
/**
 * Skeleton loader for content that's still loading
 */
export function SkeletonLoader({ rows = 3, className, tooltip }) {
  const skeletonContent = (
    <div className={cn("space-y-2", className)}>
      {Array(rows)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="h-4 bg-muted animate-pulse rounded"
            style={{
              width: `${Math.floor(Math.random() * 50) + 50}%`,
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
  ) : (
    skeletonContent
  );
}
/**
 * Component to use when data is still being fetched
 */
export function DataLoading({ tooltipMessage }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-12"
      role="status"
      aria-live="polite"
    >
      <Loading
        size="lg"
        text="Loading data..."
        tooltip={
          tooltipMessage ||
          "We're fetching the latest data for you. This should only take a moment."
        }
      />
    </div>
  );
}
/**
 * Component to use specifically for API calls
 */
export function APILoading({
  text = "Connecting to server...",
  tooltipMessage,
}) {
  return (
    <div
      className="rounded-lg border p-8 text-center"
      role="status"
      aria-live="polite"
    >
      <Loading
        center
        text={text}
        tooltip={
          tooltipMessage ||
          "We're establishing a secure connection to our servers. This may take a few seconds."
        }
      />
    </div>
  );
}
export default Loading;

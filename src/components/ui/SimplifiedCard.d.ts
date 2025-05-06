import React from "react";
/**
 * A simplified card component with better UX for non-technical users
 */
interface SimplifiedCardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  variant?: "default" | "info" | "success" | "warning" | "error" | "ai";
  contentClassName?: string;
  className?: string;
  icon?: React.ReactNode;
  headerAction?: React.ReactNode;
}
export declare function SimplifiedCard({
  title,
  description,
  children,
  footer,
  isLoading,
  error,
  onRetry,
  variant,
  contentClassName,
  className,
  icon,
  headerAction,
}: SimplifiedCardProps): JSX.Element;
export {};

import React from "react";
interface EmptyStateProps {
    onCreateNew: () => void;
    isLoading?: boolean;
    error?: string | null;
    onRetry?: () => void;
}
declare const EmptyState: React.FC<EmptyStateProps>;
export default EmptyState;

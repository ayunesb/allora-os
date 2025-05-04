/**
 * A shared utility function to handle consistent data refresh operations across the application
 *
 * @param options.fetchFn - The function that performs the actual data fetching/refresh
 * @param options.onComplete - Optional callback to run after successful fetch
 * @param options.setIsRefreshing - State setter function to track loading state
 * @param options.successMessage - Optional message to display on success
 * @param options.errorMessage - Optional message to display on error
 * @returns Promise that resolves when refresh is complete
 */
export declare const refreshData: ({ fetchFn, onComplete, setIsRefreshing, successMessage, errorMessage }: {
    fetchFn: () => Promise<void>;
    onComplete?: () => Promise<void>;
    setIsRefreshing: (isRefreshing: boolean) => void;
    successMessage?: string;
    errorMessage?: string;
}) => Promise<void>;

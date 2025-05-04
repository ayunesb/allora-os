import { toast } from 'sonner';
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
export const refreshData = async ({ fetchFn, onComplete, setIsRefreshing, successMessage = 'Data refreshed successfully', errorMessage = 'Failed to refresh data' }) => {
    setIsRefreshing(true);
    try {
        await fetchFn();
        if (onComplete) {
            await onComplete();
        }
        toast.success(successMessage);
        return Promise.resolve();
    }
    catch (error) {
        console.error('Error refreshing data:', error);
        toast.error(errorMessage);
        return Promise.reject(error);
    }
    finally {
        setIsRefreshing(false);
    }
};

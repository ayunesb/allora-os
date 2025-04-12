
import { toast } from 'sonner';

/**
 * Generic data refresh utility
 * 
 * Can be used by both campaign and social media features to handle
 * data refresh operations consistently.
 * 
 * @param fetchFn - Function that fetches data from external source
 * @param onComplete - Callback to run after refresh completes
 * @param setIsRefreshing - State setter for refresh status
 * @param successMessage - Message to show on success
 * @param errorMessage - Message to show on error
 * @returns Promise that resolves when refresh completes
 */
export async function refreshData<T>({
  fetchFn,
  onComplete,
  setIsRefreshing,
  successMessage = 'Data refreshed successfully',
  errorMessage = 'Failed to refresh data'
}: {
  fetchFn: () => Promise<T>;
  onComplete: () => Promise<void>;
  setIsRefreshing: (isRefreshing: boolean) => void;
  successMessage?: string;
  errorMessage?: string;
}): Promise<void> {
  setIsRefreshing(true);
  
  try {
    await fetchFn();
    await onComplete();
    toast.success(successMessage);
  } catch (error: unknown) {
    console.error('Error refreshing data:', error);
    toast.error(errorMessage);
    
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
  } finally {
    setIsRefreshing(false);
  }
}

/**
 * Formats pagination information for display
 * 
 * @param totalItems - Total number of items
 * @param currentPage - Current page number
 * @param itemsPerPage - Number of items per page
 * @returns Formatted pagination string
 */
export function formatPaginationInfo(
  totalItems: number,
  currentPage: number,
  itemsPerPage: number
): string {
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);
  
  return `Showing ${start}-${end} of ${totalItems} items`;
}

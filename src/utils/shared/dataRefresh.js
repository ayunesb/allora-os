var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { toast } from "sonner";
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
export const refreshData = (_a) => __awaiter(void 0, [_a], void 0, function* ({ fetchFn, onComplete, setIsRefreshing, successMessage = "Data refreshed successfully", errorMessage = "Failed to refresh data", }) {
    setIsRefreshing(true);
    try {
        yield fetchFn();
        if (onComplete) {
            yield onComplete();
        }
        toast.success(successMessage);
        return Promise.resolve();
    }
    catch (error) {
        console.error("Error refreshing data:", error);
        toast.error(errorMessage);
        return Promise.reject(error);
    }
    finally {
        setIsRefreshing(false);
    }
});

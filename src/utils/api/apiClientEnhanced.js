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
import { fetchApi } from "./apiClient";
import { handleApiError } from "@/utils/api/errorHandling";
import { useState } from "react";
export function useProtectedApi(apiFunction, options = {}) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const execute = (params) => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        setError(null);
        try {
            const result = yield apiFunction(params);
            if (options.showSuccessToast) {
                toast.success(options.successMessage || "Operation completed successfully");
            }
            if (options.onSuccess) {
                options.onSuccess(result);
            }
            return result;
        }
        catch (err) {
            setError(err);
            if (options.showErrorToast) {
                toast.error(options.errorMessage || err.message || "An error occurred");
            }
            if (options.onError) {
                options.onError(err);
            }
            handleApiError(err, {
                showToast: false, // We're already showing a toast above
                rethrow: false,
            });
            throw err;
        }
        finally {
            setIsLoading(false);
        }
    });
    return { execute, isLoading, error };
}
export function useApiClient() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const execute = (endpoint_1, ...args_1) => __awaiter(this, [endpoint_1, ...args_1], void 0, function* (endpoint, method = "GET", data, additionalHeaders) {
        setIsLoading(true);
        setError(null);
        try {
            const result = yield fetchApi(endpoint, method, data, additionalHeaders);
            return result;
        }
        catch (err) {
            setError(err);
            handleApiError(err);
            throw err;
        }
        finally {
            setIsLoading(false);
        }
    });
    return {
        fetchApi,
        execute,
        isLoading,
        error,
    };
}

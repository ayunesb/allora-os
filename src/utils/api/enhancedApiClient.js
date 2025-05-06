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
// API cache management
const apiCache = new Map();
export const clearApiCache = (cacheKey) => {
    if (cacheKey) {
        apiCache.delete(cacheKey);
    }
    else {
        apiCache.clear();
    }
};
export const enhancedFetch = (url_1, ...args_1) => __awaiter(void 0, [url_1, ...args_1], void 0, function* (url, options = {}) {
    const { method = "GET", headers = {}, body, cacheKey, cacheTTL = 5 * 60 * 1000, // 5 minutes default
    retry = false, maxRetries = 3, timeout = 30000, successMessage, errorMessage, } = options;
    // Generate a cache key if not provided
    const effectiveCacheKey = cacheKey || `${method}:${url}:${body ? JSON.stringify(body) : ""}`;
    // Check cache for GET requests
    if (method === "GET" && apiCache.has(effectiveCacheKey)) {
        const cachedItem = apiCache.get(effectiveCacheKey);
        if (cachedItem && Date.now() - cachedItem.timestamp < cacheTTL) {
            return { success: true, data: cachedItem.data, error: null };
        }
    }
    try {
        // Create abort controller for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        const result = yield fetchApi(url, method, body, Object.assign(Object.assign({}, headers), { "Content-Type": "application/json" }));
        clearTimeout(timeoutId);
        // Cache successful GET responses
        if (method === "GET") {
            apiCache.set(effectiveCacheKey, {
                data: result,
                timestamp: Date.now(),
            });
        }
        if (successMessage) {
            toast.success(successMessage);
        }
        return { success: true, data: result, error: null };
    }
    catch (error) {
        // Handle error with custom message if provided
        handleApiError(error, {
            customMessage: errorMessage,
            rethrow: false,
        });
        return {
            success: false,
            data: null,
            error,
            statusCode: error.statusCode || 500,
            message: error.message || errorMessage || "An error occurred",
        };
    }
});
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
    return { execute, isLoading, error, fetchApi };
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

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { toast } from "sonner";
import { logger } from "@/utils/loggingService";
import { apiRequest, clearApiCache, } from "@/utils/api/apiClient";
/**
 * An optimized API client that focuses on performance and error recovery
 */
export const optimizedApiClient = {
    /**
     * Fetch data with built-in retry and recovery mechanisms
     */
    fetch: (endpoint_1, ...args_1) => __awaiter(void 0, [endpoint_1, ...args_1], void 0, function* (endpoint, options = {}) {
        const { retryStrategy = "exponential", maxRetries = 3, retryDelay = 1000, fallbackData, showToastOnError = true, fetchFunction } = options, restOptions = __rest(options, ["retryStrategy", "maxRetries", "retryDelay", "fallbackData", "showToastOnError", "fetchFunction"]);
        let attempt = 0;
        let lastError = null;
        while (attempt <= maxRetries) {
            try {
                // Use the core apiRequest function with optimized caching
                const response = yield apiRequest(
                // Use provided fetch function or default to standard fetch
                fetchFunction || (() => fetch(endpoint)), Object.assign(Object.assign({}, restOptions), { timeout: 15000, retry: attempt < maxRetries, maxRetries: maxRetries - attempt, cacheTTL: 60000, cacheKey: endpoint }));
                if (response.status === "success") {
                    // Successfully fetched data, return it
                    return {
                        data: response.data,
                        error: null,
                        status: "success",
                        isFallback: false,
                    };
                }
                else {
                    // Request completed but returned an error
                    throw response.error;
                }
            }
            catch (error) {
                lastError = error;
                attempt += 1;
                if (attempt <= maxRetries) {
                    // Calculate delay based on retry strategy
                    let delay = retryDelay;
                    if (retryStrategy === "exponential") {
                        delay = retryDelay * Math.pow(2, attempt - 1);
                    }
                    else if (retryStrategy === "linear") {
                        delay = retryDelay * attempt;
                    }
                    logger.warn(`API request failed, retrying (${attempt}/${maxRetries})...`, {
                        endpoint,
                        error: (error === null || error === void 0 ? void 0 : error.message) || "Unknown error",
                        nextRetryDelay: delay,
                    });
                    // Wait before next retry
                    yield new Promise((resolve) => setTimeout(resolve, delay));
                }
            }
        }
        // All retries failed
        if (showToastOnError) {
            toast.error((lastError === null || lastError === void 0 ? void 0 : lastError.message) || "Failed to load data after multiple attempts");
        }
        logger.error(`API request failed after ${maxRetries} attempts`, {
            endpoint,
            error: lastError,
        });
        // Return fallback data if provided
        if (fallbackData !== undefined) {
            return {
                data: fallbackData,
                error: lastError,
                status: "error",
                isFallback: true,
            };
        }
        return {
            data: null,
            error: lastError,
            status: "error",
            isFallback: false,
        };
    }),
    /**
     * Post data with improved error handling and recovery
     */
    post: (endpoint_1, data_1, ...args_1) => __awaiter(void 0, [endpoint_1, data_1, ...args_1], void 0, function* (endpoint, data, options = {}) {
        const { retryStrategy = "linear", maxRetries = 2, showLoadingToast = false, loadingMessage = "Processing request..." } = options, restOptions = __rest(options, ["retryStrategy", "maxRetries", "showLoadingToast", "loadingMessage"]);
        let toastId;
        if (showLoadingToast) {
            toastId = toast.loading(loadingMessage);
        }
        try {
            const response = yield optimizedApiClient.fetch(endpoint, Object.assign(Object.assign({}, restOptions), { retryStrategy,
                maxRetries, showToastOnError: false, method: "POST", headers: Object.assign({ "Content-Type": "application/json" }, (options.headers || {})), body: JSON.stringify(data) }));
            if (response.status === "success") {
                if (toastId) {
                    toast.success(options.successMessage || "Success", { id: toastId });
                }
                return response;
            }
            else {
                throw response.error;
            }
        }
        catch (error) {
            if (toastId) {
                toast.error((error === null || error === void 0 ? void 0 : error.message) || options.errorMessage || "Request failed", { id: toastId });
            }
            return {
                data: null,
                error,
                status: "error",
                isFallback: false,
            };
        }
    }),
    /**
     * Clear cache for specific endpoint or all endpoints
     */
    clearCache: (endpoint) => {
        clearApiCache(endpoint);
    },
};

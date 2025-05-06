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
import { logger } from "@/utils/loggingService";
import { handleApiError } from "@/utils/api/errorHandling";
import { toast } from "sonner";
// Default cache configuration
const defaultCacheConfig = {
    enabled: true,
    maxAge: 5 * 60 * 1000, // 5 minutes
    staleWhileRevalidate: true,
};
const cache = new Map();
// API client configuration
let apiConfig = {
    baseUrl: "",
    defaultHeaders: {
        "Content-Type": "application/json",
    },
    cacheConfig: Object.assign({}, defaultCacheConfig),
};
/**
 * Configure the API client
 */
export function configureApi(config) {
    apiConfig = Object.assign(Object.assign(Object.assign(Object.assign({}, apiConfig), (config.baseUrl && { baseUrl: config.baseUrl })), (config.defaultHeaders && {
        defaultHeaders: Object.assign(Object.assign({}, apiConfig.defaultHeaders), config.defaultHeaders),
    })), (config.cacheConfig && {
        cacheConfig: Object.assign(Object.assign({}, apiConfig.cacheConfig), config.cacheConfig),
    }));
}
/**
 * Clear the API cache
 */
export function clearCache(cacheKey) {
    if (cacheKey) {
        cache.delete(cacheKey);
    }
    else {
        cache.clear();
    }
}
/**
 * Main request function
 */
export function request(url_1) {
    return __awaiter(this, arguments, void 0, function* (url, options = {}) {
        const { cacheKey = url, skipCache = false, cacheTTL, suppressErrors = false, customErrorHandler, successMessage, errorMessage } = options, fetchOptions = __rest(options, ["cacheKey", "skipCache", "cacheTTL", "suppressErrors", "customErrorHandler", "successMessage", "errorMessage"]);
        // Add default headers
        const headers = new Headers(fetchOptions.headers);
        Object.entries(apiConfig.defaultHeaders).forEach(([key, value]) => {
            if (!headers.has(key)) {
                headers.set(key, value);
            }
        });
        // Check cache if enabled and not skipped
        if (apiConfig.cacheConfig.enabled && !skipCache) {
            const cachedEntry = cache.get(cacheKey);
            if (cachedEntry) {
                const now = Date.now();
                // If cache is still valid, return it
                if (cachedEntry.expires > now) {
                    logger.debug(`Using cached data for ${cacheKey}`);
                    return {
                        data: cachedEntry.data,
                        error: null,
                        status: "success",
                        isCached: true,
                    };
                }
                // If staleWhileRevalidate is enabled, return stale data and refresh in background
                if (apiConfig.cacheConfig.staleWhileRevalidate) {
                    logger.debug(`Using stale data for ${cacheKey} while revalidating`);
                    // Fetch fresh data in background
                    setTimeout(() => {
                        logger.debug(`Background revalidation for ${cacheKey}`);
                        request(url, Object.assign(Object.assign({}, options), { skipCache: true }));
                    }, 0);
                    return {
                        data: cachedEntry.data,
                        error: null,
                        status: "success",
                        isCached: true,
                    };
                }
            }
        }
        // If we get here, we need to make a network request
        try {
            logger.debug(`Fetching ${url}`);
            const response = yield fetch(apiConfig.baseUrl + url, Object.assign(Object.assign({}, fetchOptions), { headers }));
            if (!response.ok) {
                throw {
                    status: response.status,
                    statusText: response.statusText,
                    url,
                    method: fetchOptions.method || "GET",
                };
            }
            const data = yield response.json();
            // Show success message if provided
            if (successMessage) {
                toast.success(successMessage);
            }
            // Cache the response if caching is enabled
            if (apiConfig.cacheConfig.enabled && !skipCache) {
                const ttl = cacheTTL || apiConfig.cacheConfig.maxAge;
                cache.set(cacheKey, {
                    data,
                    timestamp: Date.now(),
                    expires: Date.now() + ttl,
                });
                // Prune old cache entries if there are too many
                if (cache.size > 100) {
                    // Max 100 entries
                    const oldestKey = Array.from(cache.entries()).sort((a, b) => a[1].timestamp - b[1].timestamp)[0][0];
                    cache.delete(oldestKey);
                }
            }
            return {
                data,
                error: null,
                status: "success",
                isCached: false,
            };
        }
        catch (error) {
            // Don't handle the error if suppressed
            if (!suppressErrors) {
                if (customErrorHandler) {
                    customErrorHandler(error);
                }
                else {
                    handleApiError(error, {
                        showToast: true,
                        customMessage: errorMessage,
                    });
                }
            }
            logger.error(`Request failed for ${url}`, { error });
            return {
                data: null,
                error: error instanceof Error ? error : new Error(String(error)),
                status: "error",
                isCached: false,
            };
        }
    });
}
/**
 * Convenient method shortcuts
 */
export const api = {
    get: (url, options) => request(url, Object.assign({ method: "GET" }, options)),
    post: (url, data, options) => request(url, Object.assign({ method: "POST", body: JSON.stringify(data) }, options)),
    put: (url, data, options) => request(url, Object.assign({ method: "PUT", body: JSON.stringify(data) }, options)),
    patch: (url, data, options) => request(url, Object.assign({ method: "PATCH", body: JSON.stringify(data) }, options)),
    delete: (url, options) => request(url, Object.assign({ method: "DELETE" }, options)),
    // Helper for uploading files
    upload: (url, formData, options) => {
        // Don't set Content-Type for multipart/form-data - browser sets it with boundary
        const _a = options || {}, { headers } = _a, rest = __rest(_a, ["headers"]);
        const customHeaders = headers instanceof Headers
            ? Object.fromEntries(headers)
            : headers;
        return request(url, Object.assign({ method: "POST", body: formData, headers: Object.assign({}, customHeaders) }, rest));
    },
};
// Ensure 'payload' matches the expected type
apiClient.post("/endpoint", { data: payload });

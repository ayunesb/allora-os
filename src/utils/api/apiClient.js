var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Core API request function
 */
export const apiRequest = (fetchFunction_1, ...args_1) => __awaiter(void 0, [fetchFunction_1, ...args_1], void 0, function* (fetchFunction, options = {}) {
    try {
        const response = yield fetchFunction();
        // Handle both standard fetch responses and Supabase responses
        if ("ok" in response) {
            // Standard fetch response
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            const data = yield response.json();
            return { data, error: null, status: "success" };
        }
        else {
            // Supabase response
            if (response.error) {
                throw new Error(response.error.message || "Unknown Supabase error");
            }
            return { data: response.data, error: null, status: "success" };
        }
    }
    catch (error) {
        return {
            data: null,
            error: error instanceof Error ? error : new Error("Unknown error"),
            status: "error",
        };
    }
});
// API cache management
const apiCache = new Map();
export const clearApiCache = (endpoint) => {
    if (endpoint) {
        apiCache.delete(endpoint);
    }
    else {
        apiCache.clear();
    }
};
// Expose the clearApiCache function globally
if (typeof window !== "undefined") {
    window.clearApiCache = clearApiCache;
}
/**
 * Fetch API wrapper for making HTTP requests with enhanced features
 */
export const fetchApi = (endpoint_1, ...args_1) => __awaiter(void 0, [endpoint_1, ...args_1], void 0, function* (endpoint, method = "GET", data, additionalHeaders) {
    const headers = Object.assign({ "Content-Type": "application/json" }, (additionalHeaders || {}));
    const options = {
        method,
        headers,
        credentials: "include",
    };
    if (data && (method === "POST" || method === "PUT" || method === "PATCH")) {
        options.body = JSON.stringify(data);
    }
    const response = yield fetch(endpoint, options);
    if (!response.ok) {
        const errorText = yield response.text();
        let errorMessage;
        try {
            const errorJson = JSON.parse(errorText);
            errorMessage =
                errorJson.message || errorJson.error || `API error: ${response.status}`;
        }
        catch (_a) {
            errorMessage = errorText || `API error: ${response.status}`;
        }
        throw new Error(errorMessage);
    }
    return response.json();
});

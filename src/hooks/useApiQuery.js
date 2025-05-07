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
import { useState, useEffect, useCallback, useRef } from "react";
import { enhancedFetch, clearApiCache, } from "@/utils/api/enhancedApiClient";
/**
 * Hook for fetching data from an API with caching, retries, and optimized performance
 */
export function useApiQuery(url, options = {}) {
    const { initialData = null, enabled = true, refetchInterval, onSuccess, onError, select } = options, fetchOptions = __rest(options, ["initialData", "enabled", "refetchInterval", "onSuccess", "onError", "select"]);
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(enabled);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);
    const fetchOptionsRef = useRef(fetchOptions);
    const onSuccessRef = useRef(onSuccess);
    const onErrorRef = useRef(onError);
    const selectRef = useRef(select);
    // Update refs when dependencies change
    useEffect(() => {
        fetchOptionsRef.current = fetchOptions;
        onSuccessRef.current = onSuccess;
        onErrorRef.current = onError;
        selectRef.current = select;
    }, [fetchOptions, onSuccess, onError, select]);
    // Create fetch function
    const fetchData = useCallback(() => __awaiter(this, void 0, void 0, function* () {
        if (!enabled)
            return;
        setIsLoading(true);
        try {
            const response = yield enhancedFetch(url, fetchOptionsRef.current);
            if (response.success && response.data !== null) {
                const processedData = selectRef.current
                    ? selectRef.current(response.data)
                    : response.data;
                setData(processedData);
                setIsError(false);
                setError(null);
                if (onSuccessRef.current) {
                    onSuccessRef.current(processedData);
                }
            }
            else {
                setIsError(true);
                setError(response.error || "Unknown error");
                if (onErrorRef.current) {
                    onErrorRef.current(response.error);
                }
            }
        }
        catch (err) {
            setIsError(true);
            setError(err);
            if (onErrorRef.current) {
                onErrorRef.current(err);
            }
        }
        finally {
            setIsLoading(false);
        }
    }), [url, enabled]);
    // Initial fetch and refetch interval
    useEffect(() => {
        if (!enabled)
            return;
        fetchData();
        let intervalId = null;
        if (refetchInterval && refetchInterval > 0) {
            intervalId = window.setInterval(fetchData, refetchInterval);
        }
        return () => {
            if (intervalId !== null) {
                clearInterval(intervalId);
            }
        };
    }, [fetchData, enabled, refetchInterval]);
    // Clear cache function
    const clearCacheAndRefetch = useCallback(() => {
        const cacheKey = fetchOptionsRef.current.cacheKey ||
            `GET:${url}:${fetchOptionsRef.current.body ? JSON.stringify(fetchOptionsRef.current.body) : ""}`;
        clearApiCache(cacheKey);
        return fetchData();
    }, [url, fetchData]);
    // Reset function
    const reset = useCallback(() => {
        setData(initialData);
        setIsError(false);
        setError(null);
    }, [initialData]);
    return {
        data,
        isLoading,
        isError,
        error,
        refetch: fetchData,
        reset,
        clearCache: clearCacheAndRefetch,
    };
}

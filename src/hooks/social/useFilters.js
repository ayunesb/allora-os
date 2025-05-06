import { useState, useCallback } from "react";
export function useFilters() {
    const [filters, setFilters] = useState({});
    const setPostFilters = useCallback((newFilters) => {
        setFilters((prevFilters) => (Object.assign(Object.assign({}, prevFilters), newFilters)));
    }, []);
    const clearFilters = useCallback(() => {
        setFilters({});
    }, []);
    return {
        filters,
        setPostFilters,
        clearFilters,
    };
}

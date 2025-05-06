import { useState } from "react";
export function useWebhookHistoryFilters(initialFilters) {
    const [filters, setFilters] = useState(initialFilters || {});
    const updateFilter = (key, value) => {
        setFilters((prev) => (Object.assign(Object.assign({}, prev), { [key]: value })));
    };
    const clearFilters = () => {
        setFilters({});
    };
    return {
        filters,
        updateFilter,
        clearFilters,
    };
}

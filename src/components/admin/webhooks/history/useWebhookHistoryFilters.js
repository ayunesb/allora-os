import { useState, useCallback, useMemo } from "react";
export const useWebhookHistoryFilters = (initialEvents) => {
    const [filters, setFilters] = useState({
        types: [],
        status: "",
        dateRange: [null, null],
        search: "",
    });
    // Extract unique webhook types for filter options
    const availableTypes = useMemo(() => {
        const types = new Set();
        initialEvents.forEach((event) => {
            const type = event.webhookType;
            if (type && typeof type === "string") {
                types.add(type);
            }
        });
        return Array.from(types);
    }, [initialEvents]);
    const filterEvents = useCallback(() => {
        return initialEvents.filter((event) => {
            // Type filter
            if (filters.types.length > 0) {
                const eventType = event.webhookType;
                if (!eventType || !filters.types.includes(eventType)) {
                    return false;
                }
            }
            // Status filter - only apply if a status is selected
            if (filters.status !== "") {
                const eventStatus = event.status;
                if (eventStatus !== filters.status) {
                    return false;
                }
            }
            // Date range filter
            const eventDate = new Date(event.created_at || "");
            if (filters.dateRange[0] && eventDate < filters.dateRange[0]) {
                return false;
            }
            if (filters.dateRange[1]) {
                // Add one day to include events from the end date
                const endDate = new Date(filters.dateRange[1]);
                endDate.setDate(endDate.getDate() + 1);
                if (eventDate > endDate) {
                    return false;
                }
            }
            // Search filter
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                const eventType = event.event_type || "";
                const matchesSearch = eventType.toLowerCase().includes(searchLower) ||
                    event.id.toLowerCase().includes(searchLower);
                if (!matchesSearch) {
                    return false;
                }
            }
            return true;
        });
    }, [initialEvents, filters]);
    return {
        filters,
        setFilters,
        filterEvents,
        availableTypes,
    };
};
export default useWebhookHistoryFilters;

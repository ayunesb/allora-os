import { useState, useCallback, useMemo } from "react";
export function useLeadFilters(initialLeads = []) {
    const [leads, setLeads] = useState(initialLeads);
    const [filters, setFilters] = useState({
        status: "all",
        search: "",
        campaignId: undefined,
        startDate: undefined,
        endDate: undefined,
    });
    // Add activeFilter state to track the active filter tab
    const [activeFilter, setActiveFilter] = useState("all");
    const updateFilters = useCallback((newFilters) => {
        setFilters((prev) => (Object.assign(Object.assign({}, prev), newFilters)));
        // Update activeFilter if status is changing
        if (newFilters.status) {
            setActiveFilter(newFilters.status);
        }
    }, []);
    const resetFilters = useCallback(() => {
        setFilters({
            status: "all",
            search: "",
            campaignId: undefined,
            startDate: undefined,
            endDate: undefined,
        });
        setActiveFilter("all");
    }, []);
    const filteredLeads = useMemo(() => {
        return leads.filter((lead) => {
            var _a, _b;
            // Filter by status
            if (filters.status &&
                filters.status !== "all" &&
                lead.status !== filters.status) {
                return false;
            }
            // Filter by search term
            if (filters.search && filters.search.trim() !== "") {
                const searchTerm = filters.search.toLowerCase();
                const nameMatch = lead.name.toLowerCase().includes(searchTerm);
                const emailMatch = ((_a = lead.email) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(searchTerm)) || false;
                const phoneMatch = ((_b = lead.phone) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes(searchTerm)) || false;
                if (!nameMatch && !emailMatch && !phoneMatch) {
                    return false;
                }
            }
            // Filter by campaign
            if (filters.campaignId && lead.campaign_id !== filters.campaignId) {
                return false;
            }
            // Filter by date range
            if (filters.startDate || filters.endDate) {
                const leadDate = new Date(lead.created_at);
                if (filters.startDate && leadDate < filters.startDate) {
                    return false;
                }
                if (filters.endDate) {
                    const endDatePlus1 = new Date(filters.endDate);
                    endDatePlus1.setDate(endDatePlus1.getDate() + 1);
                    if (leadDate >= endDatePlus1) {
                        return false;
                    }
                }
            }
            // If it passes all filters, include it
            return true;
        });
    }, [leads, filters]);
    const filterStats = useMemo(() => {
        const total = leads.length;
        const filtered = filteredLeads.length;
        const statusCounts = {};
        // Count leads by status
        leads.forEach((lead) => {
            statusCounts[lead.status] = (statusCounts[lead.status] || 0) + 1;
        });
        return {
            total,
            filtered,
            percentageShown: total > 0 ? Math.round((filtered / total) * 100) : 0,
            statusCounts,
        };
    }, [leads, filteredLeads]);
    return {
        leads,
        setLeads,
        filters,
        updateFilters,
        resetFilters,
        filteredLeads,
        filterStats,
        // Add the new properties to the return object
        activeFilter,
        setActiveFilter,
    };
}

import { useState } from "react";
export function useWebhookHistoryFilters() {
    const [filter, setFilter] = useState({
        types: [],
        status: "",
        dateRange: [null, null],
        search: "",
    });
    const updateFilter = (newFilter) => {
        setFilter((prev) => (Object.assign(Object.assign({}, prev), newFilter)));
    };
    const resetFilter = () => {
        setFilter({
            types: [],
            status: "",
            dateRange: [null, null],
            search: "",
        });
    };
    const setTypeFilter = (types) => {
        updateFilter({ types });
    };
    const setStatusFilter = (status) => {
        updateFilter({ status });
    };
    const setDateRangeFilter = (dateRange) => {
        updateFilter({ dateRange });
    };
    const setSearchFilter = (search) => {
        updateFilter({ search });
    };
    return {
        filter,
        updateFilter,
        resetFilter,
        setTypeFilter,
        setStatusFilter,
        setDateRangeFilter,
        setSearchFilter,
    };
}
export default useWebhookHistoryFilters;

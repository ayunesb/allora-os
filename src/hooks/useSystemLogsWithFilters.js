import { useState, useEffect } from "react";
export const useSystemLogsWithFilters = (logs, options = {}) => {
    const [filteredLogs, setFilteredLogs] = useState([]);
    useEffect(() => {
        let result = logs;
        if (options.filterByLevel) {
            result = result.filter((log) => log.level === options.filterByLevel);
        }
        if (options.searchTerm) {
            result = result.filter((log) => options.searchTerm && log.message.includes(options.searchTerm));
        }
        setFilteredLogs(result);
    }, [logs, options.filterByLevel, options.searchTerm]);
    return filteredLogs;
};

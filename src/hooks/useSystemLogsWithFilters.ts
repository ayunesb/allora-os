import { useState, useEffect } from "react";

interface Log {
  id: string;
  message: string;
  level: "info" | "warning" | "error";
  timestamp: string;
}

interface UseSystemLogsWithFiltersOptions {
  filterByLevel?: "info" | "warning" | "error";
  searchTerm?: string;
}

export const useSystemLogsWithFilters = (
  logs: Log[],
  options: UseSystemLogsWithFiltersOptions = {},
) => {
  const [filteredLogs, setFilteredLogs] = useState<Log[]>([]);

  useEffect(() => {
    let result = logs;

    if (options.filterByLevel) {
      result = result.filter((log) => log.level === options.filterByLevel);
    }

    if (options.searchTerm) {
      result = result.filter(
        (log) => options.searchTerm && log.message.includes(options.searchTerm),
      );
    }

    setFilteredLogs(result);
  }, [logs, options.filterByLevel, options.searchTerm]);

  return filteredLogs;
};

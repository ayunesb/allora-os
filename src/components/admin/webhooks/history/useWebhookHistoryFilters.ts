import { useState, useCallback, useMemo } from "react";
import {
  WebhookStatus,
  WebhookType,
  WebhookEvent,
} from "@/types/unified-types";

export type FilterOptions = {
  types: WebhookType[];
  status: WebhookStatus | "";
  dateRange: [Date | null, Date | null];
  search: string;
};

export const useWebhookHistoryFilters = (initialEvents: WebhookEvent[]) => {
  const [filters, setFilters] = useState<FilterOptions>({
    types: [],
    status: "",
    dateRange: [null, null],
    search: "",
  });

  // Extract unique webhook types for filter options
  const availableTypes = useMemo(() => {
    const types = new Set<WebhookType>();
    initialEvents.forEach((event) => {
      const type = event.webhookType;
      if (type && typeof type === "string") {
        types.add(type as WebhookType);
      }
    });
    return Array.from(types);
  }, [initialEvents]);

  const filterEvents = useCallback(() => {
    return initialEvents.filter((event) => {
      // Type filter
      if (filters.types.length > 0) {
        const eventType = event.webhookType;
        if (!eventType || !filters.types.includes(eventType as WebhookType)) {
          return false;
        }
      }

      // Status filter - only apply if a status is selected
      if (filters.status !== "") {
        const eventStatus = event.status as WebhookStatus;
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

        const matchesSearch =
          eventType.toLowerCase().includes(searchLower) ||
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

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWebhookHistoryFilters = void 0;
var react_1 = require("react");
var useWebhookHistoryFilters = function (initialEvents) {
  var _a = (0, react_1.useState)({
      types: [],
      status: "",
      dateRange: [null, null],
      search: "",
    }),
    filters = _a[0],
    setFilters = _a[1];
  // Extract unique webhook types for filter options
  var availableTypes = (0, react_1.useMemo)(
    function () {
      var types = new Set();
      initialEvents.forEach(function (event) {
        var type = event.webhookType;
        if (type && typeof type === "string") {
          types.add(type);
        }
      });
      return Array.from(types);
    },
    [initialEvents],
  );
  var filterEvents = (0, react_1.useCallback)(
    function () {
      return initialEvents.filter(function (event) {
        // Type filter
        if (filters.types.length > 0) {
          var eventType = event.webhookType;
          if (!eventType || !filters.types.includes(eventType)) {
            return false;
          }
        }
        // Status filter - only apply if a status is selected
        if (filters.status !== "") {
          var eventStatus = event.status;
          if (eventStatus !== filters.status) {
            return false;
          }
        }
        // Date range filter
        var eventDate = new Date(event.created_at || "");
        if (filters.dateRange[0] && eventDate < filters.dateRange[0]) {
          return false;
        }
        if (filters.dateRange[1]) {
          // Add one day to include events from the end date
          var endDate = new Date(filters.dateRange[1]);
          endDate.setDate(endDate.getDate() + 1);
          if (eventDate > endDate) {
            return false;
          }
        }
        // Search filter
        if (filters.search) {
          var searchLower = filters.search.toLowerCase();
          var eventType = event.event_type || "";
          var matchesSearch =
            eventType.toLowerCase().includes(searchLower) ||
            event.id.toLowerCase().includes(searchLower);
          if (!matchesSearch) {
            return false;
          }
        }
        return true;
      });
    },
    [initialEvents, filters],
  );
  return {
    filters: filters,
    setFilters: setFilters,
    filterEvents: filterEvents,
    availableTypes: availableTypes,
  };
};
exports.useWebhookHistoryFilters = useWebhookHistoryFilters;
exports.default = exports.useWebhookHistoryFilters;

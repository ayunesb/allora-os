"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookHistoryContent = WebhookHistoryContent;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var WebhookEventTable_1 = require("./WebhookEventTable");
var WebhookEventFilters_1 = require("./WebhookEventFilters");
var EventDetailsModal_1 = require("./EventDetailsModal");
var useWebhookHistoryFilters_1 = require("@/hooks/admin/useWebhookHistoryFilters");
function WebhookHistoryContent(_a) {
  var initialEvents = _a.events;
  // State for event detail modal
  var _b = (0, react_1.useState)(null),
    selectedEvent = _b[0],
    setSelectedEvent = _b[1];
  // Setup filters
  var _c = (0, useWebhookHistoryFilters_1.default)(),
    filter = _c.filter,
    updateFilter = _c.updateFilter,
    resetFilter = _c.resetFilter;
  // State for filtered events
  var _d = (0, react_1.useState)(initialEvents),
    filteredEvents = _d[0],
    setFilteredEvents = _d[1];
  // Get unique webhook types from events
  var availableTypes = react_1.default.useMemo(
    function () {
      var types = new Set();
      initialEvents.forEach(function (event) {
        var type = event.webhookType || event.webhook_type || event.type;
        if (type) types.add(type);
      });
      return Array.from(types);
    },
    [initialEvents],
  );
  // Filter events when filter changes
  (0, react_1.useEffect)(
    function () {
      var filtered = initialEvents.filter(function (event) {
        // Type filter
        if (filter.types.length > 0) {
          var eventType = event.webhookType || event.webhook_type || event.type;
          if (!filter.types.includes(eventType)) return false;
        }
        // Status filter
        if (filter.status && event.status !== filter.status) return false;
        // Date range filter
        if (filter.dateRange[0] || filter.dateRange[1]) {
          var date = new Date(event.timestamp || event.created_at);
          if (filter.dateRange[0] && date < filter.dateRange[0]) return false;
          if (filter.dateRange[1] && date > filter.dateRange[1]) return false;
        }
        // Search filter
        if (filter.search) {
          var search = filter.search.toLowerCase();
          var url = (event.targetUrl || event.url || "").toLowerCase();
          var eventType = (
            event.event_type ||
            event.eventType ||
            ""
          ).toLowerCase();
          var source = (event.source || "").toLowerCase();
          if (
            !url.includes(search) &&
            !eventType.includes(search) &&
            !source.includes(search)
          ) {
            return false;
          }
        }
        return true;
      });
      setFilteredEvents(filtered);
    },
    [filter, initialEvents],
  );
  // Handle filter changes
  var handleFilterChange = function (newFilter) {
    updateFilter(newFilter);
  };
  // Open event details modal
  var handleViewEventDetail = function (event) {
    setSelectedEvent(event);
  };
  // Close event details modal
  var handleCloseEventDetail = function () {
    setSelectedEvent(null);
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsx)(WebhookEventFilters_1.default, {
        filters: filter,
        onFilterChange: handleFilterChange,
        availableTypes: availableTypes,
      }),
      (0, jsx_runtime_1.jsx)(WebhookEventTable_1.default, {
        events: filteredEvents,
        onViewDetail: handleViewEventDetail,
      }),
      selectedEvent &&
        (0, jsx_runtime_1.jsx)(EventDetailsModal_1.default, {
          event: selectedEvent,
          isOpen: selectedEvent !== null,
          onClose: handleCloseEventDetail,
        }),
    ],
  });
}
exports.default = WebhookHistoryContent;

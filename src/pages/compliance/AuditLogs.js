"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AuditLogs;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var AuditLogTable_1 = require("@/components/compliance/audit-logs/AuditLogTable");
var AuditLogFilters_1 = require("@/components/compliance/audit-logs/AuditLogFilters");
var card_1 = require("@/components/ui/card");
// Mock audit logs data
var mockLogs = [
  {
    id: "1",
    timestamp: "2025-04-13T15:23:45Z",
    user: "john.doe@example.com",
    action: "DATA_ACCESS",
    resource: "Customer Database",
    details: "Viewed customer records",
    ip: "192.168.1.100",
  },
  {
    id: "2",
    timestamp: "2025-04-13T14:12:30Z",
    user: "admin@allora.ai",
    action: "SYSTEM_CHANGE",
    resource: "System Settings",
    details: "Updated security settings",
    ip: "192.168.1.101",
  },
  {
    id: "3",
    timestamp: "2025-04-12T09:45:22Z",
    user: "sarah.smith@example.com",
    action: "AUTHENTICATION",
    resource: "User Account",
    details: "Failed login attempt",
    ip: "192.168.1.102",
  },
  {
    id: "4",
    timestamp: "2025-04-11T16:33:10Z",
    user: "admin@allora.ai",
    action: "DATA_MODIFICATION",
    resource: "Strategy Document",
    details: "Modified business strategy document",
    ip: "192.168.1.101",
  },
  {
    id: "5",
    timestamp: "2025-04-10T11:18:45Z",
    user: "john.doe@example.com",
    action: "EXPORT",
    resource: "Analytics Report",
    details: "Exported quarterly analytics report",
    ip: "192.168.1.100",
  },
];
function AuditLogs() {
  var _a = (0, react_1.useState)("all"),
    actionFilter = _a[0],
    setActionFilter = _a[1];
  var _b = (0, react_1.useState)(""),
    userFilter = _b[0],
    setUserFilter = _b[1];
  var _c = (0, react_1.useState)(undefined),
    date = _c[0],
    setDate = _c[1];
  // Filter logs based on selected filters
  var filteredLogs = mockLogs.filter(function (log) {
    // Filter by action type
    if (actionFilter !== "all" && log.action !== actionFilter) {
      return false;
    }
    // Filter by user
    if (
      userFilter &&
      !log.user.toLowerCase().includes(userFilter.toLowerCase())
    ) {
      return false;
    }
    // Filter by date
    if (date) {
      var logDate = new Date(log.timestamp).toDateString();
      var filterDate = date.toDateString();
      if (logDate !== filterDate) {
        return false;
      }
    }
    return true;
  });
  var handleExportLogs = function () {
    console.log("Exporting logs...");
    // In a real app, this would trigger a download of the filtered logs
    alert("Logs export initiated");
  };
  return (0, jsx_runtime_1.jsx)("div", {
    className: "space-y-6",
    children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
      children: [
        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
          children: [
            (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
              className: "text-xl",
              children: "Audit Logs",
            }),
            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
              children:
                "Track all system activities and compliance-related events",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
          children: [
            (0, jsx_runtime_1.jsx)(AuditLogFilters_1.default, {
              actionFilter: actionFilter,
              setActionFilter: setActionFilter,
              userFilter: userFilter,
              setUserFilter: setUserFilter,
              date: date,
              setDate: setDate,
              onExportLogs: handleExportLogs,
            }),
            (0, jsx_runtime_1.jsx)("div", {
              className: "mt-6",
              children: (0, jsx_runtime_1.jsx)(AuditLogTable_1.default, {
                logs: filteredLogs,
              }),
            }),
          ],
        }),
      ],
    }),
  });
}

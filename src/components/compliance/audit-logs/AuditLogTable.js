"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AuditLogTable;
var jsx_runtime_1 = require("react/jsx-runtime");
var table_1 = require("@/components/ui/table");
var utils_1 = require("@/lib/utils");
var use_mobile_1 = require("@/hooks/use-mobile");
var MobileAdminTable_1 = require("@/components/admin/MobileAdminTable");
function AuditLogTable(_a) {
  var logs = _a.logs;
  var breakpoint = (0, use_mobile_1.useBreakpoint)();
  var isMobileView = ["xs", "mobile"].includes(breakpoint);
  if (isMobileView) {
    var columns = [
      {
        key: "timestamp",
        title: "Timestamp",
        render: function (log) {
          return (0, jsx_runtime_1.jsx)("span", {
            className: "font-mono text-xs",
            children: new Date(log.timestamp).toLocaleString(),
          });
        },
      },
      {
        key: "user",
        title: "User",
      },
      {
        key: "action",
        title: "Action",
        render: function (log) {
          return (0, jsx_runtime_1.jsx)("span", {
            className: (0, utils_1.cn)("px-2 py-1 rounded-full text-xs", {
              "bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300":
                log.action === "DATA_ACCESS",
              "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300":
                log.action === "DATA_MODIFICATION",
              "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-300":
                log.action === "AUTHENTICATION",
              "bg-purple-100 text-purple-800 dark:bg-purple-950/50 dark:text-purple-300":
                log.action === "SYSTEM_CHANGE",
              "bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-300":
                log.action === "EXPORT",
            }),
            children: log.action,
          });
        },
      },
      {
        key: "resource",
        title: "Resource",
      },
    ];
    var emptyState = (0, jsx_runtime_1.jsx)("div", {
      className: "text-center py-8 bg-muted/20 rounded-md",
      children: "No audit logs match the current filters",
    });
    return (0, jsx_runtime_1.jsx)(MobileAdminTable_1.MobileAdminTable, {
      data: logs,
      columns: columns,
      emptyState: emptyState,
    });
  }
  return (0, jsx_runtime_1.jsx)("div", {
    className: "rounded-md border",
    children: (0, jsx_runtime_1.jsxs)(table_1.Table, {
      children: [
        (0, jsx_runtime_1.jsx)(table_1.TableHeader, {
          children: (0, jsx_runtime_1.jsxs)(table_1.TableRow, {
            children: [
              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                children: "Timestamp",
              }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "User" }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Action" }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                children: "Resource",
              }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                className: "hidden md:table-cell",
                children: "Details",
              }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                className: "hidden md:table-cell",
                children: "IP Address",
              }),
            ],
          }),
        }),
        (0, jsx_runtime_1.jsx)(table_1.TableBody, {
          children:
            logs.length > 0
              ? logs.map(function (log) {
                  return (0, jsx_runtime_1.jsxs)(
                    table_1.TableRow,
                    {
                      children: [
                        (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                          className: "font-mono text-xs",
                          children: new Date(log.timestamp).toLocaleString(),
                        }),
                        (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                          children: log.user,
                        }),
                        (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                          children: (0, jsx_runtime_1.jsx)("span", {
                            className: (0, utils_1.cn)(
                              "px-2 py-1 rounded-full text-xs",
                              {
                                "bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300":
                                  log.action === "DATA_ACCESS",
                                "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300":
                                  log.action === "DATA_MODIFICATION",
                                "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-300":
                                  log.action === "AUTHENTICATION",
                                "bg-purple-100 text-purple-800 dark:bg-purple-950/50 dark:text-purple-300":
                                  log.action === "SYSTEM_CHANGE",
                                "bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-300":
                                  log.action === "EXPORT",
                              },
                            ),
                            children: log.action,
                          }),
                        }),
                        (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                          children: log.resource,
                        }),
                        (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                          className: "hidden md:table-cell",
                          children: log.details,
                        }),
                        (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                          className: "hidden md:table-cell font-mono text-xs",
                          children: log.ip,
                        }),
                      ],
                    },
                    log.id,
                  );
                })
              : (0, jsx_runtime_1.jsx)(table_1.TableRow, {
                  children: (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                    colSpan: 6,
                    className: "h-24 text-center",
                    children: "No audit logs match the current filters",
                  }),
                }),
        }),
      ],
    }),
  });
}

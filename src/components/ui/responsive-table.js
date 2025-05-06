"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponsiveTable = ResponsiveTable;
var jsx_runtime_1 = require("react/jsx-runtime");
var table_1 = require("@/components/ui/table");
var use_mobile_1 = require("@/hooks/use-mobile");
var MobileAdminTable_1 = require("@/components/admin/MobileAdminTable");
function ResponsiveTable(_a) {
  var data = _a.data,
    columns = _a.columns,
    mobileColumns = _a.mobileColumns,
    actions = _a.actions,
    emptyState = _a.emptyState,
    className = _a.className;
  var breakpoint = (0, use_mobile_1.useBreakpoint)();
  var isMobileView = ["xs", "mobile"].includes(breakpoint);
  // If mobile view and mobileColumns are provided, use the mobile table
  if (isMobileView) {
    var columnsToUse =
      mobileColumns ||
      columns.filter(function (col) {
        return !col.hideOnMobile;
      });
    var defaultEmptyState = (0, jsx_runtime_1.jsx)("div", {
      className: "text-center py-8 bg-muted/20 rounded-md",
      children: "No data to display",
    });
    return (0, jsx_runtime_1.jsx)(MobileAdminTable_1.MobileAdminTable, {
      data: data,
      columns: columnsToUse,
      actions: actions,
      emptyState: emptyState || defaultEmptyState,
      className: className,
    });
  }
  // Otherwise use the standard table
  return (0, jsx_runtime_1.jsx)("div", {
    className: className,
    children: (0, jsx_runtime_1.jsxs)(table_1.Table, {
      children: [
        (0, jsx_runtime_1.jsx)(table_1.TableHeader, {
          children: (0, jsx_runtime_1.jsxs)(table_1.TableRow, {
            children: [
              columns.map(function (column) {
                return (0, jsx_runtime_1.jsx)(
                  table_1.TableHead,
                  {
                    className: column.hideOnMobile
                      ? "hidden md:table-cell"
                      : undefined,
                    children: column.title,
                  },
                  column.key,
                );
              }),
              actions && (0, jsx_runtime_1.jsx)(table_1.TableHead, {}),
            ],
          }),
        }),
        (0, jsx_runtime_1.jsx)(table_1.TableBody, {
          children:
            data.length > 0
              ? data.map(function (item, index) {
                  return (0, jsx_runtime_1.jsxs)(
                    table_1.TableRow,
                    {
                      children: [
                        columns.map(function (column) {
                          return (0, jsx_runtime_1.jsx)(
                            table_1.TableCell,
                            {
                              className: column.hideOnMobile
                                ? "hidden md:table-cell"
                                : undefined,
                              children: column.render
                                ? column.render(item)
                                : item[column.key],
                            },
                            column.key,
                          );
                        }),
                        actions &&
                          (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                            className: "text-right",
                            children: actions(item),
                          }),
                      ],
                    },
                    index,
                  );
                })
              : (0, jsx_runtime_1.jsx)(table_1.TableRow, {
                  children: (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                    colSpan: columns.length + (actions ? 1 : 0),
                    className: "h-24 text-center",
                    children: emptyState || "No data available",
                  }),
                }),
        }),
      ],
    }),
  });
}

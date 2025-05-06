"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileAdminTable = MobileAdminTable;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var utils_1 = require("@/lib/utils");
function MobileAdminTable(_a) {
  var data = _a.data,
    columns = _a.columns,
    actions = _a.actions,
    emptyState = _a.emptyState,
    className = _a.className;
  if (data.length === 0 && emptyState) {
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {
      children: emptyState,
    });
  }
  return (0, jsx_runtime_1.jsx)("div", {
    className: (0, utils_1.cn)("space-y-3", className),
    children: data.map(function (item, index) {
      return (0, jsx_runtime_1.jsx)(
        card_1.Card,
        {
          className: "overflow-hidden shadow-sm",
          children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
            className: "p-0",
            children: [
              columns.map(function (column) {
                return (0, jsx_runtime_1.jsxs)(
                  "div",
                  {
                    className:
                      "flex justify-between items-center p-3 border-b last:border-b-0",
                    children: [
                      (0, jsx_runtime_1.jsx)("span", {
                        className: "text-sm font-medium text-muted-foreground",
                        children: column.title,
                      }),
                      (0, jsx_runtime_1.jsx)("span", {
                        className: "text-sm text-right",
                        children: column.render
                          ? column.render(item)
                          : item[column.key],
                      }),
                    ],
                  },
                  column.key,
                );
              }),
              actions &&
                (0, jsx_runtime_1.jsx)("div", {
                  className: "p-3 bg-muted/20 flex justify-end",
                  children: actions(item),
                }),
            ],
          }),
        },
        index,
      );
    }),
  });
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventTableHeader = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var table_1 = require("@/components/ui/table");
var EventTableHeader = function () {
  return (0, jsx_runtime_1.jsx)(table_1.TableHeader, {
    children: (0, jsx_runtime_1.jsxs)(table_1.TableRow, {
      children: [
        (0, jsx_runtime_1.jsx)(table_1.TableHead, {
          className: "w-[100px]",
          children: "Status",
        }),
        (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Type" }),
        (0, jsx_runtime_1.jsx)(table_1.TableHead, {
          className: "hidden md:table-cell",
          children: "Webhook",
        }),
        (0, jsx_runtime_1.jsx)(table_1.TableHead, {
          className: "hidden md:table-cell",
          children: "Timestamp",
        }),
        (0, jsx_runtime_1.jsx)(table_1.TableHead, {
          className: "text-right",
          children: "Actions",
        }),
      ],
    }),
  });
};
exports.EventTableHeader = EventTableHeader;
exports.default = exports.EventTableHeader;

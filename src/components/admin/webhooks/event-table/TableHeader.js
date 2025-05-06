"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventTableHeader = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var table_1 = require("@/components/ui/table");
var use_mobile_1 = require("@/hooks/use-mobile");
var EventTableHeader = function () {
  var breakpoint = (0, use_mobile_1.useBreakpoint)();
  var isMobileView = ["xs", "mobile"].includes(breakpoint);
  return (0, jsx_runtime_1.jsx)(table_1.TableHeader, {
    children: (0, jsx_runtime_1.jsxs)(table_1.TableRow, {
      children: [
        (0, jsx_runtime_1.jsx)(table_1.TableHead, { className: "w-8" }),
        (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Event Type" }),
        (0, jsx_runtime_1.jsx)(table_1.TableHead, {
          className: isMobileView ? "hidden md:table-cell" : "",
          children: "Webhook",
        }),
        (0, jsx_runtime_1.jsx)(table_1.TableHead, {
          className: isMobileView ? "hidden sm:table-cell" : "",
          children: "Time",
        }),
        (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Status" }),
        (0, jsx_runtime_1.jsx)(table_1.TableHead, {
          className: "hidden md:table-cell",
          children: "Response",
        }),
        (0, jsx_runtime_1.jsx)(table_1.TableHead, {
          className: isMobileView ? "w-8" : "",
        }),
      ],
    }),
  });
};
exports.EventTableHeader = EventTableHeader;

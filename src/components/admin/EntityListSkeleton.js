"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = Table;
exports.TableHeader = TableHeader;
exports.TableBody = TableBody;
exports.TableRow = TableRow;
exports.TableHead = TableHead;
exports.TableCell = TableCell;
exports.EntityListSkeleton = EntityListSkeleton;
var jsx_runtime_1 = require("react/jsx-runtime");
var skeleton_1 = require("@/components/ui/skeleton");
function Table(_a) {
  var children = _a.children,
    className = _a.className;
  return (0, jsx_runtime_1.jsx)("table", {
    className: className,
    children: children,
  });
}
function TableHeader(_a) {
  var children = _a.children,
    className = _a.className;
  return (0, jsx_runtime_1.jsx)("thead", {
    className: className,
    children: children,
  });
}
function TableBody(_a) {
  var children = _a.children,
    className = _a.className;
  return (0, jsx_runtime_1.jsx)("tbody", {
    className: className,
    children: children,
  });
}
function TableRow(_a) {
  var children = _a.children,
    className = _a.className;
  return (0, jsx_runtime_1.jsx)("tr", {
    className: className,
    children: children,
  });
}
function TableHead(_a) {
  var children = _a.children,
    className = _a.className;
  return (0, jsx_runtime_1.jsx)("th", {
    className: className,
    children: children,
  });
}
function TableCell(_a) {
  var children = _a.children,
    className = _a.className;
  return (0, jsx_runtime_1.jsx)("td", {
    className: className,
    children: children,
  });
}
function EntityListSkeleton() {
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-4 animate-pulse",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex justify-between items-center mb-4",
        children: [
          (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
            className: "h-10 w-52",
          }),
          (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
            className: "h-9 w-32",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className:
          "rounded-md border border-white/10 overflow-hidden bg-[#111827]",
        children: (0, jsx_runtime_1.jsxs)(Table, {
          children: [
            (0, jsx_runtime_1.jsx)(TableHeader, {
              className: "bg-[#1A1F2C]",
              children: (0, jsx_runtime_1.jsxs)(TableRow, {
                className: "border-white/10",
                children: [
                  (0, jsx_runtime_1.jsx)(TableHead, {
                    className: "h-10 w-[25%]",
                    children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                      className: "h-4 w-24",
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(TableHead, {
                    className: "h-10 w-[25%]",
                    children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                      className: "h-4 w-32",
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(TableHead, {
                    className: "h-10 w-[20%]",
                    children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                      className: "h-4 w-16",
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(TableHead, {
                    className: "h-10 w-[15%]",
                    children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                      className: "h-4 w-24",
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(TableHead, {
                    className: "h-10 w-[15%]",
                    children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                      className: "h-4 w-16",
                    }),
                  }),
                ],
              }),
            }),
            (0, jsx_runtime_1.jsx)(TableBody, {
              children: Array.from({ length: 5 }).map(function (_, i) {
                return (0, jsx_runtime_1.jsxs)(
                  TableRow,
                  {
                    className: "border-white/10",
                    children: [
                      (0, jsx_runtime_1.jsx)(TableCell, {
                        children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                          className: "h-5 w-32",
                        }),
                      }),
                      (0, jsx_runtime_1.jsx)(TableCell, {
                        children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                          className: "h-5 w-40",
                        }),
                      }),
                      (0, jsx_runtime_1.jsx)(TableCell, {
                        children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                          className: "h-6 w-20 rounded-full",
                        }),
                      }),
                      (0, jsx_runtime_1.jsx)(TableCell, {
                        children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                          className: "h-5 w-24",
                        }),
                      }),
                      (0, jsx_runtime_1.jsx)(TableCell, {
                        children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                          className: "h-8 w-full",
                        }),
                      }),
                    ],
                  },
                  i,
                );
              }),
            }),
          ],
        }),
      }),
    ],
  });
}

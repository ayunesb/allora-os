"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserListSkeleton = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var skeleton_1 = require("@/components/ui/skeleton");
var table_1 = require("@/components/ui/table");
var use_mobile_1 = require("@/hooks/use-mobile");
var UserListSkeleton = function () {
  var breakpoint = (0, use_mobile_1.useBreakpoint)();
  var isMobileView = ["xs", "mobile"].includes(breakpoint);
  if (isMobileView) {
    return (0, jsx_runtime_1.jsx)("div", {
      className: "space-y-4",
      children: Array.from({ length: 5 }).map(function (_, index) {
        return (0, jsx_runtime_1.jsxs)(
          "div",
          {
            className:
              "border border-white/10 rounded-md p-4 bg-[#111827] shadow-sm",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center justify-between mb-3",
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex items-center",
                    children: [
                      (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                        className: "h-10 w-10 rounded-full bg-[#1E293B] mr-3",
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        children: [
                          (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                            className: "h-4 w-32 bg-[#1E293B] mb-2",
                          }),
                          (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                            className: "h-3 w-40 bg-[#1E293B]",
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                    className: "h-6 w-16 bg-[#1E293B] rounded-full",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex gap-2 mt-3",
                children: [
                  (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                    className: "h-8 flex-1 bg-[#1E293B]",
                  }),
                  (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                    className: "h-8 flex-1 bg-[#1E293B]",
                  }),
                ],
              }),
            ],
          },
          index,
        );
      }),
    });
  }
  return (0, jsx_runtime_1.jsx)("div", {
    className: "rounded-md border border-white/10 overflow-x-auto bg-[#111827]",
    children: (0, jsx_runtime_1.jsxs)(table_1.Table, {
      children: [
        (0, jsx_runtime_1.jsx)(table_1.TableHeader, {
          className: "bg-[#1A1F2C]",
          children: (0, jsx_runtime_1.jsxs)(table_1.TableRow, {
            className: "border-white/10 hover:bg-transparent",
            children: [
              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                className: "text-gray-400",
                children: "Name",
              }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                className: "text-gray-400",
                children: "Email",
              }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                className: "text-gray-400",
                children: "Role",
              }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                className: "hidden md:table-cell text-gray-400",
                children: "Created",
              }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                className: "text-gray-400",
                children: "Actions",
              }),
            ],
          }),
        }),
        (0, jsx_runtime_1.jsx)(table_1.TableBody, {
          children: Array.from({ length: 5 }).map(function (_, index) {
            return (0, jsx_runtime_1.jsxs)(
              table_1.TableRow,
              {
                className: "border-white/10",
                children: [
                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                    children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                      className: "h-5 w-32 bg-[#1E293B]",
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                    children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                      className: "h-5 w-40 bg-[#1E293B]",
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                    children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                      className: "h-6 w-16 bg-[#1E293B] rounded-full",
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                    className: "hidden md:table-cell",
                    children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                      className: "h-5 w-24 bg-[#1E293B]",
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                    children: (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex gap-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                          className: "h-8 w-24 bg-[#1E293B]",
                        }),
                        (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                          className: "h-8 w-20 bg-[#1E293B]",
                        }),
                      ],
                    }),
                  }),
                ],
              },
              index,
            );
          }),
        }),
      ],
    }),
  });
};
exports.UserListSkeleton = UserListSkeleton;

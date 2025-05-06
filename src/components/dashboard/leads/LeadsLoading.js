"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadsLoading = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var skeleton_1 = require("@/components/ui/skeleton");
var LeadsLoading = function () {
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-4",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex justify-between items-center",
        children: [
          (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
            className: "h-10 w-[250px]",
          }),
          (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
            className: "h-10 w-[150px]",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "rounded-md border overflow-hidden",
        children: [
          (0, jsx_runtime_1.jsx)("div", {
            className: "bg-card p-4",
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "grid grid-cols-7 gap-4",
              children: [
                (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                  className: "h-5 w-full",
                }),
                (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                  className: "h-5 w-full",
                }),
                (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                  className: "h-5 w-full",
                }),
                (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                  className: "h-5 w-full",
                }),
                (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                  className: "h-5 w-full",
                }),
                (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                  className: "h-5 w-full",
                }),
                (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                  className: "h-5 w-full",
                }),
              ],
            }),
          }),
          Array(5)
            .fill(0)
            .map(function (_, i) {
              return (0, jsx_runtime_1.jsx)(
                "div",
                {
                  className: "border-t p-4",
                  children: (0, jsx_runtime_1.jsxs)("div", {
                    className: "grid grid-cols-7 gap-4",
                    children: [
                      (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                        className: "h-5 w-full",
                      }),
                      (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                        className: "h-5 w-full",
                      }),
                      (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                        className: "h-5 w-full",
                      }),
                      (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                        className: "h-5 w-full",
                      }),
                      (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                        className: "h-5 w-full",
                      }),
                      (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                        className: "h-5 w-full",
                      }),
                      (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                        className: "h-5 w-[80px] ml-auto",
                      }),
                    ],
                  }),
                },
                i,
              );
            }),
        ],
      }),
    ],
  });
};
exports.LeadsLoading = LeadsLoading;

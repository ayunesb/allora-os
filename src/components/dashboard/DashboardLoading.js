"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardLoading = DashboardLoading;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var card_1 = require("@/components/ui/card");
var skeleton_1 = require("@/components/ui/skeleton");
function DashboardLoading() {
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex items-center justify-between",
        children: [
          (0, jsx_runtime_1.jsx)("h1", {
            className: "text-2xl font-bold tracking-tight",
            children: "Dashboard",
          }),
          (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
            className: "h-9 w-32",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8",
        children: [
          (0, jsx_runtime_1.jsx)("div", {
            className: "md:col-span-2",
            children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                  className: "pb-2",
                  children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                    className: "h-6 w-1/3",
                  }),
                }),
                (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center space-x-4",
                      children: [
                        (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                          className: "h-12 w-12 rounded-full",
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "space-y-2",
                          children: [
                            (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                              className: "h-4 w-32",
                            }),
                            (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                              className: "h-4 w-40",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "mt-4 space-y-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                          className: "h-4 w-full",
                        }),
                        (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                          className: "h-4 w-3/4",
                        }),
                        (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                          className: "h-4 w-5/6",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsx)("div", {
            children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                  className: "pb-2",
                  children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                    className: "h-6 w-28",
                  }),
                }),
                (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center gap-4",
                      children: [
                        (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                          className: "h-12 w-12 rounded-full",
                        }),
                        (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                          className: "h-6 w-40",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "mt-4 space-y-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                          className: "h-4 w-full",
                        }),
                        (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                          className: "h-4 w-5/6",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                      className: "mt-4 h-9 w-full",
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
            className: "pb-2",
            children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
              className: "flex items-center justify-between",
              children: [
                (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                  className: "h-6 w-52",
                }),
                (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                  className: "h-8 w-28",
                }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            children: (0, jsx_runtime_1.jsx)("div", {
              className: "flex justify-center py-8",
              children: (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                className: "h-8 w-8 animate-spin text-primary",
              }),
            }),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
        children: [1, 2, 3, 4].map(function (i) {
          return (0, jsx_runtime_1.jsxs)(
            card_1.Card,
            {
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                  className: "pb-2",
                  children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                    className: "h-5 w-28",
                  }),
                }),
                (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                  children: [
                    (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                      className: "h-12 w-16",
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "mt-2 space-y-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                          className: "h-3 w-full",
                        }),
                        (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                          className: "h-3 w-5/6",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            },
            i,
          );
        }),
      }),
    ],
  });
}

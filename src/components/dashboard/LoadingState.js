"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardLoadingState = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var skeleton_1 = require("@/components/ui/skeleton");
var DashboardLoadingState = function () {
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsx)("div", {
        className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
        children: Array.from({ length: 3 }).map(function (_, i) {
          return (0, jsx_runtime_1.jsxs)(
            card_1.Card,
            {
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                  className: "pb-2",
                  children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                    className: "h-5 w-40",
                  }),
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                  children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                    className: "h-24 w-full",
                  }),
                }),
              ],
            },
            i,
          );
        }),
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
            className: "pb-2",
            children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
              className: "h-5 w-64",
            }),
          }),
          (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
            className: "space-y-4",
            children: [
              (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                className: "h-40 w-full",
              }),
              (0, jsx_runtime_1.jsx)("div", {
                className: "flex justify-end",
                children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                  className: "h-9 w-32",
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
exports.DashboardLoadingState = DashboardLoadingState;
// Also export default for components that import it directly
exports.default = exports.DashboardLoadingState;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignLoadingState = CampaignLoadingState;
var jsx_runtime_1 = require("react/jsx-runtime");
var skeleton_1 = require("@/components/ui/skeleton");
function CampaignLoadingState() {
  return (0, jsx_runtime_1.jsx)("div", {
    className: "container mx-auto px-4 py-8",
    children: (0, jsx_runtime_1.jsxs)("div", {
      className: "space-y-6 animate-pulse",
      children: [
        (0, jsx_runtime_1.jsxs)("div", {
          className:
            "flex flex-col md:flex-row md:items-center md:justify-between gap-4",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                  className: "h-10 w-64 mb-2",
                }),
                (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                  className: "h-5 w-80",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex gap-2",
              children: [
                (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                  className: "h-10 w-32",
                }),
                (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                  className: "h-10 w-40",
                }),
              ],
            }),
          ],
        }),
        (0, jsx_runtime_1.jsx)("div", {
          className: "grid gap-6 md:grid-cols-2 lg:grid-cols-4",
          children: Array(4)
            .fill(0)
            .map(function (_, i) {
              return (0, jsx_runtime_1.jsx)(
                skeleton_1.Skeleton,
                { className: "h-32 rounded-xl" },
                i,
              );
            }),
        }),
        (0, jsx_runtime_1.jsx)("div", {
          className: "flex gap-2 overflow-x-auto pb-2",
          children: Array(5)
            .fill(0)
            .map(function (_, i) {
              return (0, jsx_runtime_1.jsx)(
                skeleton_1.Skeleton,
                { className: "h-10 w-24 rounded-lg shrink-0" },
                i,
              );
            }),
        }),
        (0, jsx_runtime_1.jsx)("div", {
          className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
          children: Array(6)
            .fill(0)
            .map(function (_, i) {
              return (0, jsx_runtime_1.jsx)(
                skeleton_1.Skeleton,
                { className: "h-64 rounded-xl" },
                i,
              );
            }),
        }),
      ],
    }),
  });
}

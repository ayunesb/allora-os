"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var skeleton_1 = require("@/components/ui/skeleton");
var card_1 = require("@/components/ui/card");
var BotDetailSkeleton = function () {
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "flex flex-col h-[calc(100vh-350px)] min-h-[400px]",
    children: [
      (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
        className: "pb-3",
        children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
          className: "h-6 w-32",
        }),
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        className: "overflow-y-auto flex-grow pb-0 space-y-4",
        children: (0, jsx_runtime_1.jsx)("div", {
          className: "flex flex-col space-y-4",
          children: Array(3)
            .fill(0)
            .map(function (_, i) {
              return (0, jsx_runtime_1.jsx)(
                "div",
                {
                  className: "flex ".concat(
                    i % 2 === 0 ? "justify-start" : "justify-end",
                  ),
                  children: (0, jsx_runtime_1.jsxs)("div", {
                    className: "max-w-[80%] ".concat(
                      i % 2 === 0 ? "mr-auto" : "ml-auto",
                    ),
                    children: [
                      (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                        className: "h-8 w-8 rounded-full mb-2",
                      }),
                      (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                        className: "h-24 w-full rounded-lg",
                      }),
                    ],
                  }),
                },
                i,
              );
            }),
        }),
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
        className: "pt-4 pb-4 border-t",
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "flex items-center gap-2 w-full",
          children: [
            (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
              className: "h-[60px] flex-grow",
            }),
            (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
              className: "h-[60px] w-[60px] flex-shrink-0",
            }),
          ],
        }),
      }),
    ],
  });
};
exports.default = BotDetailSkeleton;

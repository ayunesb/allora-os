"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var framer_motion_1 = require("framer-motion");
var avatar_1 = require("@/components/ui/avatar");
var progress_1 = require("@/components/ui/progress");
var ExecutiveVotingResult = function (_a) {
  var votes = _a.votes,
    executives = _a.executives;
  var optionA = votes.filter(function (v) {
    return v.choice === "option_a";
  });
  var optionB = votes.filter(function (v) {
    return v.choice === "option_b";
  });
  var percentA = Math.round((optionA.length / votes.length) * 100);
  var percentB = Math.round((optionB.length / votes.length) * 100);
  return (0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    className:
      "rounded-lg bg-gray-900 border border-gray-800 overflow-hidden mx-auto max-w-2xl",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "p-4 border-b border-gray-800",
        children: [
          (0, jsx_runtime_1.jsx)("h3", {
            className: "text-lg font-medium text-white",
            children: "Executive Vote Results",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-sm text-gray-400",
            children: "Your executive team has voted on the best approach",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "p-4",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-6",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex justify-between mb-1",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex items-center",
                        children: [
                          (0, jsx_runtime_1.jsx)("div", {
                            className:
                              "w-3 h-3 rounded-full bg-purple-500 mr-2",
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "text-sm font-medium text-white",
                            children: "Aggressive Approach",
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("span", {
                        className: "text-sm text-gray-400",
                        children: [percentA, "%"],
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "relative",
                    children: [
                      (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                        value: percentA,
                        className: "h-8 bg-gray-800",
                      }),
                      (0, jsx_runtime_1.jsx)("div", {
                        className:
                          "absolute top-0 left-0 right-0 bottom-0 flex items-center px-2",
                        children: optionA.map(function (vote, index) {
                          var exec = executives.find(function (e) {
                            return e.id === vote.executiveId;
                          });
                          if (!exec) return null;
                          return (0, jsx_runtime_1.jsx)(
                            "div",
                            {
                              className: "relative",
                              style: {
                                left: "".concat(
                                  (index / Math.max(optionA.length - 1, 1)) *
                                    90,
                                  "%",
                                ),
                              },
                              children: (0, jsx_runtime_1.jsxs)(
                                avatar_1.Avatar,
                                {
                                  className: "h-6 w-6 border border-gray-700",
                                  children: [
                                    (0, jsx_runtime_1.jsx)(
                                      avatar_1.AvatarImage,
                                      { src: exec.avatar, alt: exec.name },
                                    ),
                                    (0, jsx_runtime_1.jsx)(
                                      avatar_1.AvatarFallback,
                                      {
                                        className:
                                          "bg-purple-900 text-white text-xs",
                                        children: exec.name
                                          .split(" ")
                                          .map(function (n) {
                                            return n[0];
                                          })
                                          .join(""),
                                      },
                                    ),
                                  ],
                                },
                              ),
                            },
                            vote.executiveId,
                          );
                        }),
                      }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex justify-between mb-1",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex items-center",
                        children: [
                          (0, jsx_runtime_1.jsx)("div", {
                            className: "w-3 h-3 rounded-full bg-blue-500 mr-2",
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "text-sm font-medium text-white",
                            children: "Cautious Approach",
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("span", {
                        className: "text-sm text-gray-400",
                        children: [percentB, "%"],
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "relative",
                    children: [
                      (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                        value: percentB,
                        className: "h-8 bg-gray-800",
                        color: "blue",
                      }),
                      (0, jsx_runtime_1.jsx)("div", {
                        className:
                          "absolute top-0 left-0 right-0 bottom-0 flex items-center px-2",
                        children: optionB.map(function (vote, index) {
                          var exec = executives.find(function (e) {
                            return e.id === vote.executiveId;
                          });
                          if (!exec) return null;
                          return (0, jsx_runtime_1.jsx)(
                            "div",
                            {
                              className: "relative",
                              style: {
                                left: "".concat(
                                  (index / Math.max(optionB.length - 1, 1)) *
                                    90,
                                  "%",
                                ),
                              },
                              children: (0, jsx_runtime_1.jsxs)(
                                avatar_1.Avatar,
                                {
                                  className: "h-6 w-6 border border-gray-700",
                                  children: [
                                    (0, jsx_runtime_1.jsx)(
                                      avatar_1.AvatarImage,
                                      { src: exec.avatar, alt: exec.name },
                                    ),
                                    (0, jsx_runtime_1.jsx)(
                                      avatar_1.AvatarFallback,
                                      {
                                        className:
                                          "bg-blue-900 text-white text-xs",
                                        children: exec.name
                                          .split(" ")
                                          .map(function (n) {
                                            return n[0];
                                          })
                                          .join(""),
                                      },
                                    ),
                                  ],
                                },
                              ),
                            },
                            vote.executiveId,
                          );
                        }),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "mt-6 pt-4 border-t border-gray-800",
            children: [
              (0, jsx_runtime_1.jsx)("h4", {
                className: "text-sm font-medium text-white mb-2",
                children: "Individual Executive Votes",
              }),
              (0, jsx_runtime_1.jsx)("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 gap-2",
                children: votes.map(function (vote) {
                  var exec = executives.find(function (e) {
                    return e.id === vote.executiveId;
                  });
                  if (!exec) return null;
                  return (0, jsx_runtime_1.jsxs)(
                    "div",
                    {
                      className:
                        "flex items-center gap-2 p-2 rounded-md bg-gray-800/50",
                      children: [
                        (0, jsx_runtime_1.jsxs)(avatar_1.Avatar, {
                          className: "h-8 w-8",
                          children: [
                            (0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, {
                              src: exec.avatar,
                              alt: exec.name,
                            }),
                            (0, jsx_runtime_1.jsx)(avatar_1.AvatarFallback, {
                              className: "bg-purple-900 text-white",
                              children: exec.name
                                .split(" ")
                                .map(function (n) {
                                  return n[0];
                                })
                                .join(""),
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex-1",
                          children: [
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "flex items-center justify-between",
                              children: [
                                (0, jsx_runtime_1.jsx)("span", {
                                  className: "text-sm font-medium text-white",
                                  children: exec.name,
                                }),
                                (0, jsx_runtime_1.jsx)("div", {
                                  className:
                                    "px-2 py-0.5 rounded-full text-xs font-medium ".concat(
                                      vote.choice === "option_a"
                                        ? "bg-purple-950/70 text-purple-300"
                                        : "bg-blue-950/70 text-blue-300",
                                    ),
                                  children:
                                    vote.choice === "option_a"
                                      ? "Aggressive"
                                      : "Cautious",
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)("div", {
                              className:
                                "flex items-center justify-between mt-0.5",
                              children: (0, jsx_runtime_1.jsxs)("span", {
                                className: "text-xs text-gray-400",
                                children: [vote.confidence, "% confidence"],
                              }),
                            }),
                          ],
                        }),
                      ],
                    },
                    vote.executiveId,
                  );
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
exports.default = ExecutiveVotingResult;

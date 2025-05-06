"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiBotsHeader = AiBotsHeader;
var jsx_runtime_1 = require("react/jsx-runtime");
var UserPreferencesDialog_1 = require("@/components/UserPreferencesDialog");
var HelpButton_1 = require("@/components/help/HelpButton");
var lucide_react_1 = require("lucide-react");
var framer_motion_1 = require("framer-motion");
var badge_1 = require("@/components/ui/badge");
function AiBotsHeader(_a) {
  var isMobileView = _a.isMobileView;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "w-full space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex items-center justify-between w-full",
        children: [
          (0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.5, ease: "easeOut" },
            className: "flex flex-col gap-2",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center gap-3",
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "relative",
                    children: [
                      (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, {
                        className:
                          "absolute inset-0 rounded-full bg-primary/20",
                        animate: {
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.5, 0.3],
                        },
                        transition: {
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }),
                      (0, jsx_runtime_1.jsx)(lucide_react_1.BrainCog, {
                        className: "h-8 w-8 text-primary relative z-10",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)("h1", {
                    className: "text-3xl font-bold tracking-tight",
                    children: (0, jsx_runtime_1.jsx)("span", {
                      className:
                        "bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-light to-primary",
                      children: "AI Executive Team",
                    }),
                  }),
                  (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
                    variant: "outline",
                    className:
                      "bg-black/30 text-primary border-primary/30 px-2 py-1 backdrop-blur-md",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, {
                        className: "h-3 w-3 mr-1",
                      }),
                      " Advanced",
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground ml-11",
                children:
                  "Your elite team of AI executives for strategic business guidance and insights",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(HelpButton_1.HelpButton, {
            contextId: "ai-bots",
            variant: "premium",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.2, duration: 0.5 },
        className:
          "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full relative",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "relative z-10",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center gap-3",
                children: [
                  (0, jsx_runtime_1.jsx)("div", {
                    className:
                      "p-2 bg-gradient-to-r from-blue-600/20 to-blue-400/5 rounded-xl",
                    children: (0, jsx_runtime_1.jsx)(lucide_react_1.BrainCog, {
                      className: "h-6 w-6 text-blue-400",
                    }),
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    children: [
                      (0, jsx_runtime_1.jsx)("h2", {
                        className: "".concat(
                          isMobileView ? "text-xl" : "text-2xl",
                          " font-bold tracking-tight",
                        ),
                        children: "Executive Boardroom",
                      }),
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "text-sm text-muted-foreground mt-1",
                        children:
                          "Advanced AI-driven strategic analysis and business insights",
                      }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex gap-2 mt-4 flex-wrap",
                children: [
                  (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
                    variant: "outline",
                    className:
                      "bg-blue-500/10 border-blue-500/30 text-blue-400 flex items-center gap-1",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Target, {
                        className: "h-3 w-3",
                      }),
                      " Strategic Planning",
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
                    variant: "outline",
                    className:
                      "bg-purple-500/10 border-purple-500/30 text-purple-400 flex items-center gap-1",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Zap, {
                        className: "h-3 w-3",
                      }),
                      " Operational Excellence",
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
                    variant: "outline",
                    className:
                      "bg-amber-500/10 border-amber-500/30 text-amber-400 flex items-center gap-1",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, {
                        className: "h-3 w-3",
                      }),
                      " Innovation",
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, {
            whileHover: { scale: 1.03 },
            whileTap: { scale: 0.97 },
            children: (0, jsx_runtime_1.jsx)(UserPreferencesDialog_1.default, {
              triggerLabel: (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Settings, {
                    className: "h-4 w-4",
                  }),
                  isMobileView ? "AI Settings" : "AI Response Settings",
                ],
              }),
            }),
          }),
        ],
      }),
    ],
  });
}

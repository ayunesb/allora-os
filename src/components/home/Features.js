"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var FeatureBlock_1 = require("@/components/home/FeatureBlock");
var use_mobile_1 = require("@/hooks/use-mobile");
// Feature data
var features = [
  {
    emoji: "🚀",
    title: "AI Strategy Generation",
    description:
      "Get personalized business strategies created by our AI executive team.",
    icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Stars, {
      className: "h-6 w-6 text-primary",
    }),
  },
  {
    emoji: "💼",
    title: "Virtual Executive Team",
    description:
      "Access the expertise of AI personas modeled after top executives.",
    icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Award, {
      className: "h-6 w-6 text-primary",
    }),
  },
  {
    emoji: "📊",
    title: "Lead Management",
    description: "Track and nurture leads with our AI-powered CRM tools.",
    icon: (0, jsx_runtime_1.jsx)(lucide_react_1.BarChart3, {
      className: "h-6 w-6 text-primary",
    }),
  },
];
var Features = function () {
  var breakpoint = (0, use_mobile_1.useBreakpoint)();
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto px-4 py-12 md:py-24",
    children: [
      (0, jsx_runtime_1.jsx)("h2", {
        className:
          "text-2xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-12 text-center",
        children: "Powerful AI Business Tools",
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className:
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto",
        children: features.map(function (feature, index) {
          return (0, jsx_runtime_1.jsx)(
            FeatureBlock_1.default,
            {
              emoji: feature.emoji,
              title: feature.title,
              description: feature.description,
              icon: feature.icon,
              delay: index * 0.2,
            },
            index,
          );
        }),
      }),
    ],
  });
};
exports.default = Features;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadScoreBadge = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var badge_1 = require("@/components/ui/badge");
var lucide_react_1 = require("lucide-react");
var utils_1 = require("@/lib/utils");
var LeadScoreBadge = function (_a) {
  var score = _a.score,
    _b = _a.className,
    className = _b === void 0 ? "" : _b,
    _c = _a.showIcon,
    showIcon = _c === void 0 ? true : _c,
    _d = _a.pulsing,
    pulsing = _d === void 0 ? false : _d;
  var badges = {
    hot: {
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Flame, {
        className: "h-3 w-3 mr-1",
      }),
      class:
        "bg-gradient-to-r from-risk-high-DEFAULT to-risk-high-dark/80 border-risk-high-DEFAULT/30",
    },
    warm: {
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.ThermometerSun, {
        className: "h-3 w-3 mr-1",
      }),
      class:
        "bg-gradient-to-r from-risk-medium-DEFAULT to-risk-medium-dark/80 border-risk-medium-DEFAULT/30",
    },
    cold: {
      icon: (0, jsx_runtime_1.jsx)(lucide_react_1.ThermometerSnowflake, {
        className: "h-3 w-3 mr-1",
      }),
      class:
        "bg-gradient-to-r from-risk-low-DEFAULT to-risk-low-dark/80 border-risk-low-DEFAULT/30",
    },
  };
  return (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
    className: (0, utils_1.cn)(
      badges[score].class,
      "text-white font-medium transition-all border shadow-sm",
      pulsing && (score === "hot" ? "animate-pulse-slow" : ""),
      className,
    ),
    children: [
      showIcon && badges[score].icon,
      score.charAt(0).toUpperCase() + score.slice(1),
    ],
  });
};
exports.LeadScoreBadge = LeadScoreBadge;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpTooltip = HelpTooltip;
var jsx_runtime_1 = require("react/jsx-runtime");
var tooltip_1 = require("@/components/ui/tooltip");
var lucide_react_1 = require("lucide-react");
var utils_1 = require("@/lib/utils");
function HelpTooltip(_a) {
  var content = _a.content,
    className = _a.className,
    iconClassName = _a.iconClassName,
    _b = _a.side,
    side = _b === void 0 ? "top" : _b,
    _c = _a.align,
    align = _c === void 0 ? "center" : _c,
    children = _a.children;
  return (0, jsx_runtime_1.jsx)(tooltip_1.TooltipProvider, {
    children: (0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, {
      delayDuration: 300,
      children: [
        (0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, {
          asChild: true,
          children: (0, jsx_runtime_1.jsx)("span", {
            className: (0, utils_1.cn)("inline-flex items-center", className),
            children:
              children ||
              (0, jsx_runtime_1.jsx)(lucide_react_1.HelpCircle, {
                className: (0, utils_1.cn)(
                  "h-4 w-4 text-muted-foreground cursor-help",
                  iconClassName,
                ),
                "aria-hidden": "true",
              }),
          }),
        }),
        (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, {
          side: side,
          align: align,
          className: "max-w-[280px] text-xs",
          children: content,
        }),
      ],
    }),
  });
}

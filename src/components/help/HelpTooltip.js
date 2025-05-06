"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpTooltip = HelpTooltip;
exports.DocumentationLink = DocumentationLink;
var jsx_runtime_1 = require("react/jsx-runtime");
var tooltip_1 = require("@/components/ui/tooltip");
var lucide_react_1 = require("lucide-react");
var utils_1 = require("@/lib/utils");
function HelpTooltip(_a) {
  var content = _a.content,
    className = _a.className,
    _b = _a.side,
    side = _b === void 0 ? "top" : _b,
    _c = _a.align,
    align = _c === void 0 ? "center" : _c,
    children = _a.children,
    _d = _a.icon,
    icon = _d === void 0 ? true : _d;
  return (0, jsx_runtime_1.jsx)(tooltip_1.TooltipProvider, {
    children: (0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, {
      delayDuration: 300,
      children: [
        (0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, {
          asChild: true,
          children: (0, jsx_runtime_1.jsxs)("span", {
            className: (0, utils_1.cn)("inline-flex items-center", className),
            children: [
              children,
              icon &&
                (0, jsx_runtime_1.jsx)(lucide_react_1.HelpCircle, {
                  className:
                    "ml-1 h-3.5 w-3.5 text-muted-foreground cursor-help",
                }),
            ],
          }),
        }),
        (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, {
          side: side,
          align: align,
          className: "max-w-xs text-sm",
          children: content,
        }),
      ],
    }),
  });
}
function DocumentationLink(_a) {
  var href = _a.href,
    label = _a.label;
  return (0, jsx_runtime_1.jsxs)("a", {
    href: href,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "inline-flex items-center text-primary hover:underline text-sm",
    children: [
      (0, jsx_runtime_1.jsx)("span", { children: label }),
      (0, jsx_runtime_1.jsx)(lucide_react_1.ExternalLink, {
        className: "ml-1 h-3 w-3",
      }),
    ],
  });
}

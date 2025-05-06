"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpButton = HelpButton;
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var HelpContext_1 = require("@/context/HelpContext");
var helpContent_1 = require("@/utils/help/helpContent");
var tooltip_1 = require("@/components/ui/tooltip");
function HelpButton(_a) {
  var contextId = _a.contextId,
    _b = _a.variant,
    variant = _b === void 0 ? "outline" : _b,
    _c = _a.size,
    size = _c === void 0 ? "sm" : _c,
    tooltipText = _a.tooltipText,
    _d = _a.className,
    className = _d === void 0 ? "" : _d,
    _e = _a.showTooltip,
    showTooltip = _e === void 0 ? true : _e;
  var _f = (0, HelpContext_1.useHelp)(),
    openHelp = _f.openHelp,
    setCurrentHelp = _f.setCurrentHelp;
  var handleClick = function () {
    var helpContent = (0, helpContent_1.getHelpContent)(contextId);
    if (helpContent) {
      setCurrentHelp(helpContent);
      openHelp();
    }
  };
  var button = (0, jsx_runtime_1.jsxs)(button_1.Button, {
    variant:
      variant === "premium"
        ? "default"
        : variant === "text"
          ? "link"
          : variant === "icon"
            ? "ghost"
            : variant,
    size: size,
    className: "gap-1 ".concat(className),
    "aria-label": "Get help for ".concat(contextId),
    onClick: handleClick,
    children: [
      (0, jsx_runtime_1.jsx)(lucide_react_1.HelpCircle, {
        className: "h-4 w-4",
      }),
      variant !== "icon" && "Help",
    ],
  });
  if (showTooltip && tooltipText) {
    return (0, jsx_runtime_1.jsx)(tooltip_1.TooltipProvider, {
      children: (0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, {
        children: [
          (0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, {
            asChild: true,
            children: button,
          }),
          (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, {
            children: (0, jsx_runtime_1.jsx)("p", { children: tooltipText }),
          }),
        ],
      }),
    });
  }
  return button;
}

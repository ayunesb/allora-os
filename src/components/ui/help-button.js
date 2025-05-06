"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpButton = HelpButton;
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var utils_1 = require("@/lib/utils");
var HelpContext_1 = require("@/context/HelpContext");
function HelpButton(_a) {
  var helpContent = _a.helpContent,
    className = _a.className,
    _b = _a.variant,
    variant = _b === void 0 ? "ghost" : _b,
    _c = _a.size,
    size = _c === void 0 ? "icon" : _c,
    children = _a.children;
  var _d = (0, HelpContext_1.useHelp)(),
    setCurrentHelp = _d.setCurrentHelp,
    openHelp = _d.openHelp;
  var handleClick = function () {
    setCurrentHelp(helpContent);
    openHelp();
  };
  return (0, jsx_runtime_1.jsx)(button_1.Button, {
    type: "button",
    variant: variant,
    size: size,
    onClick: handleClick,
    className: (0, utils_1.cn)("", className),
    "aria-label": "Help for ".concat(helpContent.title),
    children:
      children ||
      (0, jsx_runtime_1.jsx)(lucide_react_1.HelpCircle, {
        className: "h-4 w-4",
      }),
  });
}

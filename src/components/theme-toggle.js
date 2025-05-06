"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeToggle = ThemeToggle;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var next_themes_1 = require("next-themes");
var button_1 = require("@/components/ui/button");
function ThemeToggle() {
  var _a = (0, next_themes_1.useTheme)(),
    theme = _a.theme,
    setTheme = _a.setTheme;
  return (0, jsx_runtime_1.jsx)(button_1.Button, {
    size: "icon",
    variant: "ghost",
    onClick: function () {
      return setTheme(theme === "dark" ? "light" : "dark");
    },
    "aria-label": "Toggle theme",
    children:
      theme === "dark"
        ? (0, jsx_runtime_1.jsx)(lucide_react_1.Sun, { className: "h-5 w-5" })
        : (0, jsx_runtime_1.jsx)(lucide_react_1.Moon, { className: "h-5 w-5" }),
  });
}

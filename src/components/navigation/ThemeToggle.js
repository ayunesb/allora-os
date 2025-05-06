"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ThemeToggle;
var jsx_runtime_1 = require("react/jsx-runtime");
var next_themes_1 = require("next-themes");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
function ThemeToggle() {
  var _a = (0, next_themes_1.useTheme)(),
    theme = _a.theme,
    setTheme = _a.setTheme;
  var toggleTheme = function () {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (0, jsx_runtime_1.jsxs)(button_1.Button, {
    variant: "ghost",
    size: "icon",
    onClick: toggleTheme,
    title: theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
    children: [
      theme === "dark"
        ? (0, jsx_runtime_1.jsx)(lucide_react_1.Sun, {
            className: "h-[1.2rem] w-[1.2rem]",
          })
        : (0, jsx_runtime_1.jsx)(lucide_react_1.Moon, {
            className: "h-[1.2rem] w-[1.2rem]",
          }),
      (0, jsx_runtime_1.jsx)("span", {
        className: "sr-only",
        children: "Toggle theme",
      }),
    ],
  });
}

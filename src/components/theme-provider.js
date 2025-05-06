"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeProvider = ThemeProvider;
var jsx_runtime_1 = require("react/jsx-runtime");
var next_themes_1 = require("next-themes");
function ThemeProvider(_a) {
  var children = _a.children,
    _b = _a.defaultTheme,
    defaultTheme = _b === void 0 ? "dark" : _b,
    _c = _a.storageKey,
    storageKey = _c === void 0 ? "allora-theme" : _c;
  return (0, jsx_runtime_1.jsx)(next_themes_1.ThemeProvider, {
    attribute: "class",
    defaultTheme: defaultTheme,
    enableSystem: false,
    storageKey: storageKey,
    children: children,
  });
}

"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeProvider = ThemeProvider;
var jsx_runtime_1 = require("react/jsx-runtime");
var next_themes_1 = require("next-themes");
var google_1 = require("next/font/google");
var utils_1 = require("@/lib/utils");
var inter = (0, google_1.Inter)({
  subsets: ["latin"],
  variable: "--font-inter",
});
function ThemeProvider(_a) {
  var children = _a.children,
    props = __rest(_a, ["children"]);
  return (0, jsx_runtime_1.jsx)(
    next_themes_1.ThemeProvider,
    __assign({}, props, {
      children: (0, jsx_runtime_1.jsx)("div", {
        className: (0, utils_1.cn)(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
        ),
        suppressHydrationWarning: true,
        children: children,
      }),
    }),
  );
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTheme = exports.ThemeContext = void 0;
exports.ThemeProvider = ThemeProvider;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var initialState = {
  theme: "system",
  setTheme: function () {
    return null;
  },
};
exports.ThemeContext = (0, react_1.createContext)(initialState);
function ThemeProvider(_a) {
  var children = _a.children;
  var _b = (0, react_1.useState)(function () {
      // Check if we have a stored theme preference
      if (typeof window !== "undefined") {
        var storedTheme = localStorage.getItem("allora-theme");
        return storedTheme || "dark";
      }
      return "dark";
    }),
    theme = _b[0],
    setTheme = _b[1];
  (0, react_1.useEffect)(
    function () {
      var root = window.document.documentElement;
      root.classList.remove("light", "dark");
      if (theme === "system") {
        var systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
        root.classList.add(systemTheme);
        return;
      }
      root.classList.add(theme);
    },
    [theme],
  );
  // Store theme preference in localStorage
  (0, react_1.useEffect)(
    function () {
      localStorage.setItem("allora-theme", theme);
    },
    [theme],
  );
  var value = {
    theme: theme,
    setTheme: function (theme) {
      setTheme(theme);
    },
  };
  return (0, jsx_runtime_1.jsx)(exports.ThemeContext.Provider, {
    value: value,
    children: children,
  });
}
var useTheme = function () {
  var context = (0, react_1.useContext)(exports.ThemeContext);
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
exports.useTheme = useTheme;

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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var sonner_1 = require("sonner");
require("../styles/globals.css");
function MyApp(_a) {
  var Component = _a.Component,
    pageProps = _a.pageProps;
  return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
    children: [
      (0, jsx_runtime_1.jsx)(sonner_1.Toaster, {}),
      (0, jsx_runtime_1.jsx)(Component, __assign({}, pageProps)),
    ],
  });
}
exports.default = MyApp;

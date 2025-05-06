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
exports.TikTokIcon = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var TikTokIcon = function (props) {
  return (0, jsx_runtime_1.jsx)(
    "svg",
    __assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
      props,
      {
        children: (0, jsx_runtime_1.jsx)("path", {
          d: "M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5",
        }),
      },
    ),
  );
};
exports.TikTokIcon = TikTokIcon;

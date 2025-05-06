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
exports.Panel = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var systemService_1 = require("../services/systemService");
var SystemHealth = function () {
  var items = (0, systemService_1.getSystemServices)(); // ✅ Typed items
  return (0, jsx_runtime_1.jsx)("div", {
    children: items.map(function (item) {
      return (
        // Explicitly type `item`
        (0, jsx_runtime_1.jsxs)(
          InfoCard,
          {
            children: [
              (0, jsx_runtime_1.jsx)("h2", { children: item.name }),
              (0, jsx_runtime_1.jsxs)("p", {
                children: ["Status: ", item.status],
              }),
            ],
          },
          item.name,
        )
      );
    }),
  });
};
var Panel = function (_a) {
  var children = _a.children,
    props = __rest(_a, ["children"]);
  return (0, jsx_runtime_1.jsx)(
    "div",
    __assign({}, props, { children: children }),
  );
};
exports.Panel = Panel;
var InfoCard = function (_a) {
  var children = _a.children,
    className = _a.className;
  return (
    // Fix `children` prop type
    (0, jsx_runtime_1.jsx)("div", { className: className, children: children })
  );
};
exports.default = SystemHealth;

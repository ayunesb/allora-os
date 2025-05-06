"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HelmetProvider;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_helmet_async_1 = require("react-helmet-async");
/**
 * A wrapper component to provide Helmet context to the application
 */
function HelmetProvider(_a) {
  var children = _a.children;
  return (0, jsx_runtime_1.jsx)(react_helmet_async_1.HelmetProvider, {
    children: children,
  });
}

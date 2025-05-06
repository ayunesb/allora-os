"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exploreRoutes = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var page_loader_1 = require("@/components/ui/page-loader");
var GalaxyExplorer = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("@/pages/explore/GalaxyExplorer");
  });
});
exports.exploreRoutes = [
  {
    path: "explore",
    element: (0, jsx_runtime_1.jsx)(GalaxyExplorer, {}),
  },
];
var ExploreRoutes = function () {
  return (0, jsx_runtime_1.jsx)(react_1.Suspense, {
    fallback: (0, jsx_runtime_1.jsx)(page_loader_1.PageLoader, {}),
    children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Routes, {
      children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, {
        path: "galaxy",
        element: (0, jsx_runtime_1.jsx)(GalaxyExplorer, {}),
      }),
    }),
  });
};
exports.default = ExploreRoutes;

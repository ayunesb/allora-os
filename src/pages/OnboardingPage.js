"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var OnboardingPage = function () {
  return (0, jsx_runtime_1.jsxs)("div", {
    children: [
      (0, jsx_runtime_1.jsx)("h1", {
        children: "Welcome to the Onboarding Process",
      }),
      (0, jsx_runtime_1.jsx)(react_1.Suspense, {
        fallback: (0, jsx_runtime_1.jsx)("div", { children: "Loading..." }),
        children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {}),
      }),
    ],
  });
};
exports.default = OnboardingPage;

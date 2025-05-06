"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onboardingRoutes = void 0;
exports.default = OnboardingRoutes;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var withSuspense_1 = require("../utils/withSuspense");
var OnboardingPage = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("../pages/OnboardingPage");
  });
});
var OnboardingLayout = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("@/layouts/onboarding/OnboardingLayout");
  });
});
var OnboardingWelcome = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("@/pages/onboarding/OnboardingWelcome");
  });
});
var OnboardingProfile = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("@/pages/onboarding/OnboardingProfile");
  });
});
var OnboardingCompany = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("@/pages/onboarding/OnboardingCompany");
  });
});
var OnboardingTeam = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("@/pages/onboarding/OnboardingTeam");
  });
});
var OnboardingIntegrations = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("@/pages/onboarding/OnboardingIntegrations");
  });
});
var OnboardingAIWorkflow = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("@/pages/onboarding/OnboardingAIWorkflow");
  });
});
var OnboardingComplete = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("@/pages/onboarding/OnboardingComplete");
  });
});
exports.onboardingRoutes = [
  {
    path: "onboarding",
    element: (0, withSuspense_1.default)(
      (0, jsx_runtime_1.jsx)(OnboardingLayout, {
        children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {}),
      }),
    ),
    children: [
      {
        index: true,
        element: (0, withSuspense_1.default)(
          (0, jsx_runtime_1.jsx)(OnboardingWelcome, {}),
        ),
      },
      {
        path: "profile",
        element: (0, withSuspense_1.default)(
          (0, jsx_runtime_1.jsx)(OnboardingProfile, {}),
        ),
      },
      {
        path: "company",
        element: (0, withSuspense_1.default)(
          (0, jsx_runtime_1.jsx)(OnboardingCompany, {}),
        ),
      },
      {
        path: "team",
        element: (0, withSuspense_1.default)(
          (0, jsx_runtime_1.jsx)(OnboardingTeam, {}),
        ),
      },
      {
        path: "integrations",
        element: (0, withSuspense_1.default)(
          (0, jsx_runtime_1.jsx)(OnboardingIntegrations, {}),
        ),
      },
      {
        path: "ai-workflow",
        element: (0, withSuspense_1.default)(
          (0, jsx_runtime_1.jsx)(OnboardingAIWorkflow, {}),
        ),
      },
      {
        path: "complete",
        element: (0, withSuspense_1.default)(
          (0, jsx_runtime_1.jsx)(OnboardingComplete, {}),
        ),
      },
    ],
  },
];
function OnboardingRoutes() {
  return (0, jsx_runtime_1.jsx)(react_router_dom_1.Routes, {
    children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, {
      path: "/onboarding",
      element: (0, withSuspense_1.default)(
        (0, jsx_runtime_1.jsx)(OnboardingPage, {}),
      ),
    }),
  });
}

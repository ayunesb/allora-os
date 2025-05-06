"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var CallToAction = function () {
  return (0, jsx_runtime_1.jsx)("div", {
    className: "bg-accent text-white py-16 md:py-20",
    children: (0, jsx_runtime_1.jsxs)("div", {
      className: "container mx-auto px-4 text-center",
      children: [
        (0, jsx_runtime_1.jsx)("h2", {
          className: "text-3xl md:text-4xl font-bold mb-6",
          children: "Accelerate Your Business Growth Today",
        }),
        (0, jsx_runtime_1.jsx)("p", {
          className: "text-xl text-white/80 mb-8 max-w-2xl mx-auto",
          children:
            "Join thousands of forward-thinking businesses using Allora AI to create winning strategies and drive exceptional results.",
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "flex flex-col sm:flex-row gap-4 justify-center",
          children: [
            (0, jsx_runtime_1.jsx)(button_1.Button, {
              size: "lg",
              className: "bg-white text-accent hover:bg-white/90 px-8 group",
              asChild: true,
              children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, {
                to: "/signup",
                className: "flex items-center gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, {
                    className: "h-4 w-4",
                  }),
                  "Start Your Free Trial",
                  (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, {
                    className:
                      "h-4 w-4 transition-transform group-hover:translate-x-1",
                  }),
                ],
              }),
            }),
            (0, jsx_runtime_1.jsx)(button_1.Button, {
              size: "lg",
              variant: "outline",
              className: "border-white text-white hover:bg-white/10 px-8",
              asChild: true,
              children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
                to: "/pricing",
                children: "View Enterprise Plans",
              }),
            }),
          ],
        }),
        (0, jsx_runtime_1.jsx)("p", {
          className: "mt-6 text-sm text-white/70",
          children:
            "No credit card required. 14-day free trial with full platform access.",
        }),
      ],
    }),
  });
};
exports.default = CallToAction;

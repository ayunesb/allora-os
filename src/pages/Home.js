"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("@/components/ui/button");
var react_router_dom_1 = require("react-router-dom");
function Home() {
  return (0, jsx_runtime_1.jsx)("div", {
    className: "min-h-screen",
    children: (0, jsx_runtime_1.jsxs)("div", {
      className:
        "container mx-auto px-4 py-24 flex flex-col items-center text-center",
      children: [
        (0, jsx_runtime_1.jsx)("h1", {
          className: "text-4xl md:text-6xl font-bold tracking-tight",
          children: "Allora AI",
        }),
        (0, jsx_runtime_1.jsx)("p", {
          className: "mt-6 text-xl text-muted-foreground max-w-2xl",
          children:
            "AI-powered executive advisory platform to help businesses make strategic decisions and develop growth strategies.",
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "mt-10 flex flex-wrap justify-center gap-4",
          children: [
            (0, jsx_runtime_1.jsx)(button_1.Button, {
              asChild: true,
              size: "lg",
              children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
                to: "/signup",
                children: "Get Started",
              }),
            }),
            (0, jsx_runtime_1.jsx)(button_1.Button, {
              variant: "outline",
              size: "lg",
              asChild: true,
              children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
                to: "/features",
                children: "Learn More",
              }),
            }),
          ],
        }),
      ],
    }),
  });
}

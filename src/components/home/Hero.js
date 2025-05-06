"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var tooltip_1 = require("@/components/ui/tooltip");
var Hero = function () {
  return (0, jsx_runtime_1.jsxs)("div", {
    className:
      "relative min-h-[85vh] flex items-center justify-center py-16 md:py-24 overflow-hidden bg-gradient-to-br from-[#0A0F24] via-[#1B1B3A] to-[#2C2C54] bg-fixed",
    children: [
      (0, jsx_runtime_1.jsx)("div", {
        className: "absolute inset-0 overflow-hidden",
        children: (0, jsx_runtime_1.jsx)("div", {
          className: "particles-container",
          children: Array.from({ length: 50 }).map(function (_, i) {
            return (0, jsx_runtime_1.jsx)(
              "div",
              {
                className: "absolute rounded-full bg-white/5",
                style: {
                  width: "".concat(Math.random() * 6 + 1, "px"),
                  height: "".concat(Math.random() * 6 + 1, "px"),
                  top: "".concat(Math.random() * 100, "%"),
                  left: "".concat(Math.random() * 100, "%"),
                  opacity: Math.random() * 0.5 + 0.1,
                  animation: "floatParticle "
                    .concat(
                      Math.random() * 15 + 20,
                      "s linear infinite, pulseParticle ",
                    )
                    .concat(Math.random() * 4 + 4, "s ease-in-out infinite"),
                  animationDelay: "".concat(Math.random() * 10, "s"),
                },
              },
              i,
            );
          }),
        }),
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className:
          "container mx-auto px-6 md:px-8 flex flex-col items-center text-center relative z-10 py-12 md:py-16",
        children: [
          (0, jsx_runtime_1.jsx)("img", {
            src: "/lovable-uploads/fa68c49e-02d3-4f17-b128-a5b8f6f1665b.png",
            alt: "Allora AI Logo",
            className: "h-28 md:h-36 mb-10 animate-float",
          }),
          (0, jsx_runtime_1.jsx)("h1", {
            className:
              "text-3xl md:text-5xl font-bold mb-6 animate-slideIn tracking-wide text-[#EDEDED]",
            children: "Allora AI - Your AI Business Acceleration Platform",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className:
              "text-xl text-gray-300/80 mb-10 max-w-2xl mx-auto animate-slideIn font-normal",
            style: { animationDelay: "0.2s" },
            children: "Launch. Grow. Dominate. The Future of Business is Here.",
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className:
              "flex flex-col sm:flex-row gap-6 justify-center animate-slideIn",
            style: { animationDelay: "0.4s" },
            children: [
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                size: "lg",
                className:
                  "bg-gradient-to-r from-[#6A5ACD] to-[#8A2BE2] text-white px-8 py-7 rounded-xl group transition-all duration-300 hover:shadow-[0_0_20px_rgba(138,43,226,0.5)] hover:scale-105",
                asChild: true,
                children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, {
                  to: "/signup",
                  className: "flex items-center gap-2",
                  children: [
                    "Get Started",
                    (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, {
                      className:
                        "h-5 w-5 transition-transform group-hover:translate-x-1",
                    }),
                  ],
                }),
              }),
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                size: "lg",
                variant: "outline",
                className:
                  "border-white/20 text-white hover:bg-white/10 hover:text-white/100 hover:border-white/40 px-8 py-7 transition-all duration-300",
                asChild: true,
                children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
                  to: "/login",
                  children: "Login",
                }),
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "mt-16 flex flex-wrap justify-center gap-4 md:gap-6",
            children: (0, jsx_runtime_1.jsxs)(tooltip_1.TooltipProvider, {
              children: [
                (0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, {
                  children: [
                    (0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, {
                      asChild: true,
                      children: (0, jsx_runtime_1.jsxs)("div", {
                        className:
                          "flex items-center gap-2 border border-white/20 bg-white/5 px-4 py-2 rounded-lg hover:bg-white/10 hover:border-white/30 transition-all duration-300",
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.ShieldCheck, {
                            className: "h-5 w-5 text-primary",
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "text-white/90 font-medium",
                            children: "GDPR Compliant",
                          }),
                        ],
                      }),
                    }),
                    (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, {
                      children: (0, jsx_runtime_1.jsx)("p", {
                        className: "text-xs max-w-[200px]",
                        children:
                          "Our platform adheres to all GDPR requirements for data protection",
                      }),
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, {
                  children: [
                    (0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, {
                      asChild: true,
                      children: (0, jsx_runtime_1.jsxs)("div", {
                        className:
                          "flex items-center gap-2 border border-white/20 bg-white/5 px-4 py-2 rounded-lg hover:bg-white/10 hover:border-white/30 transition-all duration-300",
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, {
                            className: "h-5 w-5 text-primary",
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "text-white/90 font-medium",
                            children: "SOC 2 Certified",
                          }),
                        ],
                      }),
                    }),
                    (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, {
                      children: (0, jsx_runtime_1.jsx)("p", {
                        className: "text-xs max-w-[200px]",
                        children:
                          "Validated security controls and procedures to protect your data",
                      }),
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, {
                  children: [
                    (0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, {
                      asChild: true,
                      children: (0, jsx_runtime_1.jsxs)("div", {
                        className:
                          "flex items-center gap-2 border border-white/20 bg-white/5 px-4 py-2 rounded-lg hover:bg-white/10 hover:border-white/30 transition-all duration-300",
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.Lock, {
                            className: "h-5 w-5 text-primary",
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "text-white/90 font-medium",
                            children: "Bank-Level Security",
                          }),
                        ],
                      }),
                    }),
                    (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, {
                      children: (0, jsx_runtime_1.jsx)("p", {
                        className: "text-xs max-w-[200px]",
                        children:
                          "Enterprise-grade encryption for all your business data",
                      }),
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, {
                  children: [
                    (0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, {
                      asChild: true,
                      children: (0, jsx_runtime_1.jsxs)("div", {
                        className:
                          "flex items-center gap-2 border border-white/20 bg-white/5 px-4 py-2 rounded-lg hover:bg-white/10 hover:border-white/30 transition-all duration-300",
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, {
                            className: "h-5 w-5 text-primary",
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "text-white/90 font-medium",
                            children: "ISO 27001",
                          }),
                        ],
                      }),
                    }),
                    (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, {
                      children: (0, jsx_runtime_1.jsx)("p", {
                        className: "text-xs max-w-[200px]",
                        children:
                          "Internationally recognized information security standard",
                      }),
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
    ],
  });
};
exports.default = Hero;

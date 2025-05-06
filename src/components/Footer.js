"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var Footer = function () {
  return (0, jsx_runtime_1.jsx)("footer", {
    className: "bg-[#0A0A23] text-white py-8 px-4",
    children: (0, jsx_runtime_1.jsxs)("div", {
      className: "container mx-auto flex flex-col items-center",
      children: [
        (0, jsx_runtime_1.jsx)("img", {
          src: "/lovable-uploads/fa68c49e-02d3-4f17-b128-a5b8f6f1665b.png",
          alt: "Allora AI Logo",
          className: "h-16 mb-4",
        }),
        (0, jsx_runtime_1.jsxs)("p", {
          className: "mb-4",
          children: [
            "\u00A9 ",
            new Date().getFullYear(),
            " Allora AI. All Rights Reserved.",
          ],
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "flex flex-wrap justify-center gap-2 sm:gap-4",
          children: [
            (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
              to: "/legal/terms-of-service",
              className: "text-[#63B3ED] hover:underline",
              children: "Terms",
            }),
            (0, jsx_runtime_1.jsx)("span", {
              className: "text-white",
              children: "|",
            }),
            (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
              to: "/legal/privacy-policy",
              className: "text-[#63B3ED] hover:underline",
              children: "Privacy",
            }),
            (0, jsx_runtime_1.jsx)("span", {
              className: "text-white",
              children: "|",
            }),
            (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
              to: "/legal/cookies",
              className: "text-[#63B3ED] hover:underline",
              children: "Cookies",
            }),
            (0, jsx_runtime_1.jsx)("span", {
              className: "text-white",
              children: "|",
            }),
            (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
              to: "/legal/compliance",
              className: "text-[#63B3ED] hover:underline",
              children: "Compliance",
            }),
            (0, jsx_runtime_1.jsx)("span", {
              className: "text-white",
              children: "|",
            }),
            (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
              to: "/legal/refund-policy",
              className: "text-[#63B3ED] hover:underline",
              children: "Refund Policy",
            }),
            (0, jsx_runtime_1.jsx)("span", {
              className: "text-white",
              children: "|",
            }),
            (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
              to: "/legal/messaging-consent",
              className: "text-[#63B3ED] hover:underline",
              children: "Messaging Consent",
            }),
          ],
        }),
      ],
    }),
  });
};
exports.default = Footer;

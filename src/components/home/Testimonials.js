"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
// Lazy load testimonial component
var LazyTestimonial = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("@/components/home/Testimonial");
  });
});
// Testimonial data
var testimonials = [
  {
    quote:
      "Allora AI transformed our business strategy overnight. The executive insights were game-changing for our growth.",
    author: "Sarah Johnson",
    role: "CEO, TechInnovate",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    quote:
      "Working with the AI executive team feels like having a board of directors in my pocket. Incredible value for startups.",
    author: "Michael Chen",
    role: "Founder, Growth Ventures",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e",
  },
];
var Testimonials = function () {
  return (0, jsx_runtime_1.jsx)("div", {
    className: "w-full bg-secondary/30 py-16",
    children: (0, jsx_runtime_1.jsxs)("div", {
      className: "container mx-auto px-4",
      children: [
        (0, jsx_runtime_1.jsx)("h2", {
          className: "text-3xl md:text-4xl font-bold mb-12 text-center",
          children: "What Our Clients Say",
        }),
        (0, jsx_runtime_1.jsx)("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto",
          children: testimonials.map(function (testimonial, index) {
            return (0, jsx_runtime_1.jsx)(
              react_1.Suspense,
              {
                fallback: (0, jsx_runtime_1.jsx)("div", {
                  className:
                    "bg-card p-6 rounded-lg border border-border animate-pulse h-48",
                }),
                children: (0, jsx_runtime_1.jsx)(LazyTestimonial, {
                  quote: testimonial.quote,
                  author: testimonial.author,
                  role: testimonial.role,
                  avatar: testimonial.avatar,
                  delay: index * 0.2,
                }),
              },
              index,
            );
          }),
        }),
      ],
    }),
  });
};
exports.default = Testimonials;

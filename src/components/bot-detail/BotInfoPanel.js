"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotInfoPanel = BotInfoPanel;
var jsx_runtime_1 = require("react/jsx-runtime");
var badge_1 = require("@/components/ui/badge");
function BotInfoPanel(_a) {
  var description = _a.description,
    specialties = _a.specialties,
    expertise = _a.expertise;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        children: [
          (0, jsx_runtime_1.jsx)("h3", {
            className: "text-lg font-medium mb-2",
            children: "About",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-muted-foreground",
            children: description,
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        children: [
          (0, jsx_runtime_1.jsx)("h3", {
            className: "text-lg font-medium mb-2",
            children: "Expertise",
          }),
          (0, jsx_runtime_1.jsx)(badge_1.Badge, {
            variant: "outline",
            className: "bg-primary/10 text-primary",
            children: expertise,
          }),
        ],
      }),
      specialties &&
        specialties.length > 0 &&
        (0, jsx_runtime_1.jsxs)("div", {
          children: [
            (0, jsx_runtime_1.jsx)("h3", {
              className: "text-lg font-medium mb-2",
              children: "Specialties",
            }),
            (0, jsx_runtime_1.jsx)("div", {
              className: "flex flex-wrap gap-2",
              children: specialties.map(function (specialty, index) {
                return (0, jsx_runtime_1.jsx)(
                  badge_1.Badge,
                  {
                    variant: "outline",
                    className: "bg-secondary/10",
                    children: specialty,
                  },
                  index,
                );
              }),
            }),
          ],
        }),
    ],
  });
}
exports.default = BotInfoPanel;

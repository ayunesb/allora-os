"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutiveTeamCarousel = ExecutiveTeamCarousel;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var carousel_1 = require("@/components/ui/carousel");
var avatar_1 = require("@/components/ui/avatar");
var badge_1 = require("@/components/ui/badge");
function ExecutiveTeamCarousel(_a) {
  var executives = _a.executives;
  return (0, jsx_runtime_1.jsxs)(carousel_1.Carousel, {
    className: "w-full",
    children: [
      (0, jsx_runtime_1.jsx)(carousel_1.CarouselContent, {
        children: executives.map(function (executive) {
          return (0, jsx_runtime_1.jsx)(
            carousel_1.CarouselItem,
            {
              className: "md:basis-1/2 lg:basis-1/3",
              children: (0, jsx_runtime_1.jsx)(card_1.Card, {
                className: "border",
                children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                  className: "flex flex-col items-center p-4 pt-6 text-center",
                  children: [
                    (0, jsx_runtime_1.jsxs)(avatar_1.Avatar, {
                      className: "h-16 w-16 mb-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, {
                          src: executive.avatar,
                          alt: executive.name,
                        }),
                        (0, jsx_runtime_1.jsx)(avatar_1.AvatarFallback, {
                          className: "bg-primary/10 text-primary",
                          children: executive.name
                            .split(" ")
                            .map(function (n) {
                              return n[0];
                            })
                            .join(""),
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)("div", {
                      className: "font-medium text-lg",
                      children: executive.name,
                    }),
                    (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                      variant: "outline",
                      className: "mt-1 mb-2",
                      children: executive.title,
                    }),
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "text-xs text-muted-foreground",
                      children: executive.specialty,
                    }),
                  ],
                }),
              }),
            },
            executive.id,
          );
        }),
      }),
      (0, jsx_runtime_1.jsx)(carousel_1.CarouselPrevious, {
        className: "left-2",
      }),
      (0, jsx_runtime_1.jsx)(carousel_1.CarouselNext, { className: "right-2" }),
    ],
  });
}

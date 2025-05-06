"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var badge_1 = require("@/components/ui/badge");
var BotInfoPanel = function (_a) {
  var bot = _a.bot,
    propDescription = _a.description,
    propSpecialties = _a.specialties,
    propExpertise = _a.expertise;
  // Use props if provided, otherwise use bot object
  var description =
    propDescription ||
    (bot === null || bot === void 0 ? void 0 : bot.description);
  var specialties =
    propSpecialties ||
    (bot === null || bot === void 0 ? void 0 : bot.specialties);
  var expertise =
    propExpertise || (bot === null || bot === void 0 ? void 0 : bot.expertise);
  if (!bot && !description && !expertise) {
    return (0, jsx_runtime_1.jsx)(card_1.Card, {
      className: "h-full",
      children: (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        className: "pt-6",
        children: (0, jsx_runtime_1.jsx)("div", {
          className: "text-center text-muted-foreground",
          children: "No bot information available",
        }),
      }),
    });
  }
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "h-full",
    children: [
      (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
        className: "pb-3",
        children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
          className: "text-lg font-medium",
          children: (bot === null || bot === void 0 ? void 0 : bot.name)
            ? "About ".concat(bot.name)
            : "Bot Information",
        }),
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "space-y-4",
          children: [
            (bot === null || bot === void 0 ? void 0 : bot.avatar) &&
              (0, jsx_runtime_1.jsx)("div", {
                className: "flex justify-center",
                children: (0, jsx_runtime_1.jsx)("div", {
                  className: "relative h-20 w-20 rounded-full overflow-hidden",
                  children: (0, jsx_runtime_1.jsx)("img", {
                    src: bot.avatar,
                    alt: bot.name,
                    className: "object-cover w-full h-full",
                  }),
                }),
              }),
            description &&
              (0, jsx_runtime_1.jsxs)("div", {
                children: [
                  (0, jsx_runtime_1.jsx)("h3", {
                    className: "text-sm font-medium mb-1",
                    children: "About",
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-sm text-muted-foreground",
                    children: description,
                  }),
                ],
              }),
            expertise &&
              (0, jsx_runtime_1.jsxs)("div", {
                children: [
                  (0, jsx_runtime_1.jsx)("h3", {
                    className: "text-sm font-medium mb-1",
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
                    className: "text-sm font-medium mb-2",
                    children: "Specialties",
                  }),
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "flex flex-wrap gap-2",
                    children: specialties.map(function (specialty, index) {
                      return (0, jsx_runtime_1.jsx)(
                        badge_1.Badge,
                        { variant: "outline", children: specialty },
                        index,
                      );
                    }),
                  }),
                ],
              }),
          ],
        }),
      }),
    ],
  });
};
exports.default = BotInfoPanel;

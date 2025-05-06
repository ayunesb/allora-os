"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ExecutiveCards;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
// Executive bots data
var executiveBots = {
  ceo: ["Elon Musk", "Jeff Bezos", "Satya Nadella", "Tim Cook"],
  cfo: ["Warren Buffett", "Ruth Porat"],
  cio: ["Steve Jobs", "Bob Lord"],
  cmo: ["Antonio Lucio", "Keith Weed"],
  chro: ["Pat Wadors", "Laszlo Bock"],
  strategy: ["Clayton Christensen", "Reed Hastings"],
};
function ExecutiveCards() {
  return (0, jsx_runtime_1.jsx)("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
    children: Object.entries(executiveBots).map(function (_a) {
      var role = _a[0],
        names = _a[1];
      return (0, jsx_runtime_1.jsxs)(
        card_1.Card,
        {
          className: "border-primary/10 shadow-md",
          children: [
            (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
              className: "pb-2",
              children: (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center gap-2",
                children: [
                  role === "ceo" &&
                    (0, jsx_runtime_1.jsx)(lucide_react_1.RocketIcon, {
                      className: "h-5 w-5 text-primary",
                    }),
                  role === "strategy" &&
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, {
                      className: "h-5 w-5 text-primary",
                    }),
                  role !== "ceo" &&
                    role !== "strategy" &&
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Brain, {
                      className: "h-5 w-5 text-primary",
                    }),
                  (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                    className: "text-lg capitalize",
                    children: role,
                  }),
                ],
              }),
            }),
            (0, jsx_runtime_1.jsx)(card_1.CardContent, {
              children: (0, jsx_runtime_1.jsx)("ul", {
                className: "space-y-1",
                children: names.map(function (name) {
                  return (0, jsx_runtime_1.jsx)(
                    "li",
                    { className: "text-muted-foreground", children: name },
                    name,
                  );
                }),
              }),
            }),
          ],
        },
        role,
      );
    }),
  });
}

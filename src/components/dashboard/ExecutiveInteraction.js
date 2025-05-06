"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutiveInteraction = ExecutiveInteraction;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var avatar_1 = require("@/components/ui/avatar");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var react_router_dom_1 = require("react-router-dom");
var AuthContext_1 = require("@/context/AuthContext");
var skeleton_1 = require("@/components/ui/skeleton");
var authCompatibility_1 = require("@/utils/authCompatibility");
function ExecutiveInteraction(_a) {
  var _b;
  var riskAppetite = _a.riskAppetite;
  var navigate = (0, react_router_dom_1.useNavigate)();
  var authContext = (0, AuthContext_1.useAuth)();
  var auth = (0, authCompatibility_1.createAuthCompatibilityLayer)(authContext);
  // Loading state
  if (!auth.profile) {
    return (0, jsx_runtime_1.jsxs)(card_1.Card, {
      className: "bg-primary/5 border-primary/20",
      children: [
        (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
          className: "pb-2",
          children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            className: "text-lg",
            children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
              className: "h-4 w-32",
            }),
          }),
        }),
        (0, jsx_runtime_1.jsx)(card_1.CardContent, {
          children: (0, jsx_runtime_1.jsxs)("div", {
            className:
              "flex flex-col sm:flex-row items-center sm:items-start gap-4",
            children: [
              (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                className: "h-12 w-12 rounded-full",
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-2 w-full",
                children: [
                  (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                    className: "h-4 w-24",
                  }),
                  (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                    className: "h-4 w-full",
                  }),
                  (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                    className: "h-8 w-40 mt-2",
                  }),
                ],
              }),
            ],
          }),
        }),
      ],
    });
  }
  var companyName =
    ((_b = auth.profile) === null || _b === void 0 ? void 0 : _b.company) ||
    "your company";
  // Get appropriate executive and message based on risk appetite
  var getExecutiveInfo = function () {
    switch (riskAppetite) {
      case "low":
        return {
          name: "Financial Advisor",
          message: "Let's develop a conservative growth strategy for ".concat(
            companyName,
            " that minimizes risk while ensuring steady progress.",
          ),
          image: "/executives/financial-advisor.png",
        };
      case "high":
        return {
          name: "Growth Strategist",
          message:
            "I've analyzed your market and have some bold ideas that could significantly accelerate ".concat(
              companyName,
              "'s growth trajectory.",
            ),
          image: "/executives/growth-strategist.png",
        };
      case "medium":
      default:
        return {
          name: "Business Strategist",
          message: "I've been reviewing ".concat(
            companyName,
            "'s position and have some balanced strategies that could help optimize your results.",
          ),
          image: "/executives/business-strategist.png",
        };
    }
  };
  var executiveInfo = getExecutiveInfo();
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "bg-primary/5 border-primary/20",
    children: [
      (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
        className: "pb-2",
        children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
          className: "text-lg",
          children: "Executive Insight",
        }),
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: (0, jsx_runtime_1.jsxs)("div", {
          className:
            "flex flex-col sm:flex-row items-center sm:items-start gap-4",
          children: [
            (0, jsx_runtime_1.jsxs)(avatar_1.Avatar, {
              className: "h-12 w-12 border-2 border-primary/20",
              children: [
                (0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, {
                  src: executiveInfo.image,
                  alt: executiveInfo.name,
                }),
                (0, jsx_runtime_1.jsx)(avatar_1.AvatarFallback, {
                  children: executiveInfo.name.substring(0, 2).toUpperCase(),
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-2 text-center sm:text-left w-full",
              children: [
                (0, jsx_runtime_1.jsx)("h3", {
                  className: "font-semibold",
                  children: executiveInfo.name,
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-sm text-muted-foreground",
                  children: executiveInfo.message,
                }),
                (0, jsx_runtime_1.jsxs)(button_1.Button, {
                  variant: "outline",
                  size: "sm",
                  className: "mt-2 w-full sm:w-auto",
                  onClick: function () {
                    return navigate("/dashboard/debate");
                  },
                  children: [
                    "Start Strategy Session",
                    (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, {
                      className: "ml-2 h-4 w-4",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}

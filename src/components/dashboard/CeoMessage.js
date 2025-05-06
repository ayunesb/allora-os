"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var AuthContext_1 = require("@/context/AuthContext");
var react_router_dom_1 = require("react-router-dom");
var skeleton_1 = require("@/components/ui/skeleton");
var authCompatibility_1 = require("@/utils/authCompatibility");
var CeoMessage = function (_a) {
  var _b, _c;
  var children = _a.children,
    _d = _a.variant,
    variant = _d === void 0 ? "formal" : _d,
    _e = _a.size,
    size = _e === void 0 ? "large" : _e,
    riskAppetite = _a.riskAppetite;
  var authContext = (0, AuthContext_1.useAuth)();
  var auth = (0, authCompatibility_1.createAuthCompatibilityLayer)(authContext);
  var navigate = (0, react_router_dom_1.useNavigate)();
  // Loading state
  if (!auth.profile) {
    return (0, jsx_runtime_1.jsxs)(card_1.Card, {
      className: "border-primary/20",
      children: [
        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
          className:
            "flex flex-col sm:flex-row items-center sm:items-start sm:justify-between pb-2 space-y-2 sm:space-y-0",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-1 text-center sm:text-left",
              children: [
                (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                  className: "h-5 w-48 mx-auto sm:mx-0",
                }),
                (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                  className: "h-4 w-64 mx-auto sm:mx-0",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
              className: "h-8 w-8 rounded-full",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsx)(card_1.CardContent, {
          children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
            className: "h-20 w-full",
          }),
        }),
        (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
          children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
            className: "h-8 w-36 ml-auto",
          }),
        }),
      ],
    });
  }
  // Get company name from profile or use default
  var companyName =
    ((_b = auth.profile) === null || _b === void 0 ? void 0 : _b.company) ||
    "your company";
  var industry =
    ((_c = auth.profile) === null || _c === void 0 ? void 0 : _c.industry) ||
    "your industry";
  // Define dynamic content based on risk appetite
  var getMessageContent = function () {
    switch (riskAppetite) {
      case "low":
        return {
          title: "Conservative Strategy Overview",
          message: "We've developed a conservative approach for "
            .concat(companyName, " focusing on stable, sustainable growth in ")
            .concat(
              industry,
              ". Our analysis shows potential for measured expansion while minimizing exposure to market volatility.",
            ),
          icon: (0, jsx_runtime_1.jsx)(lucide_react_1.TrendingDown, {
            className: "h-5 w-5 text-risk-low",
          }),
          cardClass: "border-risk-low bg-risk-low",
          titleClass: "text-risk-low",
          textClass: "text-risk-low-DEFAULT dark:text-risk-low-dark",
          buttonClass: "text-white bg-risk-low-DEFAULT hover:bg-risk-low-dark",
        };
      case "high":
        return {
          title: "Aggressive Growth Strategy",
          message:
            "Our analysis indicates several high-potential opportunities for "
              .concat(companyName, " in ")
              .concat(
                industry,
                ". While these approaches carry higher risk, they also offer significantly greater returns and market disruption potential.",
              ),
          icon: (0, jsx_runtime_1.jsx)(lucide_react_1.TrendingUp, {
            className: "h-5 w-5 text-risk-high",
          }),
          cardClass: "border-risk-high bg-risk-high",
          titleClass: "text-risk-high",
          textClass: "text-risk-high-DEFAULT dark:text-risk-high-dark",
          buttonClass:
            "text-white bg-risk-high-DEFAULT hover:bg-risk-high-dark",
        };
      case "medium":
      default:
        return {
          title: "Balanced Strategy Overview",
          message: "We've analyzed "
            .concat(companyName, "'s position in ")
            .concat(
              industry,
              " and developed a balanced approach combining stable growth with strategic opportunities. This provides a mix of reliable returns and potential for breakthrough results.",
            ),
          icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Lightbulb, {
            className: "h-5 w-5 text-risk-medium",
          }),
          cardClass: "border-risk-medium bg-risk-medium",
          titleClass: "text-risk-medium",
          textClass: "text-risk-medium-DEFAULT dark:text-risk-medium-dark",
          buttonClass:
            "text-white bg-risk-medium-DEFAULT hover:bg-risk-medium-dark",
        };
    }
  };
  var content = getMessageContent();
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: content.cardClass,
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        className:
          "flex flex-col sm:flex-row items-center sm:items-start sm:justify-between pb-2 space-y-2 sm:space-y-0",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-1 text-center sm:text-left",
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                className: "text-lg ".concat(content.titleClass),
                children: content.title,
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                className: "".concat(content.textClass),
                children:
                  "AI-generated strategy based on your business profile",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className:
              "h-8 w-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center",
            children: content.icon,
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: (0, jsx_runtime_1.jsx)("p", {
          className: "text-sm ".concat(content.textClass),
          children: content.message,
        }),
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
        className: "flex justify-center sm:justify-end",
        children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
          variant: "ghost",
          size: "sm",
          className: "flex items-center gap-1 ".concat(content.buttonClass),
          onClick: function () {
            return navigate("/dashboard/strategy");
          },
          children: [
            "View Full Strategy",
            (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, {
              className: "h-4 w-4",
            }),
          ],
        }),
      }),
    ],
  });
};

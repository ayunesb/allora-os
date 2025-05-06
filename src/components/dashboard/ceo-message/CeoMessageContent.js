"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CeoMessageContent = CeoMessageContent;
var jsx_runtime_1 = require("react/jsx-runtime");
var AuthContext_1 = require("@/context/AuthContext");
var badge_1 = require("@/components/ui/badge");
var useCeoSelection_1 = require("@/hooks/useCeoSelection");
var useCeoMessage_1 = require("@/hooks/useCeoMessage");
var authCompatibility_1 = require("@/utils/authCompatibility");
function CeoMessageContent(_a) {
  var _b, _c, _d;
  var riskAppetite = _a.riskAppetite;
  var authContext = (0, AuthContext_1.useAuth)();
  var auth = (0, authCompatibility_1.createAuthCompatibilityLayer)(authContext);
  var selectedCeo = (0, useCeoSelection_1.useCeoSelection)().selectedCeo;
  var _e = (0, useCeoMessage_1.useCeoMessage)(
      riskAppetite,
      ((_b = auth.profile) === null || _b === void 0 ? void 0 : _b.industry) ||
        undefined,
      ((_c = auth.profile) === null || _c === void 0 ? void 0 : _c.company) ||
        undefined,
    ),
    message = _e.message,
    isLoading = _e.isLoading;
  var companyName =
    ((_d = auth.profile) === null || _d === void 0 ? void 0 : _d.company) ||
    "Your Company";
  if (isLoading) {
    return (0, jsx_runtime_1.jsxs)("div", {
      className: "animate-pulse space-y-4",
      children: [
        (0, jsx_runtime_1.jsx)("div", {
          className: "h-4 bg-muted rounded w-3/4",
        }),
        (0, jsx_runtime_1.jsx)("div", {
          className: "h-4 bg-muted rounded w-full",
        }),
        (0, jsx_runtime_1.jsx)("div", {
          className: "h-4 bg-muted rounded w-5/6",
        }),
        (0, jsx_runtime_1.jsx)("div", {
          className: "h-4 bg-muted rounded w-3/4",
        }),
      ],
    });
  }
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-4",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "prose prose-sm dark:prose-invert max-w-none",
        children: [
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-base",
            children: message.greeting,
          }),
          (0, jsx_runtime_1.jsx)("p", { children: message.strategicOverview }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "my-4 flex flex-wrap gap-2",
            children: message.tags.map(function (tag, index) {
              return (0, jsx_runtime_1.jsx)(
                badge_1.Badge,
                {
                  variant: "outline",
                  className: "bg-background/50",
                  children: tag,
                },
                index,
              );
            }),
          }),
          (0, jsx_runtime_1.jsx)("p", { children: message.actionSteps }),
          (0, jsx_runtime_1.jsx)("p", { children: message.closingStatement }),
        ],
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "pt-4 border-t border-border/40",
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "flex items-center justify-between",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-center gap-2",
              children: [
                (0, jsx_runtime_1.jsx)("span", {
                  className: "text-sm font-medium",
                  children: selectedCeo.name,
                }),
                (0, jsx_runtime_1.jsxs)("span", {
                  className: "text-xs text-muted-foreground",
                  children: ["Virtual CEO for ", companyName],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)("div", {
              className: "text-xs text-muted-foreground",
              children: new Date().toLocaleDateString(),
            }),
          ],
        }),
      }),
    ],
  });
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CeoMessageFooter = CeoMessageFooter;
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var useCeoFeedback_1 = require("@/hooks/useCeoFeedback");
function CeoMessageFooter() {
  var _a = (0, useCeoFeedback_1.useCeoFeedback)(),
    provideFeedback = _a.provideFeedback,
    isSubmitting = _a.isSubmitting;
  var handleFeedback = function (isPositive) {
    provideFeedback(isPositive);
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "px-6 py-4 border-t flex justify-between items-center",
    children: [
      (0, jsx_runtime_1.jsx)("span", {
        className: "text-sm text-muted-foreground",
        children: "Was this message helpful?",
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex gap-2",
        children: [
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            variant: "outline",
            size: "sm",
            onClick: function () {
              return handleFeedback(true);
            },
            disabled: isSubmitting,
            className:
              "text-green-500 hover:text-green-600 hover:bg-green-100/10",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.ThumbsUp, {
                className: "mr-1 h-4 w-4",
              }),
              "Yes",
            ],
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            variant: "outline",
            size: "sm",
            onClick: function () {
              return handleFeedback(false);
            },
            disabled: isSubmitting,
            className: "text-red-500 hover:text-red-600 hover:bg-red-100/10",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.ThumbsDown, {
                className: "mr-1 h-4 w-4",
              }),
              "No",
            ],
          }),
        ],
      }),
    ],
  });
}

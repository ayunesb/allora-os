"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WelcomeVideo = WelcomeVideo;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var AuthContext_1 = require("@/context/AuthContext");
function WelcomeVideo() {
  var _a = (0, react_1.useState)(false),
    dismissed = _a[0],
    setDismissed = _a[1];
  var _b = (0, react_1.useState)(true),
    muted = _b[0],
    setMuted = _b[1];
  var profile = (0, AuthContext_1.useAuth)().profile;
  // Check if this is the user's first visit
  var _c = (0, react_1.useState)(false),
    isFirstVisit = _c[0],
    setIsFirstVisit = _c[1];
  (0, react_1.useEffect)(function () {
    // Check local storage to see if this is the first dashboard visit
    var hasVisitedBefore = localStorage.getItem("hasVisitedDashboard");
    if (!hasVisitedBefore) {
      setIsFirstVisit(true);
      localStorage.setItem("hasVisitedDashboard", "true");
    }
  }, []);
  // Don't show if not first visit or already dismissed
  if (!isFirstVisit || dismissed) {
    return null;
  }
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "border-primary/10 overflow-hidden",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        className: "pb-0 flex flex-row justify-between items-start space-y-0",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                className: "text-xl mb-1",
                children: "Welcome to Allora AI",
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children:
                  "Watch this quick intro to get started with your AI executive team",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            variant: "ghost",
            size: "icon",
            className: "mt-0",
            onClick: function () {
              return setDismissed(true);
            },
            children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, {
              className: "h-5 w-5",
            }),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        className: "p-4",
        children: (0, jsx_runtime_1.jsxs)("div", {
          className:
            "relative rounded-md overflow-hidden bg-black aspect-video",
          children: [
            (0, jsx_runtime_1.jsx)("div", {
              className: "absolute inset-0 flex items-center justify-center",
              children: (0, jsx_runtime_1.jsx)(lucide_react_1.Play, {
                className: "h-16 w-16 text-white opacity-80",
              }),
            }),
            (0, jsx_runtime_1.jsx)("div", {
              className: "absolute bottom-4 right-4 flex gap-2",
              children: (0, jsx_runtime_1.jsx)(button_1.Button, {
                size: "icon",
                variant: "ghost",
                className: "bg-black/50 text-white h-8 w-8 rounded-full",
                onClick: function () {
                  return setMuted(!muted);
                },
                children: muted
                  ? (0, jsx_runtime_1.jsx)(lucide_react_1.VolumeX, {
                      className: "h-4 w-4",
                    })
                  : (0, jsx_runtime_1.jsx)(lucide_react_1.Volume2, {
                      className: "h-4 w-4",
                    }),
              }),
            }),
            (0, jsx_runtime_1.jsx)("div", {
              className:
                "w-full h-full bg-gradient-to-r from-gray-900 to-gray-800",
              children: (0, jsx_runtime_1.jsx)("div", {
                className:
                  "flex items-center justify-center h-full text-white text-opacity-70 text-sm",
                children: "Welcome video placeholder",
              }),
            }),
          ],
        }),
      }),
    ],
  });
}
exports.default = WelcomeVideo;

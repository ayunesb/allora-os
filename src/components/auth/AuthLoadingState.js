"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthLoadingState = AuthLoadingState;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
function AuthLoadingState() {
  var _a = (0, react_1.useState)(false),
    longLoading = _a[0],
    setLongLoading = _a[1];
  (0, react_1.useEffect)(function () {
    // If loading takes more than 5 seconds, show additional message
    var timer = setTimeout(function () {
      setLongLoading(true);
    }, 5000);
    return function () {
      return clearTimeout(timer);
    };
  }, []);
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "flex flex-col items-center justify-center h-screen p-4",
    children: [
      (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
        className: "h-8 w-8 animate-spin text-primary mb-4",
      }),
      (0, jsx_runtime_1.jsx)("p", {
        className: "text-muted-foreground mb-2",
        children: "Loading your account information...",
      }),
      longLoading &&
        (0, jsx_runtime_1.jsxs)("div", {
          className: "mt-6 text-center max-w-md",
          children: [
            (0, jsx_runtime_1.jsx)("p", {
              className: "text-sm text-muted-foreground mb-4",
              children:
                "This is taking longer than expected. If the page doesn't load in a few seconds, try refreshing the page.",
            }),
            (0, jsx_runtime_1.jsx)(button_1.Button, {
              variant: "outline",
              size: "sm",
              onClick: function () {
                return window.location.reload();
              },
              children: "Refresh Page",
            }),
          ],
        }),
    ],
  });
}

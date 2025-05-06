"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CheckoutSuccess;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
var card_1 = require("@/components/ui/card");
var framer_motion_1 = require("framer-motion");
function CheckoutSuccess() {
  var navigate = (0, react_router_dom_1.useNavigate)();
  var searchParams = (0, react_router_dom_1.useSearchParams)()[0];
  var sessionId = searchParams.get("session_id");
  var returnToDashboard = function () {
    navigate("/dashboard");
  };
  react_1.default.useEffect(
    function () {
      if (sessionId) {
        sonner_1.toast.success("Payment completed successfully!");
      }
    },
    [sessionId],
  );
  return (0, jsx_runtime_1.jsx)("div", {
    className: "min-h-screen bg-background flex flex-col",
    children: (0, jsx_runtime_1.jsx)("div", {
      className:
        "container mx-auto px-4 py-16 flex flex-col items-center justify-center flex-1",
      children: (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5 },
        className: "w-full max-w-md",
        children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
          className: "border-primary/20 shadow-lg",
          children: [
            (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
              className: "text-center pb-2",
              children: [
                (0, jsx_runtime_1.jsx)("div", {
                  className: "flex justify-center mb-4",
                  children: (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, {
                    className: "h-16 w-16 text-green-500",
                  }),
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                  className: "text-2xl",
                  children: "Payment Successful!",
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                  children:
                    "Thank you for your purchase. Your transaction has been completed successfully.",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)(card_1.CardContent, {
              className: "pt-4",
              children: (0, jsx_runtime_1.jsxs)("div", {
                className: "bg-muted p-4 rounded-md space-y-2 text-sm",
                children: [
                  (0, jsx_runtime_1.jsxs)("p", {
                    children: [
                      "Your payment confirmation ID: ",
                      (0, jsx_runtime_1.jsx)("span", {
                        className: "font-mono text-xs",
                        children: sessionId || "N/A",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    children:
                      "A confirmation email has been sent to your registered email address.",
                  }),
                ],
              }),
            }),
            (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
              className: "flex flex-col gap-4 pt-6",
              children: [
                (0, jsx_runtime_1.jsxs)(button_1.Button, {
                  onClick: returnToDashboard,
                  className: "w-full",
                  children: [
                    "Return to Dashboard",
                    (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, {
                      className: "ml-2 h-4 w-4",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-center text-sm text-muted-foreground",
                  children:
                    "If you have any questions about your purchase, please contact our support team.",
                }),
              ],
            }),
          ],
        }),
      }),
    }),
  });
}

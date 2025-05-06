"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SignupLayout;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
function SignupLayout(_a) {
  var children = _a.children;
  var navigate = (0, react_router_dom_1.useNavigate)();
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "min-h-screen bg-background flex flex-col",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex items-center justify-between p-6 border-b",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex items-center gap-2",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.RocketIcon, {
                className: "h-6 w-6 text-primary",
              }),
              (0, jsx_runtime_1.jsx)("span", {
                className: "text-xl font-bold",
                children: "Allora AI",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)("div", {
            children: (0, jsx_runtime_1.jsx)(button_1.Button, {
              variant: "ghost",
              onClick: function () {
                return navigate("/login");
              },
              children: "Login",
            }),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className:
          "flex-1 container max-w-4xl mx-auto px-4 py-12 flex items-center justify-center",
        children: children,
      }),
    ],
  });
}

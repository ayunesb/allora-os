"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ExecutiveDetailPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var react_helmet_async_1 = require("react-helmet-async");
function ExecutiveDetailPage() {
  var name = (0, react_router_dom_1.useParams)().name;
  var navigate = (0, react_router_dom_1.useNavigate)();
  var goBack = function () {
    navigate("/dashboard/executives");
  };
  return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
    children: [
      (0, jsx_runtime_1.jsx)(react_helmet_async_1.Helmet, {
        children: (0, jsx_runtime_1.jsxs)("title", {
          children: [name, " | Executive Detail | Allora AI"],
        }),
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "container mx-auto py-8",
        children: [
          (0, jsx_runtime_1.jsx)("button", {
            onClick: goBack,
            className: "mb-4 text-blue-500 hover:underline",
            children: "\u2190 Back to Executives",
          }),
          (0, jsx_runtime_1.jsxs)("h1", {
            className: "text-3xl font-bold mb-6",
            children: [name, " Executive Profile"],
          }),
          (0, jsx_runtime_1.jsx)("p", {
            children:
              "This page is under development. Executive profiles will be available soon.",
          }),
        ],
      }),
    ],
  });
}

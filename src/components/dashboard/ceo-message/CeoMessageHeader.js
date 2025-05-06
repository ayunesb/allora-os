"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CeoMessageHeader = CeoMessageHeader;
var jsx_runtime_1 = require("react/jsx-runtime");
var avatar_1 = require("@/components/ui/avatar");
var AuthContext_1 = require("@/context/AuthContext");
var useCeoSelection_1 = require("@/hooks/useCeoSelection");
var authCompatibility_1 = require("@/utils/authCompatibility");
function CeoMessageHeader() {
  var _a;
  var authContext = (0, AuthContext_1.useAuth)();
  var auth = (0, authCompatibility_1.createAuthCompatibilityLayer)(authContext);
  var selectedCeo = (0, useCeoSelection_1.useCeoSelection)().selectedCeo;
  var companyName =
    ((_a = auth.profile) === null || _a === void 0 ? void 0 : _a.company) ||
    "Your Company";
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "flex items-start gap-4",
    children: [
      (0, jsx_runtime_1.jsxs)(avatar_1.Avatar, {
        className: "h-12 w-12 border-2 border-primary/20",
        children: [
          (0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, {
            src: "/lovable-uploads/012d3495-8ef4-4f5e-b9b4-cbb461c250d0.png",
            alt: selectedCeo.name,
          }),
          (0, jsx_runtime_1.jsx)(avatar_1.AvatarFallback, {
            className: "bg-primary/10",
            children: selectedCeo.name.charAt(0),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        children: [
          (0, jsx_runtime_1.jsxs)("h3", {
            className: "text-xl font-semibold mb-1 flex items-center",
            children: [
              "Message from Your Virtual CEO",
              (0, jsx_runtime_1.jsx)("span", {
                className:
                  "ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full",
                children: "AI Generated",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("p", {
            className: "text-sm text-muted-foreground",
            children: [
              "Personalized strategic guidance for ",
              companyName,
              " from ",
              selectedCeo.name,
              ", your AI Executive",
            ],
          }),
        ],
      }),
    ],
  });
}

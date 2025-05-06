"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Debate;
var jsx_runtime_1 = require("react/jsx-runtime");
var tabs_1 = require("@/components/ui/tabs");
var DebateContainer_1 = require("@/components/debate/DebateContainer");
var AIChat_1 = require("./AIChat");
function Debate() {
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-8",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        children: [
          (0, jsx_runtime_1.jsx)("h1", {
            className: "text-3xl font-bold tracking-tight",
            children: "Executive Debate",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-muted-foreground mt-2",
            children:
              "Generate strategic insights through a simulated debate among AI executives",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
        defaultValue: "debate",
        className: "space-y-4",
        children: [
          (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
            children: [
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "debate",
                children: "Debate Simulator",
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "chat",
                children: "Executive Chat",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "debate",
            className: "space-y-4",
            children: (0, jsx_runtime_1.jsx)(DebateContainer_1.default, {}),
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "chat",
            className: "space-y-4",
            children: (0, jsx_runtime_1.jsx)(AIChat_1.default, {}),
          }),
        ],
      }),
    ],
  });
}

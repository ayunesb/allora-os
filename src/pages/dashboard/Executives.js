"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Executives;
var jsx_runtime_1 = require("react/jsx-runtime");
var page_title_1 = require("@/components/ui/page-title");
var ExecutiveBoard_1 = require("@/components/ExecutiveBoard");
function Executives() {
  var executives = [
    {
      id: "1",
      name: "AI CEO",
      role: "Chief Executive Officer",
      avatar: "/assets/avatars/ai-ceo.png",
      status: "active",
      specialties: ["Strategy", "Leadership"],
      lastActivity: "Today at 10:30 AM",
    },
    {
      id: "2",
      name: "AI CMO",
      role: "Chief Marketing Officer",
      avatar: "/assets/avatars/ai-cmo.png",
      status: "active",
      specialties: ["Marketing", "Brand Strategy"],
      lastActivity: "Today at 9:45 AM",
    },
    {
      id: "3",
      name: "AI CFO",
      role: "Chief Financial Officer",
      avatar: "/assets/avatars/ai-cfo.png",
      status: "learning",
      specialties: ["Finance", "Budgeting"],
      lastActivity: "Yesterday at 4:15 PM",
    },
  ];
  var handleSelectExecutive = function (executiveId) {
    console.log("Selected executive: ".concat(executiveId));
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto px-4",
    children: [
      (0, jsx_runtime_1.jsx)(page_title_1.PageTitle, {
        title: "Executive Team",
        description: "Your AI executive team",
        children: "Executive Team",
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "my-8",
        children: [
          (0, jsx_runtime_1.jsx)("h2", {
            className: "text-xl font-semibold mb-4",
            children: "Your AI Executive Team",
          }),
          (0, jsx_runtime_1.jsx)(ExecutiveBoard_1.default, {
            executives: executives,
            onSelectExecutive: handleSelectExecutive,
          }),
          (0, jsx_runtime_1.jsx)("button", {
            onClick: handleSelectExecutive,
            children: "View Executive",
          }),
        ],
      }),
    ],
  });
}

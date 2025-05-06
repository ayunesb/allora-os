"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AcademyIndex;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var dashboard_breadcrumb_1 = require("@/components/ui/dashboard-breadcrumb");
var page_title_1 = require("@/components/ui/page-title");
var lucide_react_1 = require("lucide-react");
function AcademyIndex() {
  var _a = (0, react_1.useState)(false),
    isReady = _a[0],
    setIsReady = _a[1];
  (0, react_1.useEffect)(function () {
    // Simulate loading content
    var timer = setTimeout(function () {
      setIsReady(true);
    }, 500);
    return function () {
      return clearTimeout(timer);
    };
  }, []);
  var navigateToCourse = function () {
    // Navigation logic here
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container px-4 py-6",
    children: [
      (0, jsx_runtime_1.jsx)(dashboard_breadcrumb_1.DashboardBreadcrumb, {
        rootPath: "/academy",
        rootLabel: "Academy",
        rootIcon: (0, jsx_runtime_1.jsx)(lucide_react_1.GraduationCap, {
          className: "h-4 w-4",
        }),
      }),
      (0, jsx_runtime_1.jsx)(page_title_1.PageTitle, {
        children: "Academy Content",
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "grid gap-6",
        children: [
          isReady
            ? (0, jsx_runtime_1.jsx)("p", {
                children: "Academy content loaded successfully!",
              })
            : (0, jsx_runtime_1.jsx)("p", {
                children: "Loading academy content...",
              }),
          (0, jsx_runtime_1.jsx)("a", {
            href: "/academy/course",
            onClick: function (e) {
              e.preventDefault();
              navigateToCourse();
            },
            children: "Go to Course",
          }),
        ],
      }),
    ],
  });
}

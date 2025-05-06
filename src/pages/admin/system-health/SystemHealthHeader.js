"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SystemHealthHeader;
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("@/components/ui/button");
var typography_1 = require("@/components/ui/typography");
var lucide_react_1 = require("lucide-react");
var react_router_dom_1 = require("react-router-dom");
function SystemHealthHeader() {
  var navigate = (0, react_router_dom_1.useNavigate)();
  return (0, jsx_runtime_1.jsxs)("div", {
    className:
      "flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex items-center gap-2",
        children: [
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            variant: "outline",
            size: "icon",
            onClick: function () {
              return navigate("/admin");
            },
            className: "h-8 w-8",
            children: (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowLeft, {
              className: "h-4 w-4",
            }),
          }),
          (0, jsx_runtime_1.jsx)(typography_1.TypographyH1, {
            children: "System Health",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex flex-wrap gap-2",
        children: [
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            variant: "outline",
            size: "sm",
            className: "gap-1",
            onClick: function () {
              return window.location.reload();
            },
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                className: "h-4 w-4",
              }),
              "Refresh Status",
            ],
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            variant: "outline",
            size: "sm",
            className: "gap-1",
            onClick: function () {
              return navigate("/admin/diagnostics");
            },
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
                className: "h-4 w-4",
              }),
              "Run Diagnostics",
            ],
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            variant: "default",
            size: "sm",
            className: "gap-1",
            onClick: function () {
              var data = {
                timestamp: new Date().toISOString(),
                status: "healthy",
                services: {
                  database: "operational",
                  api: "operational",
                  storage: "operational",
                },
              };
              var blob = new Blob([JSON.stringify(data, null, 2)], {
                type: "application/json",
              });
              var url = URL.createObjectURL(blob);
              var a = document.createElement("a");
              a.href = url;
              a.download = "system-health-report-".concat(
                new Date().toISOString().split("T")[0],
                ".json",
              );
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            },
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Download, {
                className: "h-4 w-4",
              }),
              "Export Report",
            ],
          }),
        ],
      }),
    ],
  });
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunAuditButton = RunAuditButton;
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("@/components/ui/button");
var react_router_dom_1 = require("react-router-dom");
var lucide_react_1 = require("lucide-react");
function RunAuditButton() {
  var navigate = (0, react_router_dom_1.useNavigate)();
  var handleRunAudit = function () {
    navigate("/admin/run-audit");
  };
  return (0, jsx_runtime_1.jsxs)(button_1.Button, {
    onClick: handleRunAudit,
    className: "gap-2",
    variant: "outline",
    children: [
      (0, jsx_runtime_1.jsx)(lucide_react_1.PlayIcon, { className: "h-4 w-4" }),
      "Run Full System Audit",
    ],
  });
}

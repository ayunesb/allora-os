"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ComplianceUpdateNotification;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var ComplianceContext_1 = require("@/context/ComplianceContext");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
function ComplianceUpdateNotification(_a) {
  var className = _a.className;
  var _b = (0, ComplianceContext_1.useCompliance)(),
    pendingUpdates = _b.pendingUpdates,
    applyAllUpdates = _b.applyAllUpdates,
    isApplyingUpdate = _b.isApplyingUpdate;
  var navigate = (0, react_router_dom_1.useNavigate)();
  // We only show this component if there are pending updates
  if (pendingUpdates.length === 0) return null;
  return (0, jsx_runtime_1.jsx)("div", {
    className:
      "bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md p-4 ".concat(
        className,
      ),
    children: (0, jsx_runtime_1.jsxs)("div", {
      className: "flex items-start",
      children: [
        (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
          className: "h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0",
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "flex-1",
          children: [
            (0, jsx_runtime_1.jsx)("h4", {
              className: "font-medium text-amber-800 dark:text-amber-300",
              children: "Compliance Updates Available",
            }),
            (0, jsx_runtime_1.jsx)("p", {
              className: "text-sm text-amber-700 dark:text-amber-400 mt-1",
              children: ""
                .concat(pendingUpdates.length, " document")
                .concat(pendingUpdates.length > 1 ? "s" : "", " require")
                .concat(
                  pendingUpdates.length === 1 ? "s" : "",
                  " updates to stay compliant with the latest regulatory changes.",
                ),
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "mt-3 flex space-x-3",
              children: [
                (0, jsx_runtime_1.jsx)(button_1.Button, {
                  variant: "outline",
                  size: "sm",
                  className:
                    "border-amber-300 text-amber-700 hover:bg-amber-100 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-900/30",
                  onClick: function () {
                    return navigate("/compliance/reports");
                  },
                  children: "View Details",
                }),
                (0, jsx_runtime_1.jsx)(button_1.Button, {
                  size: "sm",
                  className: "bg-amber-500 hover:bg-amber-600 text-white",
                  onClick: applyAllUpdates,
                  disabled: isApplyingUpdate,
                  children: isApplyingUpdate
                    ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                            className: "h-4 w-4 mr-2 animate-spin",
                          }),
                          "Updating...",
                        ],
                      })
                    : "Apply All Updates",
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
}

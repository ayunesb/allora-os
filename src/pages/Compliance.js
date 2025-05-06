"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Compliance;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var sonner_1 = require("sonner");
var useCompliance_1 = require("@/hooks/useCompliance");
/**
 * This is a redirector component that handles any compliance-related setup
 * before redirecting to the main compliance dashboard
 */
function Compliance() {
  var compliance = (0, useCompliance_1.useCompliance)();
  var location = (0, react_router_dom_1.useLocation)();
  (0, react_1.useEffect)(
    function () {
      // Schedule regular compliance check if available
      if (compliance.scheduleComplianceCheck) {
        compliance.scheduleComplianceCheck().catch(function (error) {
          console.error("Failed to schedule compliance check:", error);
        });
      }
      // Show notification if there are pending updates
      if (compliance.pendingUpdates && compliance.pendingUpdates.length > 0) {
        sonner_1.toast.info(
          "Updates available for ".concat(
            compliance.pendingUpdates.length,
            " document(s)",
          ),
          {
            description:
              "New regulatory updates are available for some compliance documents.",
            action: {
              label: "Review",
              onClick: function () {
                return (window.location.href = "/compliance/reports");
              },
            },
          },
        );
      }
    },
    [compliance],
  );
  // Check if we're already on a compliance sub-path to prevent redirect loops
  var isAlreadyOnCompliancePath = location.pathname.startsWith("/compliance/");
  // Only redirect if we're not already on a compliance sub-path
  if (!isAlreadyOnCompliancePath) {
    return (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, {
      to: "/compliance/overview",
      replace: true,
    });
  }
  // If already on a compliance path, render nothing (this component should never
  // actually render anything as it's just a redirector)
  return null;
}

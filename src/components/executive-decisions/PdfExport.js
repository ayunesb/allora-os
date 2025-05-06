"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfExport = PdfExport;
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var jspdf_1 = require("jspdf");
require("jspdf-autotable");
function PdfExport(_a) {
  var decisions = _a.decisions;
  var downloadDecisionsPDF = function () {
    var doc = new jspdf_1.default();
    doc.text("Allora Executive Decision Log", 14, 20);
    var tableColumn = [
      "Executive",
      "Role",
      "Task",
      "Decision",
      "Priority",
      "Risk",
    ];
    var tableRows = [];
    decisions.forEach(function (decision) {
      var decisionData = [
        decision.executiveName,
        decision.executiveRole,
        decision.task,
        decision.selectedOption,
        decision.priority || "N/A",
        decision.riskAssessment || "N/A",
      ];
      tableRows.push(decisionData);
    });
    // Draw the table
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });
    // Save the PDF
    doc.save(
      "allora_decisions_log_".concat(
        new Date().toISOString().slice(0, 10),
        ".pdf",
      ),
    );
  };
  return (0, jsx_runtime_1.jsx)("div", {
    className: "mb-4",
    children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
      onClick: downloadDecisionsPDF,
      variant: "default",
      className: "flex items-center gap-2",
      children: [
        (0, jsx_runtime_1.jsx)(lucide_react_1.FileDown, {
          className: "h-4 w-4",
        }),
        "Download Decisions as PDF",
      ],
    }),
  });
}

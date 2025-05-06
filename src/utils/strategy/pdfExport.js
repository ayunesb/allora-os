"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportAllStrategiesToPdf = exports.exportStrategyToPdf = void 0;
var date_fns_1 = require("date-fns");
var sonner_1 = require("sonner");
/**
 * Generates and downloads a PDF for a strategy
 */
var exportStrategyToPdf = function (strategy) {
  try {
    // In a real implementation, this would use a PDF library like jspdf or pdfmake
    // For now, we'll simulate PDF generation by creating a text file
    var filename = "".concat(
      strategy.title.replace(/\s+/g, "_").toLowerCase(),
      "_strategy.pdf",
    );
    // Create a blob with the content
    var content = generateStrategyContent(strategy);
    var blob = new Blob([content], { type: "application/pdf" });
    // Create download link
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    // Trigger download
    document.body.appendChild(a);
    a.click();
    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    sonner_1.toast.success(
      'Strategy "'.concat(strategy.title, '" exported successfully'),
    );
  } catch (error) {
    console.error("Error exporting strategy to PDF:", error);
    sonner_1.toast.error("Failed to export strategy to PDF");
  }
};
exports.exportStrategyToPdf = exportStrategyToPdf;
/**
 * Generates all strategies as a PDF and downloads it
 */
var exportAllStrategiesToPdf = function (strategies) {
  try {
    // In a real implementation, this would use a PDF library to combine multiple strategies
    // For now, we'll simulate by creating a text file with all strategies
    var filename = "all_strategies.pdf";
    // Create content with all strategies
    var content = strategies
      .map(function (strategy) {
        return generateStrategyContent(strategy);
      })
      .join("\n\n============\n\n");
    var blob = new Blob([content], { type: "application/pdf" });
    // Create download link
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    // Trigger download
    document.body.appendChild(a);
    a.click();
    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    sonner_1.toast.success(
      "".concat(strategies.length, " strategies exported successfully"),
    );
  } catch (error) {
    console.error("Error exporting all strategies to PDF:", error);
    sonner_1.toast.error("Failed to export strategies to PDF");
  }
};
exports.exportAllStrategiesToPdf = exportAllStrategiesToPdf;
/**
 * Helper to generate the text content for a strategy
 */
var generateStrategyContent = function (strategy) {
  var updatedDate = new Date(strategy.updated_at || strategy.created_at);
  var timeAgo = (0, date_fns_1.formatDistanceToNow)(updatedDate, {
    addSuffix: true,
  });
  return "\nSTRATEGY: "
    .concat(strategy.title, "\n===============================\n\nRisk Level: ")
    .concat(strategy.risk || strategy.risk_level || "Medium", "\nImpact: ")
    .concat(strategy.impact || "Medium", "\nLast Updated: ")
    .concat(timeAgo, "\nProposed by: ")
    .concat(
      strategy.executiveBot || "AI Executive Team",
      "\n\nDESCRIPTION\n-----------\n",
    )
    .concat(
      strategy.description || "No description provided.",
      "\n\nEXPECTED ROI\n-----------\n",
    )
    .concat(
      strategy.expectedROI || "Not specified",
      "\n\nSUCCESS METRICS\n--------------\n",
    )
    .concat(
      strategy.successMetrics
        ? strategy.successMetrics.join("\n")
        : "Not specified",
      "\n\nTIMEFRAME\n---------\n",
    )
    .concat(strategy.timeframe || "Not specified", "\n\nPROGRESS\n--------\n")
    .concat(
      strategy.progress !== undefined
        ? "".concat(strategy.progress, "%")
        : "Not specified",
      "\n  ",
    );
};

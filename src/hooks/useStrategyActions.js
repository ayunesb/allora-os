"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStrategyActions = useStrategyActions;
var react_1 = require("react");
var sonner_1 = require("sonner");
var pdfExport_1 = require("@/utils/strategy/pdfExport");
function useStrategyActions() {
  var handleExportPDF = (0, react_1.useCallback)(function (strategy) {
    sonner_1.toast.info("Preparing PDF export...");
    setTimeout(function () {
      try {
        (0, pdfExport_1.exportStrategyToPdf)(strategy);
        sonner_1.toast.success("Strategy exported to PDF!");
      } catch (error) {
        console.error("Error exporting strategy:", error);
        sonner_1.toast.error("Failed to export strategy. Please try again.");
      }
    }, 1000);
  }, []);
  var handleExportAllPDF = (0, react_1.useCallback)(function (strategies) {
    if (!strategies || strategies.length === 0) {
      sonner_1.toast.error("No strategies to export");
      return;
    }
    sonner_1.toast.info("Exporting all strategies...");
    setTimeout(function () {
      try {
        (0, pdfExport_1.exportAllStrategiesToPdf)(strategies);
        sonner_1.toast.success("All strategies exported to PDF!");
      } catch (error) {
        console.error("Error exporting all strategies:", error);
        sonner_1.toast.error("Failed to export strategies. Please try again.");
      }
    }, 1500);
  }, []);
  return {
    handleExportPDF: handleExportPDF,
    handleExportAllPDF: handleExportAllPDF,
  };
}

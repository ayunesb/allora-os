import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
/**
 * Generates and downloads a PDF for a strategy
 */
export const exportStrategyToPdf = (strategy) => {
    try {
        // In a real implementation, this would use a PDF library like jspdf or pdfmake
        // For now, we'll simulate PDF generation by creating a text file
        const filename = `${strategy.title.replace(/\s+/g, "_").toLowerCase()}_strategy.pdf`;
        // Create a blob with the content
        const content = generateStrategyContent(strategy);
        const blob = new Blob([content], { type: "application/pdf" });
        // Create download link
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        // Trigger download
        document.body.appendChild(a);
        a.click();
        // Cleanup
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success(`Strategy "${strategy.title}" exported successfully`);
    }
    catch (error) {
        console.error("Error exporting strategy to PDF:", error);
        toast.error("Failed to export strategy to PDF");
    }
};
/**
 * Generates all strategies as a PDF and downloads it
 */
export const exportAllStrategiesToPdf = (strategies) => {
    try {
        // In a real implementation, this would use a PDF library to combine multiple strategies
        // For now, we'll simulate by creating a text file with all strategies
        const filename = "all_strategies.pdf";
        // Create content with all strategies
        const content = strategies
            .map((strategy) => generateStrategyContent(strategy))
            .join("\n\n============\n\n");
        const blob = new Blob([content], { type: "application/pdf" });
        // Create download link
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        // Trigger download
        document.body.appendChild(a);
        a.click();
        // Cleanup
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success(`${strategies.length} strategies exported successfully`);
    }
    catch (error) {
        console.error("Error exporting all strategies to PDF:", error);
        toast.error("Failed to export strategies to PDF");
    }
};
/**
 * Helper to generate the text content for a strategy
 */
const generateStrategyContent = (strategy) => {
    const updatedDate = new Date(strategy.updated_at || strategy.created_at);
    const timeAgo = formatDistanceToNow(updatedDate, { addSuffix: true });
    return `
STRATEGY: ${strategy.title}
===============================

Risk Level: ${strategy.risk || strategy.risk_level || "Medium"}
Impact: ${strategy.impact || "Medium"}
Last Updated: ${timeAgo}
Proposed by: ${strategy.executiveBot || "AI Executive Team"}

DESCRIPTION
-----------
${strategy.description || "No description provided."}

EXPECTED ROI
-----------
${strategy.expectedROI || "Not specified"}

SUCCESS METRICS
--------------
${strategy.successMetrics ? strategy.successMetrics.join("\n") : "Not specified"}

TIMEFRAME
---------
${strategy.timeframe || "Not specified"}

PROGRESS
--------
${strategy.progress !== undefined ? `${strategy.progress}%` : "Not specified"}
  `;
};

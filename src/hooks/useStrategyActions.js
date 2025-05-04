import { useCallback } from "react";
import { toast } from "sonner";
import { exportStrategyToPdf, exportAllStrategiesToPdf } from "@/utils/strategy/pdfExport";
export function useStrategyActions() {
    const handleExportPDF = useCallback((strategy) => {
        toast.info("Preparing PDF export...");
        setTimeout(() => {
            try {
                exportStrategyToPdf(strategy);
                toast.success("Strategy exported to PDF!");
            }
            catch (error) {
                console.error("Error exporting strategy:", error);
                toast.error("Failed to export strategy. Please try again.");
            }
        }, 1000);
    }, []);
    const handleExportAllPDF = useCallback((strategies) => {
        if (!strategies || strategies.length === 0) {
            toast.error("No strategies to export");
            return;
        }
        toast.info("Exporting all strategies...");
        setTimeout(() => {
            try {
                exportAllStrategiesToPdf(strategies);
                toast.success("All strategies exported to PDF!");
            }
            catch (error) {
                console.error("Error exporting all strategies:", error);
                toast.error("Failed to export strategies. Please try again.");
            }
        }, 1500);
    }, []);
    return {
        handleExportPDF,
        handleExportAllPDF
    };
}

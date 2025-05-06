import React from "react";
interface DebateSummaryProps {
  debateTitle: string;
  onReturnToDebate: () => void;
  onExportSummary: () => void;
  onSaveToReports: () => void;
}
declare const DebateSummary: React.FC<DebateSummaryProps>;
export default DebateSummary;

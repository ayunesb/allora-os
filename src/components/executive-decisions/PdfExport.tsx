
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { ExecutiveDecision } from "@/types/agents";
import jsPDF from "jspdf";
import "jspdf-autotable";

interface PdfExportProps {
  decisions: ExecutiveDecision[];
}

export function PdfExport({ decisions }: PdfExportProps) {
  const downloadDecisionsPDF = () => {
    const doc = new jsPDF();

    doc.text("Allora Executive Decision Log", 14, 20);
    
    const tableColumn = ["Executive", "Role", "Task", "Decision", "Priority", "Risk"];
    const tableRows: any[] = [];

    decisions.forEach((decision) => {
      const decisionData = [
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
    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    // Save the PDF
    doc.save(`allora_decisions_log_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  return (
    <div className="mb-4">
      <Button onClick={downloadDecisionsPDF} variant="default" className="flex items-center gap-2">
        <FileDown className="h-4 w-4" />
        Download Decisions as PDF
      </Button>
    </div>
  );
}

import { ExecutiveDecision } from "@/types/agents";
import "jspdf-autotable";
interface PdfExportProps {
  decisions: ExecutiveDecision[];
}
export declare function PdfExport({ decisions }: PdfExportProps): JSX.Element;
export {};


import DocumentLegalContent from "@/components/compliance/legal/DocumentLegalContent";
import { ComplianceProvider } from "@/context/ComplianceContext";

export default function LegalDocument() {
  return (
    <ComplianceProvider>
      <DocumentLegalContent />
    </ComplianceProvider>
  );
}
